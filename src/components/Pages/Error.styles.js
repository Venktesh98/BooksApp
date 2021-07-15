import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  errorDetails: {
    // border: "1.5px solid yellow",
    textAlign: "center",
    width: "100%",
    margin: "12rem auto 0",
    display: "flex",
    flexDirection: "column",
    // marginLeft:"auto",
    // marginRight:"auto"
  },
  errImogi: {
    display: "flex",
    justifyContent: "center",
    fontSize: "5rem",
    fontWeight: "300",
  },
}));
