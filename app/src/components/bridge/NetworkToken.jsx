import { Text, Card, CardBody, Flex, Grid, HStack, NumberInput, NumberInputField, Wrap, WrapItem, Button, Image, VStack, Input, InputGroup, InputLeftAddon, InputRightElement, Spacer } from '@chakra-ui/react';
import React from 'react';
import { FaChevronDown, FaCopy } from 'react-icons/fa';
import PropTypes from 'prop-types';

function NetworkToken(props) {
    const handleOpenNetwork = ()=> {
        props.onOpenNetwork(props.role);
    }

    const handleOpenToken = ()=> {
        props.onOpenToken(props.role);
    }
    return (
        <Card minW={'40vw'} colorScheme='orange' variant={'outline'}>
            <CardBody>
                <Grid gap={4}>
                    <Flex>
                        <Button as={Button} rightIcon={<FaChevronDown />} py={8} colorScheme='green' variant='outline' onClick={handleOpenNetwork}>
                            <HStack>
                                { props.selectedNetwork.logo ? 
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
                                    {props.selectedNetwork.name ? (
                                        <Text fontSize={16}>{props.selectedNetwork.name}</Text>
                                    ): (
                                        <Text fontSize={16}>Network</Text>
                                    )}
                                </VStack>
                            </HStack>
                        </Button>
                        <Spacer/>
                        {/* <Box>
                            {props.role=='src'?
                                (<Text>Connect Wallet</Text>):
                                (
                                    <></>
                                )
                            }
                        </Box> */}
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
                                <Text color={'green.600'}>Available: 0</Text>
                            </HStack>
                            <Wrap border='1px' borderRadius={'md'} borderColor='green.800'>
                                <WrapItem w={'full'}>
                                    <InputGroup size={'sm'}>
                                        <InputLeftAddon bg='green.800'>
                                            Amount
                                        </InputLeftAddon>
                                        <NumberInput fontSize={16} defaultValue={0} precision={4} w={'full'} border={'none'} _focusVisible={'none'} >
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
                                    <Input type='text' placeholder='' />
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
    onOpenToken: PropTypes.func.isRequired
};

export default NetworkToken;