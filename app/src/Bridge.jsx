import { Box, VStack } from "@chakra-ui/react";
import React from "react";
import BridgeWidget from "./components/BridgeWidget";

function Bridge() {
    return (
        <Box className="bridge-page">
            <VStack>
                <BridgeWidget/>
            </VStack>
        </Box>
    )
}

export default Bridge;