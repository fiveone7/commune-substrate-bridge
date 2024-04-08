import React from 'react';
import {
  ChakraProvider,
  theme,
} from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Header from './layout/Header';
import Home from './Home';
// import Footer from './layout/Footer';
import Bridge from './Bridge';
import Explorer from './Explorer';
import AppStateContext, { ConfigContext, WalletContext, walletInfo } from './AppState';

function App() {

  return (
    <AppStateContext.Provider value={{
      fromNet: '',
      fromToken: '',
      fromAddr: '',
      toNet: '',
      toToken: '',
      toAddr: ''
    }}>
      <WalletContext.Provider value={walletInfo}>
        <ConfigContext.Provider value={{
        walletConnectOptions: {
          projectId: '3432a77367104e551fdcc9759fd0e94f'
        }
      }}>
          <ChakraProvider theme={theme}>
            <Router>
              <Header />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/home' element={<Home />} />
                <Route path='/bridge' element={<Bridge />} />
                <Route path='/explorer' element={<Explorer />} />
              </Routes>
              {/* <Footer/> */}
            </Router>
          </ChakraProvider>
        </ConfigContext.Provider>
      </WalletContext.Provider>
    </AppStateContext.Provider>
  );
}

export default App;
