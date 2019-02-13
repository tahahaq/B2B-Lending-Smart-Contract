/* eslint-disable require-jsdoc */
'use strict';


const namespace = 'one.xord.btob';

/**
 * Give a vote to candidate and change voter status to voted
 * @param {one.xord.btob.DepositBalance} tx - the balance to be proceeded
 * @transaction
 */

async function depositBalance(tx) {
    let customerRegistry = await getParticipantRegistry(namespace+'.Customer');
    try {
        if(tx.amount === 0 && tx.amount < 0){
            throw new Error("Invalid amount")
        }
        let customer = await  customerRegistry.get(tx.customerId);
        customer.balance = tx.amount;
        await customerRegistry.update(customer);

    } catch (e) {
        console.error(e);
        throw new Error(e)
    }
}

/**
 * Give a vote to candidate and change voter status to voted
 * @param {one.xord.btob.DepositLendingMoney} tx - the vote to be processed
 * @transaction
 */

async function depositLendingMoney(tx) {
    let customerRegistry = await getParticipantRegistry(namespace+'.Customer');
    let lendingContractRegistry = await getAssetRegistry(namespace+'.LendingContract');
    try {
        if(tx.amount === 0 && tx.amount < 0){
            throw new Error("Invalid amount")
        }
        let lendingContract = await lendingContractRegistry.get(tx.lendingContractId);
        let customer = await  customerRegistry.get(lendingContract.lenderId);

        customer.balance -= tx.amount;
        lendingContract.amount += tx.amount;
        customer.loanedMoney += tx.amount;

        await customerRegistry.update(customer);
        await  lendingContractRegistry.update(lendingContract)

    } catch (e) {
        console.error(e);
        throw new Error(e)
    }

}




