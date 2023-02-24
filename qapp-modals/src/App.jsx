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

  const buttonData = [
    {
      name: "Get address of logged in account",
      bgColor: "#279a27",
      onClick: async function getUserAccount() {
        let account = await qortalRequest({
          action: "GET_USER_ACCOUNT",
        });
        let address = account.address;
        console.log({ address });
      },
    },
    // {
    //   name: "Get public key of logged in account",
    //   bgColor: "#e3bc21",
    //   onClick: async function getPubKey() {
    //     let pubkey = await qortalRequest({
    //       action: "GET_USER_ACCOUNT",
    //     });
    //     let publicKey = account.publicKey;
    //     console.log({ publicKey });
    //   },
    // },
    {
      name: "Publish QDN resource",
      bgColor: "#e957ec",
      onClick: async function publishQDNResource() {
        const resourceResponse = await qortalRequest({
          action: "PUBLISH_QDN_RESOURCE",
          name: "Demo", // Publisher must own the registered name - use GET_ACCOUNT_NAMES for a list
          service: "WEBSITE",
          data64: "base64_encoded_data",
          title: "Title",
          description: "Description",
          category: "TECHNOLOGY",
          tags: ["tag1", "tag2", "tag3", "tag4", "tag5"],
        });
        console.log({ resourceResponse });
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
    // {
    //   name: "Get wallet balance (foreign coin)",
    //   bgColor: "#9d52f3",
    //   onClick: async function getWalletBalanceLTC() {
    //     const LCBalance = await qortalRequest({
    //       action: "GET_WALLET_BALANCE",
    //       coin: "LTC",
    //     });
    //     console.log({ LCBalance });
    //   },
    // },
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
    // {
    //   name: "Send coin to address (LTC)",
    //   bgColor: "#6552f3",
    //   onClick: async function sendCoinToAddressLTC() {
    //     const response = await qortalRequest({
    //       action: "SEND_COIN",
    //       coin: "QORT",
    //       destinationAddress: "QZLJV7wbaFyxaoZQsjm6rb9MWMiDzWsqM2",
    //       amount: 100000000, // 1 QORT
    //       fee: 10000, // 0.0001 QORT
    //     });
    //     console.log({ response });
    //   },
    // },
    // {
    //   name: "Send a group chat message",
    //   bgColor: "#52d1ea",
    //   onClick: async function sendGroupMsg() {
    //     const response = await qortalRequest({
    //       action: "SEND_CHAT_MESSAGE",
    //       groupId: 0,
    //       message: "Test",
    //     });
    //     console.log({ response });
    //   },
    // },
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
        const response = await qortalRequest({
          action: "JOIN_GROUP",
          groupId: 100,
        });
        console.log({ response });
      },
    },
    {
      name: "Deploy an AT",
      bgColor: "#1613be",
      onClick: async function deployAT() {
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
