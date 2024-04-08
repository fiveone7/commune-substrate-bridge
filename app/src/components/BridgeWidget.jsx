import { Card, CardBody, CardFooter, CardHeader } from '@chakra-ui/react';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import {
    Config, getRoutes
} from '@buildwithsygma/sygma-sdk-core';

import {
    EVMAssetTransfer,
    FeeHandlerType,

} from '@buildwithsygma/sygma-sdk-core';
import { Web3Provider } from '@ethersproject/providers';
import { constants, utils } from 'ethers';
import NetworkToken from './bridge/NetworkToken';
import NetworkList from './bridge/NetworkList';
import AppStateContext, { WalletContext } from '../AppState';
import { FungibleTransferState, supportedNetworks } from "../constants";
import TokenList from './bridge/TokenList';
import BridgeButton from './bridge/BridgeButton';

function BridgeWidget() {
    const environment = process.env.REACT_APP_NET;
    const appState = useContext(AppStateContext);
    const walletContext = useContext(WalletContext);
    // const [evmProvider, setEvmProvider] = useState({});
    // const [substrateProvider, setSubstrateProvider] = useState({});
    // const [substrateSigner, setSubstrateSigner] = useState({});
    // const [isLoading, setIsLoading] = useState(false);
    // const [show, setShow] = useState(false);

    const [isSrcNetworkListOpen, setIsSrcNetworkListOpen] = useState(false);
    const [isDstNetworkListOpen, setIsDstNetworkListOpen] = useState(false);
    const [possibleSrcNetworks] = useState(supportedNetworks[environment]);
    const [possibleDstNetworks, setPossibleDstNetworks] = useState(supportedNetworks[environment]);
    const [selectedSrcNet, setSelectedSrcNet] = useState();
    const [selectedDstNet, setSelectedDstNet] = useState();

    const [isSrcTokenListOpen, setIsSrcTokenListOpen] = useState(false);
    // const [isDstTokenListOpen, setIsDstTokenListOpen] = useState(false);
    const [selectedSrcToken, setSelectedSrcToken] = useState(supportedNetworks[environment][0]);
    // const [selectedDstToken, setSelectedDstToken] = useState({});
    const [possibleSrcTokens, setPossibleSrcTokens] = useState();
    // const [possibleDstTokens, setPossibleDstTokens] = useState([]);

    // const [routes, setRoutes] = useState([]);

    const [transferState, setTransferState] = useState(0);
    const [amount, setAmount] = useState(0);
    const [dstAddress, setDstAddress] = useState('');
    const [transferTransactionId, setTransferTransactionId] = useState();
    const [waitingUserConfirmation, setWaitingUserConfirmation] = useState('');
    const [waitingTxExecution, setWaitingTxExecution] = useState('');
    const [pendingEvmApprovalTransactions, setPendingEvmApprovalTransactions] = useState([]);
    const [pendingEvmTransferTransaction, setPendingEvmTransferTransaction] = useState();


    const config = new Config();
    appState.fromAddr = '';
    const handleCloseNetworkList = (role) => {
        if (role == 'src')
            setIsSrcNetworkListOpen(false);
        else
            setIsDstNetworkListOpen(false);
    }

    const handleCloseTokenList = (role) => {
        if (role == 'src')
            setIsSrcTokenListOpen(false);
        // else
        //     setIsDstTokenListOpen(false);
    }

    const handleOpenNetworkList = (role) => {
        if (role == 'src')
            setIsSrcNetworkListOpen(true);
        else
            setIsDstNetworkListOpen(true);
    }

    const handleOpenTokenList = (role) => {
        if (role == 'src')
            setIsSrcTokenListOpen(true);
        // else
        //     setIsDstTokenListOpen(true);
    }

    const handleSelectNetwork = (data) => {
        if (data.role == 'src')
            setSelectedSrcNet(data.network);
        else{
            setSelectedDstNet(data.network);
            buildTransactions();
        }
    }

    const handleSelectToken = (data) => {
        if (data.role == 'src'){
            setSelectedSrcToken(data.token);
            buildTransactions();
        }
        // else
        //     setSelectedDstToken(data.token); 
    }

    const getTransferState = () => {
        console.log(selectedSrcNet)
        if (transferTransactionId)
            return FungibleTransferState.COMPLETED;
        if (waitingUserConfirmation)
            return FungibleTransferState.WAITING_USER_CONFIRMATION;
        if (waitingTxExecution)
            return FungibleTransferState.WAITING_TX_EXECUTION;
        if (pendingEvmApprovalTransactions.length > 0)
            return FungibleTransferState.PENDING_APPROVALS;
        if (pendingEvmTransferTransaction)
            return FungibleTransferState.PENDING_TRANSFER;
        if (!selectedSrcNet)
            return FungibleTransferState.MISSING_SOURCE_NETWORK;
        if (!selectedDstNet)
            return FungibleTransferState.MISSING_DESTINATION_NETWORK;
        if (!selectedSrcToken)
            return FungibleTransferState.MISSING_RESOURCE;
        if (amount == 0)
            return FungibleTransferState.MISSING_RESOURCE_AMOUNT;
        if (dstAddress == '')
            return FungibleTransferState.MISSING_DESTINATION_ADDRESS;
        if (selectedSrcNet.type == 'evm' && walletContext.evmWallet.providerChainId !== selectedSrcNet.chainId) {
            return FungibleTransferState.WRONG_CHAIN;
        }
        return FungibleTransferState.UNKNOWN;
    }

    const executeEvmTransaction = async () => {
        
        const provider = walletContext.evmWallet.provider;
        const address = walletContext.evmWallet.address;
        //TODO: should set error message
        if (!provider || !address) return;
        const signer = new Web3Provider(provider).getSigner(address);
        if (getTransferState() === FungibleTransferState.PENDING_APPROVALS) {
            setWaitingUserConfirmation(true);
            // waitingUserConfirmation = true;
            // host.requestUpdate();
            try {
                const tx = await signer.sendTransaction(
                    pendingEvmApprovalTransactions[0]
                );
                setWaitingUserConfirmation(false);
                setWaitingTxExecution(true);
                // host.requestUpdate();
                await tx.wait();
                setPendingEvmApprovalTransactions([...pendingEvmApprovalTransactions.shift()]);
            } catch (e) {
                console.log(e);
                // errorMessage = 'Approval transaction reverted or rejected';
            } finally {
                setWaitingUserConfirmation(false);
                setWaitingTxExecution(false);
                // host.requestUpdate();
            }
            return;
        }
        if (getTransferState() === FungibleTransferState.PENDING_TRANSFER) {
            setWaitingUserConfirmation(true);
            // waitingUserConfirmation = true;
            // host.requestUpdate();
            try {
                const tx = await signer.sendTransaction(
                    pendingEvmTransferTransaction
                );
                setWaitingUserConfirmation(false);
                setWaitingTxExecution(true);
                // host.requestUpdate();
                const receipt = await tx.wait();
                setPendingEvmTransferTransaction();
                setTransferTransactionId(receipt.transactionHash);
            } catch (e) {
                console.log(e);
                // errorMessage = 'Transfer transaction reverted or rejected';
            } finally {
                setWaitingUserConfirmation(false);
                setWaitingTxExecution(false);
                // host.requestUpdate();
            }
        }
    }

    const executeTransaction = () => {
        if (!selectedSrcNet)
            return;

        switch (selectedSrcNet.type) {
            case 'evm':
                executeEvmTransaction();
                break;
            case 'substrate':
                break;
            default:
                throw new Error('Unsupported network type');
        }
    }

    const buildTransactions = () => {
        if (!selectedSrcNet || !selectedDstNet || amount == 0 || !selectedSrcToken || dstAddress.length == 0) {
            return;
        }
        switch (selectedSrcNet.type) {
            case 'evm':
                buildEvmTransactions();
                break;
            case 'substrate':
                break;
            default:
                throw new Error('Unsupported network type');
        }
    }

    const buildEvmTransactions = async () => {
        //we already check that but this prevents those typescript errors
        const provider = walletContext.evmWallet.provider;
        console.log(provider)
        const providerChaiId = walletContext.evmWallet.providerChainId;
        const address = walletContext.evmWallet.address;
        if (
            !selectedSrcNet ||
            !selectedDstNet ||
            !amount == 0 ||
            !selectedSrcToken ||
            !dstAddress.length == 0 ||
            !provider ||
            !address ||
            providerChaiId !== selectedSrcNet.chainId
        ) {
            return;
        }

        const evmTransfer = new EVMAssetTransfer();
        await evmTransfer.init(new Web3Provider(provider, providerChaiId), environment);

        // Hack to make fungible transfer behave like it does on substrate side
        // where fee is deducted from user inputted amount rather than added on top
        const originalTransfer = await evmTransfer.createFungibleTransfer(
            address,
            selectedDstNet.chainId,
            dstAddress,
            selectedSrcToken.resource.resourceId,
            amount.toString()
        );
        const originalFee = await evmTransfer.getFee(originalTransfer);
        //in case of percentage fee handler, we are calculating what amount + fee will result int user inputed amount
        //in case of fixed(basic) fee handler, fee is taken from native token
        if (originalFee.type === FeeHandlerType.PERCENTAGE) {
            const { lowerBound, upperBound, percentage } = originalFee;
            const userInputAmount = amount;
            //calculate amount without fee (percentage)
            const feelessAmount = userInputAmount
                .mul(constants.WeiPerEther)
                .div(utils.parseEther(String(1 + percentage)));

            const calculatedFee = userInputAmount.sub(feelessAmount);
            setAmount(feelessAmount);
            //if calculated percentage fee is less than lower fee bound, substract lower bound from user input. If lower bound is 0, bound is ignored
            if (calculatedFee.lt(lowerBound) && lowerBound.gt(0)) {
                setAmount(userInputAmount.sub(lowerBound));
            }
            //if calculated percentage fee is more than upper fee bound, substract upper bound from user input. If upper bound is 0, bound is ignored
            if (calculatedFee.gt(upperBound) && upperBound.gt(0)) {
                setAmount(userInputAmount.sub(upperBound));
            }
        }

        const transfer = await evmTransfer.createFungibleTransfer(
            address,
            selectedDstNet.chainId,
            dstAddress,
            selectedSrcToken.resource.resourceId,
            amount.toString()
        );
        const fee = await evmTransfer.getFee(transfer);
        const approvals = await evmTransfer.buildApprovals(
            transfer,
            fee
        );
        setPendingEvmApprovalTransactions(approvals);
        setPendingEvmTransferTransaction(await evmTransfer.buildTransferTransaction(transfer, fee))
        // this.host.requestUpdate();
    }

    const reset = () => {
        setSelectedSrcNet();
        setSelectedDstNet();
        setPendingEvmApprovalTransactions([]);
        setPendingEvmTransferTransaction();
        setDstAddress('');
        setWaitingTxExecution(false);
        setWaitingUserConfirmation(false);
        setTransferTransactionId();
    }

    const handleBridge = () => {
        const state = getTransferState();
        setTransferState(state);
        console.log(state)
        switch (state) {
            case FungibleTransferState.PENDING_APPROVALS:
            case FungibleTransferState.PENDING_TRANSFER:
                executeTransaction();
                break;
            case FungibleTransferState.WALLET_NOT_CONNECTED:

                break;
            case FungibleTransferState.WRONG_CHAIN:

                break;
            case FungibleTransferState.COMPLETED:
                break;
        }

        if (state == FungibleTransferState.COMPLETED) {
            reset();
        }
    }

    useEffect(() => {
        // console.log(selectedSrcToken)
    }, [selectedSrcToken]);

    (async () => {
        await config.init(1, environment); // Sepolia or Ethereum
    })();

    useEffect(() => {
        if (!selectedSrcNet) return;
        getRoutes(environment, selectedSrcNet.chainId, 'fungible').then((data) => {
            // setRoutes(data);
            let filteredNetworks = [];
            data.forEach(element => {
                supportedNetworks[environment].map((network) => {
                    if (filteredNetworks.indexOf(element) == -1) {
                        if (network.chainId == element.toDomain.chainId) {
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
        }).catch((e) => console.log(e));
    }, [selectedSrcNet, selectedDstNet, environment]);

    const handleAddressChange = useCallback((v) => {
        console.log(v)
        setDstAddress(v);
        buildTransactions();
    }, []);

    const handleAmountChange = useCallback((v) => {
        console.log(v)
        setAmount(v);
    }, []);

    return (
        <Card className='bridge-widget' minW={'40vw'} variant={'outline'}>
            <CardHeader>

                {isSrcNetworkListOpen ? (
                    <NetworkList width='full' role='src' possibleNetworks={possibleSrcNetworks} onSelectNetwork={handleSelectNetwork} onCloseList={handleCloseNetworkList} />
                ) : isSrcTokenListOpen ? (
                    <TokenList width='full' role='src' possibleTokens={possibleSrcTokens} onSelectToken={handleSelectToken} onCloseList={handleCloseTokenList} />
                ) : (
                    <NetworkToken role='src' onOpenNetwork={handleOpenNetworkList} selectedToken={selectedSrcToken} onOpenToken={handleOpenTokenList} selectedNetwork={selectedSrcNet}
                        onAddressChange={() => { }}
                        onAmountChange={handleAmountChange} />
                )}
            </CardHeader>
            <CardBody>

                {isDstNetworkListOpen ? (
                    <NetworkList width='full' role='dst' possibleNetworks={possibleDstNetworks} onSelectNetwork={handleSelectNetwork} onCloseList={handleCloseNetworkList} />
                ) :
                    // isDstTokenListOpen? (
                    //     <TokenList width='full' role='dst' possibleTokens={possibleDstTokens} onSelectToken={handleSelectToken} onCloseList={handleCloseTokenList}/>
                    // ):
                    (
                        <NetworkToken role='dst' onOpenNetwork={handleOpenNetworkList} selectedToken={{}} onOpenToken={handleOpenTokenList} selectedNetwork={selectedDstNet}
                            onAmountChange={() => { }}
                            onAddressChange={handleAddressChange} />
                        // <NetworkToken role='dst' onOpenNetwork={handleOpenNetworkList} selectedToken={selectedDstToken} onOpenToken={handleOpenTokenList} selectedNetwork={selectedDstNet}/>
                    )}
            </CardBody>
            <CardFooter>
                <BridgeButton onBridge={handleBridge} transferState={transferState} />
            </CardFooter>
        </Card>
    )
}

export default BridgeWidget;