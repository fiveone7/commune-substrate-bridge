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
import ConnectWallet from '../components/ConnectWallet';
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
                    <ChakraLink as={ReactRouterLink} to='/' color={'gray'} _active={{ color: "white" }} _hover={{ color: "white" }} {...(route.pathname === "/" && { color: "white" })}><Text fontSize={17} fontWeight={700}>About</Text></ChakraLink>
                    <ChakraLink as={ReactRouterLink} to='/bridge' color={'gray'} _active={{ color: "white" }} _hover={{ color: "white" }} {...(route.pathname === "/bridge" && { color: "white" })}><Text fontSize={17} fontWeight={700}>Bridge</Text></ChakraLink>
                    <ChakraLink as={ReactRouterLink} to='/explorer' color={'gray'} _active={{ color: "white" }} _hover={{ color: "white" }} {...(route.pathname === "/explorer" && { color: "white" })}><Text fontSize={17} fontWeight={700}>Explorer</Text></ChakraLink>
                </HStack>
                {/* <Spacer></Spacer> */}
                {/* <Button colorScheme='green'>Connect Wallet</Button> */}
                <ConnectWallet></ConnectWallet>
                <ColorModeSwitcher justifySelf="flex-end" />
            </HStack>
        </Box>
    )
}

export default Header;