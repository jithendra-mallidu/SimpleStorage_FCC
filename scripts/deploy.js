// imports
const { ethers, run, network } = require("hardhat")
require("dotenv").config()
// main async function
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying Contract, Please wait .........")
    const SimpleStorage = await SimpleStorageFactory.deploy()
    await SimpleStorage.deployed()
    console.log(`The contract is deployed at : ${SimpleStorage.address}`)
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting 6 block confirmations")
        await SimpleStorage.deployTransaction.wait(6)
        await verify(SimpleStorage.address, [])
    }

    const currentValue = await SimpleStorage.retrieve()
    console.log(`Current Value is : ${currentValue}`)

    // updating the favourate number

    const transactionRespose = await SimpleStorage.store(7)
    await transactionRespose.wait(1)
    const updatedValue = await SimpleStorage.retrieve()
    console.log(`Updated Value is : ${updatedValue}`)
}

async function verify(contractAddress, args) {
    console.log("Verifying Contract, please wait .....")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified!")
        } else {
            console.log(e)
        }
    }
}
// main()
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
