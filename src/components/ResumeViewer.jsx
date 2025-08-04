import React from "react";
import "../css/resumeViewer.css";
import { Download, X } from "lucide-react";

const ResumeViewer = ({ resume, setResume }) => {
  return (
    <div
      className="resume-container"
      style={{ display: resume ? "flex" : "none" }}
    >
      <div className="resume">
        <iframe
          src={`${process.env.PUBLIC_URL}/praveenjadhav_resume.pdf`}
          className="resume-pdf"
          title="Praveen Resume"
        />
      </div>
      <div className="options">
        <span className="close" onClick={() => setResume(!resume)}>
          Close <X />
        </span>
        <a
          href={`${process.env.PUBLIC_URL}/praveenjadhav_resume.pdf`}
          download="Praveen_Jadhav_Resume.pdf"
          className="download-btn"
        >
          <Download /> Download Resume
        </a>
        <h4>PDF Link's</h4>
        GitHub:{" "}
        <a href="https://github.com/praveenjadhav1510">
          https://github.com/praveenjadhav1510
        </a>
        Linkedin:
        <a href="https://www.linkedin.com/in/praveen-jadhav-2880a6288/">
          https://www.linkedin.com/in/praveen-jadhav-2880a6288/
        </a>
        <h4>Contact</h4>
        Email:
        <span>praveenjadhav1510@gmail.com</span>
        <span>praveenjadhav1510@outlook.com</span>
        <a href="#contact" className="btn">
          <div
            className="download-btn"
            onClick={() => {
              setResume(!resume);
            }}
          >
            contact
          </div>
        </a>
      </div>
    </div>
  );
};

export default ResumeViewer;
