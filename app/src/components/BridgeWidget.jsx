import { Card, CardBody, CardFooter, CardHeader } from '@chakra-ui/react';
import React, { useContext, useEffect, useState } from 'react';

import {
    Config, getRoutes
} from '@buildwithsygma/sygma-sdk-core';
import NetworkToken from './bridge/NetworkToken';
import NetworkList from './bridge/NetworkList';
import AppStateContext from '../AppState';
import { supportedNetworks } from "../constants";
import TokenList from './bridge/TokenList';
import BridgeButton from './bridge/BridgeButton';

function BridgeWidget() {
    const net = process.env.REACT_APP_NET;
    const appState = useContext(AppStateContext);
    const [isSrcNetworkListOpen, setIsSrcNetworkListOpen] = useState(false);
    const [isDstNetworkListOpen, setIsDstNetworkListOpen] = useState(false);
    const [possibleSrcNetworks] = useState(supportedNetworks[net]);
    const [possibleDstNetworks, setPossibleDstNetworks] = useState(supportedNetworks[net]);
    const [selectedSrcNet, setSelectedSrcNet] = useState({});
    const [selectedDstNet, setSelectedDstNet] = useState({});

    const [isSrcTokenListOpen, setIsSrcTokenListOpen] = useState(false);
    // const [isDstTokenListOpen, setIsDstTokenListOpen] = useState(false);
    const [selectedSrcToken, setSelectedSrcToken] = useState({});
    // const [selectedDstToken, setSelectedDstToken] = useState({});
    const [possibleSrcTokens, setPossibleSrcTokens] = useState([]);
    // const [possibleDstTokens, setPossibleDstTokens] = useState([]);

    // const [routes, setRoutes] = useState([]);

    const config = new Config();
    console.log(appState)
    const handleCloseNetworkList = (role)=>{
        if (role == 'src')
            setIsSrcNetworkListOpen(false);
        else
            setIsDstNetworkListOpen(false);
    }

    const handleCloseTokenList = (role)=>{
        if (role == 'src')
            setIsSrcTokenListOpen(false);
        // else
        //     setIsDstTokenListOpen(false);
    }

    const handleOpenNetworkList = (role)=>{
        if (role == 'src')
            setIsSrcNetworkListOpen(true);
        else
            setIsDstNetworkListOpen(true);
    }

    const handleOpenTokenList = (role)=>{
        if (role == 'src')
            setIsSrcTokenListOpen(true);
        // else
        //     setIsDstTokenListOpen(true);
    }

    const handleSelectNetwork = (data)=>{
        if (data.role == 'src')
            setSelectedSrcNet(data.network); 
        else
            setSelectedDstNet(data.network);
    }

    const handleSelectToken = (data)=>{
        if (data.role == 'src')
            setSelectedSrcToken(data.token); 
        // else
        //     setSelectedDstToken(data.token); 
    }

    (async()=>{
        await config.init(1, net); // Sepolia or Ethereum
    })();

    useEffect(()=>{
        getRoutes(net, selectedSrcNet.chainid, 'fungible').then((data)=>{
            console.log(data)
            // setRoutes(data);
            let filteredNetworks = [];
            data.forEach(element => {
                supportedNetworks[net].map((network)=>{
                    if (filteredNetworks.indexOf(element) == -1){
                        if (network.chainid == element.toDomain.chainId) {
                            filteredNetworks.push(network);
                        }
                    }
                });
            });    

            let filteredTokens = []
            data.forEach(element => {
                filteredTokens.push(element);
            });    
            
            setPossibleDstNetworks(filteredNetworks);
            setPossibleSrcTokens(filteredTokens);
            // setPossibleDstTokens(filteredTokens);
        }).catch((e)=>console.log(e));
    }, [selectedSrcNet, selectedDstNet, net]);

    return (
        <Card className='bridge-widget' minW={'40vw'} variant={'outline'}>
            <CardHeader>
            {isSrcNetworkListOpen ? (
                    <NetworkList width='full' role='src' possibleNetworks={possibleSrcNetworks} onSelectNetwork={handleSelectNetwork} onCloseList={handleCloseNetworkList}/>
                ): isSrcTokenListOpen ? (
                    <TokenList width='full' role='src' possibleTokens={possibleSrcTokens} onSelectToken={handleSelectToken} onCloseList={handleCloseTokenList}/>
                ) : (
                    <NetworkToken role='src' onOpenNetwork={handleOpenNetworkList} selectedToken={selectedSrcToken} onOpenToken={handleOpenTokenList} selectedNetwork={selectedSrcNet}/>
                )}
            </CardHeader>
            <CardBody>
                
                {isDstNetworkListOpen ? (
                    <NetworkList width='full' role='dst' possibleNetworks={possibleDstNetworks} onSelectNetwork={handleSelectNetwork} onCloseList={handleCloseNetworkList}/>
                ):
                // isDstTokenListOpen? (
                //     <TokenList width='full' role='dst' possibleTokens={possibleDstTokens} onSelectToken={handleSelectToken} onCloseList={handleCloseTokenList}/>
                // ):
                 (
                    <NetworkToken role='dst' onOpenNetwork={handleOpenNetworkList} selectedToken={{}} onOpenToken={handleOpenTokenList} selectedNetwork={selectedDstNet}/>
                    // <NetworkToken role='dst' onOpenNetwork={handleOpenNetworkList} selectedToken={selectedDstToken} onOpenToken={handleOpenTokenList} selectedNetwork={selectedDstNet}/>
                )}
            </CardBody>
            <CardFooter>
                <BridgeButton/>
                
            </CardFooter>
        </Card>
    )
}

export default BridgeWidget;