export const supportedNetworks = {
    testnet: [{
        'name': 'Sepolia',
        'type': 'EVM',
        'logo': 'sepolia.jpg',
        'domain': 2,
        'chainid': 11155111
    }, {
        'name': 'Rococo',
        'type': 'Substrate',
        'logo': 'rococo.jpg',
        'domain': 3,
        'chainid': 5231
    }, {
        'name': 'Cronos',
        'type': 'EVM',
        'logo': 'cronos.png',
        'domain': 5,
        'chainid': 338
    }, {
        'name': 'Holesky',
        'type': 'EVM',
        'logo': 'holesky.png',
        'domain': 6,
        'chainid': 17000
    }, {
        'name': 'Mumbai',
        'type': 'EVM',
        'logo': 'mumbai.svg',
        'domain': 7,
        'chainid': 80001
    }, {
        'name': 'Arbitrum Sepolia',
        'type': 'EVM',
        'logo': 'arbitrum.png',
        'domain': 8,
        'chainid': 421614
    }, {
        'name': 'Gnosis Chiado',
        'type': 'EVM',
        'logo': 'gnosis.png',
        'domain': 9,
        'chainid': 10200
    }, {
        'name': 'Base Sepolia',
        'type': 'EVM',
        'logo': 'base.png',
        'domain': 10,
        'chainid': 84532
    }],
    mainnet: [
        {
            'name': 'Ethereum',
            'type': 'EVM',
            'logo': 'ethereum.png',
            'domain': 1,
            'chainid': 1
        },
        {
            'name': 'Khala',
            'type': 'Substrate',
            'logo': 'khala.png',
            'domain': 2,
            'chainid': 5232
        },{
            'name': 'Phala',
            'type': 'Substrate',
            'logo': 'phala.png',
            'domain': 3,
            'chainid': 5233
        },{
            'name': 'Cronos',
            'type': 'EVM',
            'logo': 'cronos.png',
            'domain': 4,
            'chainid': 25
        },{
            'name': 'Base',
            'type': 'EVM',
            'logo': 'base.png',
            'domain': 5,
            'chainid': 8453
        },{
            'name': 'Gnosis',
            'type': 'EVM',
            'logo': 'gnosis.png',
            'domain': 6,
            'chainid': 100
        },{
            'name': 'Polygon',
            'type': 'EVM',
            'logo': 'polygon.webp',
            'domain': 7,
            'chainid': 137
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