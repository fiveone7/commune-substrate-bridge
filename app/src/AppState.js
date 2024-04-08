import {createContext} from 'react';

export const WalletContext = createContext({
    evmWallet:{},
    substrateWallet: {}
});

export const walletInfo = {
    evmWallet:{},
    substrateWallet: {}
}

export const ConfigContext = createContext({
    walletConnectOptions: {
        projectId: '',
    },
});

const AppStateContext = createContext({
    fromNet: '',
    fromToken: '',
    fromAddr: '',
    toNet: '',
    toToken: '',
    toAddr: ''
});

export default AppStateContext;