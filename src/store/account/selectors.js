import {formatAddress, formatBalance} from "../../utils";

const selectAccount = state => state.account || {};

export const selectWeb3 = state => selectAccount(state).web3;
export const selectContract = state => selectAccount(state).contract;

export const selectIsConnected = state => selectAccount(state).isConnected;
export const selectAddress = state => selectAccount(state).address;
export const selectError = state => selectAccount(state).error;

export const selectFormattedAddress = state =>
  formatAddress(selectAddress(state));

export const selectFormattedBalance = state => {
  const web3 = selectWeb3(state);
  if (!web3) {
    return 0;
  }
  const balance = selectAccount(state).balance;
  const balanceString = web3.utils.fromWei(balance);
  return formatBalance(balanceString);
};
