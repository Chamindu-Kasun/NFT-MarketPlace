import WeeksFavorite from "../components/WeeksFavorite";
import TopSearchesForWeek from "../components/TopSearchesForWeek";
import TopChiknsForSale from "../components/TopChiknsForSale";
import Layout from "../components/Layout";
import mainBannerImage from "../public/assets/MainBannerImage.png";
import BroughtToYouByImage from "../public/assets/BroughtToYouByImageDark.png";
import BroughtToYouByImageLight from "../public/assets/BroughtToYouByImageLight.png";
import Image from "next/image";
import { useMode } from "../context/modeContext";

//Main banner
const MainBanner: React.FC = () => {
  const { mode } = useMode();
  return (
    <div className="main-banner-container px-4 px-md-5 py-5">
      <div className="pt-5">
        <div>
          <div>
            <h1 className="main-banner-label">
              Brought to{" "}
              <span>
                <br className="d-flex d-md-none" />
                you by
              </span>
              <Image
                alt="main banner nft"
                src={
                  mode === "dark"
                    ? BroughtToYouByImage
                    : BroughtToYouByImageLight
                }
                height={70}
                style={{
                  display: "inline-block",
                  marginLeft: "10px",
                  marginBottom: "10px",
                }}
              />
            </h1>
          </div>
          <span className="main-banner-description">
            Welcome to our NFT marketplace! Here, you can browse and purchase
            NFTs from the Chikn ecosystem. Thank you for visiting and happy
            shopping!
          </span>
        </div>
      </div>
      <div className="image-container d-flex justify-content-center justify-content-lg-end align-items-center">
        <div className="d-none d-md-block">
          <Image alt="main banner nft" src={mainBannerImage} height={480} />
        </div>
        <div className="d-block d-md-none">
          <Image alt="main banner nft" src={mainBannerImage} height={310} />
        </div>
      </div>
    </div>
  );
};

//home page
export default function Home() {
  return (
    <div>
      <Layout>
        <MainBanner />
        <WeeksFavorite />
        <TopSearchesForWeek />
        <TopChiknsForSale />
      </Layout>
    </div>
  );
}
