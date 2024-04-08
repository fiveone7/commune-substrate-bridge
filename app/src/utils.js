import { BigNumber, utils } from 'ethers';

export const shortAddress = (address) => {
  if (!address || address.length == 0) return address;
  return `${address.slice(0, 6)}...${address.slice(-5)}`;
};

export const tokenBalanceToNumber = (amount, decimals, formattedDecimals) =>{
  let value = utils.formatUnits(amount, decimals);
  if (formattedDecimals) {
    let valueBigNumber = utils.parseUnits(value, decimals);
    const factor = BigNumber.from(10).pow(formattedDecimals);
    valueBigNumber = valueBigNumber.mul(factor).div(BigNumber.from(10).pow(decimals));
    value = utils.formatUnits(valueBigNumber, formattedDecimals);
  }

  return value;
}