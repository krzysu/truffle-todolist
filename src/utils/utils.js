import {getWeb3} from "./web3";

export const formatAddress = (address = "") =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

export const formatBalance = (balance, precision = 5) => {
  const web3 = getWeb3();
  if (!web3) {
    return balance;
  }
  return `${Number.parseFloat(web3.utils.fromWei(balance)).toPrecision(
    precision
  )} ETH`;
};
