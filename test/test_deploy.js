const { ethers } = require("hardhat")
const { assert, expect } = require("chai")

describe("SimpleStorage", () => {
    let simpleStorageFactory, simpleStorage
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("1_Should start with a favourite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        assert.equal(
            currentValue.toString(),
            expectedValue,
            "It is not strating with 0"
        )
    })
    it("2_Should update when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)
        const currentValue = await simpleStorage.retrieve()
        assert.equal(
            expectedValue,
            currentValue.toString(),
            "Although we called store, the updation did not happen as expected"
        )
    })
    it("3_Should add a person with correct name and favorite number", async function () {
        // call the addPerson function with a name and favorite number
        const transactionResponse = await simpleStorage.addPerson(
            "Jithendra",
            7
        )
        await transactionResponse.wait(1)
        //Now that we have called the addPerson function, we need to check if the correct person was added or not
        const people = await simpleStorage.people(0)
        const peopleName = people.name
        const peopleFavoriteNumber = people.favoriteNumber
        assert.equal(peopleName, "Jithendra", "Name did not match")
        assert.equal(
            peopleFavoriteNumber.toString(),
            "7",
            "Favorite Number did not match"
        )
        // check that the name to number mapping was done correctly

        const jithendraFavoriteNumber =
            await simpleStorage.nameToFavoriteNumber("Jithendra")
        assert.equal(
            jithendraFavoriteNumber.toString(),
            "7",
            "Mapping isn't right"
        )
    })
}) //describe keyword takes 2 parameters first one is a string and the second one is a function
