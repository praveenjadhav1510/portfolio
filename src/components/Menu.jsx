import React from "react";
import "../css/home.css";
import { File, FolderGit2, Github, Home, Phone, User } from "lucide-react";

export default function Menu({ resume, setResume }) {
  return (
    <div className="menuBar">
      <div className="menuButtons">
        <a href="#home">
          <div className="item">
            <Home />
          </div>
        </a>
        <a href="#about">
          <div className="item">
            <User />
          </div>
        </a>
        <a href="#project">
          <div className="item">
            <FolderGit2 />
          </div>
        </a>
        <a href="#contact">
          <div className="item">
            <Phone />
          </div>
        </a>
        <div
          className="item"
          onClick={() => {
            window.open("https://github.com/praveenjadhav1510", "_blank");
          }}
        >
          <Github />
        </div>
        <div
          className="item"
          onClick={() => {
            setResume(!resume);
          }}
        >
          <File />
        </div>
      </div>
    </div>
  );
}
