import { useState } from "react";
import "./container.css";

const Container = ({
  destinationAddress,
  setDestinationAddress,
  amount,
  setAmount,
  selectedCoin,
  setSelectedCoin,
  message,
  setMessage,
  messageReceiver,
  setMessageReceiver,
  children,
  name,
  setName,
  service,
  setService,
  base64,
  setBase64,
  identifier,
  setIdentifier,
  groupId,
  setGroupId
}) => {
  const [coinType] = useState(["QORT", "LTC", "DOGE", "RVN", "ARRR"]);

  return (
    <div className="wrapper">
      <div className="row">Send Coin</div>
      <input
        type="text"
        className="custom-input"
        placeholder="Destination Address"
        value={destinationAddress}
        onChange={(e) => {
          setDestinationAddress(e.target.value);
        }}
      />
      <input
        type="number"
        placeholder="QORT"
        className="custom-number-input"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <div className="row">Check for balance</div>
      <div className="coin-type-row">
        {coinType.map((coin, index) => {
          return (
            <div
              onClick={() => {
                setSelectedCoin(coin);
              }}
              style={{ backgroundColor: selectedCoin === coin && "#c940eb" }}
              className="coin"
              key={index}
            >
              {coin}
            </div>
          );
        })}
      </div>
      <div className="row">Send Message</div>
      <div className="message-row">
        <input
          type="text"
          className="custom-input"
          placeholder="Message Receiver Address"
          value={messageReceiver}
          onChange={(e) => {
            setMessageReceiver(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Message"
          className="custom-input"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
      </div>
      <div className="row">Publish</div>
      <div className="message-row">
        <input
          type="text"
          className="custom-input"
          placeholder="Your name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Service"
          className="custom-input"
          value={service}
          onChange={(e) => {
            setService(e.target.value);
          }}
        />
         <input
          type="text"
          placeholder="Service"
          className="custom-input"
          value={base64}
          onChange={(e) => {
            setBase64(e.target.value);
          }}
        />
         <input
          type="text"
          placeholder="Identifier"
          className="custom-input"
          value={identifier}
          onChange={(e) => {
            setIdentifier(e.target.value);
          }}
        />
      </div>
      <div className="row">Join Group</div>
      <div className="message-row">
        <input
          type="text"
          className="custom-input"
          placeholder="GroupId"
          value={groupId}
          onChange={(e) => {
            setGroupId(e.target.value);
          }}
        />
      </div>
      {children}
    </div>
  );
};

export default Container;
