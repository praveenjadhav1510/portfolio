import "./App.css";
import Praveenjadhav from "./components/Praveenjadhav";
import HomeContent from "./components/HomeContent";
import ScrollFadeIn from "./components/ScrollFadeIn";
import ResumeViewer from "./components/ResumeViewer";
import Contact from "./components/Contact";
import { useState } from "react";
function App() {
  const [resume, setResume] = useState(false);
  return (
    <div className="App">
      <div className="homePage scroll-page" id="home">
        <HomeContent resume={resume} setResume={setResume} />
        <Praveenjadhav />
      </div>
      <div className="emptyPage scroll-page page2" id="page">
        <div>
          <ScrollFadeIn>
            <h1>Fade In on Scroll page 2</h1>
          </ScrollFadeIn>
          <ScrollFadeIn>
            <p>This paragraph slides up and fades in.</p>
          </ScrollFadeIn>
          <ScrollFadeIn>
            <div>Another animated block</div>
          </ScrollFadeIn>
        </div>
      </div>
      <div className="emptyPage scroll-page page4" id="about">
        About
      </div>
      <div className="emptyPage scroll-page page3" id="project">
        Project
      </div>
      <div className="emptyPage scroll-page page5" id="contact">
        <Contact />
      </div>
      <ResumeViewer resume={resume} setResume={setResume} />
    </div>
  );
}

export default App;
