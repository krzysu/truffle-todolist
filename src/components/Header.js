import React from "react";
import {connect} from "react-redux";
import {
  connectWallet,
  disconnectWallet,
  selectIsConnected,
  selectFormattedAddress,
  selectFormattedBalance
} from "../store/account";

import styles from "./Header.module.css";

const Header = ({
  isConnected,
  address,
  balance,
  connectWallet,
  disconnectWallet
}) => {
  return (
    <header className={styles.wrapper}>
      <div className={styles.title}>
        <h1>Todo list</h1>
        <div>built for ethereum blockchain</div>
      </div>

      {!isConnected ? (
        <button onClick={connectWallet}>Connect wallet</button>
      ) : (
        <div className={styles.account}>
          <div>
            <div>{address}</div>
            <div>{balance}</div>
          </div>
          <button onClick={disconnectWallet}>Disconnect</button>
        </div>
      )}
    </header>
  );
};

const mapStateToProps = state => ({
  isConnected: selectIsConnected(state),
  address: selectFormattedAddress(state),
  balance: selectFormattedBalance(state)
});

const mapDispatchToProps = {connectWallet, disconnectWallet};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
