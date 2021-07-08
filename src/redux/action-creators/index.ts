import { ActionTypes } from "../action-type";
import { Action } from "../action";
import { Dispatch } from "redux";

export const actionOrderId = (id: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionTypes.ACTION_ORDER_ID,
            payload: id
        })
    }
};

export const actionStatus = (data: any) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionTypes.ACTION_STATUS,
            payload: data
        })
    }
}

export const addOrder = (orderMasterDetails: any, orderDetails: any) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionTypes.ADD_ORDER,
            payload: {
                orderMasterDetails,
                orderDetails
            }
        })
    }
};

export const addOrderDetail = (data: any) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionTypes.ADD_ORDER_DETAIL,
            payload: data
        })
    }
};

export const clearOrderDetail = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionTypes.CLEAR_ORDER_DETAIL,
            payload: null
        })
    }
};

export const deleteOrderDetail = (id: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionTypes.DELETE_ORDER_DETAIL,
            payload: id
        })
    }
};

export const deleteOrderMasterLists = (id: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionTypes.DELETE_ORDERMASTER_LISTS,
            payload: id
        })
    }
};

export const deleteData = (data: number) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionTypes.DELETE_DATA,
            payload: data
        })
    }
};

export const insertData = (data: any) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type:ActionTypes.INSERT_DATA,
            payload: data
        })
    }
};

export const updateOrder = (orderMasterDetails: any, orderDetails: any) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionTypes.UPDATE_ORDER,
            payload: {
                orderMasterDetails,
                orderDetails
            }
        })
    }
};

export const updateQuantity = (id: number, data: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionTypes.UPDATE_QUANTITY,
            payload: {
                id,
                data
            }
        })
    }
};

export const test = (data: any) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionTypes.TEST,
            payload: data
        })
    }
};

