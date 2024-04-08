import { Text, Card, CardBody, Flex, Grid, VStack, HStack, NumberInput, NumberInputField, Wrap, WrapItem, Button, Image, Input, InputGroup, InputLeftAddon, InputRightElement, Spacer } from '@chakra-ui/react';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { FaChevronDown, FaCopy } from 'react-icons/fa';
import { Web3Provider } from '@ethersproject/providers';
import { ERC20__factory } from '@buildwithsygma/sygma-contracts';
import PropTypes from 'prop-types';
import ConnectWalletButton from '../../components/ConnectWalletButton';
import { WalletContext } from '../../AppState';
import { shortAddress, tokenBalanceToNumber } from '../../utils';
import { constants } from 'ethers';

function NetworkToken(props) {
    const walletContext = useContext(WalletContext);
    const [address, setAddress] = useState('');
    const [loadingBalance, setLoadingBalance] = useState(false);
    const [balance, setBalance] = useState(constants.Zero);
    const [decimals, setDecimals] = useState(18);
    const [startBalanceUpdate, setStartBalanceUpdate] = useState(false);
    const handleOpenNetwork = ()=> {
        props.onOpenNetwork(props.role);
    }

    const handleOpenToken = ()=> {
        props.onOpenToken(props.role);
    }

    const onConnected = useCallback(()=>{
        if (props.selectedNetwork.type.toLowerCase() == 'evm'){
            setAddress(walletContext.evmWallet.address);
            setStartBalanceUpdate(true);
        } else if (props.selectedNetwork.type.toLowerCase() == 'substrate'){
            setAddress(walletContext.substrateWallet.accounts[0].address)
        }
    }, [walletContext]);

    const onDisconnected = useCallback(()=>{
        setAddress('');
    }, []);

    const isWalletConnected = () => {
        if (walletContext.evmWallet.address || walletContext.substrateWallet.address){
            return true;
        } else {
            return false;
        }
    }

    useEffect(()=> {
        if (startBalanceUpdate) {
            setBalance(constants.Zero);
            const updater = setInterval(async () => {
                try {
                    if (props.selectedNetwork.type) {
                        if (props.selectedNetwork.type.toLowerCase() == 'evm'){
                            const provider = walletContext.evmWallet.provider;
                            const address = walletContext.evmWallet.address;
                            if (!provider || !address) return;
        
                            if (props.selectedToken.resource) {
                                if (props.selectedToken.resource.type == 'fungible') {
                                    const web3Provider = new Web3Provider(provider);
                                    const ierc20 = ERC20__factory.connect(props.selectedToken.resource.address, web3Provider);
                
                                    setLoadingBalance(true);
                                    setDecimals(await ierc20.decimals());
                                    const bal = await ierc20.balanceOf(address);
                                    console.log(bal)
                                    setBalance(bal);
                                    setLoadingBalance(false);
                                }
            
                                if (props.selectedToken.resource.symbol === 'eth'){
                                    const web3Provider = new Web3Provider(provider);
                                    setLoadingBalance(true);
                                    const bal = await web3Provider.getBalance(address);
                                    console.log(bal)
                                    setBalance(bal)
                                    setLoadingBalance(false);
                                    setDecimals(18);
                                }
                            }
        
                            
                        }
                    }
                } catch (e){
                    console.log(e)
                }
                
            }, 5000);
            // Cleanup function to clear the interval when component unmounts
            return () => {
                if (updater) {
                    clearInterval(updater);
                }
            };
        }
    }, [props.selectedToken, startBalanceUpdate])

    useEffect(()=>{
        if (props.selectedNetwork && props.selectedNetwork.type) {
            if (isWalletConnected()) {
                if (props.selectedNetwork.type.toLowerCase() == 'evm'){
                    setAddress(walletContext.evmWallet.address)
                } else if (props.selectedNetwork.type.toLowerCase() == 'substrate'){
                    setAddress(walletContext.substrateWallet.accounts[0].address)
                }
            }
        }
    }, [walletContext, isWalletConnected, props]);

    return (
        <Card minW={'40vw'} colorScheme='orange' variant={'outline'}>
            <CardBody>
                <Grid gap={4}>
                    <Flex>
                        <Button as={Button} rightIcon={<FaChevronDown />} py={8} colorScheme='green' variant='outline' onClick={handleOpenNetwork}>
                            <HStack>
                                { props.selectedNetwork && props.selectedNetwork.logo ? 
                                (
                                    <Image borderRadius={'50%'} src={`assets/${props.selectedNetwork.logo}`} w={6} mr={2} />
                                ):
                                (
                                    <Image src={'/commune-logo.svg'} w={6} mr={2} />
                                )}
                                
                                <VStack align={'start'} spacing={2} mr={4}>
                                    {props.role=='src'?
                                        (<Text fontSize={12}>From</Text>):
                                        (<Text fontSize={12}>To</Text>)
                                    }
                                    {props.selectedNetwork && props.selectedNetwork.name ? (
                                        <Text fontSize={16}>{props.selectedNetwork.name}</Text>
                                    ): (
                                        <Text fontSize={16}>Network</Text>
                                    )}
                                </VStack>
                            </HStack>
                        </Button>
                        <Spacer/>
                        {props.role  == 'src' && props.selectedNetwork && props.selectedNetwork.name ? 
                            (
                                <VStack mb={4} align={'end'}>
                                    <ConnectWalletButton selectedNetwork={props.selectedNetwork} connectedCallback={onConnected} disconnectedCallback={onDisconnected}/>
                                    <Text>{shortAddress(address)}</Text>
                                </VStack>
                            ):(<></>)
                        }
                    </Flex>
                    
                    {props.role  == 'src' ? 
                    (
                        <>
                            <HStack>
                                <Button as={Button} rightIcon={<FaChevronDown />} colorScheme='green' variant='outline' onClick={handleOpenToken}>
                                    <Flex gap={2}>
                                        <Image src={'/commune-logo.svg'} w={6}/>
                                        {props.role=='src'?
                                        ( props.selectedToken.resource ? <Text fontSize={20}>{props.selectedToken.resource.symbol}</Text> : <Text fontSize={20}>In</Text>):
                                        ( props.selectedToken.resource ? <Text fontSize={20}>{props.selectedToken.resource.symbol}</Text> : <Text fontSize={20}>Out</Text>)
                                        }
                                        
                                    </Flex>
                                </Button>
                                <Spacer></Spacer>
                                {loadingBalance? 'loading': ''}
                                
                                <Text color={'green.600'}>
                                    Available: {tokenBalanceToNumber(balance, decimals)}
                                </Text>
                            </HStack>
                            <Wrap border='1px' borderRadius={'md'} borderColor='green.800'>
                                <WrapItem w={'full'}>
                                    <InputGroup size={'sm'}>
                                        <InputLeftAddon bg='green.800'>
                                            Amount
                                        </InputLeftAddon>
                                        <NumberInput fontSize={16} defaultValue={0} precision={4} w={'full'} border={'none'} _focusVisible={'none'}
                                            onChange={props.onAmountChange} >
                                            <NumberInputField border={'none'} _focusVisible={'none'} />
                                        </NumberInput>
                                        <InputRightElement pr={4}>
                                            <Button size='xs'>
                                                Max
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                </WrapItem>
                            </Wrap>
                        </>
                    ) : 
                    (
                        <Wrap border='1px' borderRadius={'md'} borderColor='green.800'>
                            <WrapItem w={'full'}>
                                <InputGroup size={'sm'}>
                                    <InputLeftAddon bg='green.800'>
                                        Recipient
                                    </InputLeftAddon>
                                    <Input type='text' placeholder='' onChange={props.onAddressChange}/>
                                    <InputRightElement >
                                        <Button size='xs'>
                                            <FaCopy/>
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </WrapItem>
                        </Wrap>
                    )}
                </Grid>
            </CardBody>
        </Card>
    )
}

NetworkToken.propTypes = {
    role: PropTypes.string.isRequired,
    selectedNetwork: PropTypes.object.isRequired,
    selectedToken: PropTypes.object.isRequired,
    onOpenNetwork: PropTypes.func.isRequired,
    onOpenToken: PropTypes.func.isRequired,
    onAmountChange: PropTypes.func.isRequired,
    onAddressChange: PropTypes.func.isRequired
};

export default NetworkToken;