import Web3 from "web3";
import web3Modal from "../web3modal";
import {initContract} from "../contract";
import {fetchTodos} from "../todos/actions";
import {
  CONNECTED,
  SET_ADDRESS,
  SET_BALANCE,
  SET_NETWORK_ID,
  SET_WEB3,
  SET_CONTRACT,
  SET_ERROR,
  DISCONNECTED
} from "./reducer";
import {selectWeb3, selectAddress} from "./selectors";

// subscriptions
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

    dispatch(updateBalance());
    dispatch(fetchTodos());
  });

  provider.on("chainChanged", async () => {
    const web3 = selectWeb3(getState());
    const networkId = await web3.eth.net.getId();
    dispatch(setNetworkId(networkId));

    await updateContract(web3, networkId, dispatch);
  });

  provider.on("networkChanged", async networkId => {
    const web3 = selectWeb3(getState());
    dispatch(setNetworkId(networkId));

    await updateContract(web3, networkId, dispatch);
  });
};

const unsubscribeProvider = async provider => {
  provider.removeAllListeners("close");
  provider.removeAllListeners("accountsChanged");
  provider.removeAllListeners("chainChanged");
  provider.removeAllListeners("networkChanged");
};

const updateContract = async (web3, networkId, dispatch) => {
  try {
    const contract = await initContract(web3, networkId);
    dispatch(setContract(contract));
    dispatch(setError(null));
  } catch (e) {
    dispatch(setError(e.message));
  }
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

const setError = error => ({
  type: SET_ERROR,
  payload: error
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

  dispatch(updateBalance());

  const networkId = await web3.eth.net.getId();
  dispatch(setNetworkId(networkId));

  await updateContract(web3, networkId, dispatch);

  dispatch({type: CONNECTED});
};

export const disconnectWallet = () => async (dispatch, getState) => {
  const web3 = selectWeb3(getState());
  if (web3 && web3.currentProvider && web3.currentProvider.close) {
    unsubscribeProvider(web3.currentProvider);
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

export const updateBalance = () => async (dispatch, getState) => {
  const state = getState();
  const web3 = selectWeb3(state);
  const address = selectAddress(state);
  const balance = await web3.eth.getBalance(address);
  dispatch(setBalance(balance));
};
