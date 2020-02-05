import React, {Fragment, useState} from "react";
import {connect, disconnect, getAddress, getBalance} from "../utils/web3";
import {formatAddress, formatBalance} from "../utils/utils";
import styles from "./Header.module.css";

const Header = () => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState();
  const [balance, setBalance] = useState("0");

  const handleConnect = async () => {
    await connect();
    setConnected(true);
    const address = await getAddress();
    const balance = await getBalance(address);
    setAddress(address);
    setBalance(balance);
  };

  const handleDisconnect = async () => {
    await disconnect();
    setConnected(false);
    setAddress(undefined);
  };

  return (
    <header className={styles.wrapper}>
      <div>
        <h1>Todo list with value</h1>
        <div>built for ethereum blockchain</div>
      </div>

      <div className={styles.account}>
        {!connected ? (
          <button onClick={handleConnect}>Connect wallet</button>
        ) : (
          <Fragment>
            <span>{formatAddress(address)}</span>
            <span>{formatBalance(balance)}</span>
            <button onClick={handleDisconnect}>Disconnect</button>
          </Fragment>
        )}
      </div>
    </header>
  );
};

export default Header;