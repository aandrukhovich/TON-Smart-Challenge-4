import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, Slice, beginCell, toNano } from 'ton-core';
import { Task4 } from '../wrappers/Task4';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('Task4', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Task4');
    });

    let blockchain: Blockchain;
    let task4: SandboxContract<Task4>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        task4 = blockchain.openContract(Task4.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await task4.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: task4.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and task4 are ready to use
    });
    it ("decrypt Hello World", async () => {
        const s2 = beginCell().storeStringTail("Hello World!").endCell();
        const s1 = beginCell().storeInt(0, 32).storeStringTail("Hello World!").storeRef(s2).endCell();
        const res1 = await task4.getEncrypt(3n + (26n * 20000000000n), s1);
        const res2 = await task4.getEncrypt(3n + (26n * 0n), s1);
        console.log(res1);
        console.log(res2);
        console.log(s1);
    });
    it ("Hello World", async () => {
        const s = beginCell().storeInt(0, 32).storeStringTail("Khoor Zruog!").endCell();
        const ss = beginCell().storeInt(0, 32).storeStringTail("Hello World!").endCell();
        const res = await task4.getDecrypt(29n, s);
        console.log(res);
        console.log(s);
        console.log(ss);
        expect(res.equals(ss));
    });
});
