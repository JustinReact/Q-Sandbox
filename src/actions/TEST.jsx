import React, { useState } from "react";
import {
  Box,
  Card,
  CircularProgress,
  MenuItem,
  Select,
  styled,
  Typography,
} from "@mui/material";
import { DisplayCode } from "../components/DisplayCode";
import { DisplayCodeResponse } from "../components/DisplayCodeResponse";

import beautify from "js-beautify";
import Button from "../components/Button";
import { OptionsManager } from "../components/OptionsManager";
import {
  FieldExplanation,
  GeneralExplanation,
} from "../components/QRComponents";
import { Spacer } from "../components/Spacer";
import { Code, CustomInput } from "../components/Common-styles";
import { coins } from "../constants";
import WarningIcon from "@mui/icons-material/Warning";
export const Label = styled("label")(
  ({ theme }) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 14px;
    display: block;
    margin-bottom: 4px;
    font-weight: 400;
    `
);

export const formatResponse = (code) => {
  return beautify.js(code, {
    indent_size: 2, // Number of spaces for indentation
    space_in_empty_paren: true, // Add spaces inside parentheses
  });
};

const connectionTypes = [
  {
    name: "SSL",
  },
  {
    name: "TCP",
  },
];
export const TEST = ({ myAddress }) => {
  const [isLoading, setIsLoading] = useState(false);

  const [requestData, setRequestData] = useState({
    coin: "LTC",
    type: "SSL",
    host: "",
    port: ""
  });
  const [responseData, setResponseData] = useState(
    formatResponse(`
  
  `)
  );

  const codePollName = `
await qortalRequest({
  action: "ADD_FOREIGN_SERVER",
  coin: "${requestData?.coin}",
  type: "${requestData?.type}",
  host: "${requestData?.host}",
  port: "${requestData?.port}",
});
`.trim();

  const tsInterface = `
interface AddForeignServerRequest {
  action: string;
  coin: string;
  type: string;
  host: string;
  port: string | number;
}
`.trim();

  const executeQortalRequest = async () => {
    try {
      setIsLoading(true);
      let account = await qortalRequest({
        action: "ADD_FOREIGN_SERVER",
        coin: requestData?.coin,
        type: requestData?.type,
        host: requestData?.host,
        port: requestData?.port,
      });

      setResponseData(formatResponse(JSON.stringify(account)));
    } catch (error) {
      setResponseData(formatResponse(JSON.stringify(error)));
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleChange = (e) => {
    setRequestData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  async function decryptAESGCM(keyB64, ivB64, ciphertextB64) {
    const key = Uint8Array.from(atob(keyB64), c => c.charCodeAt(0));
    const iv = Uint8Array.from(atob(ivB64), c => c.charCodeAt(0));
    const ciphertext = Uint8Array.from(atob(ciphertextB64), c => c.charCodeAt(0));
  
    console.log("Key length:", key.length); // Should be 32
    console.log("IV length:", iv.length);   // Should be 12
    console.log("Ciphertext length:", ciphertext.length);
  
    const algorithm = { name: "AES-GCM", iv: iv };
    const cryptoKey = await crypto.subtle.importKey("raw", key, algorithm, false, ["decrypt"]);
  
    return crypto.subtle.decrypt(algorithm, cryptoKey, ciphertext);
  }
  
  

  async function testDecrypt() {
    const reference = "BtHaLK9LLqWqVioEgBxnBSZ8zimuD27vxuu9E9VGx2423yHUzwJcqtesycBFxf9ZdBhM7Hh4EKU364HqGLMFvXv";
    const keyB64 = "23B7s1wmBwTKhgEOxTsuZGisYv42zZwJIfBOjNiekhE=";
    const ciphertextB64 = "0aRYOBRaRNRN2sFuSBOlv1K1WyVQ0iNApAHz148d";
  
    // Decode reference and extract first 12 bytes for nonce
    const referenceBytes = Uint8Array.from(atob(reference), c => c.charCodeAt(0));
    const iv = referenceBytes.slice(0, 12);
    const ivB64 = btoa(String.fromCharCode(...iv));
  
    try {
      // Decrypt using AES-GCM
      const decrypted = await decryptAESGCM(keyB64, ivB64, ciphertextB64);
      console.log("Decrypted text:", decrypted);
    } catch (err) {
      console.error("Decryption failed:", err);
    }
  }
  

  const testFunc = async ()=> {
    try {
      testDecrypt()
    } catch (error) {
      console.log('ERROR', error)
    }
  }
  return (
    <div
      style={{
        padding: "10px",
      }}
    >
     <button onClick={testFunc}>test</button>
    </div>
  );
};
