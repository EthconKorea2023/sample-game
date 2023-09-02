import ERC1155OneRingABI from "./ERC1155OneRing.json";
import abi from "./NFTContractABI.json";
import { ethers } from "ethers";
import useEnvStore from "./store/envStore";
import { env } from "../env";


export async function getTBAForEachCharacter() {
    console.log("test")
    console.log(env.VITE_INFURA_LINEA)


    const smartAccount = useEnvStore.getState().biconomySmartAccount;
    //get my token id
    const customProvider = new ethers.providers.JsonRpcProvider(env.VITE_INFURA_LINEA);
    const signer = new ethers.Wallet(env.VITE_PRIVATE_KEY, customProvider);

    const tmpArr = [];

    const contract2 = new ethers.Contract(env.VITE_GAME2_ADDRESS, abi, signer);
    const tokenID2 = await getTokenIDByAddress(contract2, smartAccount.address);
    if (tokenID2) {
        const TBAAddress2 = await contract2.showTBA(tokenID2);
        tmpArr.push(TBAAddress2.toLowerCase());
    }

    console.log(tmpArr);

    return tmpArr;
}


export async function isOwnRing(TBAAddress) {
    const itemAddress = env.VITE_1155_ADDRESS;
    const customProvider = new ethers.providers.JsonRpcProvider(env.VITE_INFURA_LINEA);
    const signer = new ethers.Wallet(env.VITE_PRIVATE_KEY, customProvider);
    // const smartAccount = useMandalaStore.getState().biconomySmartAccount;
    // Connect to the contract using the contract address and the ABI
    const contract = new ethers.Contract(itemAddress, ERC1155OneRingABI.output.abi, signer);

    const balance = await contract.balanceOf(TBAAddress, 0);

    return balance.toNumber() > 0;
}

export async function getTokenIDByAddress(contract, smartAccountAddress) {
    // const contract = new ethers.Contract(NFTAddress1, abi, signer);
    const totalSupply = await contract.totalSupply();
    // console.log(totalSupply.toNumber());
    const length = totalSupply.toNumber();
    for (let index = length; index > 0; index--) {
      const element = await contract.ownerOf(index);
      // console.log(typeof element);
      if (element.toLowerCase() == smartAccountAddress) {
        console.log(index);
        // tmp.push(index);
        return index;
      }
    }
  }