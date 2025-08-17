// File: app/screens/ThoughtViewerScreen.tsx

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import Slider from '@react-native-community/slider';
import { PanGestureHandler, State } from 'react-native-gesture-handler';
import { generateClient } from 'aws-amplify/api';
import { listThoughts } from '@/graphql/queries';
import { Audio, AVPlaybackStatus } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const client = generateClient();

const ThoughtViewerScreen = () => {
  const [thoughtsByDate, setThoughtsByDate] = useState<Record<string, any>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);
  const [showPlayer, setShowPlayer] = useState(false);
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchThoughts = async () => {
      try {
        const allThoughts: any[] = [];
        let nextToken: string | null = null;

        do {
          const response: any = await client.graphql({
            query: listThoughts,
            variables: { nextToken, limit: 1000 },
          });
          allThoughts.push(...response.data.listThoughts.items);
          nextToken = response.data.listThoughts.nextToken;
        } while (nextToken);

        const formatted: Record<string, any> = {};
        allThoughts.forEach((t: any) => {
          formatted[t.date] = {
            title: t.title,
            message: t.message,
            audioUrl: t.audioUrl ?? null,
          };
        });

        const sortedDates = Object.keys(formatted).sort(
          (a, b) => new Date(b).getTime() - new Date(a).getTime()
        );

        setThoughtsByDate(
          Object.fromEntries(sortedDates.map((date) => [date, formatted[date]]))
        );
        setCurrentIndex(0);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load thoughts:', error);
      }
    };

    fetchThoughts();

    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  const handleSwipe = (event: any) => {
    const { translationX, state } = event.nativeEvent;

    if (state === State.END) {
      const keys = Object.keys(thoughtsByDate);
      if (translationX < -50 && currentIndex < keys.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else if (translationX > 50 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      }
    }
  };

  async function playAudio(url: string) {
  try {
    if (sound && sound._loaded && currentAudioUrl === url) {
      const status = await sound.getStatusAsync();

      if ('isLoaded' in status && status.isLoaded) {
        if (status.isPlaying) {
          await sound.pauseAsync();
          setIsPlaying(false);
        } else {
          await sound.playAsync();
          setIsPlaying(true);
        }
      }

      return;
    }

    // Unload previous sound
    if (sound) {
      await sound.unloadAsync();
    }

    // Load new sound
    const { sound: newSound } = await Audio.Sound.createAsync(
      { uri: url },
      { shouldPlay: true }
    );

    setSound(newSound);
    setCurrentAudioUrl(url);
    setIsPlaying(true);

    newSound.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) => {
      if (!status.isLoaded) {
        console.error('PlaybackStatusError:', status);
        return;
      }

      setPlaybackPosition(status.positionMillis);
      setPlaybackDuration(status.durationMillis ?? 0);

      if (!status.isPlaying) {
        setIsPlaying(false);
      }
    });
  } catch (error) {
    console.error('Error playing audio:', error);
    setIsPlaying(false);
  }
}
  async function handleRewind() {
    if (sound) {
      await sound.setPositionAsync(0);
    }
  }

  async function handleForward() {
    if (sound && playbackPosition + 10000 < playbackDuration) {
      await sound.setPositionAsync(playbackPosition + 10000);
    }
  }

  async function handleSeek(value: number) {
    if (sound) {
      await sound.setPositionAsync(value);
    }
  }

  function formatTime(millis: number) {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#888" />
      </View>
    );
  }

  const dateKeys = Object.keys(thoughtsByDate);
  const currentDate = dateKeys[currentIndex];
  const thought = thoughtsByDate[currentDate];

  return (
    <PanGestureHandler onHandlerStateChange={handleSwipe}>
      <SafeAreaView style={styles.container}>
        {thought ? (
          <>
            <View style={styles.header}>
              <Text style={styles.date}>{currentDate}</Text>
              <Text style={styles.title}>{thought.title}</Text>

              {thought.audioUrl && (
                <TouchableOpacity onPress={() => setShowPlayer(true)}>
                  <Ionicons name="headset" size={30} color="#007AFF" style={{ marginTop: 8 }} />
                </TouchableOpacity>
              )}
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
              <Text style={styles.message}>{thought.message}</Text>
            </ScrollView>

            {showPlayer && thought.audioUrl && (
              <View style={styles.playerContainer}>
                <View style={styles.progressRow}>
                  <Text style={styles.time}>{formatTime(playbackPosition)}</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={playbackDuration || 1}
                    value={playbackPosition}
                    onSlidingComplete={handleSeek}
                    minimumTrackTintColor="#007AFF"
                    maximumTrackTintColor="#ccc"
                  />
                  <Text style={styles.time}>{formatTime(playbackDuration)}</Text>
                </View>

                <View style={styles.controlsRow}>
                  <TouchableOpacity onPress={handleRewind}>
                    <Ionicons name="play-back" size={28} color="#007AFF" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => playAudio(thought.audioUrl)}>
                    <Ionicons
                      name={isPlaying ? "pause-circle" : "play-circle"}
                      size={40}
                      color="#007AFF"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleForward}>
                    <Ionicons name="play-forward" size={28} color="#007AFF" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </>
        ) : (
          <View style={styles.centered}>
            <Text style={styles.title}>Thought Coming Soon</Text>
          </View>
        )}
      </SafeAreaView>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    paddingTop: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  date: { fontSize: 14, color: '#888', marginBottom: 4 },
  title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 8 },
  scrollContainer: { paddingHorizontal: 24, paddingVertical: 20 },
  message: { fontSize: 16, lineHeight: 26 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  playerContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#f9f9f9',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  time: {
    width: 40,
    fontSize: 12,
    color: '#555',
  },
  slider: {
    flex: 1,
    marginHorizontal: 8,
  },
  controlsRow: {
    marginTop: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});

export default ThoughtViewerScreen;
