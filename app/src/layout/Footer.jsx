import React from 'react';
import { Box, HStack, SimpleGrid, Text } from '@chakra-ui/react';
import { Logo } from '../Logo';

function Footer() {
    return(
        <Box minHeight={'50vh'} padding={8} textAlign="center">
            <SimpleGrid columns={2}>
                <Box>
                    <Logo h="3vmax"/>
                    <Text as="b">Commune Ai Bridge</Text>
                </Box>
                <HStack>
                    <Text color='gray'>Terms of Use</Text>
                    <Text color='gray'>Privacy Policy</Text>
                </HStack>
            </SimpleGrid>
        </Box>
    )
}

export default Footer;