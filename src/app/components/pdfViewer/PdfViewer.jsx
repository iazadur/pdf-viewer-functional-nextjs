"use client";
import React, { useEffect, useState } from "react";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const PdfViewer = () => {
  const [viewPdf, setViewPdf] = useState(null);

  console.log(viewPdf);

  useEffect(() => {
    // Fetch the PDF file as a Blob or a File
    fetch('/demo.pdf')
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = (e) => {
          setViewPdf(e.target.result);
        };
      })
      .catch((error) => {
        console.error("Error fetching PDF:", error);
      });
  }, []);


  // The commented code in below for when need file input by user and show in pdf viewer then wil be use this code.

  // const fileType = ["application/pdf"];
  // const handleChange = (e) => {
  //   const selectedFile = e.target.files[0];
  //   console.log(selectedFile)
  //   if (selectedFile) {
  //     if (selectedFile && fileType.includes(selectedFile.type)) {
  //       let reader = new FileReader();
  //       reader.readAsDataURL(selectedFile);
  //       reader.onloadend = (e) => {
  //         setPdfFile(e.target.result);
  //       };
  //     } else {
  //       setPdfFile(null);
  //     }
  //   } else {
  //     console.log("Please select a pdf file");
  //   }
  // };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   if (pdfFile !== null) {
  //     setViewPdf(pdfFile);
  //   } else {
  //     setViewPdf(null);
  //   }
  // };

  const newPlugin = defaultLayoutPlugin();
  return (
    <div className="text-center">
      {/* this viewer only show in desktop mode */}
      <div className={` w-full mx-auto h-screen hidden md:block`}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          {
            viewPdf && <>
              <Viewer fileUrl={viewPdf} plugins={[newPlugin]} theme="dark" defaultScale={1} />
            </>
          }
        </Worker>
      </div>
      {/* this viewer only show in mobile mode */}
      <div className={`w-full mx-auto h-screen md:hidden`}>
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
          {
            viewPdf && <>
              <Viewer fileUrl={viewPdf} plugins={[newPlugin]} theme="dark" defaultScale={0.4} />
            </>
          }
        </Worker>
      </div>
    </div>
  );
};

export default PdfViewer;
