import React, { useState, useEffect } from "react";
import {
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../../redux";

import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import PlusOneIcon from "@material-ui/icons/PlusOne";
import SearchTwoToneIcon from "@material-ui/icons/SearchTwoTone";

import { useForm } from "../../hooks/useForm";

const useStyles = makeStyles((theme) => ({
  searchPaper: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
  },
  searchInput: {
    marginLeft: theme.spacing(1.5),
    flex: 1,
  },
  listRoot: {
    marginTop: theme.spacing(1),
    maxHeight: 450,
    overflow: "auto",
    "& li:hover": {
      cursor: "pointer",
      backgroundColor: "#E3E3E3",
    },
    "& li:hover .MuiButtonBase-root": {
      display: "block",
      color: "#000",
    },
    "& .MuiButtonBase-root": {
      display: "none",
    },
    "& .MuiButtonBase-root: hover": {
      backgroundColr: "transparent",
    },
  },
}));

const SearchFoodItems: React.FC = () => {
  const dispatch = useDispatch();
  const state_obj = useSelector((state: State) => state.states);
  // console.log(state_obj.getFreshModelObject);

  const { addOrderDetail } = bindActionCreators(actionCreators, dispatch);
  const [mainObjs, setMainObjs] = useState<any>(state_obj);
  const [foodItems, setFoodItems] = useState<any>(mainObjs.foodItems);
  const [searchList, setSearchList] = useState<any>(mainObjs.foodItems);
  const [searchKey, setSearchKey] = useState<string>("");

  const classes = useStyles();

  // const { values, setValues, errors } =
  //   useForm(state_obj.getFreshModelObject);

  useEffect(() => {
    let orderDetails = state_obj.getFreshModelObject.orderDetails;
    let x = [...foodItems];
    x = x.filter(
      (y) =>
        y.foodItemName.toLowerCase().includes(searchKey.toLowerCase()) &&
        orderDetails.every((item: any) => item.foodItemId !== y.foodItemId)
    );
    setSearchList(x);
  }, [searchKey, state_obj.getFreshModelObject]);

  const addOrderDetailAction = (foodItem: any) => {
    let getMasterId: number = 0;
    if (state_obj.orderMasterLists.length === 0) {
      getMasterId = 1;
    } else {
      let orderMasterDetail = state_obj.orderMasterLists.slice(-1);
      const { orderMasterId } = orderMasterDetail[0];
      getMasterId = parseInt(orderMasterId) + 1;
    }

    let x = {
      orderMasterId: getMasterId,
      // orderDetailId: 0,
      foodItemId: foodItem.foodItemId,
      quantity: 1,
      foodItemPrice: foodItem.foodItemPrice,
      foodItemName: foodItem.foodItemName,
    };
    // setValues({
    //   ...state_obj.getFreshModelObject,
    //   orderDetails: [...state_obj.getFreshModelObject.orderDetails, x],
    // });
    addOrderDetail(x);
  };

  return (
    <>
      <Paper className={classes.searchPaper}>
        <InputBase
          placeholder="Search food items"
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          className={classes.searchInput}
        />
        <IconButton>
          <SearchTwoToneIcon />
        </IconButton>
      </Paper>
      <List className={`${classes.listRoot}`}>
        {searchList.map((item: any) => (
          <ListItem
            key={item.foodItemId}
            onClick={() => addOrderDetailAction(item)}
          >
            <ListItemText
              primary={item.foodItemName}
              secondary={`$` + item.foodItemPrice}
            />
            <ListItemSecondaryAction>
              <IconButton onClick={() => addOrderDetailAction(item)}>
                <PlusOneIcon />
                <ArrowForwardIosIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </>
  );
};

export default SearchFoodItems;
