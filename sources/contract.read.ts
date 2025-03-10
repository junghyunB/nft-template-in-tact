import { beginCell, contractAddress, toNano, Cell, Address, TonClient4 } from "@ton/ton";
import { deploy } from "./utils/deploy";
import { printAddress, printDeploy, printHeader } from "./utils/print";
// ================================================================= //
import { NftCollection } from "./output/sample_NftCollection";
// ================================================================= //

(async () => {
    const client = new TonClient4({
        // endpoint: "https://mainnet-v4.tonhubapi.com", // 🔴 Main-net API endpoint
        endpoint: "https://sandbox-v4.tonhubapi.com", // 🔴 Test-net API endpoint
    });

    // Parameters
    // let collection_address = Address.parse("kQASBb49-Uih6IjIWNSl7JOiVetbMWHrP1Eqh--cMbguJ7hN");
    let collection_address = Address.parse("kQBLfx5L_On9qZguYQR0TSmuA5J-ZVTr-M5PRT6mw_RClhC0");
    let contract_address = await NftCollection.fromAddress(collection_address);
    let client_open = client.open(contract_address);
    console.log("Collection Data ? :", await client_open.getGetCollectionData());
    const nft_index = 0n;
    let address_by_index = await client_open.getGetNftAddressByIndex(nft_index);
    printHeader("sampleNFT_Contract");
    // printAddress(collection_address
    // printHeader("1234");
    console.log("NFT ID[" + nft_index + "]: " + address_by_index);
})();
