import { useRouter } from "next/router";
import ClaimVestingContract from "./ClaimVestingContract";
import { Address } from 'wagmi';

export default function ContractAddressContainer() {
  const router = useRouter();
  const parsedContracts = (router.query.contracts as string)?.split(",");

  const zeroAddressFragment = `0x000000000000000000000000000000000000000`;

  return (
    <>
      <p>Enter Comma-delimited Vester.sol Addresses</p>
      <textarea
        placeholder={[0, 1, 2].map((v) => zeroAddressFragment + v).join(",")}
        cols={44}
        rows={10}
        value={parsedContracts?.join(",") ?? ""}
        onChange={(e) =>
          router.push({
            pathname: "/",
            query: { contracts: e.target.value },
          })
        }
      />

      {parsedContracts?.map((address) => (
        <ClaimVestingContract address={address as Address} key={address} />
      ))}
    </>
  );
}
