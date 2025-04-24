import { objectToBase64 } from "./objectToBase64";

export function fileToBase64(file: File) {
  // Step 1: Read the file contents
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        // Step 2: Parse the file contents as JSON
        const obj = JSON.parse(reader.result as string);
        // Step 3: Use your existing function to convert the object to base64
        objectToBase64(obj).then(resolve).catch(reject);
      } catch (error) {
        reject(new Error('Failed to parse JSON file'));
      }
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsText(file);
  });
}