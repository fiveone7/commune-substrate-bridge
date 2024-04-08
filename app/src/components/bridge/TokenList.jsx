import React from "react";
import { Card, Button, Flex, CloseButton, Image, Text, CardHeader, CardBody, HStack, Spacer, Stack } from '@chakra-ui/react';
import PropTypes from 'prop-types';

function TokenList(props) {
    
    const handleCloseToken = ()=>{
        props.onCloseList(props.role);
    }

    const handleSelectToken=(token)=>{
        props.onSelectToken({
            role:props.role, token
        });
        props.onCloseList(props.role);
    }

    return (
        <Card minW={'40vw'} variant={'outline'}>
            <CardHeader>
                <HStack>
                    <Text>{props.role=='src'? 'From' : 'To'}</Text>
                    <Spacer/>
                    <CloseButton onClick={handleCloseToken}/>
                </HStack>
            </CardHeader>
            <CardBody>
                <Stack gap={4}>
                    {props.possibleTokens && props.possibleTokens.map((token, index)=>
                        (
                            <Button colorScheme='green' variant='outline' w={'full'} key={index} onClick={()=>{
                                handleSelectToken(token);
                            }}>
                                <Flex gap={2} mr={6}>
                                    <Image borderRadius={'50%'} fit={'cover'} src={'/commune-logo.svg'} w={6}/>
                                    {/* <Image borderRadius={'50%'} fit={'cover'} src={`assets/${token.logo}`} w={6}/> */}
                                    <Text fontSize={20}>{token.resource.symbol} (to {token.toDomain.name})</Text>
                                </Flex>
                            </Button>
                        )
                    )}
                </Stack>
            </CardBody>
        </Card>
    )
}

TokenList.propTypes = {
    role: PropTypes.string.isRequired,
    onCloseList: PropTypes.func.isRequired,
    onSelectToken: PropTypes.func.isRequired,
    possibleTokens: PropTypes.array.isRequired
};

export default TokenList;