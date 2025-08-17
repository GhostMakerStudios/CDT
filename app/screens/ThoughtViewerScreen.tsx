// File: app/screens/HomeScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;

const allDates = []; // Placeholder — fill this with sorted date strings like ['2025-08-16', '2025-08-15', ...]

const HomeScreen = () => {
  const [thoughtsByDate, setThoughtsByDate] = useState<Record<string, any>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDatesAndTodayThought = async () => {
      // TODO: Fetch list of all dates and thought objects (replace this)
      const dummyDates = ['2025-08-16', '2025-08-15', '2025-08-14'];
      const dummyThoughts: any = {
        '2025-08-16': {
            title: 'Let Glory In The Highest Be Given',
            message: `“Let glory to them in the highest be given,” (William W. Phelps, “The Spirit Of God”). Deep down all of us want to be living the best possible version of our lives. We don't always know how to go about that. Sometimes we know what we should be doing but we're too filled with doubts and fears and distractions to marshall the necessary focus and effort to get it done. And sometimes we just have no clue what the best move is or how we would execute it and so we just go stumbling on and try to make it all work as best we can. But in those moments when we know exactly what we are supposed to do and we're in that state of flow, perfectly executing our perfect vision, there is no other way to describe such moments than glorious. But this glory that we feel cannot be for us alone. After all, it is not as though we have been able to operate at the highest level all on our own. If we do any good thing, it is only by the grace of God. When we are doing everything that we can to bring out the best in ourselves, God takes all that we can do and He adds to it His own miraculous power, and thus, our efforts together with God’s grace make something glorious. It is far better for us to entrust all of the Glory to God. First of all, it mostly belongs to Him already. But more importantly, we are imperfect and inadequate containers for this glory. Glory wants to rise up to the highest point, and at present, we must keep ourselves firmly rooted in this time and place, as much as we might like to follow glory upward, and, as John Gillespie Magee Jr put it in his poem “High Flight”, “slip the surly bonds of earth, and dance the sky on laughter-silvered wings.” Our glory will be waiting for us, when it is finally time to ascend to the highest. In the meantime, let us continue always to seek for ourselves the very best possible version of our lives, the version that brings the most glory, and let that glory be given to God in the highest.`,
          },
        '2025-08-15': {
          title: 'God And The Lamb',
          message: `“Hosanna, hosanna to God and the Lamb!” (William W. Phelps, “The Spirit Of God”). If God is the absolute pinnacle of strength and power, then all the way at the opposite end of the spectrum would be the humble lamb. It is so perfect that we have both God and the Lamb to look towards for our Salvation. Sometimes we need God almighty to sweep away our problems with His omnipotent hand. But sometimes we are not ready for that.  We need a cuddly little lamb that can reassure us that even though we are not all that we could be, He loves us and will be by our side through thick and thin, and just to provide us with that little extra bit of comfort, He has made Himself just as small and weak and helpless as we are ourselves—to show us that if even a little lamb can survive, then so can we. Just as Jesus is both God and the Lamb, so too do we have the capacity to be both as meek as a lamb and as powerful as God. As we face our trials, we need to ask ourselves: is this a challenge to which we can apply our Godlike agency and come off the conqueror? Or is it a challenge that requires a meek lamb that is humble and willing to submit to the Good Shepherd’s wisdom and timing? If we are to be saved, we need both God and the Lamb.`,
        },
        '2025-08-14': {
          title: 'With The Armies Of Heaven',
          message: `“With the armies of heaven,” (William W. Phelps, “The Spirit Of God”). “And when the servant of the man of God was risen early, and gone forth, behold, an host compassed the city both with horses and chariots. And his servant said unto him, Alas, my master! how shall we do? And he answered, Fear not: for they that be with us are more than they that be with them. And Elisha prayed, and said, Lord, I pray thee, open his eyes, that he may see. And the Lord opened the eyes of the young man; and he saw: and, behold, the mountain was full of horses and chariots of fire round about Elisha.” (2 Kings 6:15–17) If we fight with the armies of heaven, then those that be with us will always be more than those that be with them. But the important thing to remember about being with the armies of heaven is that it is in fact an army. The only thing that separates an army from a well-armed mob is discipline. An army is effective because everyone acts together to protect and support each other. All of the soldiers in an army agree to submit to the commands of those that are in authority. They go where their commander wants them to go and they do what their commander wants them to do. If we want to fight the battles that we must face with the armies of heaven by our side, then we must submit to the commands of the Lord of Hosts and go where He commands us to go and do what He commands us to do. If we try to go and fight battles where and when we want, then we run the risk of fighting such battles alone. Even if being a part of the army means putting up with things that we would rather not, or having to wait on the timing of those who are in command even when we just want to hurry up and get it over with already—it is much better to be disciplined and fight with the army than to run out and try to do it on our own. Left to our own strength we will most likely fail, but with the armies of heaven, we will inevitably triumph.`,
        },

      };

      setThoughtsByDate(dummyThoughts);
      setCurrentIndex(0); // Most recent is index 0
      setLoading(false);
    };

    loadDatesAndTodayThought();
  }, []);

  const handleSwipe = (event: any) => {
    const { translationX, state } = event.nativeEvent;

    if (state === State.END) {
      if (translationX < -50 && currentIndex < Object.keys(thoughtsByDate).length - 1) {
        setCurrentIndex(currentIndex + 1); // Swipe left → older
      } else if (translationX > 50 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1); // Swipe right → newer
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#888" />
      </View>
    );
  }

  const dateKeys = Object.keys(thoughtsByDate).sort((a, b) => b.localeCompare(a)); // Descending
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
              </View>
              <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.message}>{thought.message}</Text>
              </ScrollView>
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  date: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  scrollContainer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  message: {
    fontSize: 16,
    lineHeight: 26,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


export default HomeScreen;
