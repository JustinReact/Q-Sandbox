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
            creationBytes: "1Pub6o13xyqfCZj8BMzmXsREVJR6h4xxpS2VPV1R2QwjP78r2ozxsNuvb28GWrT8FoTTQMGnVP7pNii6auUqYr2uunWfcxwhERbDgFdsJqtrJMpQNGB9GerAXYyiFiij35cP6eHw7BmALb3viT6VzqaXX9YB25iztekV5cTreJg7o2hRpFc9Rv8Z9dFXcD1Mm4WCaMaknUgchDi7qDnHA7JX8bn9EFD4WMG5nZHMsrmeqBHirURXr2dMxFprTBo187zztmw73hxJNfGz5jrnqtHkk9j4zmcSZnoMznPZnDyi8DCDhijBfZkgXx2wirepKEgK1aZh7uLhdeBRqvZsinhZamwtY49UJZ3rVVjrrQXnTk4dTKXpjUBzqAsvmSmxP81KJgQGTBJrYLbsbE2JT9q",
            name: "test name",
            description: "test description",
            type: "test type",
            tags: "test tags",
            amount: 0.01,
            assetId: 0
          });
          console.log({ response });
        } catch (error) {
          console.error(error)
        }

      },
    },
    {
      name: "Open a new tab",
      bgColor: "#08b45e",
      onClick: async function openNewTab() {
        try {
          const response = await qortalRequest({
            action: "OPEN_NEW_TAB",
            qortalLink: 'qortal://APP/Ear-Bump/liked',
          });
          console.log({ response });
        } catch (error) {
          console.error(error)
        }

      },
    },
    {
      name: "Get Permission for Notifications from User",
      bgColor: "#d12203",
      onClick: async function openNewTab() {
        try {
          const response = await qortalRequest({
            action: 'NOTIFICATIONS_PERMISSION',
          })
          console.log({ response });
        } catch (error) {
          console.error(error)
        }

      },
    },
    {
      name: "Send local notification",
      bgColor: "#5308b4",
      onClick: async function openNewTab() {
        try {
          const response = await qortalRequest({
            action: 'SEND_LOCAL_NOTIFICATION',
            qortalLink: 'qortal://APP/Ear-Bump/liked',
            title: 'hello testing',
            url: "qortal://APP/Q-Blog",
            message: 'this is the body message',
            icon: "data:image/gif;base64,R0lGODlhPQBEAPeoAJosM//AwO/AwHVYZ/z595kzAP/s7P+goOXMv8+fhw/v739/f+8PD98fH/8mJl+fn/9ZWb8/PzWlwv///6wWGbImAPgTEMImIN9gUFCEm/gDALULDN8PAD6atYdCTX9gUNKlj8wZAKUsAOzZz+UMAOsJAP/Z2ccMDA8PD/95eX5NWvsJCOVNQPtfX/8zM8+QePLl38MGBr8JCP+zs9myn/8GBqwpAP/GxgwJCPny78lzYLgjAJ8vAP9fX/+MjMUcAN8zM/9wcM8ZGcATEL+QePdZWf/29uc/P9cmJu9MTDImIN+/r7+/vz8/P8VNQGNugV8AAF9fX8swMNgTAFlDOICAgPNSUnNWSMQ5MBAQEJE3QPIGAM9AQMqGcG9vb6MhJsEdGM8vLx8fH98AANIWAMuQeL8fABkTEPPQ0OM5OSYdGFl5jo+Pj/+pqcsTE78wMFNGQLYmID4dGPvd3UBAQJmTkP+8vH9QUK+vr8ZWSHpzcJMmILdwcLOGcHRQUHxwcK9PT9DQ0O/v70w5MLypoG8wKOuwsP/g4P/Q0IcwKEswKMl8aJ9fX2xjdOtGRs/Pz+Dg4GImIP8gIH0....."
          })
          console.log({ response });
        } catch (error) {
          console.error(error)
        }

      },
    },
    {
      name: "Create a poll",
      bgColor: "#b40880",
      onClick: async function createNewPoll() {
        try {
          await qortalRequest({
            action: "CREATE_POLL",
            pollName: "A test poll 5",
            pollDescription: "Test description",
            pollOptions: ['option1, option2, option3'],
            pollOwnerAddress: 'QbpZL12Lh7K2y6xPZure4pix5jH6ViVrF2'
          });
          console.log({ response });
        } catch (error) {
          console.error(error)
        }
      },
    },
    {
      name: "Vote on poll",
      bgColor: "#309ed1",
      onClick: async function voteOnPoll() {
        try {
          await qortalRequest({
            action: "VOTE_ON_POLL",
            pollName: "A test poll 3",
            optionIndex: 1,
          });
          console.log({ response });
        } catch (error) {
          console.error(error)
        }
      },
    },
    {
      name: "DEPLOY AT",
      bgColor: "#ff5100",
      onClick: async function deployAT() {
        try {
          await qortalRequest({
            action: "VOTE_ON_POLL",
            pollName: "A test poll 3",
            optionIndex: 1,
          });
          console.log({ response });
        } catch (error) {
          console.error(error)
        }
      },
    }
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
