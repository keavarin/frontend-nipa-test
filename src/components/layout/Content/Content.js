import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextareaAutosize,
  CircularProgress,
  Box,
} from "@material-ui/core";

import { ImageContext } from "../../../contexts/imageContextProvider";
import DetectObject from "./DetectObject/DetectObject";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "5px solid pink",
    margin: "20px",
  },

  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  card_container: {
    padding: "10px",
    backgroundColor: "pink",
  },
}));
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
                      style={{ width: "30%", fontSize: "16px" }}
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
