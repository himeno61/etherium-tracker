import { Injectable } from '@nestjs/common';
import Web3 from 'web3';
import { AbiItem } from 'web3-utils';

const address = '0x6b175474e89094c44da98b954eedeac495271d0f';

const abi: AbiItem[] = [
  {
    constant: true,
    inputs: [],
    name: 'symbol',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'decimals',
    outputs: [
      {
        name: '',
        type: 'uint8',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

async function collectData(contract) {
  const [decimals, symbol] = await Promise.all([
    contract.methods.decimals().call(),
    contract.methods.symbol().call(),
  ]);
  return { decimals, symbol };
}

@Injectable()
export class WSService {
  constructor() {
    console.log(process.env.INFURA_KEY);
    const web3 = new Web3(
      `wss://mainnet.infura.io/ws/v3/${process.env.INFURA_KEY}`,
    );
    const options = {
      topics: [web3.utils.sha3('Transfer(address,address,uint256)')],
    };
    const subscription = web3.eth.subscribe('logs', options);

    subscription.on('error', (err) => {
      throw err;
    });

    subscription.on('data', (event) => {
      if (event.topics.length == 3) {
        const transaction = web3.eth.abi.decodeLog(
          [
            {
              type: 'address',
              name: 'from',
              indexed: true,
            },
            {
              type: 'address',
              name: 'to',
              indexed: true,
            },
            {
              type: 'uint256',
              name: 'value',
              indexed: false,
            },
          ],
          event.data,
          [event.topics[1], event.topics[2], event.topics[3]],
        );

        const contract = new web3.eth.Contract(abi, event.address);

        collectData(contract)
          .then((contractData) => {
            const unit = Object.keys(web3.utils.unitMap).find(
              (key) =>
                web3.utils.unitMap[key] ===
                web3.utils
                  .toBN(10)
                  .pow(web3.utils.toBN(contractData.decimals))
                  .toString(),
            );

            console.log(
              `Transfer of ${web3.utils.fromWei(transaction.value)} ${
                contractData.symbol
              } from ${transaction.from} to ${transaction.to}`,
            );

            if (transaction.from === address || transaction.to === address) {
              console.log('Specified address sent an ERC-20 token!');
            }
          })
          .catch((e) => {
            console.log(e);
          });
      }
    });
  }
}
