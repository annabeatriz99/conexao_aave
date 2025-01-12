async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);

    const AaveInteraction = await ethers.getContractFactory("AaveInteraction");
    const contract = await AaveInteraction.deploy("endereco_do_token");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
