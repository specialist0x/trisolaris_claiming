import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { Chain, WagmiConfig, configureChains, createClient } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import "../styles/globals.css";

const AURORA_RPC = `https://mainnet.aurora.dev/${
  process.env.AURORA_API_KEY ?? ""
}`;

export const aurora = {
  id: 1313161554,
  name: "Aurora",
  network: "aurora",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
  },
  rpcUrls: {
    public: {
      http: [AURORA_RPC],
    },
    default: {
      http: [AURORA_RPC],
    },
  },
  blockExplorers: {
    default: { name: "Aurorascan", url: "https://aurorascan.dev/" },
  },
} as Chain;

const { chains, provider, webSocketProvider } = configureChains(
  [aurora],
  [
    alchemyProvider({
      apiKey: process.env.ALCHEMY_API_KEY ?? "",
    }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Trisolaris Vester Claim",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
