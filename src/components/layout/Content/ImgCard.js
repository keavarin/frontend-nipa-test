import React, { useEffect, useState, useContext } from "react";
import { useDropzone } from "react-dropzone";

import { ImageContext } from "../../../contexts/imageContextProvider";
import { makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { CircularProgress, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { DropzoneArea } from "material-ui-dropzone";
import CardMedia from "@material-ui/core/CardMedia";
import DetectObject from "./DetectObject/DetectObject";
import Card from "@material-ui/core/Card";
import { CancelRounded } from "@material-ui/icons";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
const thumbsContainer = {
  display: "flex",
  marginTop: 16,
  justifyContent: "center",
};

const thumb = {
  display: "flex",
  borderRadius: 2,
  border: "2px solid #eaeaea",
  marginBottom: 8,
  marginRight: 8,
  width: "500px",
  height: "400px",
  padding: 4,
};

const img = {
  display: "block",
  width: "100%",
  height: "90%",
};

// const useStyles = makeStyles({
//   imgCard: {
//     maxWidth: 500,
//   },
// });

const useStyles = makeStyles((theme) => ({
  root: {
    display: "inline-block",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(2),
  },
  dropzone: {
    display: "flex",
    margin: theme.spacing(2),
    maxWidth: 500,
  },
  imgCard: {
    //margin: theme.spacing(2),
    maxWidth: 500,
    //height: 0,
    paddingTop: "10",
  },
  media: {
    height: 0,
    paddingTop: "10px", // 16:9
  },
  headCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

function ImgCard({ onHandleChangeImage }) {
  const classes = useStyles();
  console.log("onHandleChangeImage", onHandleChangeImage);
  // const [files, setFiles] = useState([]);
  // console.log("files@ImdCard", files);
  //const [isLoading, setIsLoading] = useState(false);
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

  console.log("detected_objects", detected_objects);
  console.log("resRawData", resRawData);
  console.log("respImage", respImage);
  console.log("preview", previewImage);
  const checkFile = bodyBase || headBase || detected_objects.length;
  console.log("checkFile", !!checkFile);
  const [showDrop, setShowDrop] = useState(true);

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
      {!checkFile ? (
        <div className={classes.dropzone}>
          <DropzoneArea
            acceptedFiles={["image/*"]}
            onChange={onHandleChangeImage}
            filesLimit={1}
            showPreviews={false}
          />
        </div>
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
    </div>
  );
}

export default ImgCard;
