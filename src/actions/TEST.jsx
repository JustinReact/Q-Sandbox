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
import baseX from 'base-x';

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

export const base64ToBlobUrl = (base64, mimeType = "image/png") => {
  const binary = atob(base64);
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i));
  }
  const blob = new Blob([new Uint8Array(array)], { type: mimeType });
  return URL.createObjectURL(blob);
};

const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
const base58 = baseX(BASE58_ALPHABET);
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
  const [products, setProducts] = useState([])
  const [image, setImage] = useState(null)
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

  const getImage = async (key)=> {
    try {
     const data = await qortalRequest({
        action: "FETCH_QDN_RESOURCE",
          identifier: "p-q-manager-858-eyGP4uvSL0",
  encoding: "base64",

        name: "a-test",
        service: "DOCUMENT_PRIVATE",
        rebuild: false,
      });
      console.log('data', data)
      const imgData = await qortalRequest({
        action: "DECRYPT_DATA_WITH_SHARING_KEY",
        encryptedData: data,
        key,
      });
      console.log('imgData', imgData)
      const imgUrl = base64ToBlobUrl(imgData)
      console.log('imgUrl', imgUrl)
      setImage(imgUrl)
    } catch (error) {
      console.log('error', error)
    }
  }

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
  
    const decryptedArrayBuffer = await crypto.subtle.decrypt(algorithm, cryptoKey, ciphertext);
    
    // Convert ArrayBuffer to string
    const decoder = new TextDecoder();
    return decoder.decode(decryptedArrayBuffer);
  }
  
  

  async function testDecrypt(data, reference, senderPublicKey) {
    const keyB64 = "23B7s1wmBwTKhgEOxTsuZGisYv42zZwJIfBOjNiekhE=";
    const ciphertextB64 = data;
    const referenceBytes = base58.decode(reference);
    const referenceB64 = btoa(String.fromCharCode(...referenceBytes));

    console.log('base64', data)
    // Decode reference and extract first 12 bytes for nonce
    const iv = referenceBytes.slice(0, 12);
    const ivB64 = btoa(String.fromCharCode(...iv));
  
    try {
      // Decrypt using AES-GCM
      // const decrypted = await decryptAESGCM(keyB64, ivB64, ciphertextB64);
      const decrypted = await qortalRequest({
        action: 'DECRYPT_AESGCM',
        encryptedData: data,
        iv: ivB64,
        senderPublicKey
      })
      return decrypted
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

  const getProducts = async  ()=> {
    try {
      const url = `/purchasebot`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'X-API-KEY': 'YP86kBTQxNTydZw8vXomsT'
        },
      });
      if (!response?.ok) return;
      const responseData = await response.json();

      setProducts(responseData);
    } catch (error) {
      console.log('ERROR', error)
    }
  }

  async function pollForMessage(purchaseBotAddress, senderPublicKey) {
    const apiCall = `/chat/messages?involving=${myAddress}&involving=${purchaseBotAddress}&reverse=true&encoding=BASE64&after=${Date.now()}`;

    let retryDelay = 2000; // Start with a 2-second delay
    const maxDuration = 360000 * 2; // Maximum duration set to 12 minutes
    const startTime = Date.now(); // Record the start time
    let triedChatMessage = [];
    // Promise to handle polling logic
    await new Promise((res) => {
      setTimeout(() => {
        res();
      }, 40000);
    });
    console.log('going')
    return new Promise((resolve, reject) => {
      const attemptFetch = async () => {
        if (Date.now() - startTime > maxDuration) {
          return reject(new Error("Maximum polling time exceeded"));
        }
  
        try {
          const response = await fetch(apiCall);
          let data = await response.json();
  
        
          if (data && data.length > 0) {
            const encodedMessageObj = data[0];
            // const resKeyPair = await getKeyPair();
            // const parsedData = resKeyPair;
            // const uint8PrivateKey = Base58.decode(parsedData.privateKey);
            // const uint8PublicKey = Base58.decode(parsedData.publicKey);
            // const keyPair = {
            //   privateKey: uint8PrivateKey,
            //   publicKey: uint8PublicKey,
            // };
  
            const decodedMessage = await testDecrypt(
              encodedMessageObj.data,
              encodedMessageObj.reference,
              senderPublicKey
            );
            resolve(decodedMessage)
            // const parsedMessage = JSON.parse(decodedMessage);
            // if (parsedMessage?.extra?.chatRequestSignature === signature) {
            //   resolve(parsedMessage);
            // } else {
            //   triedChatMessage.push(encodedMessageObj.signature);
            //   setTimeout(attemptFetch, retryDelay);
            //   retryDelay = Math.min(retryDelay * 2, 360000); // Ensure delay does not exceed 6 minutes
            // }
            // Resolve the promise when data is found
          } else {
            setTimeout(attemptFetch, retryDelay);
            retryDelay = Math.min(retryDelay * 2, 360000); // Ensure delay does not exceed 6 minutes
          }
        } catch (error) {
          reject(error); // Reject the promise on error
        }
      };
  
      attemptFetch(); // Initial call to start the polling
    });
  }

  const getAddressFromPublicKey = async (publicKey) => {
    try {
      const url = `/addresses/convert/${publicKey}`
      const res = await fetch(url)
      return await res.text()
    } catch (error) {
      
    }
  }
  const purchaseFunc = async  (product)=> {
    try {
    const price = product.price
    const sellerAddress = product.sellerAddress
    const purchaseBotAddress = await getAddressFromPublicKey(product?.publicKey)
    const response = await qortalRequest({
      action: "SEND_COIN",
      coin: 'QORT',
      recipient: sellerAddress,
      amount: +price,
    });
    console.log('response', response)
    if(response.success){
     const key = await pollForMessage(product.address, product.publicKey)
     console.log('key', key)
     getImage(atob(key))
     }
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
     {/* Seller side */}
     <button onClick={getProducts}>list products</button>
      {products?.map((product)=> {
        return (
          <Box>
            <Typography>{product?.productId}</Typography>
            <Spacer height="20px"/>
            <Typography>{product?.price}</Typography>
            <button onClick={()=>purchaseFunc(product)}>purchase</button>
            
            <button onClick={()=> {
              getImage()
            }}>Get and show Image</button>
            {image && (
              <img src={image} />
            )}
          </Box>
        )
      })}

      {/* Buyer side */}
    </div>
  );
};
