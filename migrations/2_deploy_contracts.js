const NPTaskPool = artifacts.require('NPTaskPool.sol');

module.exports = function(deployer)
{
    deployer.deploy(NPTaskPool); 
}