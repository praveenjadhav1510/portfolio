import { useRef, useEffect, useState } from "react";
import "../App.css"; // Import your CSS styles

const ScrollFadeIn = ({ children, className = "" }) => {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`fade-in-section ${visible ? "visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
};

export default ScrollFadeIn;
