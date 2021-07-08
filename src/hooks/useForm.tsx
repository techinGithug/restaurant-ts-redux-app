import React, { useState, ChangeEvent } from "react";
import { makeStyles } from "@material-ui/core";

export const useForm = (getFreshModelObject: any) => {
  const [values, setValues] = useState<any>(getFreshModelObject);
  const [errors, setErrors] = useState<any>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // console.log(name, value);
    setValues({
      ...values,
      [name]: value,
    });
  };

  const resetForm = (): void => {
    setValues(getFreshModelObject);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
  };
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "90%",
      margin: theme.spacing(1),
    },
  },
}));

export const Form = (props: any) => {
  const { children, ...other } = props;
  const classes = useStyles();
  return (
    <form className={classes.root} {...other}>
      {props.children}
    </form>
  );
};
