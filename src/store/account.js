import {
  connectIfCachedProvider,
  connect,
  disconnect,
  getAddress,
  getBalance
} from "../utils/web3";
import {formatAddress, formatBalance} from "../utils/utils";

const CONNECTING = "account/CONNECTING";
const CONNECTED = "account/CONNECTED";
const DISCONNECTED = "account/DISCONNECTED";
const SET_ADDRESS = "account/SET_ADDRESS";
const SET_BALANCE = "account/SET_BALANCE";

const initialState = {
  isConnected: false,
  isConnecting: false,
  address: "",
  balance: "0"
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case CONNECTING:
      return {
        ...state,
        isConnecting: true
      };

    case CONNECTED:
      return {
        ...state,
        isConnecting: false,
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

    default:
      return state;
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

export const connectWallet = () => async dispatch => {
  dispatch({type: CONNECTING});
  await connect();
  const address = getAddress();
  const balance = await getBalance(address);
  dispatch(setAddress(address));
  dispatch(setBalance(balance));
  dispatch({type: CONNECTED});
};

export const disconnectWallet = () => async dispatch => {
  await disconnect();
  dispatch({type: DISCONNECTED});
};

export const connectCachedWallet = () => async dispatch => {
  dispatch({type: CONNECTING});
  const wasCached = await connectIfCachedProvider();
  if (wasCached) {
    const address = getAddress();
    const balance = await getBalance(address);
    dispatch(setAddress(address));
    dispatch(setBalance(balance));
    dispatch({type: CONNECTED});
  } else {
    dispatch({type: DISCONNECTED});
  }
};

// selectors
const selectAccount = state => state.account || {};
export const selectIsConnected = state => selectAccount(state).isConnected;
export const selectIsConnecting = state => selectAccount(state).isConnecting;
export const selectFormattedAddress = state =>
  formatAddress(selectAccount(state).address);
export const selectFormattedBalance = state =>
  formatBalance(selectAccount(state).balance);
