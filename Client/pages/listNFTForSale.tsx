import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { useTransactionContext } from "../context/transactionContext";
import { type } from "os";
import { useWalletContext } from "../context/wallletContext";
import { back_end_url } from "../utils/constants";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

type NFTProps = {
  metaDataURI: string;
  tokenID: string;
  setNftName: (value: string) => void;
  setNftImageURI: (value: string) => void;
};

type ListFormProps = {
  tokenID: string;
  walletAddress: string;
  contractAddress: string;
  handleListingSubmission: any;
  metaDataURI: string;
  nftName: string;
  nftImageURI: string;
  isSuccessfullyListed: boolean;
};

type PurchasedSuccessModelProps = {
  showPurchasedSuccessModel: boolean;
  setShowPurchasedSuccessModel: (value: boolean) => void;
  nftImageURI: string;
  nftName: string;
  isLoading: boolean;
  isSuccessfullyListed: boolean;
  tokenID: any;
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
    isSuccessfullyListed,
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
      id="purchasedSuccessModel"
      size="lg"
      show={showPurchasedSuccessModel}
      onHide={() => setShowPurchasedSuccessModel(false)}
      backdrop="static"
    >
      <Modal.Header closeButton style={{ borderBottom: "0" }}></Modal.Header>
      <Modal.Title className="text-center">
        <span className="purchasedSuccessModel-title">
          {" "}
          {isLoading ? "Please wait ..." : "Thank you !!!"}
        </span>
      </Modal.Title>
      <Modal.Body className="py-5">
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="d-flex flex-column flex-wrap justify-content-center align-items-center">
            {isSuccessfullyListed ? (
              <>
                <div className="py-5">
                  <NFT />
                </div>

                <span className="purchasedSuccessModel-message">{`You have succesfully listed your ${nftName} NFT for sale`}</span>
              </>
            ) : (
              <span className="purchasedSuccessModel-message">{`Unable to list your NFT for sale`}</span>
            )}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

const NFT: React.FC<NFTProps> = (props) => {
  const { metaDataURI, tokenID, setNftName, setNftImageURI } = props;
  const [name, setName] = useState<string>("");

  const NFTImage = (props: any) => {
    const { metadataURI, setNftName, setNftImageURI } = props;
    const [metadata, setMetaData] = useState<any>(null);
    useEffect(() => {
      (async () => {
        try {
          const response = await fetch(metadataURI);
          const metadata = await response.json();
          setNftName(metadata?.name);
          setName(metadata?.name);
          setNftImageURI(metadata?.image);
          setMetaData(metadata);
        } catch (err) {
          console.log(err);
        }
      })();
    }, [metadataURI]);
    return (
      <img src={metadata?.image} alt="NFT image" width={350} height={380} />
    );
  };
  const ShowNFTDetails = () => {
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
      <NFTImage
        metadataURI={metaDataURI}
        setNftName={setNftName}
        setNftImageURI={setNftImageURI}
      />
      <div
        className={`mynfts-section-nft-details px-3 py-2 w-100`}
        style={{
          width: "350px",
          height: "40px",
        }}
      >
        <ShowNFTDetails />
      </div>
    </div>
  );
};

const ListForm: React.FC<ListFormProps> = (props) => {
  const {
    tokenID,
    walletAddress,
    contractAddress,
    handleListingSubmission,
    metaDataURI,
    nftName,
    nftImageURI,
    isSuccessfullyListed,
  } = props;
  const [listingPrice, setListingPrice] = useState<string>("");
  const [selectedListingValue, setSelectedListingValue] =
    useState<string>("private");

  const handleRadioChange = (event: any) => {
    setSelectedListingValue(event.target.value);
  };
  const handleListFormSubmit = () => {
    const data = {
      contract_address: contractAddress,
      tokenId: tokenID,
      price: listingPrice,
      seller: walletAddress,
      meta_data_uri: metaDataURI,
      nft_name: nftName,
      nft_image_uri: nftImageURI,
      nft_sold: false,
      listing_type: "public",
    };
    handleListingSubmission(data);
  };

  const listFormInputs = () => {
    return (
      <div>
        <div className="pb-4">
          <label className="list-nft-sale-form-input-label">
            Select Type Of Listing
          </label>
          <div className="d-flex w-100 justify-content-between align-items-center py-3">
            <div className="d-flex  align-items-center">
              <label
                className={`sale-form-input-option-selected sale-form-input-option-selected-${
                  selectedListingValue === "private" ? true : false
                }`}
              >
                Private Listing
              </label>
              <input
                type="radio"
                value="private"
                className="ms-3 sale-form-input-option"
                checked={selectedListingValue === "private"}
                onChange={handleRadioChange}
              />
            </div>
            <div className="d-flex  align-items-center">
              <label
                className={`sale-form-input-option-selected sale-form-input-option-selected-${
                  selectedListingValue === "public" ? true : false
                }`}
              >
                Public Listing
              </label>
              <input
                type="radio"
                value="public"
                className="ms-3 sale-form-input-option"
                checked={selectedListingValue === "public"}
                onChange={handleRadioChange}
              />
            </div>
          </div>
          <div className="sale-form-input-section d-flex  align-items-center">
            <input
              value={`#${tokenID}`}
              disabled={true}
              className="sale-form-input-tokenId"
              style={{ width: `calc(${`#${tokenID}`.length}ch + 30px)` }}
            />
          </div>
        </div>
        <div className="py-4">
          <label className="list-nft-sale-form-input-label">Set A Price</label>
          <div className="sale-form-input-section d-flex  align-items-center my-3">
            <input
              className="sale-form-input-listingPrice"
              type="text"
              value={listingPrice}
              onChange={(e) => setListingPrice(e.target.value)}
            />
          </div>
          <div className="sale-form-input-section d-flex  align-items-center">
            <input
              value={`#${tokenID}`}
              disabled={true}
              className="sale-form-input-tokenId"
              style={{ width: `calc(${`#${tokenID}`.length}ch + 30px)` }}
            />
          </div>
        </div>
        <div className="py-4">
          <label className="list-nft-sale-form-input-label">Set Duration</label>
          <div className="sale-form-input-section d-flex  align-items-center  my-3">
            <input
              value={`#${tokenID}`}
              disabled={true}
              className="sale-form-input-tokenId"
              style={{ width: `calc(${`#${tokenID}`.length}ch + 30px)` }}
            />
          </div>
        </div>
      </div>
    );
  };

  const ListFormSummary = () => {
    return (
      <div>
        <div>
          <span>Listing Price</span>
          <div>Image</div>
        </div>
      </div>
    );
  };

  const PotentialEarning = () => {
    return (
      <div>
        <div>
          <span>Potential Earning</span>
          <div>Image</div>
        </div>
      </div>
    );
  };

  return (
    <div className="list-nft-sale-form py-5 px-5">
      {listFormInputs()}
      <div className="d-flex justify-content-center align-items-center">
        <span className="summary-line"></span>
        <span className="summary-text">SUMMARY</span>
        <span className="summary-line"></span>
      </div>
      <ListFormSummary />
      <div className="d-flex justify-content-center align-items-center ">
        {" "}
        <span className="summary-line w-100"></span>
      </div>
      <PotentialEarning />
      {!isSuccessfullyListed ? (
        <button
          className="list-nft-sale-form-button"
          onClick={handleListFormSubmit}
        >
          Complete Listing
        </button>
      ) : (
        <button
          className="list-nft-sale-form-button"
          disabled={true}
          style={{ cursor: "pointer" }}
        >
          Listed
        </button>
      )}
    </div>
  );
};

//buy nft page
const ListNFTForSale = () => {
  const router = useRouter();
  const contractAddress =
    typeof router.query.param1 === "string" ? router.query.param1 : "";
  const tokenID =
    typeof router.query.param2 === "string" ? router.query.param2 : "";
  const { getMetadataOfNFT } = useTransactionContext();
  const [metaDataURI, setMetaDataURI] = useState<string>("");
  const { walletAddress } = useWalletContext();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getApprovalToTransfer } = useTransactionContext();
  const [nftName, setNftName] = useState<string>("");
  const [nftImageURI, setNftImageURI] = useState<string>("");
  const [isSuccessfullyListed, setIsSuccessfulyListed] =
    useState<boolean>(false);
  const [successfullyListedNFT, setSuccessfullyListedNFT] = useState<any>([]);
  const [showPurchasedSuccessModel, setShowPurchasedSuccessModel] =
    useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const metadata = await getMetadataOfNFT(contractAddress, tokenID);
        setMetaDataURI(metadata);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const saveNFT = async (data: any) => {
    try {
      const res = await fetch(`${back_end_url}/nft/create-nft`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data,
        }),
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
      throw new Error("Error fetching User");
    }
  };

  const handleListingSubmission = async (data: any) => {
    setIsLoading(true);
    setShowPurchasedSuccessModel(true);
    const approved = await getApprovalToTransfer(
      data.contract_address,
      data.tokenId.toString()
    );
    if (approved === "Success") {
      const updateData = await saveNFT(data);
      if (updateData) {
        setIsSuccessfulyListed(true);
        setSuccessfullyListedNFT(updateData);
      } else {
        setIsSuccessfulyListed(false);
        setSuccessfullyListedNFT([]);
        console.log("Error updating database");
      }
    } else {
      setIsSuccessfulyListed(false);
      console.log("NFT transfer not successful");
    }
    setIsLoading(false);
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
            <NFT
              metaDataURI={metaDataURI}
              tokenID={tokenID}
              setNftImageURI={setNftImageURI}
              setNftName={setNftName}
            />
            <ListForm
              tokenID={tokenID}
              walletAddress={walletAddress}
              contractAddress={contractAddress}
              handleListingSubmission={handleListingSubmission}
              metaDataURI={metaDataURI}
              nftName={nftName}
              nftImageURI={nftImageURI}
              isSuccessfullyListed={isSuccessfullyListed}
            />
          </div>
          {showPurchasedSuccessModel && (
            <PurchasedSuccessModel
              showPurchasedSuccessModel={showPurchasedSuccessModel}
              setShowPurchasedSuccessModel={setShowPurchasedSuccessModel}
              nftImageURI={successfullyListedNFT?.nft_image_uri}
              nftName={successfullyListedNFT?.nft_name}
              isLoading={isLoading}
              isSuccessfullyListed={isSuccessfullyListed}
              tokenID={successfullyListedNFT?.tokenId}
            />
          )}
        </React.Fragment>
      </Layout>
    </div>
  );
};

export default ListNFTForSale;
