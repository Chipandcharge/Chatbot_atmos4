import React, { useState} from "react";
import v4 from "uuid";
import axios from "axios";


import "./styles.css";

export default function App() {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({
    _id: "",
    position: "",
    text: "",
    date: ""
  });

  const [dbSession, setDbSession] = useState(false)


  function loginToDatabase() {

    var data = {"name": "amdin", "password": "password"}
    var config_session = {"headers": {"Accept": "application/json", "Content-Type": "application/json"}};
    var message_json = JSON.stringify(message)

    if (!dbSession) {
      axios
        .post('http://elchradio.selfhost.eu:5003/_session',data, config_session)
        .then((response) => {
          console.log("user authenticated")
          setDbSession(true)
        })
        .then((res) => putToDatabase(message_json))
        .catch((err) => {
          console.log(err)
        })
    } else {
      putToDatabase(message_json)
    }
  }

  function putToDatabase(doc) {

    var config_put = {"headers": {"Accept": "application/json", "Content-Type": "application/json"}};
    var path_put = 'http://@elchradio.selfhost.eu:5003/chats/' + message._id
    console.log(path_put)

    axios
      .put(path_put, doc, config_put)
      .then((response) => {
        console.log(response)
      })
      .catch((err) => {
        console.log(err)
      })

  }

  function handleChange(e) {
    setMessage({
      _id: v4(),
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

    loginToDatabase()

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
                        <div className="time" >
                          {message_single.date.toString()}
                        </div>
                        <div className="message user" >
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
