import { Button } from "@material-ui/core";
import React from "react";
import { useStyles } from "./ButtonControl.style";

function ButtonControl({
  variant,
  children,
  color,
  size,
  text,
  onClickData,
  ...rest
}) {
  const classes = useStyles();
  return (
    <div>
      <Button
        className={classes.buttonStyle}
        variant={variant || "contained"}
        color={color || "primary"}
        size={size || "large"}
        onClick={onClickData}
        {...rest}
      >
        {text}
        {children}
      </Button>
    </div>
  );
}

export default ButtonControl;
