import React, { useContext, useState } from "react";
import { Card, CardContent, TextareaAutosize } from "@material-ui/core";
import { ImageContext } from "../../../contexts/imageContextProvider";
import DetectObject from "./DetectObject/DetectObject";
import useStyles from "./useStyleContent";

function Content() {
  const classes = useStyles();
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
    isLoading,
    setIsLoading,
  } = useContext(ImageContext);

  // const [isLoading, setIsLoading] = useState(false);
  console.log("detected_objects", detected_objects);

  const showObject = detected_objects.filter((i) => delete i.cropped_image);
  console.log("showObject", showObject);

  return (
    <div>
      <DetectObject />
      {isLoading && (
        <>
          {detected_objects?.length ? (
            <div>
              <Card className={classes.root}>
                <CardContent className={classes.card_container}>
                  {showObject.map((i) => (
                    <TextareaAutosize
                      disabled
                      rowsMin={10}
                      style={{ width: "80%", fontSize: "16px", margin: "2px" }}
                    >
                      {JSON.stringify(i, null, 4)}
                    </TextareaAutosize>
                  ))}
                </CardContent>
              </Card>
            </div>
          ) : null}
        </>
      )}
    </div>
  );
}
export default Content;
