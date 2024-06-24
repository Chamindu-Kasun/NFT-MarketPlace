import MyNFT from "./MyNFT";
import Spinner from "react-bootstrap/Spinner";

type MyNFTsProps = {
  myNFTdata: any;
  updateNFTsOwnedByUser: () => void;
  isLoading: boolean;
};

const LoadingSpinner: React.FC = () => {
  return (
    <div className="d-flex  justify-content-center align-items-center">
      <Spinner
        animation="border"
        size="sm"
        style={{ width: "3rem", height: "3rem", marginRight: "0.5rem" }}
      />
      <Spinner
        animation="border"
        style={{ width: "5rem", height: "5rem", marginRight: "0.5rem" }}
      />
      <Spinner
        animation="grow"
        size="sm"
        style={{ width: "3rem", height: "3rem", marginRight: "0.5rem" }}
      />
      <Spinner
        animation="grow"
        style={{ width: "5rem", height: "5rem", marginRight: "0.5rem" }}
      />
    </div>
  );
};

const MyNFTs: React.FC<MyNFTsProps> = (props) => {
  const { myNFTdata, updateNFTsOwnedByUser, isLoading } = props;

  return (
    <div className="px-5">
      <div className="d-flex justify-content-center pb-5">
        <span className="mynfts-section-header">MY NFTS</span>
      </div>
      <div className="d-flex flex-wrap justify-content-center">
        {isLoading ? (
          <div>
            <LoadingSpinner />
          </div>
        ) : (
          <>
            {!myNFTdata.length ? (
              <div className="my-nfts-no-nfts-in-wallet py-5">
                No NFTs in wallet
              </div>
            ) : (
              <>
                {myNFTdata.map((mynft: any, index: number) => (
                  <div key={`my-nft-${index}`} className="px-3 pb-5">
                    <MyNFT
                      nft={mynft}
                      updateNFTsOwnedByUser={updateNFTsOwnedByUser}
                    />
                  </div>
                ))}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MyNFTs;
