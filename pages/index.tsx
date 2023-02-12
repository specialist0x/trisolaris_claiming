import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import ContractAddressContainer from "../src/components/ContractAddressContainer";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Trisolaris Vester.sol Claiming</title>
      </Head>

      <main className={styles.main}>
        <ConnectButton />
        <ContractAddressContainer />
      </main>
    </div>
  );
};

export default Home;
