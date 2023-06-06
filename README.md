# oasis-backend-task

#### Estimated time: ~5-6 hours

Your goal is to develop a backend service capable of performing the following tasks:
1. Real-time tracking of Ethereum Mainnet DAI token transfers (token address: 6b175474e89094c44da98b954eedeac495271d0f).
2. Database Management: Store all transfer information within a Postgres database.
3. REST API Development: Create a simple REST API with the following endpoints:
   * A public GET endpoint returning the top 10 addresses that spend most DAI within the last 24 hours.
   * An authenticated POST endpoint (authentication method is your choice - basic Auth is perfectly acceptable) capable of blacklisting addresses from the GET endpoint's results.


## Docker-compose file: 
In addition, please provide a straightforward Docker-compose file to facilitate the running of both the Postgres database and the API/worker.

## Blacklisting Description
A blacklisted address should not appear in the ranking and, additionally, incoming transfers to this address should not contribute to the rankings of other addresses.

## Suggested Technology Stack
We recommend using Nest.js with TYPEORM for the backend, and Infura RPC as the blockchain data provider.







