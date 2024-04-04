import React from "react";
import { Card, Button, Flex, CloseButton, Image, Text, CardHeader, CardBody, HStack, Spacer, Stack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function NetworkList(props) {
    
    const handleCloseNetwork = ()=>{
        props.onCloseList(props.role);
    }

    const handleSelectNetwork=(network)=>{
        props.onSelectNetwork({
            role:props.role, network
        });
        props.onCloseList(props.role);
    }

    return (
        <Card minW={'40vw'} variant={'outline'}>
            <CardHeader>
                <HStack>
                    <Text>{props.role=='src'? 'From' : 'To'}</Text>
                    <Spacer/>
                    <CloseButton onClick={handleCloseNetwork}/>
                </HStack>
            </CardHeader>
            <CardBody>
                <Stack gap={4}>
                    {props.possibleNetworks && props.possibleNetworks.map((network, index)=>
                        (
                            <Button colorScheme='green' variant='outline' w={'full'} key={index} onClick={()=>{
                                handleSelectNetwork(network);
                            }}>
                                <Flex gap={2} mr={6}>
                                    <Image borderRadius={'50%'} fit={'cover'} src={`assets/${network.logo}`} w={6}/>
                                    <Text fontSize={20}>{network.name}</Text>
                                </Flex>
                            </Button>
                        )
                    )}
                </Stack>
            </CardBody>
        </Card>
        
    )
}

NetworkList.propTypes = {
    role: PropTypes.string.isRequired,
    onCloseList: PropTypes.func.isRequired,
    onSelectNetwork: PropTypes.func.isRequired,
    possibleNetworks: PropTypes.array.isRequired
};

export default NetworkList;