import React, { useState, useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "../redux";

import {
  Table as MuiTable,
  makeStyles,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@material-ui/core";

import DeleteOutlineTwoToneIcon from "@material-ui/icons/DeleteOutlineTwoTone";

interface TableProps {
  //   setOrderId: any;
  setOrderVisibility: any;
}

const useStyles = makeStyles((theme) => ({
  table: {
    marginTop: theme.spacing(3),
    "& thead th": {
      fontWeight: "600",
      color: theme.palette.primary.main,
      backgroundColor: theme.palette.primary.light,
    },
    "& tbody td": {
      fontWeight: "300",
    },
    "& tbody tr:hover": {
      backgroundColor: "#fffbf2",
      cursor: "pointer",
    },
  },
}));

const Table: React.FC<TableProps> = ({ setOrderVisibility }) => {
  const dispatch = useDispatch();
  const state_obj = useSelector((state: State) => state.states);
  // console.log(state_obj.orderDetailLists);
  // console.log(state_obj.orderMasterLists);

  const { actionOrderId, actionStatus, deleteOrderMasterLists } =
    bindActionCreators(actionCreators, dispatch);

  const classes = useStyles();

  const showForUpdate = (id: number) => {
    // actionOrderId(id);
    // actionStatus("update");
    // setOrderVisibility(false);
  };

  const deleteOrderMasterList = (id: number) => {
    deleteOrderMasterLists(id);
    // setOrderVisibility(false);
  };

  return (
    <MuiTable className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>Order No.</TableCell>
          <TableCell>Customer</TableCell>
          <TableCell>Payed With</TableCell>
          <TableCell>Grand Total</TableCell>
          <TableCell></TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {state_obj.orderMasterLists.map((item: any) => {
          let custDetail: any = state_obj.customer.filter(
            (elem: any) => item.customerId === elem.id
          );
          let custName: string = custDetail[0].name;

          return (
            <TableRow key={item.orderMasterId}>
              <TableCell onClick={() => showForUpdate(item.orderMasterId)}>
                {item.orderNumber}
              </TableCell>
              <TableCell onClick={() => showForUpdate(item.orderMasterId)}>
                {custName}
              </TableCell>
              <TableCell onClick={() => showForUpdate(item.orderMasterId)}>
                {item.pMethod}
              </TableCell>
              <TableCell onClick={() => showForUpdate(item.orderMasterId)}>
                {item.gTotal}
              </TableCell>
              <TableCell>
                <DeleteOutlineTwoToneIcon
                  color="secondary"
                  onClick={() => deleteOrderMasterList(item.orderMasterId)}
                />
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </MuiTable>
  );
};

export default Table;
