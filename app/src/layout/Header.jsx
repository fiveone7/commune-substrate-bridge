import React, { useEffect } from 'react';
import {
    Box,
    Text,
    HStack,
    Spacer
    
} from '@chakra-ui/react';
import { Link as ReactRouterLink, useLocation } from 'react-router-dom';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Logo } from '../Logo';
import { ColorModeSwitcher } from '../components/ColorModeSwitcher';

function Header() {

    const route = useLocation();
    useEffect(()=> {
        
    }, [route])

    return (
        <Box p={8}>
            <HStack spacing={4}>
                <Logo h="3vmax" />
                <Text as="b">Commune Ai Bridge</Text>
                <Spacer></Spacer>
                <HStack spacing={10} mr={10}>
                    <ChakraLink as={ReactRouterLink} to='/' color={'gray'} _active={{ color: "green" }} _hover={{ color: "green" }} {...(route.pathname === "/" && { color: "green" })}><Text fontSize={17} fontWeight={700}>About</Text></ChakraLink>
                    <ChakraLink as={ReactRouterLink} to='/bridge' color={'gray'} _active={{ color: "green" }} _hover={{ color: "green" }} {...(route.pathname === "/bridge" && { color: "green" })}><Text fontSize={17} fontWeight={700}>Bridge</Text></ChakraLink>
                    <ChakraLink as={ReactRouterLink} to='/explorer' color={'gray'} _active={{ color: "green" }} _hover={{ color: "green" }} {...(route.pathname === "/explorer" && { color: "green" })}><Text fontSize={17} fontWeight={700}>Explorer</Text></ChakraLink>
                </HStack>
                <ColorModeSwitcher justifySelf="flex-end" />
            </HStack>
        </Box>
    )
}

export default Header;