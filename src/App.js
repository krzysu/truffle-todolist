import React, {Fragment, useState} from "react";
import {connect, disconnect, getAccount} from "./utils/web3";

import "./App.css";

const App = () => {
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState();

  const handleConnect = async () => {
    await connect();
    setConnected(true);
    const account = await getAccount();
    setAddress(account);
  };

  const handleDisconnect = async () => {
    await disconnect();
    setConnected(false);
    setAddress(undefined);
  };

  return (
    <div className="App">
      {!connected ? (
        <button onClick={handleConnect}>Connect wallet</button>
      ) : (
        <Fragment>
          <div>Address: {address}</div>
          <button onClick={handleDisconnect}>Disconnect</button>
        </Fragment>
      )}
    </div>
  );
};

export default App;