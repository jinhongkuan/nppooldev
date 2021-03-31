onmessage = function(e) {
    console.log('Worker: Message received from main script.');

    // const solc = require('solc');
    // let compiler_input = e[0];
    // let account_address = e[1]; 

    // let output = JSON.parse(solc.compile(JSON.stringify(compiler_input)));

    // if (output['errors'] !== 'undefined')
    // {
    //   alert("Error compiling code.");
    //   console.log(JSON.stringify(output['errors']));
    //   return;
    // }

    // console.log(JSON.stringify(output));

    // let contracts = output.contracts;
    
    // // ABI description as JSON structure
    // let abi = JSON.parse(contracts['verify.sol'].abi);

    // // Smart contract EVM bytecode as hex
    // let code = '0x' + contracts['verify.sol'].bin;

    // // // Create Contract proxy class
    // // let VerificationContract = web3.eth.contract(abi);

    // // console.log("Deploying the contract...\n");
    // // let contract = VerificationContract.new({from: account_address, gas: 1000000, data: code});

    postMessage(true);
  }