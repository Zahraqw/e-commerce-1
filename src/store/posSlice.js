import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  posItems: sessionStorage.getItem("posItems")
    ? JSON.parse(sessionStorage.getItem("posItems"))
    : [],
  totalPriceWithTax: 0,
};
const posSlice = createSlice({
  name: "pos",
  initialState,
  reducers: {
    setTotalPriceWithTax: (state, actions) => {
      state.totalPriceWithTax = actions.payload;
    },

    addToPos(state, action) {
      const item = action.payload;
      const defaultStore = item?.storeDetails[0];
      const existingItem = state.posItems.find(
        (Item) => Item.id === item.id && Item.store.name === defaultStore?.name
      );
      const selectedStockQty = defaultStore?.qty || 0;
      const totalQty = item?.storeDetails?.reduce(
        (totalQty, store) => totalQty + (store?.qty || 0),
        0
      );
      // check if the product on pos same store
      if (existingItem) {
        if (existingItem.qty + 1 <= selectedStockQty) {
          const update = state.posItems.map((Item) =>
            Item.id === item.id && Item.store.name === defaultStore?.name
              ? {
                  ...Item,
                  qty: Item.qty + 1,
                }
              : Item
          );
          state.posItems = update;
        } else {
          toast.warning(
            `The store ${defaultStore?.name} contain ${selectedStockQty} items as a max quantity, try to select another store`
          );
        }
      }
      // *item on pos but different store name *item not on pos
      else {
        if (totalQty > 0) {
          const insertIndex = state.posItems.findIndex(
            (Item) => Item.id === item.id
          );
          console.log(insertIndex);
          const itemToAdd = {
            ...item,
            qty: selectedStockQty >= 1 ? 1 : 0,
            store: defaultStore,
            topPrice: item?.price0,
            orderPrice: item?.discountPrice || item?.price0,
            subtotal:
              (item?.discountPrice || item?.price0) *
              (selectedStockQty >= 1 ? 1 : 0),
          };
          //item on pos but different store name
          if (insertIndex !== -1) {
            const update = (prevItems) => [
              ...prevItems.slice(0, insertIndex + 1),
              itemToAdd,
              ...prevItems.slice(insertIndex + 1),
            ];

            state.posItems = update(state.posItems);
          }
          //*item not on pos
          else {
            state.posItems.push(itemToAdd);
          }
        } else {
          toast.warning("This item is out of stock");
        }
      }
      sessionStorage.setItem("posItems", JSON.stringify(state.posItems));
    },

    ChangeOrderPricePos(state, action) {
      const { index, newOrderPrice } = action.payload;
      state.posItems[index].orderPrice = newOrderPrice;
      state.posItems[index].subtotal =
        newOrderPrice * state.posItems[index].qty;
      sessionStorage.setItem("posItems", JSON.stringify(state.posItems));
    },
    ChangeQuantityPos(state, action) {
      const { index, newQty, item } = action.payload;
      const selectedItem = state.posItems[index]?.storeDetails?.find(
        (Item) => Item.name === item.store.name
      );
      const maxQty = selectedItem.qty;
      if (newQty <= maxQty) {
        state.posItems[index].qty = newQty;
        if (newQty <= 4) {
          state.posItems[index].topPrice = state.posItems[index].price0;
        } else if (newQty > 4 && newQty <= 9) {
          state.posItems[index].topPrice = state.posItems[index].price1;
        } else if (newQty > 9 && newQty <= 20) {
          state.posItems[index].topPrice = state.posItems[index].price2;
        } else {
          state.posItems[index].topPrice = state.posItems[index].price3;
        }

        state.posItems[index].subtotal =
          (state.posItems[index].orderPrice ||
            state.posItems[index].discountPrice ||
            state.posItems[index].toPrice) * newQty;
      } else {
        state.posItems[index].qty = maxQty;
        toast.warning(
          `The store ${item.store.name} contains ${maxQty} items as a max quantity, try to select another store`
        );
      }
      sessionStorage.setItem("posItems", JSON.stringify(state.posItems));
    },
    ChangeStorePos(state, action) {
      const { index, newStatus } = action.payload;

      const selectedItem = state.posItems[index]?.storeDetails?.find(
        (Item) => Item.name === newStatus
      );
      if (state.posItems[index].qty > selectedItem?.qty) {
        state.posItems[index].qty = selectedItem?.qty;
        ChangeQuantityPos({
          index,
          newQty: selectedItem.qty,
          item: state.posItems[index],
        });

        toast.warning(
          `This store ${selectedItem?.name} has ${selectedItem?.qty} items as a max quantity`
        );
      }
      state.posItems[index].store = selectedItem;
      sessionStorage.setItem("posItems", JSON.stringify(state.posItems));
    },
    removeFromPos(state, action) {
      const indexOfItemToRemove = action.payload;
      if (indexOfItemToRemove !== -1) {
        const removedItem = state.posItems[indexOfItemToRemove];

        const nextPosItems = [
          ...state.posItems.slice(0, indexOfItemToRemove),
          ...state.posItems.slice(indexOfItemToRemove + 1),
        ];
        state.posItems = nextPosItems;
        toast.error(`${removedItem.name} removed from POS`, {
          position: "top-right",
          autoClose: 2000,
        });
        sessionStorage.setItem("posItems", JSON.stringify(state.posItems));
      }
    },
    removeAllPos(state, action) {
      state.posItems = [];
      sessionStorage.setItem("posItems", JSON.stringify(state.posItems));
      toast.info("All items removed from POS", {
        position: "top-right",
        autoClose: 2000,
      });
    },
  },
});

export const {
  addToPos,
  ChangeQuantityPos,
  ChangeOrderPricePos,
  ChangeStorePos,
  removeFromPos,

  setTotalPriceWithTax,
  removeAllPos,
} = posSlice.actions;

export const PriceWithTax = (state) => state.pos.totalPriceWithTax;

export default posSlice.reducer;
