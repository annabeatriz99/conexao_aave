//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@aave/core-v3/contracts/interfaces/IPool.sol";
import "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol";

contract AaveInteraction {
    IPoolAddressesProvider public immutable addressesProvider;
    IPool public immutable pool;

    constructor(address _addressesProvider) {
        addressesProvider = IPoolAddressesProvider(_addressesProvider);
        pool = IPool(addressesProvider.getPool());
    }

    // Depositar token
    function deposit(address asset, uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");

        IERC20(asset).transferFrom(msg.sender, address(this), amount);
        IERC20(asset).approve(address(pool), amount);

        pool.supply(asset, amount, msg.sender, 0);
    }

     //Retirar tokens do Aave
    function withdraw(address asset, uint256 amount) external {
        require(amount > 0, "Amount must be greater than zero");

        uint256 withdrawnAmount = pool.withdraw(asset, amount, msg.sender);
        require(withdrawnAmount > 0, "Withdrawal failed");
    }

    // Obtenha o saldo do usuário de um ativo no Aave
    function getUserReserveData(address asset, address user) external view returns (uint256, uint256) {
        (uint256 currentATokenBalance,,,) = pool.getUserAccountData(user);
        return (currentATokenBalance, IERC20(asset).balanceOf(user));
    }
}
