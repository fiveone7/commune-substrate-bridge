import { VStack, Text, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TransferState } from "../../constants";
function BridgeButton() {

    const [transferState, setTransferState] = useState(0);
    const enabledStates = [
        6, 5, 7, 8, 11
    ];

    const loadingStates = [
        10, 9, 12
    ];

    useEffect(() => {
        console.log(setTransferState)
    }, [transferState])

    return (
        <VStack align={'flex-center'} w={'full'}>
            <Text textAlign={'center'}>
                {TransferState[transferState]}
            </Text>
            <Button
                colorScheme='green'
                disabled={!enabledStates.includes(transferState)}
                isLoading={loadingStates.includes(transferState)}>
                Bridge
            </Button>
        </VStack>
    )
}

export default BridgeButton;