//1. Demo
// const Demo_Contract = artifacts.require("Demo");

// module.exports = function(deployer) {
//     deployer.deploy(Demo_Contract);
// };

//2. TestNFT
const TestNFT1 = artifacts.require("TestNFT1");

module.exports = function (deployer) {
    deployer.deploy(TestNFT1);
};
