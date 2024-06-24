import Layout from "../components/Layout";
import { useWalletContext } from "../context/wallletContext";
import { CSSProperties, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import UserSectionTopLogo from "../public/assets/UserSectionTopLogo.png";
import CategoryBarToggleIcon from "../public/assets/CategoryBarToggleIcon.png";
import CategoryBarToggleIconLight from "../public/assets/CategoryBarToggleIconLight.png";
import TopNavBar from "../components/TopNavBar";
import MyNFTs from "../components/MyNFTs";
import MyNFTsListedForSale from "../components/MyNFTsListedForSale";
import { useMode } from "../context/modeContext";
import MyFavoriteNFTs from "../components/MyFavoriteNFTs";
import EditUserNameIcon from "../public/assets/EditUserName.png";

type CategoryBarProps = {
  setCategory: (value: string) => void;
  selected: string;
  handleShowFilterSideBar: () => void;
};

type TokenData = {
  contractAddress: string;
  tokenID: number;
};

interface CustomCSSProperties extends CSSProperties {
  "--input-width"?: string;
}
//redirect user - when there is no wallet address
const WalletRedirect: React.FC<{ walletAddress: string }> = ({
  walletAddress,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (walletAddress === "") {
      router.push("/");
    }
  }, [walletAddress, router]);

  return null;
};

//show category bar
const CategoryBar: React.FC<CategoryBarProps> = (props) => {
  const { setCategory, selected, handleShowFilterSideBar } = props;
  const { mode } = useMode();
  const categories = [
    "MY NFTS",
    "MY FAVORITE NFTS",
    "MY LISTINGS",
    "MY COLLECTIONS",
  ];
  const ShowCategories = () => {
    return (
      <div className="d-flex align-items-center">
        {categories.map((category) => (
          <div
            key={category}
            className={`mx-2 mx-md-0 mynfts-section-category-select mynfts-selected-${
              selected === category ? "highlight" : ""
            }`}
            onClick={() => setCategory(category)}
          >
            {category}
          </div>
        ))}
      </div>
    );
  };

  const SearchByName = () => {
    return (
      <div className="px-3">
        <input
          placeholder="Search by Name"
          className="nfts-search-by-name px-3"
        />
      </div>
    );
  };

  const SearchByLowestPrice = () => {
    const [selectedOption, setSelectedOption] = useState<string>("1-10 USD");
    const handleOptionChange = (e: any) => {
      setSelectedOption(e.target.value);
    };
    return (
      <div className="ps-3">
        <select
          value={selectedOption}
          onChange={handleOptionChange}
          className="nfts-search-by-price px-3"
        >
          <option value="1-10 USD">1-10 USD</option>
          <option value="10-100 USD">10-100 USD</option>
          <option value="100-1000 USD">100-1000 USD</option>
          <option value="above 1000 USD">above 1000 USD</option>
        </select>
      </div>
    );
  };
  return (
    <div className="d-flex py-5  align-items-center justify-content-center px-3">
      <div
        className="d-flex align-items-center "
        style={{ cursor: "pointer" }}
        onClick={handleShowFilterSideBar}
      >
        {" "}
        <Image
          alt="toggle icon"
          src={
            mode === "dark" ? CategoryBarToggleIcon : CategoryBarToggleIconLight
          }
          height={15}
        />
      </div>
      <div className="mynfts-select-category-section ms-4 ms-lg-5">
        <div>
          <ShowCategories />
        </div>
        <div className="d-none d-lg-flex">
          <SearchByName />
        </div>
        <div className="d-none d-lg-flex">
          <SearchByLowestPrice />
        </div>
      </div>
    </div>
  );
};

//show user data
const UserDataSection: React.FC = () => {
  const [showMoreData, setShowMoreData] = useState<boolean>(false);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const [userUploadedImage, setUserUploadedImage] = useState<string>("");

  const EditUserName = (props: any) => {
    const { value, setShowEditName } = props;
    const [name, setName] = useState<string>("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.setSelectionRange(name.length, name.length);
      }
    }, [name]);

    const handleNameChange = (event: any) => {
      setName(event.target.value);
      if (inputRef.current) {
        inputRef.current.style.setProperty(
          "--input-width",
          `${inputRef.current.scrollWidth}px`
        );
      }
    };

    const handleNameUpdate = () => {
      setShowEditName(false);
    };
    return (
      <div className="d-flex align-items-center justify-content-center">
        <input
          value={name}
          className="mx-2 update-user-name-input"
          onChange={handleNameChange}
          ref={inputRef}
          style={{ "--input-width": "90px" } as CustomCSSProperties}
        />
        <div style={{ cursor: "pointer" }} onClick={handleNameUpdate}>
          <Image alt="toggle icon" src={EditUserNameIcon} height={15} />
        </div>
      </div>
    );
  };

  const UserData = (label: string, value: string) => {
    const [showEditName, setShowEditName] = useState<boolean>(false);
    const handleNameEdit = () => {
      setShowEditName(true);
    };

    return (
      <div className="d-flex align-items-center py-2">
        <span className="user-data-label">{label} : </span>
        <div className="d-flex align-items-center">
          {showEditName ? (
            <EditUserName value={value} setShowEditName={setShowEditName} />
          ) : (
            <>
              <span className="user-data-value px-2"> {value}</span>

              {label == "Name" && (
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ cursor: "pointer" }}
                  onClick={handleNameEdit}
                >
                  <Image alt="toggle icon" src={EditUserNameIcon} height={15} />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  const UserDataValues = () => {
    return (
      <>
        <div>
          <div className="py-2 py-md-0">{UserData("Name", "Adam#B12")}</div>
          <div className="py-2 py-md-0">{UserData("NFTs Owned", "1000")}</div>
        </div>

        <div className="px-0 px-md-4">
          <div className="py-2 py-md-0">
            {UserData("Wallet ID", "#566...566...")}
          </div>
          <div className="py-2 py-md-0">
            {UserData("NFTs For Sale", "1000")}
          </div>
        </div>
        <div>
          <div className="py-2 py-md-0">
            {UserData("Wallet Net Worth", "1000")}
          </div>
          <div className="py-2 py-md-0">
            {UserData("Purchased NFTs", "1000")}
          </div>
        </div>
      </>
    );
  };

  const ImageUpload = (props: any) => {
    const { setUserUploadedImage } = props;
    const [selectedImage, setSelectedImage] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (files && files.length > 0) {
        setSelectedImage(files[0]);
        setUserUploadedImage(URL.createObjectURL(files[0]));
      }
    };

    const handleLogoClick = () => {
      document.getElementById("file-input-user-section-logo")?.click();
    };

    return (
      <div>
        <div onClick={handleLogoClick}>LOGO</div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          id="file-input-user-section-logo"
          style={{ display: "none" }}
        />
      </div>
    );
  };

  return (
    <div className="d-flex flex-wrap flex-lg-nowrap justify-content-center align-items-center">
      <div
        className="user-section-user-image-container"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        style={{ cursor: "pointer" }}
      >
        {isHovering && (
          <div className="user-section-user-image-overlay d-flex align-items-center justify-content-center">
            <ImageUpload setUserUploadedImage={setUserUploadedImage} />
          </div>
        )}

        <div className="d-flex justify-content-center align-items-center">
          <Image
            alt="user-section-user-image"
            src={
              userUploadedImage !== "" ? userUploadedImage : UserSectionTopLogo
            }
            height={250}
            width={250}
            style={{ borderRadius: "50%" }}
          />
        </div>
      </div>
      <div className=" d-block  d-md-none">
        {showMoreData ? (
          <div>
            <UserDataValues />
          </div>
        ) : (
          <div className="py-2 py-md-0">{UserData("Name", "Adam#B12")}</div>
        )}
        <div
          className="d-flex justify-content-center"
          onClick={() => setShowMoreData(!showMoreData)}
        >
          {showMoreData ? (
            <span style={{ color: "#ffffff" }}>Show less</span>
          ) : (
            <span style={{ color: "#ffffff" }}>Show more</span>
          )}
        </div>
      </div>
      <div className="d-none d-md-flex w-100 justify-content-around align-items-center flex-wrap ps-0 ps-lg-5">
        <UserDataValues />
      </div>
    </div>
  );
};

const SideBar: React.FC = () => {
  const SearchByNftType = () => {
    const [selectedOption, setSelectedOption] = useState<string>("Common");
    const handleOptionChange = (e: any) => {
      setSelectedOption(e.target.value);
    };
    return (
      <div className="ps-md-3 pb-3">
        <select
          value={selectedOption}
          onChange={handleOptionChange}
          className="nfts-filter-sidebar-nft-type px-3"
        >
          <option value="Rare">Rare</option>
          <option value="Common">Common</option>
        </select>
      </div>
    );
  };

  const SearchByAttributes = () => {
    const [selectedOption, setSelectedOption] = useState<string>("Bigness");
    const handleOptionChange = (e: any) => {
      setSelectedOption(e.target.value);
    };
    return (
      <div className="ps-md-3  pb-3">
        <select
          value={selectedOption}
          onChange={handleOptionChange}
          className="nfts-filter-sidebar-nft-type px-3"
        >
          <option value="Bigness">Bigness</option>
          <option value="Bigness">Bigness</option>
        </select>
      </div>
    );
  };
  return (
    <div className="d-flex flex-wrap flex-lg-column justify-content-center justify-content-lg-start">
      <div>
        <SearchByNftType />
      </div>
      <div>
        <SearchByAttributes />
      </div>
    </div>
  );
};

//user page
//get directed when a valid wallet address added
const User = () => {
  const { walletAddress } = useWalletContext();
  const [category, setCategory] = useState<string>("MY NFTS");
  //show filter sidebar
  const [showFilterSideBar, setShowFilterSideBar] = useState<boolean>(false);
  //all NFTs owned by user
  const [myNFTdata, setMyNFTdata] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //get ERC721 transactions from snowtrace
  const getTokenTransferEvents = async () => {
    try {
      const res = await fetch(
        `/api/getNFTsOfWallet?walletAddress=${walletAddress}`
      );
      const data = await res.json();

      return data.result;
    } catch (error) {
      console.log(error);
    }
  };

  //get NFTs owned by user
  const getNFTsInTheWallet = async (Transactions: any) => {
    if (Array.isArray(Transactions)) {
      // Get transactions of each contract by tokenId
      const transactionsByContractAndTokenId: any = Transactions.reduce(
        (accumulator, currentValue) => {
          const contract = currentValue.contractAddress.toLowerCase();
          const tokenId = currentValue.tokenID.toLowerCase();

          if (!accumulator[contract]) {
            accumulator[contract] = {};
          }

          if (!accumulator[contract][tokenId]) {
            accumulator[contract][tokenId] = [];
          }

          accumulator[contract][tokenId].push(currentValue);

          return accumulator;
        },
        {}
      );

      //Get current owned NFTs
      const getOwnedNfts = (transactionsByContractAndTokenId: any) => {
        const ownedNfts: any[] = [];

        for (const contract in transactionsByContractAndTokenId) {
          for (const tokenId in transactionsByContractAndTokenId[contract]) {
            const transactions =
              transactionsByContractAndTokenId[contract][tokenId];
            const latestTransaction = transactions.sort(
              (a: any, b: any) => parseInt(b.timeStamp) - parseInt(a.timeStamp)
            )[0];
            if (
              latestTransaction.to.toLowerCase() === walletAddress.toLowerCase()
            ) {
              ownedNfts.push(latestTransaction);
            }
          }
        }

        return ownedNfts;
      };

      //my nfts
      const myNFTs = getOwnedNfts(transactionsByContractAndTokenId);
      const result: TokenData[] = myNFTs.map(
        ({ contractAddress, tokenID }: any) => ({
          contractAddress,
          tokenID,
        })
      );

      return result;
    }
  };

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const tokenTransferEvents = await getTokenTransferEvents();
      const nftsOfWallet = await getNFTsInTheWallet(tokenTransferEvents);
      if (typeof nftsOfWallet !== "undefined") {
        setMyNFTdata(nftsOfWallet);
      }
      setIsLoading(false);
    })();
  }, []);

  const updateNFTsOwnedByUser = async () => {
    const tokenTransferEvents = await getTokenTransferEvents();
    const nftsOfWallet = await getNFTsInTheWallet(tokenTransferEvents);
    if (typeof nftsOfWallet !== "undefined") {
      setMyNFTdata(nftsOfWallet);
    }
  };

  //show category
  const showCategory = (category: string) => {
    // if (category === "ALL") return <AllNFTsForSale />;
    if (category === "MY NFTS")
      return (
        <MyNFTs
          myNFTdata={myNFTdata}
          updateNFTsOwnedByUser={updateNFTsOwnedByUser}
          isLoading={isLoading}
        />
      );
    if (category === "MY LISTINGS")
      return <MyNFTsListedForSale myNFTdata={myNFTdata} />;
    if (category === "MY FAVORITE NFTS") return <MyFavoriteNFTs />;
  };

  //show sidebar
  const handleShowFilterSideBar = () => {
    setShowFilterSideBar(!showFilterSideBar);
  };

  return (
    <div>
      <Layout>
        <WalletRedirect walletAddress={walletAddress} />
        <div className="user-section-background-container">
          <div className="user-section-background">
            <TopNavBar />
            <div className="user-data-section">
              <UserDataSection />
            </div>
          </div>
        </div>
        <div className="px-3">
          <div>
            <CategoryBar
              setCategory={setCategory}
              selected={category}
              handleShowFilterSideBar={handleShowFilterSideBar}
            />
          </div>
          <div className="d-flex flex-column flex-lg-row w-100">
            {showFilterSideBar ? (
              <div className="d-flex flex-wrap flex-1 justify-content-center">
                <SideBar />
              </div>
            ) : (
              <></>
            )}
            <div className="d-flex justify-content-center px-3 flex-grow-1 ">
              {showCategory(category)}
            </div>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default User;
