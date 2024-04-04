import React from 'react';
import {
    Box,
    Text,
    VStack,
    // Grid,
    Button,
    Heading,
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    CardHeader,
    CardBody,
    Image,
    Card,
    Circle,
    SimpleGrid
} from '@chakra-ui/react';

import { useNavigate } from 'react-router-dom';
import { supportedNetworks } from './constants';

function Home() {

    const navigate = useNavigate();

    const handleBridge = ()=> {
        navigate('/bridge');
    }

    return (
        <Box textAlign="center" fontSize="xl" p={8} maxW='full'>
            {/* <Grid minH="50vh" spacing={10}> */}
                <VStack spacing={8} mb={10}>
                    <Heading >Trustless Bridge</Heading>
                    <Text color='gray.500'>
                        Commune Ai Bridge support bridging between Ethereum and Substrate
                    </Text>
                    <Button colorScheme='green' onClick={handleBridge}>
                        Enter Bridge
                    </Button>
                </VStack>
                <VStack>
                    <Heading>Supported Networks</Heading>
                    <Tabs>
                        <TabList>
                            <Tab>Mainnet</Tab>
                            <Tab>Testnet</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <SimpleGrid columns={4} spacing={4}>
                                    {supportedNetworks.mainnet && supportedNetworks.mainnet.map((net)=>(
                                        <Card key={net.name} w={'20vh'}>
                                            <CardHeader>
                                                <Circle>
                                                    <Image borderRadius={'50%'} w={'6vh'} h={'6vh'} fit={'cover'} src={`assets/${net.logo}`}></Image>
                                                </Circle>
                                            </CardHeader>
                                            <CardBody>
                                                <Text>{net.name}</Text>
                                                <Text>{net.type}</Text>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </SimpleGrid>
                            </TabPanel>
                            <TabPanel>
                                <SimpleGrid columns={4} spacing={4}>
                                    {supportedNetworks.testnet && supportedNetworks.testnet.map((net)=>(
                                        <Card key={net.name} w={'20vh'}>
                                            <CardHeader>
                                                <Circle>
                                                    <Image borderRadius={'50%'} w={'6vh'} h={'6vh'} fit={'cover'} src={`assets/${net.logo}`}></Image>
                                                </Circle>
                                            </CardHeader>
                                            <CardBody>
                                                <Text>{net.name}</Text>
                                                <Text>{net.type}</Text>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </SimpleGrid>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </VStack>
            {/* </Grid> */}
        </Box>
    )
}

export default Home;