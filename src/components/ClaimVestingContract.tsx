import { BigNumber, ethers } from "ethers";
import {
  Address,
  useAccount,
  useContractReads,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { ABI } from "../contracts/vester";
import { erc20Balance } from "../contracts/erc20Balance";

type Props = {
  address: Address;
};

export default function ClaimVestingContract({ address }: Props) {
  const { isConnected } = useAccount();
  const result = useContractReads({
    allowFailure: true,
    contracts: [
      {
        address,
        abi: ABI,
        functionName: "lastUpdate",
      },
      {
        address,
        abi: ABI,
        functionName: "vestingAmount",
      },
      {
        address,
        abi: ABI,
        functionName: "vestingEnd",
      },
      {
        address: "0xfa94348467f64d5a457f75f8bc40495d33c65abb",
        abi: erc20Balance,
        args: [address],
        functionName: "balanceOf",
      },
    ],
    enabled: isConnected,
  });

  const { config, isError } = usePrepareContractWrite({
    address,
    abi: ABI,
    functionName: "claim",
  });
  const { write } = useContractWrite(config);

  const [lastUpdate, vestingAmount, vestingEnd, contractBalance] =
    result?.data ?? [];

  const fullyVested =
    (contractBalance as BigNumber | undefined)?.eq(ethers.constants.Zero) ??
    false;

  return (
    <div style={{ margin: "20px" }}>
      Vesting Contract: {address}
      {result?.isSuccess && (
        <div>
          <div>lastUpdate: {parseDate(lastUpdate)}</div>
          <div>vestingEnd: {parseDate(vestingEnd)}</div>
          <div>vestingAmount: {parseAmount(vestingAmount)}</div>
          <div>contractBalance: {parseAmount(contractBalance)}</div>
          <button disabled={isError || fullyVested} onClick={() => write?.()}>
            Claim
          </button>
        </div>
      )}
    </div>
  );
}

function parseDate(value: any) {
  if (value != null) {
    return new Date(value.mul(1000).toNumber()).toLocaleDateString();
  }
}
function parseAmount(value: any) {
  if (value != null) {
    return ethers.utils.commify(ethers.utils.formatEther(value));
  }
}
