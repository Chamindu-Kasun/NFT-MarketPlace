import Image from "next/image";
import weeksFavoriteImage from "../public/assets/WeeksFavorites.png";
import AvalancheLogo from "../public/assets/AvalancheLogo.png";
import TopItemCart from "../public/assets/TopItemCart.png";
import TopItemCartLight from "../public/assets/TopItemCartLight.png";
import { useMode } from "../context/modeContext";

const WeeksFavorite: React.FC = () => {
  const { mode } = useMode();
  //image section large screen
  const WeeksFavoriteImageLargeScreen = () => {
    return (
      <div className="outer-container d-none d-lg-flex">
        <div className="weeks-favorites-nft-container">
          <div className="weeks-favorite-nft-background-rectangle"></div>
          <div className="weeks-favorites-nft">
            <Image
              alt="weeks-favorite-nft"
              src={weeksFavoriteImage}
              height={363}
            />
          </div>
        </div>
      </div>
    );
  };
  //image section small screen
  const WeeksFavoriteImageSmallScreen = () => {
    return (
      <div className="outer-container d-lg-none">
        <div className="weeks-favorites-nft-container">
          {/* <div className="weeks-favorite-nft-background-rectangle"></div> */}
          <div className="d-flex weeks-favorites-nft justify-content-center align-items-center">
            <Image
              alt="weeks-favorite-nft"
              src={weeksFavoriteImage}
              height={300}
            />
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="py-5 weeks-favorites-container px-3">
      <WeeksFavoriteImageLargeScreen />
      <div className="px-3">
        <h1 className="weeks-favorites-title py-4 text-center text-lg-start">
          This week's favorites
        </h1>
        <WeeksFavoriteImageSmallScreen />
        <span className="weeks-favorites-description">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem ipsum is simply dummy text of the printing and
          typesetting industry.
        </span>
        <div className="d-flex justify-content-center justify-content-lg-start">
          <div className="py-4 weeks-favorites-purchase-section">
            <div className="d-flex w-100 justify-content-between py-3">
              <span className="weeks-favorites-nft-name">Heneggo Montoya</span>
              <span className="weeks-favorites-nft-tokenId">#0001</span>
            </div>
            <div className="d-flex w-100 justify-content-between">
              <span className="weeks-favorites-nft-trait">Legendary</span>
              <div className="d-flex">
                <span className="weeks-favorites-nft-price-avax pe-1">
                  1000
                </span>
                <div>
                  <Image
                    alt="weeks-favorite-nft"
                    src={AvalancheLogo}
                    height={21}
                  />
                  <span className="weeks-favorites-nft-price ps-1">
                    ($ 100)
                  </span>
                </div>
              </div>
            </div>
            <div className="d-flex w-100 justify-content-between py-3">
              <button className="weeks-favorites-purchase-button">
                Buy now
              </button>
              <div className="d-flex align-items-center justify-content-center weeks-favorites-cart-logo py-1 px-3">
                <Image
                  alt="cart-iocon"
                  src={mode === "dark" ? TopItemCart : TopItemCartLight}
                  height={19}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeksFavorite;
