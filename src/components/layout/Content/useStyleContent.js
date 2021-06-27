import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "2px solid pink",
    margin: "20px",
    backgroundColor: "pink",
  },
  card_container: {
    padding: "10px",
    // backgroundColor: "pink",
  },
}));

export default useStyles;
