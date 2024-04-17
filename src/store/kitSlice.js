import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  kitItems: [],
  totalPriceWithTax: 0,
};
const kitSlice = createSlice({
  name: "kit",
  initialState,
  reducers: {
    setTotalPriceWithTax: (state, actions) => {
      state.totalPriceWithTax = actions.payload;
    },

    addToKit(state, action) {
      const item = action.payload;
      const defaultStore = item?.storeDetails[0];
      const existingItem = state.kitItems.find(
        (Item) => Item.id === item.id && Item.store.name === defaultStore?.name
      );
      const selectedStockQty = defaultStore?.qty || 0;
      const totalQty = item?.storeDetails?.reduce(
        (totalQty, store) => totalQty + (store?.qty || 0),
        0
      );
      // check if the product on kit same store
      if (existingItem) {
        if (existingItem.qty + 1 <= selectedStockQty) {
          const update = state.kitItems.map((Item) =>
            Item.id === item.id && Item.store.name === defaultStore?.name
              ? {
                  ...Item,
                  qty: Item.qty + 1,
                }
              : Item
          );
          state.kitItems = update;
        } else {
          toast.warning(
            `The store ${defaultStore?.name} contain ${selectedStockQty} items as a max quantity, try to select another store`
          );
        }
      }
      // *item on kit but different store name *item not on kit
      else {
        if (totalQty > 0) {
          const insertIndex = state.kitItems.findIndex(
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
          //item on kit but different store name
          if (insertIndex !== -1) {
            const update = (prevItems) => [
              ...prevItems.slice(0, insertIndex + 1),
              itemToAdd,
              ...prevItems.slice(insertIndex + 1),
            ];

            state.kitItems = update(state.kitItems);
          }
          //*item not on kit
          else {
            state.kitItems.push(itemToAdd);
          }
        } else {
          toast.warning("This item is out of stock");
        }
      }
      // sessionStorage.setItem("kitItems", JSON.stringify(state.kitItems));
    },

    ChangeOrderPriceKit(state, action) {
      const { index, newOrderPrice } = action.payload;
      state.kitItems[index].orderPrice = newOrderPrice;
      state.kitItems[index].subtotal =
        newOrderPrice * state.kitItems[index].qty;
      // sessionStorage.setItem("kitItems", JSON.stringify(state.kitItems));
    },
    ChangeQuantityKit(state, action) {
      const { index, newQty, item } = action.payload;
      const selectedItem = state.kitItems[index]?.storeDetails?.find(
        (Item) => Item.name === item.store.name
      );
      const maxQty = selectedItem.qty;
      if (newQty <= maxQty) {
        state.kitItems[index].qty = newQty;
        if (newQty <= 4) {
          state.kitItems[index].topPrice = state.kitItems[index].price0;
        } else if (newQty > 4 && newQty <= 9) {
          state.kitItems[index].topPrice = state.kitItems[index].price1;
        } else if (newQty > 9 && newQty <= 20) {
          state.kitItems[index].topPrice = state.kitItems[index].price2;
        } else {
          state.kitItems[index].topPrice = state.kitItems[index].price3;
        }

        state.kitItems[index].subtotal =
          (state.kitItems[index].orderPrice ||
            state.kitItems[index].discountPrice ||
            state.kitItems[index].toPrice) * newQty;
      } else {
        state.kitItems[index].qty = maxQty;
        toast.warning(
          `The store ${item.store.name} contains ${maxQty} items as a max quantity, try to select another store`
        );
      }
      // sessionStorage.setItem("kitItems", JSON.stringify(state.kitItems));
    },
    ChangeStoreKit(state, action) {
      const { index, newStatus } = action.payload;

      const selectedItem = state.kitItems[index]?.storeDetails?.find(
        (Item) => Item.name === newStatus
      );
      if (state.kitItems[index].qty > selectedItem?.qty) {
        state.kitItems[index].qty = selectedItem?.qty;
        ChangeQuantityKit({
          index,
          newQty: selectedItem.qty,
          item: state.kitItems[index],
        });

        toast.warning(
          `This store ${selectedItem?.name} has ${selectedItem?.qty} items as a max quantity`
        );
      }
      state.kitItems[index].store = selectedItem;
      // sessionStorage.setItem("kitItems", JSON.stringify(state.kitItems));
    },
    removeFromKit(state, action) {
      const indexOfItemToRemove = action.payload;
      if (indexOfItemToRemove !== -1) {
        const removedItem = state.kitItems[indexOfItemToRemove];

        const nextKitItems = [
          ...state.kitItems.slice(0, indexOfItemToRemove),
          ...state.kitItems.slice(indexOfItemToRemove + 1),
        ];
        state.kitItems = nextKitItems;
        toast.error(`${removedItem.name} removed from KIT`, {
          position: "top-right",
          autoClose: 2000,
        });
        // sessionStorage.setItem("kitItems", JSON.stringify(state.kitItems));
      }
    },
    removeAllKit(state, action) {
      state.kitItems = [];
      // sessionStorage.setItem("kitItems", JSON.stringify(state.kitItems));
      toast.info("All items removed from KIT", {
        position: "top-right",
        autoClose: 2000,
      });
    },
  },
});

export const {
  addToKit,
  ChangeQuantityKit,
  ChangeOrderPriceKit,
  ChangeStoreKit,
  removeFromKit,

  setTotalPriceWithTax,
  removeAllKit,
} = kitSlice.actions;

export const PriceWithTax = (state) => state.kit.totalPriceWithTax;

export default kitSlice.reducer;
