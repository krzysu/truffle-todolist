export const formatAddress = (address = "") =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

export const formatBalance = (balanceString, precision = 3) =>
  `${Number.parseFloat(balanceString).toFixed(precision)} ETH`;
