import React, { useEffect, useState, useContext } from "react";
import { useDropzone } from "react-dropzone";
import nvision from "@nipacloud/nvision/dist/browser/nvision";
import { getDataBlob } from "../../../../services/convertImg";
import { ImageContext } from "../../../../contexts/imageContextProvider";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { CircularProgress, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import ImgCard from "../ImgCard";
import { convertFileToBase64 } from "../../../../services/convertImg";
//import DetectObject from "./DetectObject/DetectObject";

const objectDetectionService = nvision.objectDetection({
  apiKey: process.env.REACT_APP_API_KEY,
});

//console.log("objectDetectionService", objectDetectionService);

function DetectObject() {
  // const [files, setFiles] = useState([]);
  const {
    headBase,
    setHeadBase,
    bodyBase,
    setBodyBase,
    detected_objects,
    setDetected_objects,
    resRawData,
    setResRawData,
    previewImage,
    setPreviewImage,
    setRespImage,
    respImage,
    setIsLoading,
  } = useContext(ImageContext);

  // const [ headBase, setFiles] = useState([]);
  console.log(" 1headBase", headBase);
  console.log("1PreviewImg", previewImage);
  console.log("resRawData", resRawData);
  const previewImg = [headBase, bodyBase].join(",");
  setPreviewImage(previewImg);

  console.log("previewImage", previewImage);
  const respImg = [headBase, resRawData].join(",");
  setRespImage(respImg);
  console.log("respImg", respImage);
  // const { getRootProps, getInputProps } = useDropzone({
  //   accept: "image/*",
  //   onDrop: (acceptedFiles) => {
  //     setFiles(acceptedFiles.map((file) => file));
  //   },
  // });

  async function onHandleChangeImage(files) {
    console.log("files", files[0]);
    // if (files.length)
    files.map(async (file) => {
      const base64 = await convertFileToBase64(file);
      console.log("base64", base64);

      const newBase = base64.split(",");
      console.log("newBase", newBase[0]);
      setBodyBase(newBase[1]);
      setHeadBase(newBase[0]);
      console.log("headBase", headBase);

      await detectObject(newBase[1]);
      //
    });
  }

  async function detectObject(bodyBase64) {
    console.log("bodyBase64", bodyBase64);

    try {
      const result = await objectDetectionService.predict({
        rawData: `${bodyBase64}`,
        outputCroppedImage: true,
        outputVisualizedImage: true,
      });

      console.log("result", result);
      setIsLoading(true);
      setDetected_objects(result.detected_objects);
      setResRawData(result.raw_data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {/* <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div> */}

      <ImgCard
        onHandleChangeImage={onHandleChangeImage}
        // imageSrc={resRawData}
      />
    </>
  );
}
export default DetectObject;
