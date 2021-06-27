import React, { useEffect, useState, useContext } from "react";
import { SelectContext } from "../../../contexts/selectedContextProvider";
import { ImageContext } from "../../../contexts/imageContextProvider";
import Button from "@material-ui/core/Button";
import Webcam from "react-webcam";
import useStyles from "./useStyleImgCard";
import { CardMedia, Card, CardHeader } from "@material-ui/core/";
import { CancelRounded } from "@material-ui/icons";
import { CircularProgress } from "@material-ui/core";

function VdoCard({ webRef, capture }) {
  const { setShowDrop, showDrop } = useContext(SelectContext);
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

  const checkFile = bodyBase || headBase || detected_objects.length;

  const onHandleClearImage = () => {
    setHeadBase(null);
    setBodyBase(null);
    setRespImage(null);
    setResRawData(null);
    setPreviewImage(null);
    setDetected_objects([]);
    setIsLoading(false);
    //setShowDrop(false);
  };
  const onHandleClick = () => {
    capture();
  };
  return (
    <>
      {!checkFile ? (
        <>
          <p>WebCam detected</p>
          <Webcam ref={webRef} screenshotFormat="image/jpeg" />
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onHandleClick()}
            >
              Screenshot
            </Button>
          </div>
        </>
      ) : (
        <div>
          <Card className={classes.root}>
            <div className={classes.headCard}>
              <CardHeader
                subheader={isLoading ? "Upload completed" : "Uploading..."}
              />
              {isLoading ? (
                <CancelRounded
                  button
                  cursor="pointer"
                  onClick={() => onHandleClearImage()}
                />
              ) : (
                <CircularProgress />
              )}
            </div>
            <CardMedia
              className={classes.imgCard}
              component="img"
              alt="image"
              src={detected_objects.length ? respImage : previewImage}
              title="image"
            />
          </Card>
        </div>
      )}
    </>
  );
}

export default VdoCard;
