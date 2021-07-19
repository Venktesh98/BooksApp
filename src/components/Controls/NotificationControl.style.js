import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) => ({
  root: {
    display:"flex",
    justifyContent:"flex-end",
    top: theme.spacing(9.5),
    right: theme.spacing(8.5),
  },
}));
