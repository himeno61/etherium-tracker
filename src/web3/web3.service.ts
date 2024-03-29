import { Injectable } from '@nestjs/common';

import Web3 from 'web3';
import { AbiItem } from 'web3-utils';
import { TransactionsService } from '../transactions/transactions.service';
import { Transaction } from '../typeorm';

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
export class Web3Service {
  constructor(private transactionService: TransactionsService) {
    const provider = new Web3.providers.WebsocketProvider(
      `wss://mainnet.infura.io/ws/v3/${process.env.INFURA_KEY}`,
    );
    const web3 = new Web3(provider);

    const options = {
      topics: [web3.utils.sha3('Transfer(address,address,uint256)')],
    };
    const subscription = web3.eth.subscribe('logs', options);

    subscription.on('error', (err) => {
      throw err;
    });

    subscription.on('data', async (event) => {
      // console.log(event);
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
        if (transaction.from === address || transaction.to === address) {
          try {
            const block = await web3.eth.getBlock(event.blockNumber);
            const dateTimeStamp = Number(block.timestamp);
            console.log('Specified address sent an ERC-20 token!');
            const contract = new web3.eth.Contract(abi, event.address);
            const collectedData = await collectData(contract);
            const unit = Object.keys(web3.utils.unitMap).find(
              (key) =>
                web3.utils.unitMap[key] ===
                web3.utils
                  .toBN(10)
                  .pow(web3.utils.toBN(collectedData.decimals))
                  .toString(),
            );

            const value = `${web3.utils.fromWei(transaction.value)} ${
              collectedData.symbol
            }`;

            console.log(
              `Transfer of ${value} from ${transaction.from} to ${transaction.to}`,
            );

            const itemToStore: Partial<Transaction> = {
              id: event.transactionHash,
              from: transaction.from,
              to: transaction.to,
              value: value,
              timestamp: new Date(dateTimeStamp * 1000),
            };

            await this.transactionService.storeTransaction(itemToStore);
          } catch (e) {
            console.log(e);
          }
        }
      }
    });
  }
}
