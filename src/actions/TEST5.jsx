import React, { useState } from "react";
import { TextField, Button, Typography, Grid, List, ListItem } from "@mui/material";
import { Buffer } from "buffer";
import { removeStopwords } from "stopword";

// 🔐 Common words to ignore for keyword generation
const COMMON_WORDS = new Set([
  "the", "and", "for", "with", "of", "a", "in", "on", "at", "is", "to", "this", "by", "it", "new"
]);

// ✅ Generate Keywords
function generateKeywords(title, description) {
  const MAX_KEYWORDS = 20;
  const MAX_LENGTH = 50;

  function tokenize(text) {
    const words = text
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .split(/\s+/)
      const filteredWords = removeStopwords(words);
    return filteredWords
  }

  let words = [...new Set([...tokenize(title), ...tokenize(description)])];

  let phrases = [];
  for (let i = 0; i < words.length; i++) {
    if (i < words.length - 1) phrases.push(`${words[i]} ${words[i + 1]}`);
    if (i < words.length - 2) phrases.push(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
  }

  let keywords = [...words, ...phrases]
    .filter(kw => kw.length <= MAX_LENGTH)
    .slice(0, MAX_KEYWORDS);
  
  console.log("🔑 Generated Keywords:", keywords);
  return keywords.join(" ");
}

// 🔐 AES Key
const AES_SECRET_KEY = new Uint8Array([
  12, 34, 56, 78, 90, 123, 213, 231, 87, 65, 43, 21, 9, 8, 7, 6
]);

// ✅ Generate AES-CTR Key
async function generateSearchKey() {
  return await crypto.subtle.importKey(
    "raw",
    AES_SECRET_KEY,
    { name: "AES-CTR" },
    false,
    ["encrypt"]
  );
}

// ✅ Base62 Encoding
function base62Encode(buffer) {
  const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let num = BigInt("0x" + Buffer.from(buffer).toString("hex"));
  let encoded = "";
  while (num > 0) {
    encoded = alphabet[num % 62n] + encoded;
    num /= 62n;
  }
  return encoded || "0";
}

// ✅ Hash Function (Fixed-Length 8 Chars)
const SECRET_SALT = "random_secret"; // Keep this secret
async function hashWord(word) {
  const saltedWord = SECRET_SALT + word;
  const encoded = new TextEncoder().encode(saltedWord);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);

  return Buffer.from(hashBuffer).toString("base64").slice(0, 8); // Always 8 chars
}

// ✅ Always Hash Before Encrypting
async function processWord(word) {
  const hashedWord = await hashWord(word);
  return encryptKeyword(hashedWord);
}

// ✅ Encrypt Hashed Word
async function encryptKeyword(word) {
  const key = await generateSearchKey();
  const encoded = new TextEncoder().encode(word);
  const iv = new Uint8Array(16); // Fixed IV

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-CTR", counter: iv, length: 128 },
    key,
    encoded
  );

  return base62Encode(new Uint8Array(encrypted));
}

export const TEST5 = () => {
  const [inputText, setInputText] = useState("");
  const [encryptedList, setEncryptedList] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [encryptedSearchWord, setEncryptedSearchWord] = useState("");
  const [description, setDescription] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  /**
   * 🔐 Encrypt Words & Store
   */
  const handleEncrypt = async () => {
    try {
      const words = inputText.split(/\s+/).map(w => w.trim().toLowerCase()).filter(w => w);
      const encryptedWords = await Promise.all(words.map(processWord));

      setEncryptedList(new Set(encryptedWords));
      console.log("🔒 Stored Encrypted Words:", encryptedWords);
      const encryptedToStore = encryptedWords.join(",");

      // 🔥 Log what you would save to the database
      console.log("🛢️ Encrypted Data to Store in DB:", encryptedToStore);
    } catch (error) {
      console.error("Encryption Error:", error);
    }
  };

  /**
   * 🔍 Search by Re-Encrypting
   */
  const handleSearch = async () => {
    try {
      const trimmedSearch = searchQuery.trim().toLowerCase();
      const encryptedSearch = await processWord(trimmedSearch);

      setEncryptedSearchWord(encryptedSearch);
      console.log("🔍 Encrypted Search Word:", encryptedSearch);
      console.log("🔎 Stored Encrypted Words:", [...encryptedList]);

      const matchFound = encryptedList.has(encryptedSearch);
      setSearchResult(matchFound ? "✅ Match Found!" : "❌ No Match");
    } catch (error) {
      console.error("Search Error:", error);
    }
  };

  return (
    <Grid container spacing={2} style={{ padding: "20px" }}>
      {/* 🔐 Store Words */}
      <Grid item xs={12}>
        <Typography variant="h5">🔐 Store Secure Words</Typography>
        <TextField
          fullWidth
          label="Enter words (e.g., 'hello world')"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleEncrypt} style={{ marginTop: "10px" }}>
          Encrypt & Store
        </Button>
      </Grid>

      {/* Display Stored Words */}
      {encryptedList.size > 0 && (
        <Grid item xs={12}>
          <Typography variant="h6">🔒 Stored Encrypted Words:</Typography>
          <List>
            {[...encryptedList].map((encrypted, index) => (
              <ListItem key={index}>{encrypted}</ListItem>
            ))}
          </List>
        </Grid>
      )}

      {/* 🔍 Search Section */}
      <Grid item xs={12}>
        <Typography variant="h5">🔍 Search Encrypted Words</Typography>
        <TextField
          fullWidth
          label="Enter search word"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="contained" color="secondary" onClick={handleSearch} style={{ marginTop: "10px" }}>
          Search
        </Button>

        {searchResult && (
          <Typography variant="h6" style={{ marginTop: "10px" }}>
            {searchResult}
          </Typography>
        )}

        {/* Display Encrypted Search Word */}
        {encryptedSearchWord && (
          <Typography variant="h6" style={{ marginTop: "10px" }}>
            🔍 Encrypted Search Term: {encryptedSearchWord}
          </Typography>
        )}
      </Grid>

      {/* 🔹 Generate Keywords from Description */}
      <Grid item xs={12}>
        <Typography variant="h5">Generate Keywords</Typography>
        <TextField
          fullWidth
          label="Enter product description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            const results = generateKeywords("", description);
            setInputText(results);
          }}
          style={{ marginTop: "10px" }}
        >
          Generate Keywords
        </Button>
      </Grid>
    </Grid>
  );
};
