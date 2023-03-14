const { task } = require("hardhat/config")

task("block_number", "Prints the current block number").setAction(
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`The current block number is : ${blockNumber}`)
    }
)

module.exports = {}
