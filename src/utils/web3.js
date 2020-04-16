import Web3 from "web3";
import Web3Modal from "web3modal";
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

const web3Modal = new Web3Modal({
  network: "mainnet",
  cacheProvider: true,
  providerOptions
});

web3Modal.on("connect", async provider => {
  web3 = new Web3(provider);
});

if (window.ethereum && typeof web3 !== "undefined") {
  window.ethereum.on("accountsChanged", async accounts => {
    web3.eth.defaultAccount = accounts[0];
    address = accounts[0];
  });
}

const setAddress = async () => {
  const accounts = await web3.eth.getAccounts();
  web3.eth.defaultAccount = accounts[0];
  address = accounts[0];
};

export const connectIfCachedProvider = async () => {
  if (web3Modal.cachedProvider) {
    await web3Modal.connect();
    await setAddress();
    return true;
  } else return false;
};

export const connect = async () => {
  await web3Modal.connect();
  await setAddress();
};

export const disconnect = async () => {
  if (web3 && web3.currentProvider && web3.currentProvider.close) {
    await web3.currentProvider.close();
  }
  await web3Modal.clearCachedProvider();
};

export const getAddress = () => address;

export const getBalance = async address => {
  return await web3.eth.getBalance(address);
};

export const getWeb3 = () => web3;
