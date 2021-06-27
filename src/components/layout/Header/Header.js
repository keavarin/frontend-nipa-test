import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { SelectContext } from "../../../contexts/selectedContextProvider";
import { ImageContext } from "../../../contexts/imageContextProvider";
import useStyles from "./useStyles";

function Header() {
  const classes = useStyles();
  const { show, setShow, setShowDrop, showDrop } = useContext(SelectContext);
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
  console.log("show", show);

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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Object Detection
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              setShow(true);
              onHandleClearImage();
            }}
          >
            Webcam Detection
          </Button>
          <Button
            color="inherit"
            onClick={() => {
              setShow(false);
              onHandleClearImage();
            }}
          >
            Upload picture Detection
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Header;
