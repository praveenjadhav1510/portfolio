import { useEffect, useRef } from "react";

const Praveenjadhav = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!window.UnicornStudio) {
      const script = document.createElement("script");
      script.src =
        "httpss://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
      script.async = true;
      script.onload = () => {
        if (!window.UnicornStudio.isInitialized) {
          window.UnicornStudio.init();
          window.UnicornStudio.isInitialized = true;
        }
      };
      document.body.appendChild(script);
    } else if (!window.UnicornStudio.isInitialized) {
      window.UnicornStudio.init();
      window.UnicornStudio.isInitialized = true;
    }
  }, []);

  return (
    <div className="hideWaterMark">
      <div
        className="unicorn-studio-embed"
        ref={containerRef}
        data-us-project="kDNcnxtMg0GCDO1yHHbk"
        // data-us-project="PbPT2bcC1LNGpPbile6v"
        // data-us-project="gVAkUu5MxfRpo5N4JZ8N"
      ></div>
    </div>
  );
};

export default Praveenjadhav;
