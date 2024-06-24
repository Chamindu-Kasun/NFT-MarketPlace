import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Image from "next/image";
import chiknTradeLogo from "../public/assets/ChiknTrade.png";
import chiknTradeLogoLight from "../public/assets/ChiknTradeLight.png";
import topNavBarInputImage from "../public/assets/TopNavBarInputImage.png";
import topNavBarInputImageLight from "../public/assets/TopNavBarInputImageLight.png";
import topNavBarChiknImage from "../public/assets/TopNavBarChiknImage.png";
import topNavBarPurseImage from "../public/assets/TopNavBarPurseImage.png";
import topNavBarCartImage from "../public/assets/TopNavBarCart.png";
import topNavBarCartImageLight from "../public/assets/TopNavBarCartLight.png";
import topNavBarMoonImage from "../public/assets/TopNavMoonImage.png";
import topNavBarMoonImageLight from "../public/assets/TopNavMoonImageLight.png";

import { useMode } from "../context/modeContext";
import { useWalletContext } from "../context/wallletContext";
import router from "next/router";
import { useState } from "react";
import Cart from "./Cart";
import { uselistNFTToPurchaseContext } from "../context/listNFTContext";
import ConnectWalletModel from "./ConnectWalletModel";
import React from "react";

const TopNavBar: React.FC = () => {
  const { toggleMode, mode } = useMode();
  const { walletAddress, connectWallet, disconnectWallet } = useWalletContext();
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const { itemsAddedToCart } = uselistNFTToPurchaseContext();
  const [showConnectWalletModel, setShowConnectWalletModel] =
    useState<boolean>(false);

  const handleWalletAddressConnect = () => {
    if (walletAddress !== "") {
      disconnectWallet();
    } else {
      connectWallet();
    }
  };

  const handleItemClick = (rediectTo: string) => {
    if (walletAddress === "") {
      setShowConnectWalletModel(true);
    } else {
      router.push(`/${rediectTo}`);
    }
  };

  const handleCartOpen = () => {
    setIsCartOpen(true);
  };

  const handleCartClose = () => {
    setIsCartOpen(false);
  };

  return (
    <React.Fragment>
      <Navbar expand="lg" className="py-3">
        <Container fluid className="px-3 px-md-4 px-lg-5">
          <Navbar.Brand>
            <div className="d-flex">
              <div style={{ cursor: "pointer" }}>
                <Image
                  onClick={() => handleItemClick("user")}
                  alt="chikn logo"
                  src={mode === "dark" ? chiknTradeLogo : chiknTradeLogoLight}
                  height={40}
                />
              </div>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <div className="d-lg-flex justify-content-between  w-100 align-items-center pt-lg-2 pe-0 pe-md-5 pe-lg-0">
              <div className="px-0 px-lg-5 d-flex justify-content-between w-100 py-5 py-lg-0">
                <div
                  className={`d-flex topnavbar-input-section align-items-center px-3 pb-1`}
                >
                  <input
                    className={`topnavbar-input`}
                    placeholder="Search NFTs"
                  />
                  <div>
                    {" "}
                    <Image
                      alt="Input Logo"
                      src={
                        mode === "dark"
                          ? topNavBarInputImage
                          : topNavBarInputImageLight
                      }
                      height={20}
                    />
                  </div>
                </div>
              </div>
              <div
                className={`d-lg-flex topnavbar-icon justify-content-between align-items-center w-100`}
              >
                <div className="d-flex justify-content-between w-100 align-items-center">
                  <span
                    className={`topnavbar-label d-none d-md-block`}
                    onClick={() => handleItemClick("explore")}
                  >
                    Explore
                  </span>
                  <span
                    className={`topnavbar-label d-none d-md-block`}
                    onClick={() => handleItemClick("stats")}
                  >
                    Stats
                  </span>

                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => handleItemClick("profile")}
                  >
                    <Image
                      alt="Chikn image"
                      src={topNavBarChiknImage}
                      height={30}
                    />
                  </div>

                  <div
                    style={{
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    <Image
                      alt="Cart image"
                      src={
                        mode === "dark"
                          ? topNavBarCartImage
                          : topNavBarCartImageLight
                      }
                      height={mode === "dark" ? 35 : 30}
                      style={{ padding: 5, margin: 0 }}
                      onClick={handleCartOpen}
                    />
                    {itemsAddedToCart.length === 0 ? null : (
                      <div className="topnavbar-cart-count">
                        {itemsAddedToCart.length}
                      </div>
                    )}
                    {isCartOpen && (
                      <>
                        <div className="topnavbar-cart-backdrop"></div>
                        <Cart handleCartClose={handleCartClose} />
                      </>
                    )}
                  </div>

                  <div
                    onClick={() => toggleMode()}
                    style={{ cursor: "pointer" }}
                  >
                    <Image
                      alt="Moon image"
                      src={
                        mode === "dark"
                          ? topNavBarMoonImage
                          : topNavBarMoonImageLight
                      }
                      height={mode === "dark" ? 35 : 30}
                      style={{ padding: 5, margin: 0 }}
                    />
                  </div>

                  <div>
                    <div className="wallet-button-section d-flex">
                      <button
                        className="wallet-connect-button"
                        onClick={handleWalletAddressConnect}
                      >
                        <span
                          className={`topnavbar-label`}
                          style={{ color: "#ffffff" }}
                        >
                          {walletAddress === "" ? "Connect" : "Disonnect"}
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
              </div>
              <div className="pt-3 d-flex">
                <span
                  className={`topnavbar-label d-block d-md-none`}
                  onClick={() => handleItemClick("explore")}
                >
                  Explore
                </span>
                <span
                  className={`topnavbar-label d-block d-md-none px-5`}
                  onClick={() => handleItemClick("stats")}
                >
                  Stats
                </span>
              </div>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {showConnectWalletModel ? (
        <ConnectWalletModel
          showConnectWalletModel={showConnectWalletModel}
          setShowConnectWalletModel={setShowConnectWalletModel}
        />
      ) : null}
    </React.Fragment>
  );
};

export default TopNavBar;
