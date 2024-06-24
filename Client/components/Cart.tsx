import { type } from "os";
import cartCloseIcon from "../public/assets/cartCloseIcon.png";
import cartImage from "../public/assets/CartImage.png";
import avalancheLogo from "../public/assets/AvalancheLogo.png";
import Image from "next/image";
import { uselistNFTToPurchaseContext } from "../context/listNFTContext";
import { useTransactionContext } from "../context/transactionContext";
import { useState } from "react";

type CartProps = {
  handleCartClose: () => void;
};

type CartHeaderProps = {
  handleCartClose: () => void;
};

type CartItemsProps = {
  itemsAddedToCart: any;
  clearCart: () => void;
};

type ItemPurchaseSectionProps = {
  purchaseNFT: any;
  itemsAddedToCart: any;
};

const CartHeader: React.FC<CartHeaderProps> = (props) => {
  const { handleCartClose } = props;
  return (
    <div className="d-flex justify-content-between align-items-center px-4 py-4 cart-section-header">
      <h1>Your Cart</h1>
      <div onClick={handleCartClose} className="cursor-pointer">
        <Image alt="cartCloseIcon" src={cartCloseIcon} height={20} />
      </div>
    </div>
  );
};

const CartItems: React.FC<CartItemsProps> = (props) => {
  const { itemsAddedToCart, clearCart } = props;
  const CartItemsHeader = () => {
    return (
      <div className="d-flex justify-content-between align-items-center cart-section-items-header">
        <span>{itemsAddedToCart?.length} Items</span>
        <span onClick={() => clearCart()}>Clear All</span>
      </div>
    );
  };
  const CartItem = (props: any) => {
    const { nft } = props;
    return (
      <div className="d-flex justify-content-between align-items-center py-3">
        <div>
          <img
            alt="selected item image"
            src={nft?.nft_image_uri}
            height={80}
            width={80}
          />
        </div>
        <div>
          <h1 className="cart-selected-item-name">{nft?.nft_name}</h1>
          <div className="d-flex">
            <h6 className="cart-selected-item-description">{nft?.nft_name}</h6>
            <span className="cart-selected-item-wight ms-2">
              {nft?.tokenId}
            </span>
          </div>
        </div>
        <div className="d-flex align-items-center justify-content-center cart-selected-item-price">
          <h6 className="p-0 m-0">{nft?.price}</h6>
          <div className="mx-2">
            <Image alt="avalanche logo" src={avalancheLogo} height={20} />
          </div>
          <span>{"($100)"}</span>
        </div>
      </div>
    );
  };
  return (
    <div className="cart-section-items px-4 py-4">
      <CartItemsHeader />
      {itemsAddedToCart.map((nft: any, index: any) => (
        <div key={`my-nft-${index}`}>
          <CartItem nft={nft} />
        </div>
      ))}
    </div>
  );
};

const ItemPurchaseSection: React.FC<ItemPurchaseSectionProps> = (props) => {
  const { purchaseNFT, itemsAddedToCart } = props;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateNFT = async (id: any) => {
    setIsLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/nft/nft/${id}`, {
        method: "PUT",
      });

      const response = await res.json();
      setIsLoading(false);
      if (res.status === 200) {
        // setUserData(response)
        // setIsAuthenticated(true)
        // setIsError(false)
      } else {
        // setIsError(true)
      }
      return response;
    } catch (error) {
      console.error(error);
      throw new Error("Error updating database");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchaseSubmission = async (nft: any) => {
    const soldTokenId = await purchaseNFT(
      nft?.contract_address,
      nft?.tokenId,
      nft?.price,
      nft?.seller
    );
    if (soldTokenId) {
      console.log("NFT Purchased Successfully");
      const updateDB = await updateNFT(nft?.tokenId);

      if (updateDB) {
        console.log("NFT Updated Successfully");
      } else {
        console.log("NFT Update failed");
      }
    }
  };

  const completePurchase = () => {
    itemsAddedToCart.map(handlePurchaseSubmission);
  };
  const TotalPrice = () => {
    return (
      <div className="d-flex justify-content-between align-items-center">
        <h6 className="cart-selected-total-price">Total Price</h6>
        <div className="d-flex align-items-center justify-content-center cart-selected-item-price">
          <h6 className="p-0 m-0">200</h6>
          <div className="mx-2">
            <Image alt="avalanche logo" src={avalancheLogo} height={20} />
          </div>
          <span>{"($200)"}</span>
        </div>
      </div>
    );
  };
  return (
    <div className="cart-section-items px-4 py-4">
      <TotalPrice />
      <div className="d-flex justify-content-center align-items-center py-3">
        <button
          className="cart-section-purchase-button"
          onClick={() => completePurchase()}
        >
          Complete Purchase
        </button>
      </div>
    </div>
  );
};

const Cart: React.FC<CartProps> = (props) => {
  const { handleCartClose } = props;
  const { itemsAddedToCart, clearCart } = uselistNFTToPurchaseContext();
  const { purchaseNFT } = useTransactionContext();
  return (
    <div
      style={{
        position: "absolute",
        zIndex: 1000,
        marginTop: "3rem",
      }}
      className="cart-section"
    >
      <CartHeader handleCartClose={handleCartClose} />
      <CartItems itemsAddedToCart={itemsAddedToCart} clearCart={clearCart} />
      <ItemPurchaseSection
        purchaseNFT={purchaseNFT}
        itemsAddedToCart={itemsAddedToCart}
      />
    </div>
  );
};

export default Cart;
