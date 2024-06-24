import nftService from "../services/nft.js";

const getAllNFTs = (walletAddress, callback) => {
  nftService.getAllNFTs(walletAddress, (err, nfts) => {
    if (err) {
      console.error("Error getting NFTs:", err);
      callback(err, null);
      return;
    }
    const result = nfts;
    callback(null, result);
  });
};

const getNFTById = (id, callback) => {
  nftService.getNFTById(id, (err, nft) => {
    if (err) {
      console.error("Error getting NFT:", err);
      callback(err, null);
      return;
    }
    const result = nft;
    callback(null, result);
  });
};

const getNFTByContractAddress = (contractAddress, tokenId, callback) => {
  nftService.getNFTByContractAddress(contractAddress, tokenId, (err, nft) => {
    if (err) {
      console.error("Error getting NFT:", err);
      callback(err, null);
      return;
    }
    const result = nft;
    callback(null, result);
  });
};

const listNewNFT = (nft, callback) => {
  const requiredProps = [
    "contract_address",
    "tokenId",
    "price",
    "seller",
    "meta_data_uri",
    "nft_name",
    "nft_image_uri",
    "nft_sold",
    "listing_type",
  ];

  for (const prop of requiredProps) {
    if (!nft.hasOwnProperty(prop)) {
      const error = new Error(`Missing property ${prop} in request object`);
      callback(error, null);
      return;
    }
  }
  nftService.findNFTByDetails(nft, (err, duplicate) => {
    if (err) {
      callback(err, null);
      return;
    }

    if (duplicate) {
      const error = new Error(`Duplicate item found with the same details`);
      callback(error, null);
      return;
    }

    // Add new item
    nftService.listNewNFTs(nft, (err, result) => {
      if (err) {
        callback(err, null);
        return;
      }
      callback(null, result);
    });
  });
};

const updateNftAsSold = (id, callback) => {
  nftService.updateNftAsSold(id, (err, result) => {
    if (err) {
      console.error("Error UPDATING NFT:", err);
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

const updateNFT = (nft, callback) => {
  const requiredProps = ["id", "price", "nft_sold", "listing_type"];
  for (const prop of requiredProps) {
    if (!nft.hasOwnProperty(prop)) {
      const error = new Error(`Missing property ${prop} in request object`);
      callback(error, null);
      return;
    }
  }
  nftService.updateNFT(nft, (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    callback(null, result);
  });
};

export default {
  getAllNFTs,
  listNewNFT,
  getNFTById,
  updateNftAsSold,
  getNFTByContractAddress,
  updateNFT,
};
