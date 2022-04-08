import React, { useState } from "react";
import { Worker } from "@react-pdf-viewer/core";
import "./style.scss";
// Import the main component
import { Viewer } from "@react-pdf-viewer/core";
// Import the styles
import "@react-pdf-viewer/core/lib/styles/index.css";
// default layout plugin
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
// Import styles
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

function Pdf() {
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfError, setPdfError] = useState("");

  // Create new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  // handke onChangeFile
  const allowedFile = ["application/pdf"];
  const handleFile = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && allowedFile.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfError("");
          setPdfFile(e.target.result);
          console.log(e.target.result);
        };
      } else {
        setPdfError("Not a valid pdf: Please select only PDF");
      }
    } else {
      console.log("Please select a PDF");
    }
  };
  return (
    <>
      <form className="view-pdf">
        <label htmlFor="pdf">Chọn file pdf</label>
        <input type="file" name="pdf" id="pdf" onChange={handleFile} />
        {pdfError && <span className="text-danger"></span>}
      </form>
      <div className="viewer">
        {pdfFile && (
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.13.216/build/pdf.worker.min.js">
            <Viewer
              fileUrl={pdfFile}
              plugins={[defaultLayoutPluginInstance]}
            ></Viewer>
          </Worker>
        )}

        {!pdfFile && <>No file is selected yet </>}
      </div>
    </>
  );
}

export default Pdf;
