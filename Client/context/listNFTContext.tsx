import { createContext, useContext } from "react";
import { useState } from "react";

type ListNFTToPurchaseContextProps = {
  itemsAddedToCart: any;
  addItemToCart: (item: any) => void;
  removeItemFromCart: (index: number) => void;
  clearCart: () => void;
  itemsLiked: any;
  addItemToLiked: (item: any) => void;
  removeItemFromLiked: (item: any) => void;
};

const ListNFTToPurchaseContext = createContext<ListNFTToPurchaseContextProps>({
  itemsAddedToCart: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearCart: () => {},
  itemsLiked: [],
  addItemToLiked: () => {},
  removeItemFromLiked: () => {},
});

export const ListNFTToPurchaseProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [itemsAddedToCart, setItemsAddedToCart] = useState<any>([]);
  const [itemsLiked, setItemsLiked] = useState<any>([]);

  const addItemToCart = (item: any) => {
    setItemsAddedToCart([...itemsAddedToCart, item]);
  };

  const removeItemFromCart = (index: number) => {
    const newItems = [...itemsAddedToCart];
    newItems.splice(index, 1);
    setItemsAddedToCart(newItems);
  };

  const clearCart = () => {
    setItemsAddedToCart([]);
  };

  const addItemToLiked = (item: any) => {
    const itemAlreadyExists = itemsLiked.some(
      (likedItem: any) => likedItem.id === item.id
    );

    if (!itemAlreadyExists) {
      setItemsLiked([...itemsLiked, item]);
    }
  };

  const removeItemFromLiked = (item: any) => {
    const index = itemsLiked.findIndex(
      (likedItem: any) => likedItem.id === item.id
    );
    const newItems = [...itemsLiked];
    newItems.splice(index, 1);
    setItemsLiked(newItems);
  };

  const contextValue = {
    itemsAddedToCart,
    addItemToCart,
    removeItemFromCart,
    clearCart,
    itemsLiked,
    addItemToLiked,
    removeItemFromLiked,
  };
  return (
    <ListNFTToPurchaseContext.Provider value={contextValue}>
      {children}
    </ListNFTToPurchaseContext.Provider>
  );
};

// uselistNFTToPurchase hook
export function uselistNFTToPurchaseContext() {
  return useContext(ListNFTToPurchaseContext);
}
