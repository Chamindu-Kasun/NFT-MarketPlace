import Image from "next/image";
import FooterLogoDark from "../public/assets/FooterLogoDark.png";
import FooterLogoLight from "../public/assets/FooterLogoLight.png";

import TwitterLogo from "../public/assets/TwitterLogo.png";
import DiscordLogo from "../public/assets/DiscordLogo.png";
import { useMode } from "../context/modeContext";

const Footer: React.FC = () => {
  const { mode } = useMode();
  return (
    <div>
      <div className="py-3 px-3">
        <div className="w-100 d-flex justify-content-center">
          <Image
            alt=" Footer Logo"
            src={mode === "dark" ? FooterLogoDark : FooterLogoLight}
            height={60}
          />
        </div>
        <div>
          <h5 className="text-center py-2 footer-text-welcome">
            Welcome to our NFT marketplace! Here, you can
            <br className="d-none d-lg-block" /> browse and purchase
          </h5>
        </div>
        <div className="w-100 d-flex justify-content-center">
          <Image
            alt="Twitter Logo"
            src={TwitterLogo}
            height={17}
            style={{ cursor: "pointer", marginRight: "10px" }}
          />
          <Image
            alt="Discord Logo"
            src={DiscordLogo}
            height={17}
            className="mx-2"
            style={{ cursor: "pointer", marginLeft: "10px" }}
          />
        </div>
      </div>
      <div className="w-100 h-25 d-flex justify-content-center align-items-center py-3 footer-bottom-section">
        <h5 className="footer-text-codimite">© 2022. CODIMITE (PVT) Ltd.</h5>
      </div>
    </div>
  );
};

export default Footer;
