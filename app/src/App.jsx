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
import AppStateContext from './AppState';

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
      <ChakraProvider theme={theme}>
        <Router>
          <Header/>
            <Routes>
              <Route path='/' element={<Home />}/>
              <Route path='/home' element={<Home />}/>
              <Route path='/bridge' element={<Bridge />}/>
              <Route path='/explorer' element={<Explorer />}/>
            </Routes>
          {/* <Footer/> */}
        </Router>
      </ChakraProvider>
    </AppStateContext.Provider>
  );
}

export default App;
