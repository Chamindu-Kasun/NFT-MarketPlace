import React, { useEffect, useState, createContext, useContext } from "react";
import {
  contractABI,
  contractAddressMarketPlace,
  commonABI,
} from "../utils/constants";
import { ethers } from "ethers";

type TransactionContextProps = {
  fetchAllNFTsListedUnsold: () => Promise<void>;
  getApprovalToTransfer: (
    contractAddress: any,
    tokenID: any
  ) => Promise<string>;
  listNFTForSale: (
    tokenId: string,
    nftAddress: string,
    price: number
  ) => Promise<void>;
  purchaseNFT: (
    nftAddress: string,
    tokenId: number,
    price: number,
    seller: string
  ) => Promise<void>;
  checkApprovalToTransfer: (
    contractAddress: any,
    tokenID: any
  ) => Promise<string>;
  getMetadataOfNFT: (nftAddress: string, tokenId: string) => Promise<any>;
};

//contract instance of marketplace contract
const getContractInstance = async (
  web3Provider: ethers.providers.Web3Provider
) => {
  try {
    const signer = web3Provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddressMarketPlace,
      contractABI,
      signer
    );
    return contractInstance;
  } catch (error) {
    console.error("Error creating contract instance: ", error);
  }
};

//contract instance of NFTs
const getContractInstanceOfNFT = async (
  web3Provider: ethers.providers.Web3Provider,
  contractAddressOfNFT: string
) => {
  try {
    const signer = web3Provider.getSigner();
    const contractInstance = new ethers.Contract(
      contractAddressOfNFT,
      commonABI,
      signer
    );
    return contractInstance;
  } catch (error) {
    console.error("Error creating contract instance of NFT contract: ", error);
  }
};

export const TransactionContext = createContext<TransactionContextProps>({
  fetchAllNFTsListedUnsold: async () => {},
  getApprovalToTransfer: async (): Promise<string> => {
    return "";
  },
  listNFTForSale: async () => {},
  purchaseNFT: async () => {},
  checkApprovalToTransfer: async (): Promise<string> => {
    return "";
  },
  getMetadataOfNFT: async () => {},
});

export const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [web3Provider, setWeb3Provider] =
    useState<ethers.providers.Web3Provider | null>(null);

  useEffect(() => {
    const fetchWeb3Provider = async () => {
      if (typeof window !== "undefined") {
        try {
          const provider = new ethers.providers.Web3Provider(
            (window as Window & { ethereum?: any }).ethereum
          );
          setWeb3Provider(provider);
        } catch (error) {
          console.warn("Error connecting to Web3 provider: ", error);
        }
      }
    };

    fetchWeb3Provider();
  }, []);

  const fetchAllNFTsListedUnsold = async () => {
    try {
      if (!web3Provider) {
        console.warn("Web3 provider is not available");
        return;
      }

      const contractInstance = await getContractInstance(web3Provider);
      const nfts = await contractInstance?.getNFTsUnsold();
      return nfts;
    } catch (err) {
      console.error(err);
    }
  };

  //get approval of the NFT to transfer
  const getApprovalToTransfer = async (
    contractAddress: string,
    tokenID: string
  ): Promise<string> => {
    try {
      if (!web3Provider) {
        console.warn("Web3 provider is not available");
        return "Failure";
      }

      const contractInstanceOfNFT = await getContractInstanceOfNFT(
        web3Provider,
        contractAddress
      );
      try {
        if (contractInstanceOfNFT) {
          const tx = await contractInstanceOfNFT.approve(
            contractAddressMarketPlace,
            tokenID
          );

          const receipt = await tx.wait();
          console.log(`Transaction hash: ${receipt.transactionHash}`);
          return "Success";
        } else {
          console.log("Contract intance of NFT is undefined");
          return "Failure";
        }
      } catch (err) {
        console.error(err);
        return "Failure";
      }
    } catch (err) {
      console.error(err);
      return "Failure";
    }
  };

  //list a NFT for sale
  const listNFTForSale = async (
    tokenId: string,
    nftAddress: string,
    price: number
  ) => {
    try {
      if (!web3Provider) {
        console.warn("Web3 provider is not available");
        return;
      }
      const contractInstance = await getContractInstance(web3Provider);
      const gasLimit = 210000;
      const gasPrice = "25000000000";
      const itemId = await contractInstance?.listNFTForSale(
        parseInt(tokenId),
        nftAddress,
        price,
        { gasLimit, gasPrice }
      );
      return itemId;
    } catch (err) {
      console.error(err);
    }
  };

  //purchase a NFT
  const purchaseNFT = async (
    nftAddress: string,
    tokenId: number,
    price: number,
    seller: string
  ) => {
    try {
      if (!web3Provider) {
        console.warn("Web3 provider is not available");
        return;
      }
      const contractInstance = await getContractInstance(web3Provider);
      const gasLimit = 210000;
      const gasPrice = "25000000000";
      const value = ethers.utils.parseUnits(price.toString(), "ether"); // Convert price to BigNumber
      const soldTokenId = await contractInstance?.purchaseNFT(
        nftAddress,
        tokenId,
        seller,
        { gasLimit, gasPrice, value }
      );
      const result = await soldTokenId.wait();
      return result;
    } catch (err) {
      console.error(err);
    }
  };

  //check whether the user has given approval to transfer
  const checkApprovalToTransfer = async (
    contractAddress: string,
    tokenID: string
  ): Promise<string> => {
    try {
      if (!web3Provider) {
        console.warn("Web3 provider is not available");
        return "Failure";
      }

      const contractInstanceOfNFT = await getContractInstanceOfNFT(
        web3Provider,
        contractAddress
      );
      try {
        if (contractInstanceOfNFT) {
          const approvedAddress = await contractInstanceOfNFT.getApproved(
            tokenID
          );
          if (approvedAddress === contractAddressMarketPlace) {
            console.log(
              "Marketplace contract is approved to transfer the token"
            );
            return "Success";
          } else {
            console.log(
              "Marketplace contract is not approved to transfer the token"
            );
            return "Failure";
          }
        } else {
          console.log("Contract intance of NFT is undefined");
          return "Failure";
        }
      } catch (err) {
        console.error(err);
        return "Failure";
      }
    } catch (err) {
      console.error(err);
      return "Failure";
    }
  };

  //get metadata of nft
  const getMetadataOfNFT = async (nftAddress: string, tokenID: string) => {
    try {
      if (!web3Provider) {
        console.warn("Web3 provider is not available");
        return;
      }
      const contractInstanceOfNFT = await getContractInstanceOfNFT(
        web3Provider,
        nftAddress
      );
      try {
        if (contractInstanceOfNFT) {
          const metadata = await contractInstanceOfNFT.tokenURI(tokenID);
          return metadata;
        } else {
          console.log("Contract intance of NFT is undefined");
          return;
        }
      } catch (err) {
        console.error(err);
        return;
      }
    } catch (err) {
      console.error(err);
      return "Failure";
    }
  };

  const value = {
    fetchAllNFTsListedUnsold,
    listNFTForSale,
    getApprovalToTransfer,
    purchaseNFT,
    checkApprovalToTransfer,
    getMetadataOfNFT,
  };

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  );
};

export function useTransactionContext() {
  return useContext(TransactionContext);
}
