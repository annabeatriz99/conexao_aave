const { ethers } = require("ethers");

const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID");
const wallet = new ethers.Wallet("PRIVATE_KEY", provider);

const lendingPoolAddress = "0x398ec7346dcd622eDc5ae82352F02Be94C62d119";
const lendingPoolABI = [
    "function deposit(address asset, uint256 amount, uint16 referralCode) external",
    "function borrow(address asset, uint256 amount, uint256 interestRateMode, uint256 referralCode, uint16 borrowAmount) external",
    "function getUserAccountData(address user) external view returns (uint256 totalCollateralETH, uint256 totalDebtETH, uint256 availableBorrowsETH)"
];

const lendingPool = new ethers.Contract(lendingPoolAddress, lendingPoolABI, wallet);

async function depositToAave(assetAddress, amount) {
    const asset = new ethers.Contract(assetAddress, ["function approve(address spender, uint256 amount) public returns (bool)"], wallet);
    
    // Aprovar o LendingPool para usar os tokens
    const approveTx = await asset.approve(lendingPoolAddress, amount);
    await approveTx.wait();
    
    // Depositar o ativo na Aave
    const depositTx = await lendingPool.deposit(assetAddress, amount, 0); // 0 é o referralCode
    await depositTx.wait();
    async function depositToAave(assetAddress, amount) {
        try {
            console.log("Aprovando o depósito...");
            const asset = new ethers.Contract(assetAddress, ["function approve(address spender, uint256 amount) public returns (bool)"], wallet);
            const approveTx = await asset.approve(lendingPoolAddress, amount);
            await approveTx.wait();
    
            console.log("Realizando o depósito...");
            const depositTx = await lendingPool.deposit(assetAddress, amount, 0);
            await depositTx.wait();
            
            console.log(`Depósito de ${ethers.utils.formatEther(amount)} ETH realizado com sucesso!`);
        } catch (error) {
            console.error("Erro ao realizar depósito:", error);
        }
    }
    
    
    console.log("Depósito realizado com sucesso!");
    
}

async function borrowFromAave(assetAddress, amount) {
    const borrowTx = await lendingPool.borrow(
        assetAddress,   // ativo a ser tomado emprestado
        amount,          // quantidade a ser emprestada
        2,               // 2 para juros variáveis (ou 1 para fixos)
        0,               // referralCode
        wallet.address   // endereço do tomador do empréstimo
    );
    await borrowTx.wait();
    
    console.log(`Empréstimo de ${amount} realizado com sucesso!`);
}

async function getAccountData() {
    const [totalCollateralETH, totalDebtETH, availableBorrowsETH] = await lendingPool.getUserAccountData(wallet.address);
    console.log("Saldo Total em Garantia:", ethers.utils.formatEther(totalCollateralETH), "ETH");
    console.log("Dívida Total:", ethers.utils.formatEther(totalDebtETH), "ETH");
    console.log("Valor Disponível para Empréstimos:", ethers.utils.formatEther(availableBorrowsETH), "ETH");
}
async function getInterestRates() {
    // função para pegar taxas de juros
    const interestRateModelAddress = "endereco_do_modelo_de_juros";
    const interestRateModel = new ethers.Contract(interestRateModelAddress, [
        "function getBorrowRate(address asset) external view returns (uint256)"
    ], provider);
    
    const borrowRate = await interestRateModel.getBorrowRate("endereco_do_ativo");
    console.log("Taxa de juros de empréstimo:", ethers.utils.formatUnits(borrowRate, 18), "%");
}


main().catch(console.error);