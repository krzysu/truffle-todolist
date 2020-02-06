import Web3 from "web3";
import Web3Connect from "web3connect";
import WalletConnectProvider from "@walletconnect/web3-provider";

let web3;

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: process.env.REACT_APP_INFURA_ID
    }
  }
};

const web3Connect = new Web3Connect.Core({
  network: "mainnet",
  cacheProvider: true,
  providerOptions
});

web3Connect.on("connect", async provider => {
  web3 = new Web3(provider);
});

export const connectIfCachedProvider = async () => {
  if (web3Connect.cachedProvider) {
    await web3Connect.connect();
    return true;
  } else return false;
};

export const connect = async () => {
  await web3Connect.connect();
};

export const disconnect = async () => {
  if (web3 && web3.currentProvider && web3.currentProvider.close) {
    await web3.currentProvider.close();
  }
  await web3Connect.clearCachedProvider();
};

export const getAddress = async () => {
  const accounts = await web3.eth.getAccounts();
  return accounts[0];
};

export const getBalance = async address => {
  return await web3.eth.getBalance(address);
};

export const getWeb3 = () => web3;
