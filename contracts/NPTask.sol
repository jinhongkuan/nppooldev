pragma solidity >=0.4.22 <0.9.0;


contract NPTaskPool
{
    struct NPTask 
    {
        uint index; 
        string name;
        string decision_function;
        uint reward;
        address requester;
    }

    mapping(uint => NPTask) public getTask; 
    mapping(uint => mapping(address => address)) public getGolem; 
    address[] public allTasks; 
    uint public taskCount;

    constructor() public
    {
        taskCount = 0;
    }

    function createTask(string calldata name, string calldata decision_function, uint reward) external returns (uint taskIndex)
    {
        // Create new smart contract that details the NP task 
        NPTask memory new_task = NPTask({
            index: taskCount++,
            name: name, 
            decision_function: decision_function, 
            reward: reward, 
            requester: msg.sender});
        
        getTask[new_task.index] = new_task;

        taskIndex = new_task.index;
    }

}