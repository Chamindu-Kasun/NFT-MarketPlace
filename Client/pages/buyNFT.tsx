import router, { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { useWalletContext } from "../context/wallletContext";
import React from "react";
import avalancheLogo from "../public/assets/AvalancheLogo.png";
import addToCartLogo from "../public/assets/TopItemCartLight.png";
import Image from "next/image";
import { uselistNFTToPurchaseContext } from "../context/listNFTContext";
import { useTransactionContext } from "../context/transactionContext";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

type NFTProps = {
  nft: any;
};

type BuyNftFormProps = {
  nft: any;
  handlePurchaseSubmission: (value: any) => void;
};

type PurchasedSuccessModelProps = {
  showPurchasedSuccessModel: boolean;
  setShowPurchasedSuccessModel: (value: boolean) => void;
  nftImageURI: string;
  nftName: string;
  isLoading: boolean;
  isSuccessfullyPerchased: boolean;
  tokenID: any;
};

const LoadingSpinner: React.FC = () => {
  return (
    <div className="d-flex  justify-content-center align-items-center">
      <Spinner
        animation="border"
        size="sm"
        style={{ width: "3rem", height: "3rem", marginRight: "0.5rem" }}
      />
      <Spinner
        animation="border"
        style={{ width: "5rem", height: "5rem", marginRight: "0.5rem" }}
      />
      <Spinner
        animation="grow"
        size="sm"
        style={{ width: "3rem", height: "3rem", marginRight: "0.5rem" }}
      />
      <Spinner
        animation="grow"
        style={{ width: "5rem", height: "5rem", marginRight: "0.5rem" }}
      />
    </div>
  );
};

const PurchasedSuccessModel: React.FC<PurchasedSuccessModelProps> = (props) => {
  const {
    showPurchasedSuccessModel,
    setShowPurchasedSuccessModel,
    nftImageURI,
    nftName,
    isLoading,
    isSuccessfullyPerchased,
    tokenID,
  } = props;

  const NFT = () => {
    const NFTImage = (props: any) => {
      const { nftImageURI } = props;
      return <img src={nftImageURI} alt="NFT image" width={350} height={380} />;
    };
    const NFTDetails = (props: any) => {
      const { name, tokenID } = props;
      return (
        <div className="d-flex w-100 justify-content-between align-items-center">
          <span>{name}</span>
          <div>
            <span>#{tokenID}</span>
          </div>
        </div>
      );
    };
    return (
      <div
        className="mynft-card"
        style={{
          cursor: "pointer",
          width: "350px",
          overflow: "hidden",
          borderRadius: "5px",
          height: "420px",
        }}
      >
        <NFTImage nftImageURI={nftImageURI} />
        <div
          className={`mynfts-section-nft-details px-3 py-2 w-100`}
          style={{
            width: "350px",
            height: "40px",
          }}
        >
          <NFTDetails name={nftName} tokenID={tokenID} />
        </div>
      </div>
    );
  };

  return (
    <Modal
      size="lg"
      show={showPurchasedSuccessModel}
      onHide={() => setShowPurchasedSuccessModel(false)}
      backdrop="static"
    >
      <Modal.Header closeButton style={{ borderBottom: "0" }}></Modal.Header>
      <Modal.Title className="text-center">
        <span className="purchasedSuccessModel-title">
          {" "}
          {isLoading ? (
            "Please wait ..."
          ) : (
            <>{isSuccessfullyPerchased ? "Congradulations !!!" : "Sorry !!!"}</>
          )}
        </span>
      </Modal.Title>
      <Modal.Body className="py-5">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="d-flex flex-column flex-wrap justify-content-center align-items-center">
            {isSuccessfullyPerchased ? (
              <>
                <div className="py-5">
                  <NFT />
                </div>
                <span className="purchasedSuccessModel-message">{`You have succesfully purchased ${nftName} NFT`}</span>
              </>
            ) : (
              <span className="purchasedSuccessModel-message">{`Unable to purchase NFT`}</span>
            )}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

//redirect user - when there is no wallet address
const WalletRedirect: React.FC<{ walletAddress: string }> = ({
  walletAddress,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (walletAddress === "") {
      router.push("/");
    }
  }, [walletAddress, router]);

  return null;
};

const NFT: React.FC<NFTProps> = (props) => {
  const { nft } = props;
  const [isHeartClicked, setHeartClicked] = useState<boolean>(false);
  const { itemsLiked, addItemToLiked, removeItemFromLiked } =
    uselistNFTToPurchaseContext();

  const NFTImage = (props: any) => {
    const { nft_image_uri } = props;

    return <img src={nft_image_uri} alt="NFT image" width={350} height={380} />;
  };
  const ShowNFTDetails = (props: any) => {
    const { nft_name, tokenId } = props;
    return (
      <div className="d-flex w-100 justify-content-between align-items-center">
        <span>{nft_name}</span>
        <div>
          <span>#{tokenId}</span>
        </div>
      </div>
    );
  };

  const handleHeartClick = () => {
    setHeartClicked(!isHeartClicked);
    if (isHeartClicked !== true) {
      addItemToLiked(nft);
    } else {
      removeItemFromLiked(nft);
    }
  };

  useEffect(() => {
    const itemAlreadyExists = itemsLiked.some(
      (likedItem: any) => likedItem.id === nft.id
    );

    if (!itemAlreadyExists) {
      setHeartClicked(false);
    } else {
      setHeartClicked(true);
    }
  }, [nft]);

  return (
    <div className="buy-nft-image-conteiner">
      <div className="buy-nft-image-overlay">
        <span
          style={{ fontSize: "25px", cursor: "pointer" }}
          className="ms-2"
          onClick={() => handleHeartClick()}
        >
          {isHeartClicked ? <>❤️</> : <>🤍</>}
        </span>
      </div>
      <div
        className="mynft-card"
        style={{
          cursor: "pointer",
          width: "350px",
          overflow: "hidden",
          borderRadius: "5px",
          height: "420px",
        }}
      >
        <NFTImage nft_image_uri={nft.nft_image_uri} />
        <div
          className={`mynfts-section-nft-details px-3 py-2 w-100`}
          style={{
            width: "350px",
            height: "40px",
          }}
        >
          <ShowNFTDetails nft_name={nft.nft_name} tokenId={nft.tokenId} />
        </div>
      </div>
    </div>
  );
};

const BuyNftForm: React.FC<BuyNftFormProps> = (props) => {
  //add item to cart
  const { addItemToCart } = uselistNFTToPurchaseContext();
  const { nft, handlePurchaseSubmission } = props;
  return (
    <div className="mx-5">
      <div>
        <h1 className="buy-nft-name">{nft.nft_name}</h1>
      </div>
      <div className="py-3 d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-between align-items-center buy-nft-attributes">
          <h6 className="p-0 m-0">Rarity : </h6>
          <span className="ms-2">Legendary</span>
        </div>
        <div className="d-flex justify-content-between align-items-center buy-nft-attributes">
          <h6 className="p-0 m-0">Weight</h6>
          <span className="ms-2">20KG</span>
        </div>
      </div>
      <div className="p-3 buy-nft-sale-price-section">
        <div>
          <h6 className="buy-nft-price">Sale Price</h6>
        </div>
        <div className="d-flex align-items-center justify-content-start buy-nft-selected-item-price">
          <h6 className="p-0 m-0">{nft.price}</h6>
          <div className="mx-2">
            <Image alt="avalanche logo" src={avalancheLogo} height={20} />
          </div>
          <span>{"($200)"}</span>
        </div>
      </div>
      <div className="d-flex justify-content-start align-items-center py-5">
        <button
          className="btn btn-primary buy-nft-button"
          onClick={() => handlePurchaseSubmission(nft)}
        >
          Buy Now
        </button>
        <div
          className="ms-5 d-flex justify-content-center align-items-center border-box buy-nft-cart px-2 py-1"
          onClick={() => addItemToCart(nft)}
        >
          <Image alt="avalanche logo" src={addToCartLogo} height={25} />
        </div>
      </div>
    </div>
  );
};

//buy nft page
const BuyNFT = () => {
  const { walletAddress } = useWalletContext();
  const id = typeof router.query.param1 === "string" ? router.query.param1 : "";
  const [nftForSale, setNftForSale] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const { purchaseNFT } = useTransactionContext();
  const [isSuccessfullyPerchased, setIsSuccessfulyPerchased] =
    useState<boolean>(false);
  const [successfullyPerchasedNFT, setSuccessfullyPerchasedNFT] = useState<any>(
    []
  );
  const [showPurchasedSuccessModel, setShowPurchasedSuccessModel] =
    useState<boolean>(false);

  const updateNFT = async (id: any) => {
    try {
      const res = await fetch(`http://localhost:5000/nft/nft/${id}`, {
        method: "PUT",
      });
      setIsLoading(false);
      if (res.status === 200) {
        const response = await res.json();
        return response;
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error updating database");
    }
  };

  const handlePurchaseSubmission = async (nft: any) => {
    setIsLoading(true);
    setShowPurchasedSuccessModel(true);
    const soldTokenId = await purchaseNFT(
      nft?.contract_address,
      nft?.tokenId,
      nft?.price,
      nft?.seller
    );
    console.log(soldTokenId);
    if (soldTokenId !== null) {
      console.log("NFT Purchased Successfully");
      const purchasedNFT = await updateNFT(nft?.id);
      console.log(purchasedNFT);
      if (purchasedNFT) {
        setIsSuccessfulyPerchased(true);
        setSuccessfullyPerchasedNFT(purchasedNFT);
      } else {
        setIsSuccessfulyPerchased(false);
        setSuccessfullyPerchasedNFT([]);
        console.log("Error updating database");
      }
    } else {
      setIsSuccessfulyPerchased(false);
      console.log("NFT purchase was not successful");
    }
    setIsLoading(false);
  };

  //get unsold nfts from database
  useEffect(() => {
    const fetchNfts = async () => {
      const nftData = await fetchNFTListedUnsold();
      if (nftData !== null) {
        setNftForSale(nftData);
      }
    };
    fetchNfts();
  }, []);

  const fetchNFTListedUnsold = async () => {
    try {
      const res = await fetch(`http://localhost:5000/nft/nft/${id}`, {
        method: "GET",
      });

      const response = await res.json();
      setIsLoading(false);
      if (res.status === 200) {
        setIsError(false);
        return response;
      } else {
        setIsError(true);
        return null;
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error fetching User");
    }
  };

  return (
    <div>
      <Layout>
        <WalletRedirect walletAddress={walletAddress} />
        <React.Fragment>
          <div
            className="d-flex flex-wrap justify-content-center py-5"
            style={{ gap: "10%" }}
          >
            <NFT nft={nftForSale} />
            <BuyNftForm
              nft={nftForSale}
              handlePurchaseSubmission={handlePurchaseSubmission}
            />
          </div>
          {showPurchasedSuccessModel && (
            <PurchasedSuccessModel
              showPurchasedSuccessModel={showPurchasedSuccessModel}
              setShowPurchasedSuccessModel={setShowPurchasedSuccessModel}
              nftImageURI={successfullyPerchasedNFT?.nft_image_uri}
              nftName={successfullyPerchasedNFT?.nft_name}
              isLoading={isLoading}
              isSuccessfullyPerchased={isSuccessfullyPerchased}
              tokenID={successfullyPerchasedNFT?.tokenId}
            />
          )}
        </React.Fragment>
      </Layout>
    </div>
  );
};

export default BuyNFT;
