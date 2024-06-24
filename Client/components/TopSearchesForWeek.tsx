import Image from "next/image";
import topSearchedNFT from "../public/assets/TopSearchedNFT.png";
import { useState } from "react";
import AvalancheLogo from "../public/assets/AvalancheLogo.png";
import TopItemCart from "../public/assets/TopItemCart.png";

const TopSearchedNFT: React.FC = () => {
  return (
    <div className="px-2 px-lg-3">
      <div>
        {" "}
        <Image alt="top searched NFT image" src={topSearchedNFT} height={300} />
      </div>
      <div className="py-2 w-100 px-4 top-searched-nft-card">
        <div className="d-flex w-100 justify-content-between py-3">
          <span className="top-searched-nft-name">Heneggo Montoya</span>
          <span className="top-searched-nft-tokenId">#0001</span>
        </div>
        <div className="d-flex w-100 justify-content-between">
          <span className="top-searched-nft-trait">Legendary</span>
          <div className="d-flex">
            <span className="top-searched-nft-price-avax pe-1">1000</span>
            <div>
              <Image alt="top-searched-nft" src={AvalancheLogo} height={21} />
              <span className="top-searched-nft-price ps-1">($ 100)</span>
            </div>
          </div>
        </div>
        <div className="d-flex w-100 justify-content-between py-3">
          <button className="weeks-favorites-purchase-button">Buy now</button>
          <div className="d-flex align-items-center justify-content-center weeks-favorites-cart-logo py-1 px-3">
            <Image alt="cart-iocon" src={TopItemCart} height={19} />
          </div>
        </div>
      </div>
    </div>
  );
};

const TopSearchesForWeek: React.FC = () => {
  const [topSearchedNFTs, setTopSearchedNFTs] = useState<any>([1, 2, 3, 4, 5]);
  return (
    <div className="py-5 px-3">
      <div className="d-flex justify-content-center">
        <h1 className="top-searches-for-week-title text-center">
          Top Searches this week
        </h1>
      </div>
      <div className="py-5 d-flex justify-content-around top-searched-nfs-for-week">
        {topSearchedNFTs.map((nft: any, index: number) => {
          return <TopSearchedNFT key={index} />;
        })}
      </div>
    </div>
  );
};

export default TopSearchesForWeek;
