import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useWalletContext } from "../context/wallletContext";
import { useRouter } from "next/router";
import NFTforSale from "../components/NFTforSale";
import { back_end_url } from "../utils/constants";

const Explore = () => {
  const { walletAddress } = useWalletContext();
  const [nftsForSale, setNftsForSale] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const router = useRouter();

  //redirect user - when there is no wallet address
  useEffect(() => {
    if (walletAddress === "") {
      router.push("/");
    }
  }, [walletAddress]);

  //get unsold nfts from database
  useEffect(() => {
    const fetchNfts = async () => {
      const nftData = await fetchAllNFTsListedUnsold();
      if (nftData !== null) {
        setNftsForSale(nftData);
      }
      console.log(nftData);
    };
    fetchNfts();
  }, []);

  const fetchAllNFTsListedUnsold = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${back_end_url}/nft/all/${walletAddress}`, {
        method: "GET",
      });

      const response = await res.json();
      setIsLoading(false);
      if (res.status === 200) {
        setIsError(false);
        console.log(response);
        return response;
      } else {
        setIsError(true);
        return null;
      }
    } catch (error) {
      console.error(error);
      throw new Error("Error getting unsold nfts");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Layout>
        <div className="d-flex flex-wrap justify-content-center my-5">
          {nftsForSale.map((nft: any, index: any) => (
            <div key={`my-nft-${index}`} className="px-3 pb-5">
              <NFTforSale nft={nft} walletAddress={walletAddress} />
            </div>
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default Explore;
