import Modal from "react-bootstrap/Modal";
import Image from "next/image";
import chiknTradeLogo from "../public/assets/ChiknTradeLight.png";
import topNavBarPurseImage from "../public/assets/TopNavBarPurseImage.png";
import { useWalletContext } from "../context/wallletContext";

type ConnectWalletModelProps = {
  showConnectWalletModel: boolean;
  setShowConnectWalletModel: (value: boolean) => void;
};

const ConnectWalletModel: React.FC<ConnectWalletModelProps> = (props) => {
  const { showConnectWalletModel, setShowConnectWalletModel } = props;
  const { connectWallet } = useWalletContext();
  return (
    <Modal
      size="lg"
      show={showConnectWalletModel}
      onHide={() => setShowConnectWalletModel(false)}
    >
      <Modal.Header closeButton style={{ borderBottom: "0" }}></Modal.Header>
      <Modal.Body className="py-5">
        <div className="d-flex flex-column justify-content-center align-items-center">
          <div>
            <Image alt="chikn logo" src={chiknTradeLogo} height={80} />
          </div>
          <div className="py-4">
            <span className="connect-wallet-address-modal-title">
              Crack open a world of posibilities!
            </span>
          </div>
          <div className="pb-4">
            <span className="connect-wallet-address-modal-description">
              Connect your wallet to purchase amizing NFTs and sell your own
            </span>
          </div>
          <div>
            <div className="wallet-button-section d-flex">
              <button
                className="wallet-connect-button"
                onClick={() => connectWallet()}
              >
                <span
                  className={`topnavbar-label`}
                  style={{ color: "#ffffff" }}
                >
                  CONNECT WALLET
                </span>
              </button>
              <Image
                alt="Purse image"
                src={topNavBarPurseImage}
                height={35}
                style={{ padding: 5, margin: 0 }}
              />
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ConnectWalletModel;
