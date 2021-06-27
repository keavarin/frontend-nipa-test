import { makeStyles } from "@material-ui/core/styles";
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
    width: "100%",
    //maxWidth: 600,
  },
  imgCard: {
    maxWidth: 500,
    paddingTop: "10",
  },
  headCard: {
    display: "flex",
    padding: theme.spacing(1),
    justifyContent: "space-between",
    alignItems: "center",
  },
}));

export default useStyles;
