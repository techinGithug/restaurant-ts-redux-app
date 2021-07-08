import { generateOrderNumber } from "../utils";
  
export const initialState: any = {
    actionOrderId:0,
    actionStatus: "create",
    customer: [
        {id:1, name: "John Doe"},
        {id:2, name: "Johny Dave"},
        {id:3, name: "Kitty Cat"},
        {id:4, name: "Tony Jar"},
        {id:5, name: "Small Cat"}
    ],

    foodItems: [
        {foodItemId:1, foodItemName: "Chiken Tenders", foodItemPrice: 30.5},
        {foodItemId:2, foodItemName: "Masroom Soup", foodItemPrice: 40},
        {foodItemId:3, foodItemName: "Berger Duck", foodItemPrice: 60.5},
        {foodItemId:4, foodItemName: "Fried rice", foodItemPrice: 35},
        {foodItemId:5, foodItemName: "Fried chiken", foodItemPrice: 25},
        {foodItemId:6, foodItemName: "Berger chiken", foodItemPrice: 50.9},
        {foodItemId:7, foodItemName: "Sandwich Hot Dog", foodItemPrice: 45},
        {foodItemId:8, foodItemName: "Mush", foodItemPrice: 30}
    ],

    getFreshModelObject : {
        orderMasterId: 1,
        orderNumber: generateOrderNumber(),
        customerId: 0,
        pMethod: "",
        gTotal: 0,
        deletedOrderItemIds: "",
        orderDetails: [],
    },
    orderDetailLists:[],
    orderMasterLists: [],
}