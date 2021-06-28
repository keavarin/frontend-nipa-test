import React, { useContext, useState } from "react";
import { Card, CardContent, TextareaAutosize } from "@material-ui/core";
import { ImageContext } from "../../../contexts/imageContextProvider";
import DetectObject from "./DetectObject/DetectObject";
import useStyles from "./useStyleContent";

function Content() {
  const classes = useStyles();
  const { detected_objects, isLoading } = useContext(ImageContext);

  // const [isLoading, setIsLoading] = useState(false);
  console.log("detected_objects", detected_objects);

  let showObject = null;
  if (detected_objects == undefined) {
    showObject = [{ message: "cannot detected objects" }];
    // console.log("showObject", showObject);
    // console.log("showObject", JSON.stringify(showObject));
  } else {
    showObject = detected_objects?.filter((i) => delete i.cropped_image);
    //   console.log("showObject", showObject);
    //   console.log("showObject", JSON.stringify(showObject));
  }

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
                      style={{ width: "100%", fontSize: "16px", margin: "2px" }}
                    >
                      {JSON.stringify(i, null, 4)}
                    </TextareaAutosize>
                  ))}
                </CardContent>
              </Card>
            </div>
          ) : (
            <div>
              <Card className={classes.root}>
                <CardContent className={classes.card_container}>
                  {showObject.map((i) => (
                    <TextareaAutosize
                      disabled
                      rowsMin={10}
                      style={{ width: "100%", fontSize: "16px", margin: "2px" }}
                    >
                      {JSON.stringify(i, null, 4)}
                    </TextareaAutosize>
                  ))}
                </CardContent>
              </Card>
            </div>
          )}
        </>
      )}
    </div>
  );
}
export default Content;
