import { useEffect, useState } from "react";
import { useTransactionContext } from "../context/transactionContext";
import router from "next/router";
import { uselistNFTToPurchaseContext } from "../context/listNFTContext";
import Image from "next/image";
import avalancheLogo from "../public/assets/AvalancheLogo.png";

type NFTforSaleProps = {
  nft: any;
  walletAddress: string;
};

type NFTImageProps = {
  nftImageURI: string;
};

const NFTImage: React.FC<NFTImageProps> = (props) => {
  const { nftImageURI } = props;
  return <img src={nftImageURI} alt="NFT image" width={"100%"} height={310} />;
};

const NFTforSale: React.FC<NFTforSaleProps> = (props) => {
  const { nft } = props;
  const { itemsAddedToCart } = uselistNFTToPurchaseContext();
  const [metaDataURI, setMetaDataURI] = useState<string>("");
  const [nftName, setNftName] = useState<string>("");
  const [nftImageURI, setNftImageURI] = useState<string>("");
  const { checkApprovalToTransfer } = useTransactionContext();
  const [isApprovedToTransfer, setIsApprovedToTransfer] =
    useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isAddedToCart, setIsAddedToCart] = useState<boolean>(false);
  const [isMyListing, setIsMyLisiting] = useState<boolean>(false);

  //check if NFT is added to cart
  const isNFTAddedToCart = () => {
    return itemsAddedToCart.some((item: any) => item.id === nft?.id);
  };

  //check is users listing
  const isNftAMyListing = () => {
    return nft?.seller === props.walletAddress;
  };
  useEffect(() => {
    (async () => {
      setMetaDataURI(nft?.meta_data_uri);
      setNftName(nft?.nft_name);
      setNftImageURI(nft?.nft_image_uri);
      const approved = await checkApprovalToTransfer(
        nft?.contract_address,
        nft?.tokenId.toString()
      );
      const myListing = isNftAMyListing();
      setIsMyLisiting(myListing);
      if (approved === "Success") {
        setIsApprovedToTransfer(true);
        console.log("Approved");
      } else {
        setIsApprovedToTransfer(false);
        console.log("Not Approved");
      }
    })();
  }, []);

  useEffect(() => {
    const isAdded = isNFTAddedToCart();
    setIsAddedToCart(isAdded);
  }, [itemsAddedToCart]);

  const ShowNFTDetails = () => {
    return (
      <div className="d-flex w-100 justify-content-between align-items-center">
        <span style={{ textTransform: "uppercase" }}>{nftName}</span>
        <div className="d-flex align-items-center py-2">
          <span>{nft?.price}</span>
          <div className="mx-2 d-flex align-items-center">
            <Image alt="avalanche logo" src={avalancheLogo} height={18} />
          </div>
          <span>{"(100 $)"}</span>
        </div>
      </div>
    );
  };

  const ShowNFTPurchaseButton = () => {
    return (
      <div className="d-flex justify-content-between align-items-center w-100">
        <span>PURCHASE NFT</span>

        <span>...</span>
      </div>
    );
  };

  const handleClick = () => {
    if (!isAddedToCart && !isMyListing) {
      router.push(`/buyNFT?param1=${nft?.id}`);
    }
  };

  return (
    <>
      {isApprovedToTransfer ? (
        <>
          <div
            onClick={() => handleClick()}
            className="mynft-card"
            style={{
              cursor: "pointer",
              width: "300px",
              overflow: "hidden",
              borderRadius: "5px",
              height: "350px",
            }}
          >
            {isMyListing ? (
              <div className="mynft-card-overlay d-flex align-items-center justify-content-center">
                <span>YOUR LISTING</span>
              </div>
            ) : (
              <div></div>
            )}
            {isAddedToCart ? (
              <div className="mynft-card-overlay d-flex align-items-center justify-content-center">
                <span>ADDED TO CART</span>
              </div>
            ) : (
              <div></div>
            )}
            <NFTImage nftImageURI={nftImageURI} />
            <div
              className="d-flex justify-content-between mynfts-section-nft-details px-3"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              style={{
                width: "100%",
                height: "40px",
              }}
            >
              {isHovering ? <ShowNFTPurchaseButton /> : <ShowNFTDetails />}
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default NFTforSale;
