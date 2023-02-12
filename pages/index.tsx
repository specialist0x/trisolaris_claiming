import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import ClaimVestingContract from "../src/ClaimVestingContract";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Trisolaris Vester.sol Claiming</title>
      </Head>

      <main className={styles.main}>
        <ConnectButton />

        <div>
          {process.env.NEXT_PUBLIC_VESTING_CONTRACTS?.split(",").map(
            (address) => (
              <ClaimVestingContract address={address} key={address} />
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default Home;
