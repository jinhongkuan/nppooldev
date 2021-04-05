// const solc = require('solc');
// require('solc');

onmessage = function (event) {
    // const compiler_input = event.data['compiler_input']; 
    let output = JSON.parse(solc.compile(JSON.stringify(compiler_input)));

    if (output['errors'] !== 'undefined')
    {
      postMessage({'error' : true, 'message': "Error compiling code: " + JSON.stringify(output['errors'])});
    }

    let contracts = output.contracts;
    
    // ABI description as JSON structure
    let abi = JSON.parse(contracts['verify.sol'].abi);

    // Smart contract EVM bytecode as hex
    let code = '0x' + contracts['verify.sol'].bin;

    // Create Contract proxy class
    let VerificationContract = web3.eth.contract(abi);

    postMessage({'error' : false, 'message': "Deploying contract on blockchain"});
    let contract = VerificationContract.new({from: this.props.state.account, gas: 1000000, data: code});


    // We need to wait until any miner has included the transaction
    // in a block to get the address of the contract
    while (true) {
      let receipt = web3.eth.getTransactionReceipt(contract.transactionHash);
      if (receipt && receipt.contractAddress) {
            postMessage({'error' : false, 'message': "Contract deployed"});
            // Call the createTask function in NPTaskPool 
            const NPPoolContract = new this.props.state.web3.eth.Contract(NPTaskPool.abi, NPTASKPOOL_ADDRESS);
            NPPoolContract.methods.createTask(task_name, task_script, task_bounty, receipt.contractAddress).send({from: this.props.state.account})
            .on('error', (error)=> {
              postMessage({'error' : true, 'message': "Task failed to be submitted"});
              return;
            })
            .then((result)=>{
              postMessage({'error' : false, 'message': "Task submitted"});
              return;
            });
      }
      setTimeout(1000);
    }
  

  };