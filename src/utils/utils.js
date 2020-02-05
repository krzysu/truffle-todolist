import {getWeb3} from "./web3";

export const formatAddress = (address = "") =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

export const formatBalance = balance => {
  const web3 = getWeb3();
  return `${Number.parseFloat(web3.utils.fromWei(balance)).toPrecision(4)} ETH`;
};
