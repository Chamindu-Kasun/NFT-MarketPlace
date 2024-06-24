import { useEffect, useState } from "react";
import { useTransactionContext } from "../context/transactionContext";

type MyNFTsListedForSaleProps = {
  myNFTdata: any;
};

type MyNFTProps = {
  nft: any;
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
  const { nft } = props;
  const { checkApprovalToTransfer, getMetadataOfNFT } = useTransactionContext();
  const [metaDataURI, setMetaDataURI] = useState<string>("");
  const [nftName, setNftName] = useState<string>("");
  const [showListForSaleModal, setShowListForSaleModal] =
    useState<boolean>(false);
  const [nftImageURI, setNftImageURI] = useState<string>("");
  const [isApprovedToTransfer, setIsApprovedToTransfer] =
    useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);

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
        <div>
          <span>#{nft?.tokenID}</span>
        </div>
      </div>
    );
  };

  const ShowNFTListingButton = () => {
    return (
      <div className="d-flex justify-content-between align-items-center w-100">
        <span>REMOVE LISTING</span>

        <span>...</span>
      </div>
    );
  };

  return (
    <>
      {isApprovedToTransfer ? (
        <div className="mynft-card-conteiner">
          <div
            onClick={() => setShowListForSaleModal(true)}
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
              className="mynfts-section-nft-details px-3 py-2 w-100"
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
      ) : (
        <></>
      )}
    </>
  );
};

const MyNFTsListedForSale: React.FC<MyNFTsListedForSaleProps> = (props) => {
  const { myNFTdata } = props;
  return (
    <div className="px-5">
      <div className="d-flex justify-content-center pb-5">
        <span className="mynfts-section-header"> MY LISTINGS</span>
      </div>
      <div className="d-flex flex-wrap justify-content-center">
        {myNFTdata.map((mynft: any, index: number) => (
          <div key={`my-nft-${index}`} className="px-3 pb-5">
            <MyNFT nft={mynft} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyNFTsListedForSale;
