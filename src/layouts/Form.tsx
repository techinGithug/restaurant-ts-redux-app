import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "90%",
      margin: theme.spacing(1),
    },
  },
}));

const Form = (props: any) => {
  const { children, ...other } = props;
  const classes = useStyles();
  return (
    <form className={classes.root} {...other}>
      {props.children}
    </form>
  );
};

export default Form;
