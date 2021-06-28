import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from "react";

import nvision from "@nipacloud/nvision/dist/browser/nvision";
import { ImageContext } from "../../../../contexts/imageContextProvider";
import { SelectContext } from "../../../../contexts/selectedContextProvider";
import ImgCard from "../ImgCard";
import { convertFileToBase64 } from "../../../../services/convertImg";
import VdoCard from "../VdoCard";

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
  const { show, setShow } = useContext(SelectContext);
  const webRef = useRef(null);
  // const [ headBase, setFiles] = useState([]);
  // console.log(" 1headBase", headBase);
  // console.log("1PreviewImg", previewImage);
  // console.log("resRawData", resRawData);
  const previewImg = [headBase, bodyBase].join(",");
  setPreviewImage(previewImg);

  // console.log("previewImage", previewImage);
  const respImg = [headBase, resRawData].join(",");
  setRespImage(respImg);
  // console.log("respImg", respImage);

  async function onHandleChangeImage(files) {
    console.log("files", files[0]);
    // if (files.length)
    files.map(async (file) => {
      const base64 = await convertFileToBase64(file);
      console.log("base64", base64);

      const newBase = base64?.split(",");
      // console.log("newBase", newBase[0]);
      setBodyBase(newBase[1]);
      setHeadBase(newBase[0]);
      // console.log("headBase", headBase);

      await detectObject(newBase[1]);
      //
    });
  }
  const capture = useCallback(async () => {
    const imageSrc = webRef.current.getScreenshot();
    // console.log("imageSrc", imageSrc);

    const newBase = imageSrc?.split(",");
    // console.log("newBase", newBase);
    setBodyBase(newBase[1]);
    setHeadBase(newBase[0]);
    // console.log("headBase", headBase);

    await detectObject(newBase[1]);
  }, [webRef]);

  async function detectObject(bodyBase64) {
    // console.log("bodyBase64", bodyBase64);

    try {
      const result = await objectDetectionService.predict({
        rawData: `${bodyBase64}`,
        outputCroppedImage: true,
        outputVisualizedImage: true,
      });

      // console.log("result", result);
      setIsLoading(true);
      setDetected_objects(result.detected_objects);
      setResRawData(result.raw_data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <ImgCard
        onHandleChangeImage={onHandleChangeImage}
        webRef={webRef}
        capture={capture}
      />
    </>
  );
}
export default DetectObject;
