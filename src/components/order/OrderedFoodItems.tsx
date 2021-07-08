import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../redux";
import {
  Button,
  ButtonGroup,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Paper,
} from "@material-ui/core";

import { round2DecimalPoint } from "../../utils";

import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";

// import { useForm } from "../../hooks/useForm";

const useStyles = makeStyles((theme) => ({
  listRoot: {
    paddingTop: "0px",
  },
  paperRoot: {
    margin: "0px 38px 5px 7px",
    "& :hover": {
      cursor: "pointer",
    },
    "& :hover $deleteButton": {
      display: "block",
    },
  },
  buttonGroup: {
    backgroundColor: "#e3e3ed",
    borderRadius: 8,
    "& .MuiButtonBase-root": {
      border: "none",
      minWidth: "25px",
      padding: "1px",
    },
    "& button:nth-child(2)": {
      fontSize: "12.em",
      color: "#000",
    },
  },
  deleteButton: {
    display: "none",
    "& .MuiButtonBase-root": {
      color: "#e81719",
    },
  },
  totalPerItem: {
    fontWeight: "bolder",
    fontSize: "1.2em",
    margin: "0px 10px",
  },
}));

const OrderedFoodItems: React.FC = () => {
  const dispatch = useDispatch();
  const state_obj = useSelector((state: State) => state.states);
  const [rendered, setRedered] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  // console.log(state_obj.getFreshModelObject);
  const { deleteOrderDetail, updateQuantity } = bindActionCreators(
    actionCreators,
    dispatch
  );

  let orderDetails: any = state_obj.getFreshModelObject.orderDetails;
  // console.log(orderDetails);

  const classes = useStyles();

  return (
    <>
      <List className={classes.listRoot}>
        {orderDetails.length === 0 ? (
          <ListItem>
            <ListItemText
              primary="Please select food items"
              primaryTypographyProps={{
                style: {
                  textAlign: "center",
                  fontStyle: "italic",
                },
              }}
            />
          </ListItem>
        ) : (
          orderDetails.map((item: any, idx: number) => (
            <Paper key={item.foodItemId} className={classes.paperRoot}>
              <ListItem>
                <ListItemText
                  primary={item.foodItemName}
                  primaryTypographyProps={{
                    component: "h1",
                    style: {
                      fontWeight: 500,
                      fontSize: "1.2em",
                    },
                  }}
                  secondary={
                    <>
                      <ButtonGroup size="small" className={classes.buttonGroup}>
                        <Button
                          onClick={() =>
                            updateQuantity(item.foodItemId, "minus")
                          }
                        >
                          -
                        </Button>
                        <Button disabled>{item.quantity}</Button>
                        <Button
                          onClick={() =>
                            updateQuantity(item.foodItemId, "plus")
                          }
                        >
                          +
                        </Button>
                      </ButtonGroup>
                      <span className={classes.totalPerItem}>
                        {`$ ` +
                          round2DecimalPoint(
                            parseFloat(item.quantity) *
                              parseFloat(item.foodItemPrice)
                          )}
                      </span>
                    </>
                  }
                  secondaryTypographyProps={{
                    component: "div",
                  }}
                />

                <ListItemSecondaryAction className={classes.deleteButton}>
                  <IconButton
                    disableRipple
                    onClick={() => deleteOrderDetail(item.foodItemId)}
                  >
                    <DeleteTwoToneIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Paper>
          ))
        )}
      </List>
    </>
  );
};

export default OrderedFoodItems;
