import ERC1155OneRingABI from "../ERC1155OneRing.json";
import abi from "../NFTContractABI.json";
import { ethers } from "ethers";


export async function getTBAForEachCharacter() {


    const smartAccount = useEnvStore.getState().biconomySmartAccount;
    //get my token id
    const customProvider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_INFURA_LINEA);
    const signer = new ethers.Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY, customProvider);
  
    const tmpArr = [];
  
    const contract2 = new ethers.Contract(process.env.NEXT_PUBLIC_GAME2_ADDRESS, abi, signer);
    const tokenID2 = await getTokenIDByAddress(contract2, smartAccount.address);
    if (tokenID2) {
      const TBAAddress2 = await contract2.showTBA(tokenID2);
      tmpArr.push(TBAAddress2.toLowerCase());
    }
  
    return tmpArr;
  }


  export async function isOwnRing(TBAAddress) {
    const itemAddress = process.env.NEXT_PUBLIC_1155_ADDRESS;
    const customProvider = new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_INFURA_LINEA);
    const signer = new ethers.Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY, customProvider);
    // const smartAccount = useMandalaStore.getState().biconomySmartAccount;
    // Connect to the contract using the contract address and the ABI
    const contract = new ethers.Contract(itemAddress, ERC1155OneRingABI.output.abi, signer);
  
    const balance = await contract.balanceOf(TBAAddress, 0);
  
    return balance.toNumber() > 0;
  }