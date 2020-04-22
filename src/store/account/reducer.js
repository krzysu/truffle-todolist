export const CONNECTED = "account/CONNECTED";
export const SET_ADDRESS = "account/SET_ADDRESS";
export const SET_BALANCE = "account/SET_BALANCE";
export const SET_NETWORK_ID = "account/SET_NETWORK_ID";
export const SET_WEB3 = "account/SET_WEB3";
export const SET_CONTRACT = "account/SET_CONTRACT";
export const SET_ERROR = "account/SET_ERROR";
export const DISCONNECTED = "account/DISCONNECTED";

const initialState = {
  isConnected: false,
  address: "",
  balance: "0",
  networkId: "",
  web3: null,
  contract: null,
  error: null
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

    case SET_ERROR:
      return {
        ...state,
        error: action.payload
      };

    default:
      return state;
  }
};
