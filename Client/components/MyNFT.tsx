import React, { useEffect, useState } from "react";
import { useTransactionContext } from "../context/transactionContext";
import { useRouter } from "next/router";
import Image from "next/image";
import avalancheLogo from "../public/assets/AvalancheLogo.png";
import { back_end_url } from "../utils/constants";

type MyNFTProps = {
  nft: any;
  updateNFTsOwnedByUser: () => void;
};

type MyNFTImageProps = {
  metadataURI: string;
  setNftName: (value: string) => void;
  setNftImageURI: (value: string) => void;
};

const MyNFTImage: React.FC<MyNFTImageProps> = (props) => {
  const { metadataURI, setNftName, setNftImageURI } = props;
  const [metadata, setMetaData] = useState<any>(null);
  useEffect(() => {
    (async () => {
      const response = await fetch(metadataURI);
      const metadata = await response.json();
      setNftName(metadata?.name);
      setNftImageURI(metadata?.image);
      setMetaData(metadata);
    })();
  }, [metadataURI]);

  return <img src={metadata?.image} alt="NFT image" width={250} height={280} />;
};

const MyNFT: React.FC<MyNFTProps> = (props) => {
  const { nft, updateNFTsOwnedByUser } = props;
  const { checkApprovalToTransfer, getMetadataOfNFT } = useTransactionContext();
  const [metaDataURI, setMetaDataURI] = useState<string>("");
  const [nftName, setNftName] = useState<string>("");
  const [showListForSaleModal, setShowListForSaleModal] =
    useState<boolean>(false);
  const [nftImageURI, setNftImageURI] = useState<string>("");
  const [isApprovedToTransfer, setIsApprovedToTransfer] =
    useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();
  const [nftPrice, setNftPrice] = useState<string>("");

  const getNFT = async (contractAddress: string, tokenID: any) => {
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
      const metadata = await getMetadataOfNFT(
        nft?.contractAddress,
        nft?.tokenID
      );
      setMetaDataURI(metadata);
      const approved = await checkApprovalToTransfer(
        nft.contractAddress,
        nft.tokenID.toString()
      );
      if (approved === "Success") {
        setIsApprovedToTransfer(true);
        const listed = await getNFT(nft?.contractAddress, nft?.tokenID);
        setNftPrice(listed?.price);
        console.log("Approved");
      } else {
        setIsApprovedToTransfer(false);
        console.log("Not Approved");
      }
    })();
  }, []);

  const ShowNFTDetails = () => {
    return (
      <div className="d-flex w-100 justify-content-between align-items-center">
        <span>{nftName}</span>
        <div className="d-flex align-items-center">
          {nftPrice !== "" ? (
            <div className="me-2">
              <Image alt="avalanche logo" src={avalancheLogo} height={20} />
            </div>
          ) : null}
          <span>{nftPrice !== "" ? nftPrice : `#${nft?.tokenID}`}</span>
        </div>
      </div>
    );
  };

  const ShowNFTListingButton = () => {
    if (isApprovedToTransfer) {
      return (
        <div className="d-flex justify-content-between align-items-center w-100">
          <span>REMOVE LISTING</span>

          <span>...</span>
        </div>
      );
    }
    return (
      <div className="d-flex justify-content-between align-items-center w-100">
        <span>LIST FOR SALE</span>

        <span>...</span>
      </div>
    );
  };

  const handleClick = () => {
    if (!isApprovedToTransfer) {
      router.push(
        `/listNFTForSale?param1=${nft?.contractAddress}&param2=${nft?.tokenID}`
      );
    } else {
      router.push(
        `/updateListedNFT?param1=${nft?.contractAddress}&param2=${nft?.tokenID}`
      );
    }
  };

  return (
    <>
      <div className="mynft-card-conteiner">
        {isApprovedToTransfer ? (
          <div className="mynft-card-overlay d-flex align-items-center justify-content-center">
            <span>LISTED FOR SALE</span>
          </div>
        ) : (
          <div></div>
        )}

        <div
          onClick={() => handleClick()}
          className="mynft-card"
          style={{
            cursor: "pointer",
            width: "250px",
            overflow: "hidden",
            borderRadius: "5px",
            height: "320px",
          }}
        >
          <MyNFTImage
            metadataURI={metaDataURI}
            setNftName={setNftName}
            setNftImageURI={setNftImageURI}
          />
          <div
            className={`mynfts-section-nft-details mynfts-section-nft-details-${isHovering} px-3 py-2 w-100`}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{
              width: "250px",
              height: "40px",
            }}
          >
            {isHovering ? <ShowNFTListingButton /> : <ShowNFTDetails />}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyNFT;
