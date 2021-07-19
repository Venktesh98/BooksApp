import React from "react";
import { useStyles } from "./PageFooter.style";

function PageFooter() {
  const classes = useStyles();
  return (
    <div className={classes.pageFooter}>
      <footer className={classes.footerText}>BooksApp@copyright 2021</footer>
    </div>
  );
}

export default PageFooter;
