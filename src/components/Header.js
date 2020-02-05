import React, {useState} from "react";
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
      <div className={styles.title}>
        <h1>Todo list with value</h1>
        <div>built for ethereum blockchain</div>
      </div>

      {!connected ? (
        <button onClick={handleConnect}>Connect wallet</button>
      ) : (
        <div className={styles.account}>
          <div>
            <div>{formatAddress(address)}</div>
            <div>{formatBalance(balance)}</div>
          </div>
          <button onClick={handleDisconnect}>Disconnect</button>
        </div>
      )}
    </header>
  );
};

export default Header;
