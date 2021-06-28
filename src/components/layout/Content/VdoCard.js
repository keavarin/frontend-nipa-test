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
  const onHandleClick = () => {
    capture();
  };
  return (
    <>
      <h2>Webcam detection</h2>
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
  );
}

export default VdoCard;
