import React, { useState } from "react";
import v4 from "uuid";

import "./styles.css";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({
    id: "",
    position: "",
    text: "",
    date: ""
  });

  function handleChange(e) {
    setMessage({
      id: v4(),
      position: "right",
      text: e.target.value,
      date: Date(Date.now())
    });
  }

  function saveMessage(e) {
    var all_messages = [...messages];
    console.log(all_messages);
    all_messages.push(message);
    setMessages(all_messages);
    setMessage({ text: "" });
    e.preventDefault();
  }

  return (
    <div className="App">
      <div className="jumbotron">
        <div className="card">
          <div className="card-header">Atmos4</div>
          <div className="card-body">
            <div className="chat">
              <div className="messages" id="chat">
                {messages.map(function(message_single) {
                  if (message_single.position === "right") {
                    return (
                      <>
                        <div className="time">
                          {message_single.date.toString()}
                        </div>
                        <div className="message user">
                          {message_single.text}
                        </div>
                      </>
                    );
                  } else {
                    return (
                      <>
                        <div className="time">
                          {message_single.date.toString()}
                        </div>
                        <div className="message">{message_single.text}</div>
                      </>
                    );
                  }
                })}
              </div>
            </div>
          </div>
          <div className="card-footer">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="message-input"
                onChange={handleChange}
                autoFocus="1"
                placeholder="Write a message ..."
                value={message.text}
                aria-label="Write a message"
                aria-describedby="button-addon2"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-success"
                  type="button"
                  id="button-addon2"
                  onClick={saveMessage}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
