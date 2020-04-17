import Web3 from "web3";
import web3Modal from "./web3modal";
import {initContract} from "./contract";
import {formatAddress, formatBalance} from "../utils";

const CONNECTED = "account/CONNECTED";
const SET_ADDRESS = "account/SET_ADDRESS";
const SET_BALANCE = "account/SET_BALANCE";
const SET_CHAIN_ID = "account/SET_CHAIN_ID";
const SET_NETWORK_ID = "account/SET_NETWORK_ID";
const SET_WEB3 = "account/SET_WEB3";
const SET_CONTRACT = "account/SET_CONTRACT";
export const DISCONNECTED = "account/DISCONNECTED";

const initialState = {
  isConnected: false,
  address: "",
  balance: "0",
  chainId: "",
  networkId: "",
  web3: null,
  contract: null
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CONNECTED:
      return {
        ...state,
        isConnected: true
      };

    case DISCONNECTED:
      return initialState;

    case SET_ADDRESS:
      return {
        ...state,
        address: action.payload
      };

    case SET_BALANCE:
      return {
        ...state,
        balance: action.payload
      };

    case SET_CHAIN_ID:
      return {
        ...state,
        chainId: action.payload
      };

    case SET_NETWORK_ID:
      return {
        ...state,
        networkId: action.payload
      };

    case SET_WEB3:
      return {
        ...state,
        web3: action.payload
      };

    case SET_CONTRACT:
      return {
        ...state,
        contract: action.payload
      };

    default:
      return state;
  }
};

// action helpers
const subscribeProvider = async (provider, dispatch, getState) => {
  if (!provider.on) {
    return;
  }

  provider.on("close", () => {
    dispatch({type: DISCONNECTED});
  });

  provider.on("accountsChanged", async accounts => {
    const web3 = selectWeb3(getState());

    const address = accounts[0];
    web3.eth.defaultAccount = address;
    dispatch(setAddress(address));

    const balance = await web3.eth.getBalance(address);
    dispatch(setBalance(balance));
  });

  provider.on("chainChanged", async chainId => {
    const web3 = selectWeb3(getState());
    const networkId = await web3.eth.net.getId();

    dispatch(setNetworkId(networkId));
    dispatch(setChainId(chainId));
  });

  provider.on("networkChanged", async networkId => {
    const web3 = selectWeb3(getState());
    const chainId = await web3.eth.chainId();
    dispatch(setNetworkId(networkId));
    dispatch(setChainId(chainId));
  });
};

// actions
const setAddress = address => ({
  type: SET_ADDRESS,
  payload: address
});

const setBalance = balance => ({
  type: SET_BALANCE,
  payload: balance
});

const setChainId = chainId => ({
  type: SET_CHAIN_ID,
  payload: chainId
});

const setNetworkId = networkId => ({
  type: SET_NETWORK_ID,
  payload: networkId
});

const setWeb3 = web3 => ({
  type: SET_WEB3,
  payload: web3
});

const setContract = contract => ({
  type: SET_CONTRACT,
  payload: contract
});

export const connectWallet = () => async (dispatch, getState) => {
  const provider = await web3Modal.connect();

  const web3 = new Web3(provider);
  dispatch(setWeb3(web3));

  subscribeProvider(provider, dispatch, getState);

  const accounts = await web3.eth.getAccounts();
  web3.eth.defaultAccount = accounts[0];
  const address = accounts[0];
  dispatch(setAddress(address));

  const balance = await web3.eth.getBalance(address);
  dispatch(setBalance(balance));

  const networkId = await web3.eth.net.getId();
  dispatch(setNetworkId(networkId));

  const contract = await initContract(web3, networkId);
  dispatch(setContract(contract));

  dispatch({type: CONNECTED});
};

export const disconnectWallet = () => async (dispatch, getState) => {
  const web3 = selectWeb3(getState());
  if (web3 && web3.currentProvider && web3.currentProvider.close) {
    await web3.currentProvider.close();
  }
  web3Modal.clearCachedProvider();
  dispatch({type: DISCONNECTED});
};

export const connectCachedWallet = () => async dispatch => {
  if (web3Modal.cachedProvider) {
    dispatch(connectWallet());
  }
};

// selectors
const selectAccount = state => state.account || {};

export const selectWeb3 = state => selectAccount(state).web3;
export const selectContract = state => selectAccount(state).contract;

export const selectIsConnected = state => selectAccount(state).isConnected;
export const selectFormattedAddress = state =>
  formatAddress(selectAccount(state).address);

export const selectFormattedBalance = state => {
  const web3 = selectWeb3(state);
  if (!web3) {
    return 0;
  }
  const balance = selectAccount(state).balance;
  const balanceString = web3.utils.fromWei(balance);
  return formatBalance(balanceString);
};
