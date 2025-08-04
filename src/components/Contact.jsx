import React, { useState } from "react";
import "../css/contact.css";
import { AtSign, Eraser } from "lucide-react";

export default function Contact() {
  const [email, setEmail] = useState("gmail");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const recipient = `praveenjadhav1510@${email}.com`;

  const handleSend = () => {
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      recipient
    )}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;

    window.open(gmailLink, "_blank");
  };

  const handleClear = () => {
    setSubject("");
    setMessage("");
  };

  return (
    <div className="contact-container">
      <div className="info"></div>
      <div className="emailBox">
        <h1>Email Me!</h1>
        <div className="email">
          <span>To:</span>
          <span>{recipient}</span>
          <span
            className="change-email"
            onClick={() => {
              setEmail(email === "gmail" ? "outlook" : "gmail");
            }}
          >
            <AtSign />
            {email}
          </span>
        </div>
        <div className="email">
          <span>Subject:</span>
          <input
            type="text"
            placeholder="Enter subject here..."
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <textarea
          placeholder="Please enter your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <div className="email">
          <span className="change-email" onClick={handleClear}>
            <Eraser />
          </span>
          <button className="send-btn" onClick={handleSend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
