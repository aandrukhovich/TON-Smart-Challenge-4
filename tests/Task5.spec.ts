import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano } from 'ton-core';
import { Task5 } from '../wrappers/Task5';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('Task5', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Task5');
    });

    let blockchain: Blockchain;
    let task5: SandboxContract<Task5>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        task5 = blockchain.openContract(Task5.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await task5.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: task5.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and task5 are ready to use
    });
    it ("1..3 test", async () => {
        const res = await task5.getFibonacci(1n, 3n);
        console.log(res);
    });
    it ("1..1 test", async () => {
        const res = await task5.getFibonacci(1n, 1n);
        console.log(res);
    });
    it ("0..1 test", async () => {
        const res = await task5.getFibonacci(0n, 1n);
        console.log(res);
    });
    it ("10..0 test", async () => {
        const res = await task5.getFibonacci(10n, 0n);
        console.log(res);
    });
    it ("1..10 test", async () => {
        const res = await task5.getFibonacci(1n, 10n);
        console.log(res);
    });
    it ("201..4 test", async () => {
        const res = await task5.getFibonacci(201n, 4n);
        console.log(res);
    });
    it ("370..1 test", async () => {
        const res = await task5.getFibonacci(370n, 1n);
        console.log(res);
    });
    it ("369..1 test", async () => {
        const res = await task5.getFibonacci(369n, 1n);
        console.log(res);
    });
    it ("369..2 test", async () => {
        const res = await task5.getFibonacci(369n, 2n);
        console.log(res);
    });
    it ("367..4 test", async () => {
        const res = await task5.getFibonacci(367n, 4n);
        console.log(res);
    });










});
