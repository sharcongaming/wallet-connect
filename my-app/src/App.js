// import logo from './logo.svg';
// import './App.css';
// import ReactDOM from 'react-dom'
// import { formatEther } from '@ethersproject/units'
// import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config, Goerli } from '@usedapp/core'
// import { getDefaultProvider } from 'ethers'


// function App() {

//   const config: Config = {
//     readOnlyChainId: Mainnet.chainId,
//     readOnlyUrls: {
//       [Mainnet.chainId]: getDefaultProvider('mainnet'),
//       [Goerli.chainId]: getDefaultProvider('goerli'),
//     },
//   }
  
//   ReactDOM.render(
//     <DAppProvider config={config}>
//       <App />
//     </DAppProvider>,
//     document.getElementById('root')
//   )
  
//   const ConnectButton = () => {
//     const { account, deactivate, activateBrowserWallet } = useEthers()
//     // 'account' being undefined means that we are not connected.
//     if (account) return <button onClick={() => deactivate()}>Disconnect</button>
//     else return <button onClick={() => activateBrowserWallet()}>Connect</button>
//   }
  
//   export function App() {
//     const { account, chainId } = useEthers()
//     const etherBalance = useEtherBalance(account)
//     if (chainId && !config.readOnlyUrls[chainId]) {
//       return <p>Please use either Mainnet or Goerli testnet.</p>
//     }
//   return (
//     <div className="App">
//         <ConnectButton />
//       {etherBalance && (
//         <div className="balance">
//           <br />
//           Ether balance:
//           <p className="bold">{formatEther(etherBalance)} ETH</p>
//         </div>
//       )}

//     </div>
//   );
// }

// export default App;

import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { formatEther } from '@ethersproject/units';
import { Mainnet, DAppProvider, useEtherBalance, useEthers, Config, Goerli } from '@usedapp/core';
import { getDefaultProvider } from 'ethers';

const config = {
  readOnlyChainId: Mainnet.chainId, // Specifies the default read-only chain ID as Mainnet
  readOnlyUrls: {
    [Mainnet.chainId]: getDefaultProvider('mainnet'), // Provides the default provider URL for Mainnet
    [Goerli.chainId]: getDefaultProvider('goerli'), // Provides the default provider URL for Goerli testnet
  },
};

function ConnectButton() {
  const { account, deactivate, activateBrowserWallet } = useEthers();
  // 'account' being undefined means that we are not connected.
  if (account) return <button onClick={() => deactivate()}>Disconnect</button>;
  else return <button onClick={() => activateBrowserWallet()}>Connect</button>;
}

function App() {
  const { account, chainId } = useEthers();
  const etherBalance = useEtherBalance(account);

  if (chainId && ![Mainnet.chainId, Goerli.chainId].includes(chainId)) {
    return <p>Please use either Mainnet or Goerli testnet.</p>;
  }

  return (
    <div className="App">
      <ConnectButton />
      {etherBalance && (
        <div className="balance">
          <br />
          Ether balance:
          <p className="bold">{formatEther(etherBalance)} ETH</p>
        </div>
      )}
    </div>
  );
}

ReactDOM.render(
  <DAppProvider config={config}>
    <App />
  </DAppProvider>,
  document.getElementById('root')
);

export default App;

