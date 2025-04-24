import React, { useState } from "react";
import "./App.css";
import "./components/container.css";
import Button from "./components/Button";
import { BLOG_BASE, NEWS_BASE } from "./constants/Identifiers";
import ShortUniqueId from "short-unique-id";
import { fileToBase64 } from "./utils/fileToBase64";

const uid = new ShortUniqueId();

const App = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile && selectedFile.type === "application/json") {
      setFile(selectedFile);
      console.log("Selected file:", selectedFile);
    } else {
      console.error("Please upload a valid JSON file");
    }
  };

  const publishBlog = async () => {
    const id = uid.randomUUID(10);
    const identifier = `${BLOG_BASE}-${id}`;

    if (file && file.type === "application/json") {
      try {
        console.log("File:", file);
        const blogToBase64 = await fileToBase64(file);
        
        const resourceResponse = await qortalRequest({
          action: "PUBLISH_QDN_RESOURCE",
          name: "Bester",
          service: "BLOG",
          data64: blogToBase64,
          filename: "blog.json",
          identifier: identifier,
        });

        console.log("Blog resource response:", resourceResponse);
        return resourceResponse;
      } catch (error) {
        console.error("Error converting JSON to base64", error);
      }
    } else {
      console.error("Please upload a valid JSON file");
    }
  };

  const publishNews = async () => {
    const id = uid.randomUUID(10);
    const identifier = `${NEWS_BASE}-${id}`;

    if (file && file.type === "application/json") {
      try {
        console.log("File:", file);
        const blogToBase64 = await fileToBase64(file);
        
        const resourceResponse = await qortalRequest({
          action: "PUBLISH_QDN_RESOURCE",
          name: "Bester",
          service: "DOCUMENT",
          data64: blogToBase64,
          filename: "news.json",
          identifier: identifier,
        });

        console.log("News resource response:", resourceResponse);
        return resourceResponse;
      } catch (error) {
        console.error("Error converting JSON to base64", error);
      }
    } else {
      console.error("Please upload a valid JSON file");
    }
  };

  return (
    <div className="container">
      <div className="wrapper">
        <div className="main-row">
          <div className="card">
            <div className="row">Publish Blog to QDN</div>
            <input
              type="file"
              accept=".json"
              className="custom-input"
              placeholder="Insert JSON file"
              onChange={handleFileChange}
            />
            <Button
              bgColor={"#00eb91"}
              onClick={publishBlog}
              name={"Publish Blog"}
            />
          </div>
          <div className="card">
            <div className="row">Publish News Announcement to QDN</div>
            <input
              type="file"
              accept=".json"
              className="custom-input"
              placeholder="Insert JSON file"
              onChange={handleFileChange}
            />
            <Button
              bgColor={"#00eb91"}
              onClick={publishNews}
              name={"Publish News Post"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
