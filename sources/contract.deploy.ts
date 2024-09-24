import { beginCell, contractAddress, toNano, Address } from "@ton/ton";
import { deploy } from "./utils/deploy";
import { printAddress, printDeploy, printHeader } from "./utils/print";
// ================================================================= //
import { NftCollection } from "./output/sample_NftCollection";
// ================================================================= //

(async () => {
    const OFFCHAIN_CONTENT_PREFIX = 0x01;
    const string_first = "https://d2fxuxnkptlo1z.cloudfront.net/web3/ton-test.json"; // Change to the content URL you prepared
    let newContent = beginCell().storeInt(OFFCHAIN_CONTENT_PREFIX, 8).storeStringRefTail(string_first).endCell();

    // ===== Parameters =====
    // Replace owner with your address
    let owner = Address.parse("0QArHRR_YrZVo_KCk6HXrg_KTCXWp4AQkU4VojgHpofk1E7a"); // 🔴🔴🔴

    // Prepare the initial code and data for the contract
    let init = await NftCollection.init(owner, newContent, {
        $$type: "RoyaltyParams",
        numerator: 350n, // 350n = 35%
        denominator: 1000n,
        destination: owner,
    });

    let address = contractAddress(0, init);
    let deployAmount = toNano("0.15");
    let testnet = true;

    // The Transaction body we want to pass to the smart contract
    let body = beginCell().storeUint(0, 32).storeStringTail("Mint").endCell();

    // Do deploy
    const dep = await deploy(init, deployAmount, body, testnet);
    console.log("deploy : ", dep);
    printHeader("sampleNFT_Contract");
    printAddress(address);
})();
