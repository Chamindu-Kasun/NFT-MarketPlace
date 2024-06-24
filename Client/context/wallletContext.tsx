import router from "next/router";
import { createContext, useContext, useState, useEffect } from "react";

type WalletContextProps = {
  walletAddress: string;
  setWalletAddress: (address: string) => void;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => Promise<void>;
};

interface CustomWindow extends Window {
  ethereum?: any;
}

// context with an initial value for the WalletContextProps
const WalletContext = createContext<WalletContextProps>({
  walletAddress: "",
  setWalletAddress: () => {},
  connectWallet: async () => {},
  disconnectWallet: async () => {},
});

// provider
export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [walletAddress, setWalletAddress] = useState<string>("");

  // connect wallet
  const connectWallet = async () => {
    if (typeof window !== "undefined") {
      const customWindow = window as CustomWindow;
      if (!customWindow?.ethereum) return alert("Please install a wallet");

      try {
        const accounts = await customWindow.ethereum.request({
          method: "eth_requestAccounts",
        });
        // Set wallet address
        setWalletAddress(accounts[0]);
        router.push("/user");
      } catch (error) {
        console.error(error);
      }
    }
  };

  // disconnect wallet
  const disconnectWallet = async () => {
    if (typeof window !== "undefined") {
      const customWindow = window as CustomWindow;
      if (customWindow?.ethereum) {
        try {
          // Set wallet address
          setWalletAddress("");
          router.push("/");
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  // check if the wallet is already connected
  const checkIfWalletIsConnect = async () => {
    if (typeof window !== "undefined") {
      const customWindow = window as CustomWindow;
      if (customWindow?.ethereum) {
        try {
          // Check if wallet is connected to the site
          const isConnected = await customWindow.ethereum.isConnected();
          if (isConnected) {
            // Get the current accounts from wallet
            const accounts = await customWindow.ethereum.request({
              method: "eth_accounts",
            });
            if (accounts.length) {
              // Set wallet address
              setWalletAddress(accounts[0]);
            } else {
              console.log("No accounts found");
            }
          } else {
            console.log("Wallet not connected");
          }
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  // check if the wallet is already connected when the component mounts
  useEffect(() => {
    checkIfWalletIsConnect();
  }, []);

  // value for the WalletContext
  const value = {
    walletAddress,
    setWalletAddress,
    connectWallet,
    disconnectWallet,
  };

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

// useWalletContext hook
export function useWalletContext() {
  return useContext(WalletContext);
}
