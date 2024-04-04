import {createContext} from 'react';

const AppStateContext = createContext({
    fromNet: '',
    fromToken: '',
    fromAddr: '',
    toNet: '',
    toToken: '',
    toAddr: ''
});

export default AppStateContext;