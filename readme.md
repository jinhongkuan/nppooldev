## Setup
### Pre-requisites 
This app can be hosted locally using Node.js, Truffle and Ganache. The installation steps are as follows:
1. Download and install Node.js https://nodejs.org/en/
2. Install Truffle using npm (Node.js' built-in package manager) 	
```npm install -g truffle```
3. Download and install Ganache https://www.trufflesuite.com/ganache
4. Add Metamask extension to your browser of choice (Chrome, Brave, Edge, Firefox)

### Hosting a local server 
1. To host a local blockchain, Run Ganache -> Create a new workspace -> Server -> change port to 8545 -> Save workspace.
2. Navigate to project folder in console and deploy the smart contracts with the commands:
```truffle migrate --reset```
3.  To host the web app locally, navigate to [project folder]/client/, and run the following commands:
```npm run start```
4. The web app should now be available at http://localhost:8080/ on your browser.

### Interacting with local server
To connect your simulated wallet on Ganache with the webapp, first run Ganache with the configured settings, then do the following:

 1. On Ganache, click on the key icon at the right end of the first address, and copy the private key.
 2. On Metamask, click on the colored circle at the top right corner -> Import Account -> Paste the private key
 3. With the new wallet added, change the network to Localhost 8545 (next to the colored circle).
 4. Host the web app locally (step 3 in the previous section) and navigate to the server on browser.
 5. Metamask will now prompt you to give access to the webapp, accept and your account will now be connected with the app.
