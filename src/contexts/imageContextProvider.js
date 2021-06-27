import { useState, createContext, useEffect } from "react";

export const ImageContext = createContext();

function ImageContextProvider({ children }) {
  const [bodyBase, setBodyBase] = useState(null);
  const [headBase, setHeadBase] = useState(null);
  const [resRawData, setResRawData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [respImage, setRespImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [detected_objects, setDetected_objects] = useState([]);

  return (
    <ImageContext.Provider
      value={{
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
        respImage,
        setRespImage,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </ImageContext.Provider>
  );
}
export default ImageContextProvider;
