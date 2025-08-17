// File: uploadThoughts.js

require("dotenv").config();
const fs = require("fs");
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

// Load thoughts from local JSON
const thoughts = JSON.parse(fs.readFileSync("tagged_thoughts.json", "utf-8"));

// Your GraphQL API info
const GRAPHQL_ENDPOINT = "https://titi5jyvcfgdxkv3wvtztreile.appsync-api.us-east-1.amazonaws.com/graphql";
const API_KEY = "da2-tc2rte3asrfd5ovsk24ivutuj4";

// Upload a single thought
async function uploadThought(thought) {
  const mutation = `
    mutation CreateThought($input: CreateThoughtInput!) {
      createThought(input: $input) {
        id
        date
      }
    }
  `;

  const variables = {
    input: {
      id: thought.date,
      date: thought.date,
      title: thought.title,
      message: thought.message,
      tags: thought.tags,
      embedding: thought.embedding,
    },
  };

  try {
    const res = await fetch(GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: {
        "x-api-key": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: mutation, variables }),
    });

    const data = await res.json();

    if (data.errors) {
      console.error(`❌ Failed to upload ${thought.date}:`, data.errors);
    } else {
      console.log(`✅ Uploaded: ${thought.date}`);
    }
  } catch (err) {
    console.error(`🔥 Error uploading ${thought.date}:`, err.message);
  }
}

// Upload all thoughts
(async () => {
  for (const thought of thoughts) {
    await uploadThought(thought);
    await new Promise((r) => setTimeout(r, 200)); // delay to avoid throttling
  }

  console.log("🎉 Done uploading all thoughts.");
})();
