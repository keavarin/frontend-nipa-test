import React, { useEffect, useState, useContext } from "react";
import { ImageContext } from "../../../contexts/imageContextProvider";
import { SelectContext } from "../../../contexts/selectedContextProvider";
import { CircularProgress, Button } from "@material-ui/core";
import { DropzoneArea } from "material-ui-dropzone";
import { CardMedia, Card, CardHeader } from "@material-ui/core/";
import { CancelRounded } from "@material-ui/icons";
import useStyles from "./useStyleImgCard";
import VdoCard from "./VdoCard";

function ImgCard({ onHandleChangeImage, webRef, capture }) {
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

  const { show, setShow } = useContext(SelectContext);

  // console.log("detected_objects", detected_objects);
  // console.log("resRawData", resRawData);
  // console.log("respImage", respImage);
  // console.log("preview", previewImage);

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

  // console.log("acceptedFiles", acceptedFiles);
  return (
    <div className={classes.root}>
      {headBase === null ? (
        show ? (
          <VdoCard webRef={webRef} capture={capture} />
        ) : (
          <>
            <h2>Upload image detection</h2>
            <div className={classes.dropzone}>
              <DropzoneArea
                acceptedFiles={["image/*"]}
                onChange={onHandleChangeImage}
                filesLimit={1}
                showPreviews={false}
              />
            </div>
          </>
        )
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
              src={detected_objects?.length ? respImage : previewImage}
              title="image"
            />
          </Card>
        </div>
      )}
    </div>
  );
}

export default ImgCard;
