import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
  pageFooter: {
    // position: "absolute",
    // left: 0,
    // bottom: 0,
    marginTop:"1%",
    width: "100%",
    backgroundColor: "#f8f4ff",
    display: "flex",
    height: "70px",
    justifyContent: "center",
    boxShadow: "0px 0px 7px black",
  },
  footerText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
}));
