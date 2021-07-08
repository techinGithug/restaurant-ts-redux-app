import { Action } from "../action";
import { ActionTypes } from "../action-type";
import { initialState } from "../state";
import { generateOrderNumber } from "../../utils"

const reducer = (state: any = initialState, action: Action) => {
    switch(action.type) {
        case ActionTypes.ACTION_ORDER_ID:
            return {
                ...state,
                actionOrderId: action.payload

            }

        case ActionTypes.ACTION_STATUS:
            return {
                ...state,
                actionStatus: action.payload
            }

        case ActionTypes.ADD_ORDER:
            return {
                ...state,
                // orderDetailLists: [...state.orderDetailLists, action.payload.orderDetails],

                // arr: state.arr.concat(action.newItem)
                orderDetailLists: state.orderDetailLists.concat(action.payload.orderDetails),
                orderMasterLists: [...state.orderMasterLists, action.payload.orderMasterDetails],
                // getFreshModelObject: {
                //     ...state.getFreshModelObject,
                //     orderNumber: generateOrderNumber(),
                //     orderDetails: state.getFreshModelObject.orderDetails.filter((item: any, i: number) => item.foodItemId === i)
                // }
            }

        case ActionTypes.ADD_ORDER_DETAIL:
            return {
                ...state,
                // orderDetails: [...state.orderDetails, action.payload]
                getFreshModelObject: {
                    ...state.getFreshModelObject,
                    orderDetails: [
                        ...state.getFreshModelObject.orderDetails, action.payload
                    ]
                }
            }

        case ActionTypes.CLEAR_ORDER_DETAIL:
            return {
                ...state,
                getFreshModelObject: {
                    ...state.getFreshModelObject,
                    orderDetails: state.getFreshModelObject.orderDetails.filter((item: any, i: number) => item.foodItemId === i)
                    // orderDetails: [...state.getFreshModelObject.orderDetails.filter((item: any, i: number) => item.foodItemId === i)]
                }
            }

        case ActionTypes.UPDATE_QUANTITY:
            const {id, data} = action.payload;
            let index: number = state.getFreshModelObject.orderDetails.findIndex((item: any) => item.foodItemId === id);
            if(data === "plus"){
                return { 
                    ...state, 
                    // orderDetails: state.orderDetails.map(
                    //     (order: any, i: number) => i === index ? {...order, quantity: parseInt(order.quantity)+1 } : order
                    // )
                    getFreshModelObject: {
                        ...state.getFreshModelObject,
                        orderDetails: [
                            ...state.getFreshModelObject.orderDetails.map((order: any, i: number) => i === index ? {...order, quantity: parseInt(order.quantity)+1 } : order)
                        ]
                    }
                }

            } else if(data === "minus"){
                return { 
                    ...state, 
                    // orderDetails: state.orderDetails.map(
                    //     (order: any, i: number) => (i === index && parseInt(order.quantity) > 0) ? {...order, quantity: parseInt(order.quantity)-1 } : order
                    // )
                    getFreshModelObject: {
                        ...state.getFreshModelObject,
                        orderDetails: [
                            ...state.getFreshModelObject.orderDetails.map((order: any, i: number) => (i === index && parseInt(order.quantity) > 0) ? {...order, quantity: parseInt(order.quantity)-1 } : order)
                        ]
                    }

                }
            }
            return state;
           
            case ActionTypes.DELETE_ORDERMASTER_LISTS:
                return {
                    ...state,
                    orderDetailLists: [
                        ...state.orderDetailLists.filter((item: any) => item.orderMasterId !== action.payload)
                    ],
                    orderMasterLists: [
                        ...state.orderMasterLists.filter((item: any) => item.orderMasterId !== action.payload)
                    ]
                }
        

        case ActionTypes.DELETE_ORDER_DETAIL:
            return {
                ...state,
                // orderDetails: state.orderDetails.filter((item: any) => item.foodItemId !== action.payload)
                getFreshModelObject: {
                    ...state.getFreshModelObject,
                    orderDetails: [
                        ...state.getFreshModelObject.orderDetails.filter((item: any) => item.foodItemId !== action.payload)
                    ]
                }
            }

        case ActionTypes.TEST:
            const {
                orderMasterId,
                orderNumber,
                customerId,
                pMethod,
                gTotal
            } = action.payload
            // console.log(`${orderMasterId} ${orderNumber} ${customerId} ${pMethod} ${gTotal}`)
            
            return {
                ...state,
                getFreshModelObject: {
                    ...state.getFreshModelObject,
                    orderMasterId: orderMasterId,
                    orderNumber: orderNumber,
                    customerId: customerId,
                    pMethod: pMethod,
                    gTotal: gTotal,
                    deletedOrderItemIds: "",
                    orderDetails: [
                        ...state.getFreshModelObject.orderDetails.length === 0 ? [...action.payload.orderDetails] : action.payload.orderDetails
                    ]
                }
            }

        case ActionTypes.INSERT_DATA:
            return {

            }

        case ActionTypes.UPDATE_ORDER:
            // console.log(action.payload.orderDetails)
            // console.log(action.payload.orderMasterDetails)
            return {
                ...state,
                // ...state.getFreshModelObject.orderDetails.map((order: any, i: number) => (i === index && parseInt(order.quantity) > 0) ? {...order, quantity: parseInt(order.quantity)-1 } : order)
                orderDetailLists: state.orderDetailLists.map(
                    (item: any, i: number) => 
                        item.orderMasterId === action.payload.orderDetails[i].orderMasterId ?
                        {
                            ...item,
                            i:{
                                orderMasterId: action.payload.orderDetails[i].orderMasterId,
                                foodItemId: action.payload.orderDetails[i].foodItemId,
                                quantity: action.payload.orderDetails[i].quantity,
                                foodItemPrice: action.payload.orderDetails[i].foodItemPrice,
                                foodItemName: action.payload.orderDetails[i].foodItemName
                            }    
                        }
                        : item
                ),
                actionStatus: "create"
                // orderMasterLists: [...state.orderMasterLists, action.payload.orderMasterDetails],
            }

        case ActionTypes.DELETE_DATA:
            return {

            }

        default:
            return state;
    }
}

export default reducer
