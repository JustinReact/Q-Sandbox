import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { Buffer } from "buffer";

// ✅ Use AES-CTR (removes padding, requires 16-byte counter)
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

// ✅ Secure Hash Function with Base64 Encoding (for long words)
const SECRET_SALT = "random_secret"; // Keep this secret
async function hashWord(word) {
  const saltedWord = SECRET_SALT + word;
  const encoded = new TextEncoder().encode(saltedWord);
  const hashBuffer = await crypto.subtle.digest("SHA-256", encoded);
  
  // ✅ Convert to Base64 (more compact) and shorten to 6 chars
  return Buffer.from(hashBuffer).toString("base64").slice(0, 6);
}

// ✅ Choose Whether to Hash or Encrypt Directly (Hybrid Approach)
async function processWord(word) {
  // If word is longer than 6 characters, hash it first
  const wordToEncrypt = word.length > 6 ? await hashWord(word) : word;

  // ✅ Encrypt (Either Original Word or Hashed Word)
  return encryptKeyword(wordToEncrypt);
}

// ✅ Encrypt a word using AES-CTR + Base62 Encoding
async function encryptKeyword(word) {
  const key = await generateSearchKey();
  const counter = new Uint8Array(16); // ✅ Fix: Use a 16-byte counter
  const encoded = new TextEncoder().encode(word);

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-CTR", counter, length: 128 }, 
    key, 
    encoded
  );

  return base62Encode(new Uint8Array(encrypted)); // Base62 encoding for compact storage
}

// ✅ Tokenize input into individual words
function tokenizeInput(input) {
  return input.trim().toLowerCase().split(/\s+/);
}

export const TEST2 = () => {
  const [value, setValue] = useState("");
  const [encryptedList, setEncryptedList] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState(null);

  // ✅ Encrypt and store a list of words in a compact format
  const encryptFunc = async () => {
    try {
        const words = tokenizeInput(value);
        console.log("Tokenized Words:", words);

        const encryptedWords = await Promise.all(words.map(processWord));
        setEncryptedList(encryptedWords);

        // ✅ FIX: Store as a COMMA-SEPARATED STRING
        const encryptedDescription = encryptedWords.join(",");  // Add commas!
        console.log("Encrypted Description to Store in DB:", encryptedDescription);

        return encryptedDescription;
    } catch (error) {
        console.error("Encryption Error:", error);
        return null;
    }
};
  
  // ✅ Search for a single word in the encrypted list
  const searchFunc = async () => {
    try {
      const trimmedSearch = searchValue.trim().toLowerCase();
      console.log("Search Input (Normalized):", trimmedSearch);
      const processedSearch = await processWord(trimmedSearch); // Ensure search input is hashed if needed
      console.log("Encrypted Search Word:", processedSearch);

      const matchFound = encryptedList.includes(processedSearch);

      setSearchResult(matchFound ? "Match Found!" : "No Match");
    } catch (error) {
      console.error("Search Error:", error);
    }
  };

  return (
    <div style={{ padding: "10px" }}>
      <h3>Store Encrypted Metadata</h3>
      <TextField 
        value={value} 
        onChange={(e) => setValue(e.target.value)} 
        label="Enter List of Words (e.g., 'hello world')"
      />
      <Button variant="contained" color="primary" onClick={encryptFunc} style={{ marginLeft: "10px" }}>
        Encrypt & Store
      </Button>

      {encryptedList.length > 0 && (
        <div>
          <p><strong>Encrypted Words:</strong></p>
          <ul>
            {encryptedList.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
        </div>
      )}

      <h3>Search Encrypted Metadata</h3>
      <TextField 
        value={searchValue} 
        onChange={(e) => setSearchValue(e.target.value)} 
        label="Search for a Word"
      />
      <Button variant="contained" color="secondary" onClick={searchFunc} style={{ marginLeft: "10px" }}>
        Search
      </Button>

      {searchResult && (
        <div>
          <p><strong>Search Result:</strong> {searchResult}</p>
        </div>
      )}
    </div>
  );
};
