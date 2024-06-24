import { useEffect, useState } from "react";
import { uselistNFTToPurchaseContext } from "../context/listNFTContext";

type NFTProps = {
  nft: any;
};

const NFT: React.FC<NFTProps> = (props) => {
  const { nft } = props;
  const [isHeartClicked, setHeartClicked] = useState<boolean>(true);
  const { addItemToLiked, removeItemFromLiked } = uselistNFTToPurchaseContext();

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

  return (
    <div className="buy-nft-image-conteiner">
      <div className="buy-nft-image-overlay">
        <span
          style={{ fontSize: "25px", cursor: "pointer" }}
          className="ms-2"
          onClick={() => setHeartClicked(!isHeartClicked)}
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

const MyFavoriteNFTs: React.FC = () => {
  const { itemsLiked } = uselistNFTToPurchaseContext();
  console.log(itemsLiked);
  return (
    <div className="d-flex flex-wrap align-items-center justify-content-center">
      {itemsLiked.map((mynft: any, index: number) => (
        <div key={`my-nft-${index}`} className="px-3 pb-5">
          <NFT nft={mynft} />
        </div>
      ))}
    </div>
  );
};

export default MyFavoriteNFTs;
