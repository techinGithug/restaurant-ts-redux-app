import React, { useState, useEffect, FormEvent } from "react";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../redux";

import {
  ButtonGroup,
  Button as MuiButton,
  Grid,
  InputAdornment,
  makeStyles,
} from "@material-ui/core";

import SearchFoodItems from "./SearchFoodItems";
import OrderedFoodItems from "./OrderedFoodItems";

import ReplayIcon from "@material-ui/icons/Replay";
import RestaurantMenuIcon from "@material-ui/icons/RestaurantMenu";
import ReorderIcon from "@material-ui/icons/Reorder";

import Form from "../../layouts/Form";
import { Input, Select, Button } from "../../controls";
import { useForm } from "../../hooks/useForm";
import { round2DecimalPoint } from "../../utils";
import Popup from "../../layouts/Popup";
import OrderList from "./OrderList";

const pMethods = [
  //   { id: "none", title: "Select" },
  { id: "Cash", title: "Cash" },
  { id: "Card", title: "Card" },
];

const useStyles = makeStyles((theme) => ({
  adormentText: {
    "& .MuiTypography-root": {
      color: "#f3b33d",
      fontWeight: "bolder",
      fontSize: "1.5em",
    },
  },
  submitButtonGroup: {
    backgroundColor: "#f3b33d",
    color: "#000",
    margin: theme.spacing(1),
    "& .MuiButton-label": {
      textTransform: "none",
    },
    "&:hover": {
      backgroundColor: "#f3b33d",
    },
  },
  serchFoodItem: {
    padding: "0px 38px 0px 10px",
  },
}));

const OrderForm: React.FC = () => {
  const dispatch = useDispatch();
  const state_obj = useSelector((state: State) => state.states);
  console.log(state_obj.orderDetailLists);
  console.log(state_obj.orderMasterLists);
  // console.log(state_obj.actionOrderId);
  // console.log(state_obj.actionStatus);

  const { addOrder, addOrderDetail, clearOrderDetail, test, updateOrder } =
    bindActionCreators(actionCreators, dispatch);

  const [mainObjs, setMainObjs] = useState<any>(state_obj);
  const [customer, setCustomer] = useState<any>(mainObjs.customer);
  const [foodItems, setFoodItems] = useState<any>(mainObjs.foodItems);
  const [orderListVisibility, setOrderVisibility] = useState<any>(false);

  let customerList = customer.map((item: any) => ({
    id: item.id,
    title: item.name,
  }));

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(state_obj.getFreshModelObject);

  const classes = useStyles();

  useEffect(() => {
    let gTotal = state_obj.getFreshModelObject.orderDetails.reduce(
      (tempTotal: any, item: any) => {
        return parseFloat(
          tempTotal + parseFloat(item.quantity) * parseFloat(item.foodItemPrice)
        );
      },
      0
    );

    setValues({
      ...state_obj.getFreshModelObject,
      gTotal: round2DecimalPoint(gTotal),
    });
  }, [state_obj.getFreshModelObject]);

  const validateForm = () => {
    let temp: any = {};
    temp.customerId = values.customerId !== 0 ? "" : "This field is required!";
    temp.pMethod = values.pMethod !== "" ? "" : "This field is required!";
    temp.orderDetails =
      values.orderDetails.length !== 0 ? "" : "This field is required!";
    setErrors({ ...temp });
    return Object.values(temp).every((x) => x === "");
  };

  const submitOrder = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      // if (state_obj.actionStatus === "create") {
      createOrder();
      // } else if (state_obj.actionStatus === "update") {
      //   updateOrders();
      // }
    }
  };

  // const updateOrders = () => {
  //   console.log("Update");
  //   // console.log(values);

  //   let orderMsaterDetails: any = {
  //     orderMasterId: values.orderMasterId,
  //     orderNumber: values.orderNumber,
  //     customerId: values.customerId,
  //     pMethod: values.pMethod,
  //     gTotal: values.gTotal,
  //   };

  //   // console.log(orderMsaterDetails);
  //   // console.log(values.orderDetails);

  //   // updateOrder(orderMsaterDetails, values.orderDetails);
  //   // setValues(state_obj.getFreshModelObject);
  //   // resetForm();
  //   // clearOrderDetail();
  // };

  const createOrder = () => {
    // console.log("create");
    let getMasterId: number = 0;
    if (state_obj.orderMasterLists.length === 0) {
      getMasterId = 1;
    } else {
      let orderMasterDetail = state_obj.orderMasterLists.slice(-1);
      const { orderMasterId } = orderMasterDetail[0];
      getMasterId = parseInt(orderMasterId) + 1;
    }

    let orderMsaterDetails: any = {
      orderMasterId: getMasterId,
      orderNumber: values.orderNumber,
      customerId: values.customerId,
      pMethod: values.pMethod,
      gTotal: values.gTotal,
    };

    addOrder(orderMsaterDetails, values.orderDetails);
    resetForm();
    clearOrderDetail();
  };

  const openListOfOrders = () => {
    setOrderVisibility(true);
  };

  useEffect(() => {
    if (state_obj.actionOrderId === 0) {
    } else {
      let x = state_obj.orderMasterLists.filter(
        (item: any) => item.orderMasterId === state_obj.actionOrderId
      );
      let y = state_obj.orderDetailLists.filter(
        (elem: any) => elem.orderMasterId === x[0].orderMasterId
      );
      // console.log(x);
      // console.log(y);

      let oldData = {
        orderMasterId: x[0].orderMasterId,
        orderNumber: x[0].orderNumber,
        customerId: x[0].customerId,
        pMethod: x[0].pMethod,
        gTotal: x[0].gTotal,
        deletedOrderItemIds: "",
        orderDetails: y,
      };
      // console.log(oldData);

      test(oldData);

      setValues(oldData);
      setErrors({});
    }
  }, [state_obj.actionOrderId]);

  return (
    <>
      <Form onSubmit={submitOrder}>
        <Grid container>
          <Grid item xs={6}>
            <Input
              label="Order Number"
              name="orderNumber"
              disabled={true}
              value={values.orderNumber}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    className={classes.adormentText}
                  >
                    #
                  </InputAdornment>
                ),
              }}
            />
            <Select
              label="Customer"
              name="customerId"
              value={values.customerId}
              onChange={handleInputChange}
              options={customerList}
              error={errors.customerId}
            />
          </Grid>
          <Grid item xs={6}>
            <Select
              label="Payment Method"
              name="pMethod"
              options={pMethods}
              value={values.pMethod}
              onChange={handleInputChange}
              error={errors.pMethod}
            />
            <Input
              label="Grant Total"
              name="gTotal"
              disabled={true}
              value={values.gTotal}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    className={classes.adormentText}
                  >
                    $
                  </InputAdornment>
                ),
              }}
            />
            <ButtonGroup className={classes.submitButtonGroup}>
              {/* ReplayIcon */}
              <MuiButton
                size="large"
                type="submit"
                endIcon={<RestaurantMenuIcon />}
              >
                Submit
              </MuiButton>
              <MuiButton size="small" type="reset" startIcon={<ReplayIcon />} />
            </ButtonGroup>
            <Button
              onClick={openListOfOrders}
              size="large"
              startIcon={<ReorderIcon />}
              text="Order"
              color="default"
            />
          </Grid>
        </Grid>
      </Form>
      <Popup
        title="List of orders"
        openPopup={orderListVisibility}
        setOpenPopup={setOrderVisibility}
        children={
          <OrderList
            // setOrderId={setOrderId}
            setOrderVisibility={setOrderVisibility}
          />
        }
      />

      <Grid container style={{ marginTop: "2%" }}>
        <Grid item xs={6} className={classes.serchFoodItem}>
          <SearchFoodItems />
        </Grid>
        <Grid item xs={6}>
          <OrderedFoodItems />
        </Grid>
      </Grid>
    </>
  );
};

export default OrderForm;
