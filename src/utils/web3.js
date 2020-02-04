import Web3 from "web3";
import Web3Connect from "web3connect";
import WalletConnectProvider from "@walletconnect/web3-provider";

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
  providerOptions
});

let web3;

export const connect = async () => {
  const provider = await web3Connect.connect();
  web3 = new Web3(provider);
};

export const disconnect = async () => {
  if (web3 && web3.currentProvider && web3.currentProvider.close) {
    await web3.currentProvider.close();
  }
  await web3Connect.clearCachedProvider();
};

export const getWeb3 = () => web3;

export const getAccount = async () => {
  const accounts = await web3.eth.getAccounts();
  return accounts[0];
};
