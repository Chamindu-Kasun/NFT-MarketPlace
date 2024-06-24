import Image from "next/image";
import mainBannerImage from "../public/assets/MainBannerImage.png";
import weeksFavoriteImage from "../public/assets/WeeksFavorites.png";

//UI showing in large screens
const CourosalLargeScreenView: React.FC = () => {
  const ChiknNFT: React.FC = () => {
    return (
      <div>
        <div className="top-searches-for-sale-image-container">
          <Image alt="main banner nft" src={mainBannerImage} height={350} />
          <div className="top-searches-for-sale-image-overlay" />
        </div>
      </div>
    );
  };

  const ChiknNFTSelected: React.FC = () => {
    return (
      <div className="px-3">
        <Image alt="main banner nft" src={mainBannerImage} height={450} />
      </div>
    );
  };

  return (
    <div className="d-flex pt-5 align-items-center">
      <ChiknNFT />
      <ChiknNFTSelected />
      <ChiknNFT />
    </div>
  );
};

//UI showing in small screens
const CourosalSmallScreenView: React.FC = () => {
  const ChiknNFTSelected = () => {
    return (
      <div className="p-5 d-flex justify-content-center align-items-center">
        <Image
          alt="main banner nft"
          src={mainBannerImage}
          height={300}
          style={{ borderRadius: 10 }}
        />
      </div>
    );
  };

  const ChiknNFTnotSelected = () => {
    return (
      <div className="px-2">
        <div className="top-searches-for-sale-image-container">
          <Image
            alt="main banner nft"
            src={mainBannerImage}
            height={150}
            style={{ borderRadius: 10 }}
          />
          <div className="top-searches-for-sale-image-overlay" />
        </div>
      </div>
    );
  };
  return (
    <div>
      <ChiknNFTSelected />
      <div className="d-flex top-searches-for-sale-courosol-mobile">
        <ChiknNFTnotSelected />
        <ChiknNFTnotSelected />
        <ChiknNFTnotSelected />
        <ChiknNFTnotSelected />
        <ChiknNFTnotSelected />
        <ChiknNFTnotSelected />
      </div>
    </div>
  );
};

const TopChiknsForSale: React.FC = () => {
  return (
    <div className="py-5 px-3">
      <div className="d-flex justify-content-center">
        <h1 className="top-searches-for-sale-title">Top Chikns for Sale</h1>
      </div>
      <div className="d-lg-none">
        <CourosalSmallScreenView />
      </div>
      <div className="d-none d-lg-flex justify-content-center">
        <CourosalLargeScreenView />
      </div>
    </div>
  );
};

export default TopChiknsForSale;
