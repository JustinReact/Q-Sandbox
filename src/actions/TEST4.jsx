import React, { useState } from "react";
import { TextField, Button, Typography, Grid, List, ListItem } from "@mui/material";
import { Buffer } from "buffer";


//keyword generation
const COMMON_WORDS = new Set([
  "the", "and", "for", "with", "of", "a", "in", "on", "at", "is", "to", "this", "by", "it", "new"
]);

function generateKeywords(title, description) {
  const MAX_KEYWORDS = 20; // Limit to 10 keywords
  const MAX_LENGTH = 50; // Keep each keyword short

  // 🔹 Tokenize: Split into words & remove common words
  function tokenize(text) {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "") // Remove punctuation
      .split(/\s+/) // Split by spaces
      .filter(word => word.length > 2 && !COMMON_WORDS.has(word));
  }

  // 🔹 Extract important words
  let words = [...new Set([...tokenize(title), ...tokenize(description)])];

  // 🔹 Generate phrases (2-word & 3-word combinations)
  let phrases = [];
  for (let i = 0; i < words.length; i++) {
    if (i < words.length - 1) phrases.push(`${words[i]} ${words[i + 1]}`);
    if (i < words.length - 2) phrases.push(`${words[i]} ${words[i + 1]} ${words[i + 2]}`);
  }

  // 🔹 Merge words & phrases
  let keywords = [...words, ...phrases]
    .filter(kw => kw.length <= MAX_LENGTH) // Keep short keywords
    .slice(0, MAX_KEYWORDS); // Limit total count
  console.log('keywords', keywords)
  return keywords.join(" ");
}


//
//test decryption

function base62Decode(encoded) {
  const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let num = BigInt(0);
  
  for (let char of encoded) {
      num = num * 62n + BigInt(alphabet.indexOf(char));
  }

  let hex = num.toString(16);
  if (hex.length % 2) hex = "0" + hex; // Ensure even length
  return new Uint8Array(Buffer.from(hex, "hex"));
}

// ✅ AES-CTR Key
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

// ✅ Generate a deterministic IV from a word
async function generateIV(word) {
  const encoded = new TextEncoder().encode(word);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  return new Uint8Array(hashBuffer.slice(0, 16)); // First 16 bytes as IV
}

// ✅ Base62 Encoding (Compact Output)
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

// ✅ Encrypt a word using AES-CTR + Base62 Encoding
async function encryptKeyword(word) {
  const key = await generateSearchKey();
  const iv = await generateIV(word); // Deterministic IV
  const encoded = new TextEncoder().encode(word);

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-CTR", counter: iv, length: 128 },
    key,
    encoded
  );

  return base62Encode(new Uint8Array(encrypted)); // Base62 encoding for compact storage
}

// ✅ Tokenize input into words
function tokenizeInput(input) {
  return input.trim().toLowerCase().split(/\s+/);
}

export const TEST4 = () => {
  const [inputText, setInputText] = useState("");
  const [encryptedList, setEncryptedList] = useState(new Set()); // Use Set for fast lookups
  const [searchQuery, setSearchQuery] = useState("");
  const [encryptedSearchWord, setEncryptedSearchWord] = useState("");
  const [encryptedWord, setEncryptedWord] = useState("");
  const [description, setDescription] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  /**
   * 🔐 Encrypt words & store them deterministically
   */
  const handleEncrypt = async () => {
    try {
      const words = tokenizeInput(inputText);
      const encryptedWords = await Promise.all(words.map(encryptKeyword));

      setEncryptedList(new Set(encryptedWords)); // Convert to Set for O(1) lookups
      console.log("🔒 Stored Encrypted Words:", encryptedWords);
      const encryptedToStore = encryptedWords.join(",");

      // 🔥 Log what you would save to the database
      console.log("🛢️ Encrypted Data to Store in DB:", encryptedToStore);
    } catch (error) {
      console.error("Encryption Error:", error);
    }
  };

  /**
   * 🔍 Search by re-encrypting the word and comparing
   */
  const handleSearch = async () => {
    try {
      const trimmedSearch = searchQuery.trim().toLowerCase();
      const encryptedSearch = await encryptKeyword(trimmedSearch);

      setEncryptedSearchWord(encryptedSearch); // Display the encrypted version of the search term

      console.log("🔍 Encrypted Search Word:", encryptedSearch);
      console.log("🔎 Checking against stored words:", [...encryptedList]);

      const matchFound = encryptedList.has(encryptedSearch);
      setSearchResult(matchFound ? "✅ Match Found!" : "❌ No Match");
    } catch (error) {
      console.error("Search Error:", error);
    }
  };

  async function decryptKeyword(encryptedWord) {
    try {
      const key = await generateSearchKey();
      const counter = new Uint8Array(16); // Same static counter used for encryption
      const encryptedBytes = base62Decode(encryptedWord); // Convert back from Base62
  
      const decrypted = await crypto.subtle.decrypt(
        { name: "AES-CTR", counter, length: 128 },
        key,
        encryptedBytes
      );
  
      const decodedWord = new TextDecoder().decode(decrypted);
      console.log("🔓 Decrypted Word:", decodedWord);
      return decodedWord;
    } catch (error) {
      console.error("❌ Decryption Failed:", error);
      return null;
    }
  }
  
  // ✅ Attempt Decryption
  async function tryDecryption() {
    try {
      console.log("Attempting to decrypt:", encryptedWord);
      const decrypted = await decryptKeyword(encryptedWord);
      console.log("🔓 Decrypted:", decrypted);
    } catch (error) {
      console.error("❌ Decryption Attempt Error:", error);
    }
  }

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
      <Grid item xs={12}>
        <Typography variant="h5">try to decrypt</Typography>
        <TextField
          fullWidth
          label="Enter encrypted keyword"
          value={encryptedWord}
          onChange={(e) => setEncryptedWord(e.target.value)}
        />
        <Button variant="contained" color="secondary" onClick={tryDecryption} style={{ marginTop: "10px" }}>
          decrypt
        </Button>

      </Grid>

      <Grid item xs={12}>
        <Typography variant="h5">Description</Typography>
        <TextField
          fullWidth
          label="Enter text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Button variant="contained" color="secondary" onClick={()=> {
         const results = generateKeywords("", description)
         setInputText(results)
        }} style={{ marginTop: "10px" }}>
          generate keywords
        </Button>
      
      </Grid>
    </Grid>
  );
};
