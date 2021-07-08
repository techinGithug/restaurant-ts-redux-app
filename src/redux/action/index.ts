import { ActionTypes } from "../action-type";

interface actionOrderId {
    type: ActionTypes.ACTION_ORDER_ID,
    payload: any
};

interface actionStatus {
    type: ActionTypes.ACTION_STATUS,
    payload: any
};

interface addOrder {
    type: ActionTypes.ADD_ORDER,
    payload: any
};

interface addOrderDetail {
    type: ActionTypes.ADD_ORDER_DETAIL,
    payload: any
};

interface clearOrderDetail {
    type: ActionTypes.CLEAR_ORDER_DETAIL,
    payload: any
};

interface deleteOrderDetails {
    type: ActionTypes.DELETE_ORDER_DETAIL,
    payload: number
};

interface deleteOrderMasterLists {
    type: ActionTypes.DELETE_ORDERMASTER_LISTS,
    payload: number
};

interface deleteData {
    type: ActionTypes.DELETE_DATA,
    payload: number
};

interface inserData {
    type: ActionTypes.INSERT_DATA,
    payload: any
};

interface updateOrder {
    type: ActionTypes.UPDATE_ORDER,
    payload: any
};

interface updateQuantity {
    type: ActionTypes.UPDATE_QUANTITY,
    payload: any
};

interface test {
    type: ActionTypes.TEST,
    payload: any
};

export type Action = 
    actionOrderId |
    actionStatus |
    addOrder | 
    addOrderDetail | 
    clearOrderDetail |
    deleteOrderMasterLists |
    deleteData | 
    deleteOrderDetails | 
    inserData | 
    updateOrder | 
    updateQuantity |
    test