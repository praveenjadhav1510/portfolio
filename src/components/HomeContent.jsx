import React from "react";
import "../css/home.css";
import ScrollFadeIn from "./ScrollFadeIn";
import Menu from "./Menu";
import { ArrowDownRight, File, FolderGit2, Phone, User } from "lucide-react";
export default function HomeContent({ resume, setResume }) {
  return (
    <div id="home">
      <Menu resume={resume} setResume={setResume} />
      <div className="navbar">
        <ScrollFadeIn>
          <div className="title">
            Full Stack Developer & Designer{" "}
            <ArrowDownRight className="icon" size={40} />
          </div>
        </ScrollFadeIn>
        <div className="navlinks">
          <ScrollFadeIn>
            <a href="#about">
              About <User />
            </a>
          </ScrollFadeIn>
          <ScrollFadeIn>
            <a href="#project">
              Projects <FolderGit2 />
            </a>
          </ScrollFadeIn>
          <ScrollFadeIn>
            <a
              onClick={() => {
                setResume(!resume);
              }}
            >
              Resume <File />
            </a>
          </ScrollFadeIn>
          <ScrollFadeIn>
            <a href="/#contact">
              Contact <Phone />
            </a>
          </ScrollFadeIn>
        </div>
      </div>
      <div className="name">
        <div>praveenjadhav</div>
        <div>
          Building intuitive experiences using logic, design & a little bit of
          chaos.
        </div>
      </div>
    </div>
  );
}
