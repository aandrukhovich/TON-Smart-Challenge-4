import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { Cell, toNano, Tuple, TupleBuilder, TupleItemInt } from 'ton-core';
import { Task2 } from '../wrappers/Task2';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';

describe('Task2', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Task2');
    });

    let blockchain: Blockchain;
    let task2: SandboxContract<Task2>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        task2 = blockchain.openContract(Task2.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await task2.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: task2.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and task2 are ready to use
    });
    it ("1x1 test", async () => {
        const one_tuple = new TupleBuilder();
        one_tuple.writeNumber(2n);

        var one_matrix = new TupleBuilder();
        var two_matrix = new TupleBuilder();

        one_matrix.writeTuple(one_tuple.build());
        two_matrix.writeTuple(one_tuple.build());

        const res = await task2.getMultiplied(one_matrix.build(), two_matrix.build());

        console.log(res);

    });
});
