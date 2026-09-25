import { useEffect, useState } from "react";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    let ws;
    let reconnectTimer;

    const connect = () => {
      ws = new WebSocket("wss://example.com/socket");

      ws.onopen = () => {
        console.log("Connected");
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);

        setMessages((prev) => [...prev, data]);
      };

      ws.onclose = () => {
        console.log("Disconnected");

        reconnectTimer = setTimeout(() => {
          connect();
        }, 3000);
      };

      ws.onerror = () => {
        ws.close();
      };
    };

    connect();

    return () => {
      clearTimeout(reconnectTimer);
      ws?.close();
    };
  }, []);

  const sendMessage = () => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(
        JSON.stringify({
          type: "MESSAGE",
          message: "Hello",
        }),
      );
    }
  };

  return (
    <div>
      <button onClick={sendMessage}>Send Message</button>

      {messages.map((message, index) => (
        <div key={index}>{message.message}</div>
      ))}
    </div>
  );
}
