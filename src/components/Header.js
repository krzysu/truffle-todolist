import React, {useState, useEffect} from "react";
import {
  connectIfCachedProvider,
  connect,
  disconnect,
  getAddress,
  getBalance
} from "../utils/web3";
import {formatAddress, formatBalance} from "../utils/utils";
import styles from "./Header.module.css";

const Header = ({onConnect, onDisconnect, isConnected}) => {
  const [address, setAddress] = useState();
  const [balance, setBalance] = useState("0");

  useEffect(() => {
    const run = async () => {
      const wasCached = await connectIfCachedProvider();
      if (wasCached) {
        onConnect();
        const address = getAddress();
        const balance = await getBalance(address);
        setAddress(address);
        setBalance(balance);
      }
    };
    run();
  }, []);

  const handleConnect = async () => {
    await connect();
    onConnect();
    const address = getAddress();
    const balance = await getBalance(address);
    setAddress(address);
    setBalance(balance);
  };

  const handleDisconnect = async () => {
    await disconnect();
    onDisconnect();
    setAddress(undefined);
  };

  return (
    <header className={styles.wrapper}>
      <div className={styles.title}>
        <h1>Todo list with value</h1>
        <div>built for ethereum blockchain</div>
      </div>

      {!isConnected ? (
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
