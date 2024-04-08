import React, { useContext, useState } from "react";
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/react';
import { ConfigContext, WalletContext } from "../AppState";
// import { Account } from '@polkadot-onboard/core';
import { InjectedWalletProvider } from '@polkadot-onboard/injected-wallets';
import Onboard from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';
// import { WalletConnectOptions } from '@web3-onboard/walletconnect/dist/types';
// import { AppMetadata } from '@web3-onboard/common';
import { utils } from 'ethers';
function ConnectWalletButton(props) {

    const walletContext = useContext(WalletContext);
    const config = useContext(ConfigContext);
    const [srcNetwork] = useState(props.selectedNetwork);

    const connectEvmWallet = async (network, options) => {
        const injected = injectedModule();
        const walletSetup = [injected];
        if (options.projectId) {
            walletSetup.push(walletConnectModule(options));
        }

        const onboard = Onboard({
            wallets: walletSetup,
            chains: [
                {
                    id: network.chainId
                }
            ],
            accountCenter: {
                desktop: { enabled: false },
                mobile: { enabled: false }
            }
        });

        const wallets = await onboard.connectWallet();
        if (wallets[0]) {
            const provider = wallets[0].provider;
            const providerChainId = parseInt(await provider.request({ method: 'eth_chainId' }));
            walletContext.evmWallet = {
                address: wallets[0].accounts[0].ens?.name ?? wallets[0].accounts[0].address,
                providerChainId,
                provider
            }
            if (network.chainId !== providerChainId) {
                provider.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{
                        chainId: utils.hexValue(network.chainId)
                    }]
                })
            }

            props.connectedCallback();
        }
    }

    const connectSubstrateWallet = async (network, options) => {
        console.log(network, options)
        const injectedWalletProvider = new InjectedWalletProvider(
            {
                disallowed: []
            }, 'Commune ai bridge'
        )
        const wallets = await injectedWalletProvider.getWallets();
        if (wallets.length > 0) {
            const wallet = wallets[0];
            await wallet.connect();
            if (wallet.signer) {
                const accounts = await wallet.getAccounts();
                const unsub = await wallet.subscribeAccounts(
                    onSubstrateAccountChange
                );
                walletContext.substrateWallet = {
                    signer: wallet.signer,
                    accounts,
                    unsubscribeSubstrateAccounts: unsub,
                    disconnect: wallet.disconnect
                }

                props.connectedCallback();
            }
        }

    }

    const onSubstrateAccountChange = (accounts) => {

        if (walletContext.substrateWallet && accounts.length !== 0) {
            walletContext.substrateWallet = {
                signer: walletContext.substrateWallet.signer,
                disconnect: walletContext.substrateWallet.disconnect,
                unsubscribeSubstrateAccounts:walletContext.substrateWallet.unsubscribeSubstrateAccounts,
                accounts
            }
            
        }
        if (accounts.length == 0) {
                
            disconnectSubstrateWallet();
        }
    }

    const handleWalletConnection = () => {
        if (!isWalletConnected()) {
            switch (srcNetwork.type.toLowerCase()) {
                case 'evm':
                    connectEvmWallet(srcNetwork, config.walletConnectOptions);
                    break;
                case 'substrate':
                    connectSubstrateWallet(srcNetwork, config.walletConnectOptions);
                    break;
                default:
                    throw new Error('Unsupported network type');
            }
        } else {
            disconnectWallet();
            props.disconnectedCallback();
        }
    }

    const disconnectEvmWallet = () => {
        walletContext.evmWallet = {};
    }

    const disconnectSubstrateWallet = () => {
        walletContext.substrateWallet = {};
    }

    const disconnectWallet = () => {
        if (!srcNetwork) {
            disconnectEvmWallet();
            disconnectSubstrateWallet();
        }

        switch (srcNetwork.type.toLowerCase()) {
            case 'evm':
                disconnectEvmWallet();
                break;
            case 'substrate':
                disconnectSubstrateWallet();
                break;
            default:
                return;
        }

    }

    const isWalletConnected = () => {
        if (walletContext.evmWallet.address || walletContext.substrateWallet.address){
            return true;
        } else {
            return false;
        }
        
    }

    return (
        <Button
            size={'sm'}
            colorScheme="green"
            onClick={handleWalletConnection}>
            {isWalletConnected() ? 'Disconnect' : 'Connect Wallet'}
        </Button>
    )
}


ConnectWalletButton.propTypes = {
    selectedNetwork: PropTypes.object.isRequired,
    connectedCallback: PropTypes.func.isRequired,
    disconnectedCallback: PropTypes.func.isRequired
};


export default ConnectWalletButton;