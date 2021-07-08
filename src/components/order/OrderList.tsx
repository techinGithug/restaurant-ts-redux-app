import React from "react";
import Table from "../../layouts/Table";

interface OrderListProps {
  //   setOrderId: any;
  setOrderVisibility: any;
}

const OrderList: React.FC<OrderListProps> = ({
  setOrderVisibility,
  //   setOrderId,
}) => {
  return (
    <>
      <Table setOrderVisibility={setOrderVisibility} />
    </>
  );
};

export default OrderList;
