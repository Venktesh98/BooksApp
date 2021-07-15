import React from "react";
import { useStyles } from "./Error.styles";

function Error() {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.errorDetails}>
        <code className={classes.errImogi}>¯\_(ツ)_/¯</code>
        <h2>Something Went Wrong!</h2>
      </div>
    </div>
  );
}

export default Error;
