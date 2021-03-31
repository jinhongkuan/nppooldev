import logo from './logo.svg';
import React, {Component} from 'react'
import { BrowserRouter as Router, Route,Link, Switch, useHistory, useParams } from "react-router-dom"
import {NPTASKPOOL_ADDRESS} from './config'
import Web3 from 'web3'
import './App.css';
import $ from "jquery";
import NPTaskPool from './contracts/NPTaskPool.json';

export class HomePage extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (<div>
      <p>Account address: {this.props.state.account} </p>
    
      <p>Account balance: {this.props.state.balance} Gwei</p>
    
      <p>Current tasks: {this.props.state.taskCount} </p>
      <ol>
      {
        this.props.state.task_list.map((value, index) => {
          return <li key={index}><Link to={"/solve/"+ value.index}>{value.name}</Link>, {value.reward} Gwei, {value.attempts} Attempts</li>
        })
      }
      </ol>
    
      <Link to="/request">Submit a request</Link>
    </div>);
  }
}



export class RequestPage extends Component {
  constructor(props) {
    super(props);
  }
  
  componentDidMount() {
    // let worker = Worker();
    // worker.onmessage = function (event) {

    //   alert(JSON.stringify(event.data));
    // };

    // const button = document.getElementById("tsolve");

    // button.addEventListener("click", function () {
    //   worker.postMessage({ postMessage: true });
    // });

  }
  submitTask() 
  {
    const task_name = $("#tname").val();
    const task_script = $("#tscript").val();
    const task_bounty = $("#tbounty").val();

    // Create smart contract for verification 
    let web3 = this.props.state.web3;
    
    $('#tcompile').val($('#tcompile').val()+"Verification contract deployed.\n");

    // Call the createTask function in NPTaskPool 
    const NPPoolContract = new this.props.state.web3.eth.Contract(NPTaskPool.abi, NPTASKPOOL_ADDRESS);
    // Temporarily use user's 
    NPPoolContract.methods.createTask(task_name, task_script, task_bounty, "0x" + "0".repeat(40)).send({from: this.props.state.account})
    .on('error', (error)=> {$('#tcompile').val($('#tcompile').val()+'Error Submitting Task: ' + error);})
    .then((result)=>{
        $('#tcompile').val($('#tcompile').val()+'Task Submitted to Blockchain.');
    });
    // let code_input = $('#tscript').val() 
    // let compiler_input = {
    //   language: 'Solidity',
    //   sources: {
    //     'verify.sol' : {
    //       content: task_script
    //     }
    //   },
    //   settings: {
    //     outputSelection: {
    //       '*' : {
    //         '*' : ['*']
    //       }
    //     }
    //   }
    // }
    // var worker = new compileWorker();
    // worker.postMessage([compiler_input]);
    // worker.onmessage = (e) =>
    // {
    //   if (e)
    //   {
    //     $('#tcompile').val('Compilation complete');
    //   }
    // }

    

    // let output = JSON.parse(solc.compile(JSON.stringify(compiler_input)));

    // if (output['errors'] !== 'undefined')
    // {
    //   alert("Error compiling code.");
    //   $('#tcompile').val(JSON.stringify(output['errors']));
    //   return;
    // }

    // $('#tcompile').val(JSON.stringify(output));

    // let contracts = output.contracts;
    
    // // ABI description as JSON structure
    // let abi = JSON.parse(contracts['verify.sol'].abi);

    // // Smart contract EVM bytecode as hex
    // let code = '0x' + contracts['verify.sol'].bin;

    // // Create Contract proxy class
    // let VerificationContract = web3.eth.contract(abi);

    // $('#tcompile').val($('#tcompile').val()+"Deploying the contract...\n");
    // let contract = VerificationContract.new({from: this.props.state.account, gas: 1000000, data: code});

    // function sleep(ms) {
    //   return new Promise(resolve => setTimeout(resolve, ms));
    // }

    // // We need to wait until any miner has included the transaction
    // // in a block to get the address of the contract
    // async function waitBlock() {
    //   while (true) {
    //     let receipt = web3.eth.getTransactionReceipt(contract.transactionHash);
    //     if (receipt && receipt.contractAddress) {
    //           $('#tcompile').val($('#tcompile').val()+"Verification contract deployed.\n");
    //          // Call the createTask function in NPTaskPool 
    //           const NPPoolContract = new this.props.state.web3.eth.Contract(NPTaskPool.abi, NPTASKPOOL_ADDRESS);
    //           NPPoolContract.methods.createTask(task_name, task_script, task_bounty, receipt.contractAddress).send({from: this.props.state.account})
    //           .on('error', (error)=> {alert('Error Submitting Task: ' + error);})
    //           .then((result)=>{
    //               alert('Task Submitted to Blockchain.');
    //           });
    //     }
    //     $('#tcompile').val($('#tcompile').val()+ ("Waiting a mined block to include your contract... currently in block " + web3.eth.blockNumber + "\n"));
    //     await sleep(4000);
    //   }
    // }

    // waitBlock();
  }

  render() {
    console.log(this.props);
    this.submitTask = this.submitTask.bind(this);
    return (<div>
      <table>
        <tr><td>
        Task Name: <input type="text" id="tname"></input>
        </td></tr>
        <tr><td>
        Verification Script:<br></br> <textarea rows="20" cols="80" id="tscript" defaultValue="pragma solidity >=0.4.22 <0.9.0 &#13;&#10;contract C&#13;&#10;{&#13;&#10;     function doSomething() public {}&#13;&#10;}
        "></textarea>
        </td></tr>
        <tr><td>
        Compiler Messages:<br></br> <textarea readonly="readonly" rows="20" cols="80" id="tcompile" defaultValue=""></textarea>
        </td></tr>
        <tr><td>
          Bounty: <input type="number" id="tbounty"></input> Gwei
          </td>
          <td>

          </td>
          </tr>
        <br></br>
        <tr><td>
        <a href="#" onClick={this.submitTask}>Submit</a><br/>
        </td></tr>
        <tr><td>
        <Link to="/">Back</Link>
        </td></tr>
        
      </table>


    </div>);
  }
}

export class SolvePage extends Component {
  constructor(props) {
    super(props);
  }

  verifySolution() {
 

  }

  render() {
    console.log(this.props);
    
    const task_id = this.props.match.params.id;
    const task = this.props.state.task_list[task_id];
    return (<div>
      <table>
        <tr><td>
        Task Name: <input type="text" id="tname" value={task.name} readonly></input>
        </td></tr>
        <tr><td>
        Verification Script:<br/> <textarea rows="20" cols="80" id="tscript" value={task.decision_function} readonly></textarea>
        </td></tr>
        <tr>
            <td>
              Solution: <br/> <textarea id="tsolve" rows="20" cols="80" defaultValue="(args) => &#123; &#125;"></textarea> 
            </td>
          </tr>
        <tr><td>
          Bounty: <input type="number" id="tbounty" value={task.reward} readonly></input> Gwei
          </td>
          </tr>
         
        <br></br>
        <tr><td>
        <a href="#" onClick={this.verifySolution}>Verify</a><br/>
        </td></tr>
        <tr><td>
        <Link to="/">Back</Link>
        </td></tr>
        
      </table>


    </div>);
  }
}

class App extends Component {
  
  componentWillMount(){
    this.loadBlockchainData();
  }

  async loadBlockchainData() {
    const web3 = new Web3(Web3.givenProvider || "http://localhost:8545")
    const network = await web3.eth.net.getNetworkType();
    await window.ethereum.enable();
    const NPPoolContract = new web3.eth.Contract(NPTaskPool.abi, NPTASKPOOL_ADDRESS);
    const taskCount = await NPPoolContract.methods.taskCount().call();
    const accounts = await web3.eth.getAccounts();
    const balance = await web3.eth.getBalance(accounts[0]) / 1000000000;
    const task_list = [] 

    for (var i = 0; i < taskCount; i++)
    {
      var task_info = await NPPoolContract.methods.getTask(i).call();
      task_list.push(task_info)
    }

    this.setState({ taskCount : taskCount, account : accounts[0], balance : balance, web3: web3});
    this.setState({ task_list: task_list});
  }

  constructor(props) {
    super(props)
    this.state = { taskCount: -1, account: '', balance: 0, task_list : [], web3: null}
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" >
            <HomePage state={this.state}/>
          </Route>
          <Route path="/solve/:id" render={props => <SolvePage {...props} state={this.state}/>}/>
            
          <Route path="/request">
            <RequestPage state={this.state}/>
          </Route>
       
        </Switch>
          
        </Router>
      
      
    );
  }
}

export default App;
