export const supportedNetworks = {
    testnet: [{
        'name': 'Sepolia',
        'type': 'EVM',
        'logo': 'sepolia.jpg',
        'domain': 2,
        'chainId': 11155111
    }, {
        'name': 'Rococo',
        'type': 'Substrate',
        'logo': 'rococo.jpg',
        'domain': 3,
        'chainId': 5231
    }, {
        'name': 'Cronos',
        'type': 'EVM',
        'logo': 'cronos.png',
        'domain': 5,
        'chainId': 338
    }, {
        'name': 'Holesky',
        'type': 'EVM',
        'logo': 'holesky.png',
        'domain': 6,
        'chainId': 17000
    }, {
        'name': 'Mumbai',
        'type': 'EVM',
        'logo': 'mumbai.svg',
        'domain': 7,
        'chainId': 80001
    }, {
        'name': 'Arbitrum Sepolia',
        'type': 'EVM',
        'logo': 'arbitrum.png',
        'domain': 8,
        'chainId': 421614
    }, {
        'name': 'Gnosis Chiado',
        'type': 'EVM',
        'logo': 'gnosis.png',
        'domain': 9,
        'chainId': 10200
    }, {
        'name': 'Base Sepolia',
        'type': 'EVM',
        'logo': 'base.png',
        'domain': 10,
        'chainId': 84532
    }],
    mainnet: [
        {
            'name': 'Ethereum',
            'type': 'EVM',
            'logo': 'ethereum.png',
            'domain': 1,
            'chainId': 1
        },
        {
            'name': 'Khala',
            'type': 'Substrate',
            'logo': 'khala.png',
            'domain': 2,
            'chainId': 5232
        },{
            'name': 'Phala',
            'type': 'Substrate',
            'logo': 'phala.png',
            'domain': 3,
            'chainId': 5233
        },{
            'name': 'Cronos',
            'type': 'EVM',
            'logo': 'cronos.png',
            'domain': 4,
            'chainId': 25
        },{
            'name': 'Base',
            'type': 'EVM',
            'logo': 'base.png',
            'domain': 5,
            'chainId': 8453
        },{
            'name': 'Gnosis',
            'type': 'EVM',
            'logo': 'gnosis.png',
            'domain': 6,
            'chainId': 100
        },{
            'name': 'Polygon',
            'type': 'EVM',
            'logo': 'polygon.webp',
            'domain': 7,
            'chainId': 137
        }
    ]
}

export const TransferState = {
    0: 'Select source network',
    1: 'Select destination network',
    2: 'Select Token',
    3: 'Set Token Amount',
    4: 'Input Recipient Address',
    5: 'Wallet is not connected',
    6: 'Switch chain',
    7: 'Approve token',
    8: 'Transfer',
    9: 'Please confirm in your wallet',
    10: 'Waiting Transaction confirmation',
    11: 'Start new transfer',
    12: 'Unknown'
}

export const FungibleTransferState = {
    MISSING_SOURCE_NETWORK: 0,
    MISSING_DESTINATION_NETWORK: 1,
    MISSING_RESOURCE: 2,
    MISSING_RESOURCE_AMOUNT: 3,
    MISSING_DESTINATION_ADDRESS: 4,
    WALLET_NOT_CONNECTED: 5,
    WRONG_CHAIN: 6,
    PENDING_APPROVALS: 7,
    PENDING_TRANSFER: 8,
    WAITING_USER_CONFIRMATION: 9,
    WAITING_TX_EXECUTION: 10,
    COMPLETED: 11,
    UNKNOWN: 12
  }