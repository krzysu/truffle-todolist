import Web3 from "web3";
import Web3Connect from "web3connect";
import WalletConnectProvider from "@walletconnect/web3-provider";

let web3;
let address;

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

const setAddress = async () => {
  const accounts = await web3.eth.getAccounts();
  web3.eth.defaultAccount = accounts[0];
  address = accounts[0];
};

export const connectIfCachedProvider = async () => {
  if (web3Connect.cachedProvider) {
    await web3Connect.connect();
    await setAddress();
    return true;
  } else return false;
};

export const connect = async () => {
  await web3Connect.connect();
  await setAddress();
};

export const disconnect = async () => {
  if (web3 && web3.currentProvider && web3.currentProvider.close) {
    await web3.currentProvider.close();
  }
  await web3Connect.clearCachedProvider();
};

export const getAddress = () => address;

export const getBalance = async address => {
  return await web3.eth.getBalance(address);
};

export const getWeb3 = () => web3;
