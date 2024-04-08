import { VStack, Text, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { TransferState } from "../../constants";
import PropTypes from 'prop-types';
function BridgeButton(props) {
    console.log(props)
    const [transferState, setTransferState] = useState(0);
    const enabledStates = [
        6, 5, 7, 8, 11
    ];

    const loadingStates = [
        10, 9, 12
    ];

    const handleBridge = ()=>{
        props.onBridge();
    }

    useEffect(() => {
        // console.log(setTransferState)
        setTransferState(props.transferState);
    }, [props.transferState])

    return (
        <VStack align={'flex-center'} w={'full'}>
            <Text textAlign={'center'} color={transferState < 7 ? 'red' : 'green'}>
                {TransferState[transferState]}
            </Text>
            <Button
                colorScheme='green'
                disabled={!enabledStates.includes(transferState)}
                isLoading={loadingStates.includes(transferState)}
                onClick={handleBridge}>
                Bridge
            </Button>
        </VStack>
    )
}

BridgeButton.propTypes = {
    transferState: PropTypes.number.isRequired,
    onBridge: PropTypes.func.isRequired
};

export default BridgeButton;