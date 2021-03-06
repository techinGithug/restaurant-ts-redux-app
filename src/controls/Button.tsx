import React from "react";
import { Button as MuiButton, makeStyles } from "@material-ui/core";

interface ButtonProps {
  text?: string;
  size?: any;
  color?: any;
  variant?: any;
  type?: "submit" | "reset" | "button";
  onClick?: any;
  startIcon?: any;
  className?: any;
}

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0.5),
  },
  label: {
    textTransform: "none",
  },
}));

const Button: React.FC<ButtonProps> = ({
  text,
  size,
  color,
  variant,
  onClick,
  className,
  ...other
}) => {
  const classes = useStyles();
  return (
    <MuiButton
      className={classes.root + " " + (className || "")}
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
      classes={{ root: classes.root, label: classes.label }}
    >
      {text}
    </MuiButton>
  );
};

export default Button;
