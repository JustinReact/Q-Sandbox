import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import Container from "./components/Container";

function App() {
  const [destinationAddress, setDestinationAddress] = useState("");
  const [amount, setAmount] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState("QORT");
  const [messageReceiver, setMessageReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [name, setName] = useState('')
  const [service, setService] = useState('')
  const [base64, setBase64] = useState('')
  const [identifier, setIdentifier] = useState('')
  const [groupId, setGroupId] = useState('')

  const buttonData = [
    {
      name: "Get address of logged in account",
      bgColor: "#279a27",
      onClick: async function getUserAccount() {
        try {
          let account = await qortalRequest({
            action: "GET_USER_ACCOUNT",
          });
          let address = account.address;
          console.log({ address });
        } catch (error) {
          console.error(error)
        }
        
      },
    },
    {
      name: "Publish QDN resource",
      bgColor: "#e957ec",
      onClick: async function publishQDNResource() {
        try {
          const resourceResponse = await qortalRequest({
            action: "PUBLISH_QDN_RESOURCE",
            name: name, // Publisher must own the registered name - use GET_ACCOUNT_NAMES for a list
            service: service,
            data64: base64,
            title: "Title",
            description: "Description",
            category: "TECHNOLOGY",
            tags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
            identifier: identifier
          });
          console.log({ resourceResponse });
        } catch (error) {
          console.error(error)
        }
        
      },
    },
    {
      name: "Get wallet balance (QORT)",
      bgColor: "#13ecff",
      onClick: async function getWalletBalance() {
        try {
          const QORTBalance = await qortalRequest({
            action: "GET_WALLET_BALANCE",
            coin: selectedCoin,
          });
          console.log({ selectedCoin });
          console.log({ QORTBalance });
        } catch (error) {
          console.error(error);
        }
      },
    },
   
    {
      name: "Send coin to address",
      bgColor: "#ea5252",
      onClick: async function sendCoinToAddress() {
        try {
          const response = await qortalRequest({
            action: "SEND_COIN",
            coin: "QORT",
            destinationAddress: destinationAddress,
            amount: amount, // 1 LTC
            fee: 20, // 0.00000020 LTC per byte
          });
          console.log({ response });
        } catch (error) {
          console.error(error);
        }
      },
    },
   
    {
      name: "Send a private chat message",
      bgColor: "#14ff6a",
      onClick: async function sendPrivateMsg() {
        try {
          const response = await qortalRequest({
            action: "SEND_CHAT_MESSAGE",
            destinationAddress: messageReceiver,
            message: message,
          });
          console.log({ response });
        } catch (error) {
          console.error(error);
        }
      },
    },
    {
      name: "Join Group",
      bgColor: "#ffff00",
      onClick: async function joinGroup() {
        try {
          const response = await qortalRequest({
            action: "JOIN_GROUP",
            groupId: groupId,
          });
          console.log({ response });
        } catch (error) {
          console.error(error)
        }
        
      },
    },
    {
      name: "Deploy an AT",
      bgColor: "#1613be",
      onClick: async function deployAT() {
        try {
          const response = await qortalRequest({
            action: "DEPLOY_AT",
            creationBytes: "12345",
            name: "test name",
            description: "test description",
            type: "test type",
            tags: "test tags",
            amount: 100000000, // 1 QORT
            assetId: 0,
            fee: 20000, // 0.0002 QORT
          });
          console.log({ response });
        } catch (error) {
          console.error(error)
        }
      
      },
    },
  ];

  return (
    <div className="container">
      <Container
        message={message}
        setMessage={setMessage}
        messageReceiver={messageReceiver}
        setMessageReceiver={setMessageReceiver}
        destinationAddress={destinationAddress}
        amount={amount}
        setDestinationAddress={setDestinationAddress}
        setAmount={setAmount}
        selectedCoin={selectedCoin}
        setSelectedCoin={setSelectedCoin}
        name={name}
        setName={setName}
        service={service}
        setService={setService}
        base64={base64}
        setBase64={setBase64}
        identifier={identifier}
        setIdentifier={setIdentifier}
        groupId={groupId}
        setGroupId={setGroupId}
      >
        {buttonData.map((button, index) => {
          return (
            <Button
              key={index}
              bgColor={button.bgColor}
              name={button.name}
              onClick={button.onClick}
            />
          );
        })}
      </Container>
    </div>
  );
}

export default App;
