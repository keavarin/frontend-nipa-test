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

const objectDetectionService = nvision.objectDetection({
  apiKey: process.env.REACT_APP_API_KEY,
});

function DetectObject() {
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

  const previewImg = [headBase, bodyBase].join(",");
  setPreviewImage(previewImg);

  const respImg = [headBase, resRawData].join(",");
  setRespImage(respImg);

  async function onHandleChangeImage(files) {
    console.log("files", files[0]);

    files.map(async (file) => {
      const base64 = await convertFileToBase64(file);
      console.log("base64", base64);

      const newBase = base64?.split(",");

      setBodyBase(newBase[1]);
      setHeadBase(newBase[0]);

      await detectObject(newBase[1]);
    });
  }
  const capture = useCallback(async () => {
    const imageSrc = webRef.current.getScreenshot();

    const newBase = imageSrc?.split(",");

    setBodyBase(newBase[1]);
    setHeadBase(newBase[0]);

    await detectObject(newBase[1]);
  }, [webRef]);

  async function detectObject(bodyBase64) {
    try {
      const result = await objectDetectionService.predict({
        rawData: `${bodyBase64}`,
        outputCroppedImage: true,
        outputVisualizedImage: true,
      });

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
