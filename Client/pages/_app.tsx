import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { AppProps } from "next/app";
import { ModeProvider, useMode } from "../context/modeContext";
import { WalletProvider } from "../context/wallletContext";
import { TransactionProvider } from "../context/transactionContext";
import { ListNFTToPurchaseProvider } from "../context/listNFTContext";

const Marketplace = ({ Component, pageProps }: AppProps) => {
  return (
    <WalletProvider>
      <TransactionProvider>
        <ModeProvider>
          <ListNFTToPurchaseProvider>
            <Component {...pageProps} />
          </ListNFTToPurchaseProvider>
        </ModeProvider>
      </TransactionProvider>
    </WalletProvider>
  );
};

export default Marketplace;
