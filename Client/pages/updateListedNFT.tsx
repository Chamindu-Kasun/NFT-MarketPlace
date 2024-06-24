import { useRouter } from "next/router";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { useWalletContext } from "../context/wallletContext";
import { back_end_url } from "../utils/constants";
import React from "react";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";

type NFTProps = {
  nft: any;
};

type UpdateFormProps = {
  nft: any;
  handleUpdateSubmission: (value: any) => void;
  isSuccessfullyUpdated: boolean;
};

type UpdateSuccessModelProps = {
  showUpdateSuccessModel: boolean;
  setShowUpdateSuccessModel: (value: boolean) => void;
  nftImageURI: string;
  nftName: string;
  isLoading: boolean;
  isSuccessfullyUpdated: boolean;
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

const NFT: React.FC<NFTProps> = (props) => {
  const { nft } = props;

  const NFTImage = (props: any) => {
    const { nftImageURI } = props;
    return <img src={nftImageURI} alt="NFT image" width={350} height={380} />;
  };
  const ShowNFTDetails = (props: any) => {
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
      <NFTImage nftImageURI={nft?.nft_image_uri} />
      <div
        className={`mynfts-section-nft-details px-3 py-2 w-100`}
        style={{
          width: "350px",
          height: "40px",
        }}
      >
        <ShowNFTDetails name={nft?.nft_name} tokenID={nft?.tokenId} />
      </div>
    </div>
  );
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { nft, handleUpdateSubmission, isSuccessfullyUpdated } = props;
  const [listingPrice, setListingPrice] = useState<string>("");
  const [selectedListingValue, setSelectedListingValue] =
    useState<string>("private");

  const handleRadioChange = (event: any) => {
    setSelectedListingValue(event.target.value);
  };
  const handleUpdateFormSubmit = () => {
    const data = {
      id: nft?.id,
      price: listingPrice,
      nft_sold: false,
      listing_type: "public",
    };
    handleUpdateSubmission(data);
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
              value={`#${nft?.tokenId}`}
              disabled={true}
              className="sale-form-input-tokenId"
              style={{ width: `calc(${`#${nft?.tokenId}`.length}ch + 30px)` }}
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
              value={`#${nft?.tokenId}`}
              disabled={true}
              className="sale-form-input-tokenId"
              style={{ width: `calc(${`#${nft?.tokenId}`.length}ch + 30px)` }}
            />
          </div>
        </div>
        <div className="py-4">
          <label className="list-nft-sale-form-input-label">Set Duration</label>
          <div className="sale-form-input-section d-flex  align-items-center  my-3">
            <input
              value={`#${nft?.tokenId}`}
              disabled={true}
              className="sale-form-input-tokenId"
              style={{ width: `calc(${`#${nft?.tokenId}`.length}ch + 30px)` }}
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
      {!isSuccessfullyUpdated ? (
        <button
          className="list-nft-sale-form-button"
          onClick={handleUpdateFormSubmit}
        >
          Complete update
        </button>
      ) : (
        <button
          className="list-nft-sale-form-button"
          disabled={true}
          style={{ cursor: "pointer" }}
        >
          Updated
        </button>
      )}
    </div>
  );
};

const UpdateSuccessModel: React.FC<UpdateSuccessModelProps> = (props) => {
  const {
    showUpdateSuccessModel,
    setShowUpdateSuccessModel,
    nftImageURI,
    nftName,
    isLoading,
    isSuccessfullyUpdated,
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
      show={showUpdateSuccessModel}
      onHide={() => setShowUpdateSuccessModel(false)}
      backdrop="static"
    >
      <Modal.Header closeButton style={{ borderBottom: "0" }}></Modal.Header>
      <Modal.Title className="text-center">
        {" "}
        <span className="purchasedSuccessModel-title">
          {" "}
          {isLoading ? "Please wait ..." : "Done !!!"}
        </span>
      </Modal.Title>
      <Modal.Body className="py-5">
        <div className="d-flex flex-column flex-wrap justify-content-center align-items-center">
          {isSuccessfullyUpdated ? (
            <>
              <div className="py-5">
                <NFT />
              </div>

              <span className="purchasedSuccessModel-message">{`You have succesfully updated your ${nftName} NFT for sale`}</span>
            </>
          ) : (
            <span className="purchasedSuccessModel-message">{`Unable to update your NFT for sale`}</span>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

const UpdateListedNFT = () => {
  const { walletAddress } = useWalletContext();
  const router = useRouter();
  const contractAddress =
    typeof router.query.param1 === "string" ? router.query.param1 : "";
  const tokenID =
    typeof router.query.param2 === "string" ? router.query.param2 : "";
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [listedNFT, setListedNFT] = useState<any>([]);
  const [isSuccessfullyUpdated, setIsSuccessfullyUpdated] =
    useState<boolean>(false);
  const [showUpdateSuccessModel, setShowUpdateSuccessModel] =
    useState<boolean>(false);
  const [successfullyUpdatedNFT, setSuccessfullyUpdatedNFT] = useState<any>([]);

  const getNFT = async (contractAddress: string) => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${back_end_url}/nft/nft_by_address/${contractAddress}/${tokenID}`,
        {
          method: "GET",
        }
      );

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
      throw new Error("Error getting unsold nfts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const nftData = await getNFT(contractAddress);
        setListedNFT(nftData);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const updateNFT = async (data: any) => {
    try {
      const res = await fetch(`${back_end_url}/nft/update-nft`, {
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

  const handleUpdateSubmission = async (data: any) => {
    setIsLoading(true);
    setShowUpdateSuccessModel(true);
    const updateData = await updateNFT(data);
    if (updateData) {
      setIsSuccessfullyUpdated(true);
      setSuccessfullyUpdatedNFT(updateData);
    } else {
      setIsSuccessfullyUpdated(false);
      setSuccessfullyUpdatedNFT([]);
      console.log("Error updating database");
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
            <NFT nft={listedNFT} />
            <UpdateForm
              nft={listedNFT}
              handleUpdateSubmission={handleUpdateSubmission}
              isSuccessfullyUpdated={isSuccessfullyUpdated}
            />
          </div>
          {showUpdateSuccessModel && (
            <UpdateSuccessModel
              showUpdateSuccessModel={showUpdateSuccessModel}
              setShowUpdateSuccessModel={setShowUpdateSuccessModel}
              nftImageURI={successfullyUpdatedNFT?.nft_image_uri}
              nftName={successfullyUpdatedNFT?.nft_name}
              isLoading={isLoading}
              isSuccessfullyUpdated={isSuccessfullyUpdated}
              tokenID={successfullyUpdatedNFT?.tokenId}
            />
          )}
        </React.Fragment>
      </Layout>
    </div>
  );
};

export default UpdateListedNFT;
