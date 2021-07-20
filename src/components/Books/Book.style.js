import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  loader: {
    display: "flex",
    justifyContent: "center",
    marginTop: "4rem",
    height:"55.5vh",
    // overflow:"hidden",
    // overflow:"auto"
  },
  container: {
    marginTop: "0.8rem",
  },
  // paper: {
  //   // position:"relative"
  //   // height: "60vh",
  //   // marginBottom: "1rem",
  //   // overflowY: "auto",
  // },
}));
