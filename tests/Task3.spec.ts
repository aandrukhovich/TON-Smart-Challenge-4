import { Blockchain, SandboxContract } from '@ton-community/sandbox';
import { BitString, Cell, Slice, beginCell, toNano } from 'ton-core';
import { Task3 } from '../wrappers/Task3';
import '@ton-community/test-utils';
import { compile } from '@ton-community/blueprint';
import { write } from 'fs';

function generateRandomBinaryString(length: number): string {
    let result = '';
    const characters = '01';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
  
    return result;
  }

function write_to_Cell(s: string, cell?: Cell) : Cell {
    let builder = beginCell();
    for (let i = 0; i < s.length; i++) {
        const bit = parseInt(s[i]);
        builder.storeBit(bit);
        }
    if (cell != undefined) {
        builder.storeRef(cell);
    }
    return builder.endCell();
}

describe('Task3', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Task3');
    });

    let blockchain: Blockchain;
    let task3: SandboxContract<Task3>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        task3 = blockchain.openContract(Task3.createFromConfig({}, code));

        const deployer = await blockchain.treasury('deployer');

        const deployResult = await task3.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: task3.address,
            deploy: true,
            success: true,
        });
    });

    // it('should deploy', async () => {
    //     // the check is done inside beforeEach
    //     // blockchain and task3 are ready to use
    // });
    // it ("0000 -> 0000", async () => {
    //     const input = beginCell().storeUint(0, 4).endCell(); // 0000 -> 0000
    //     const output = beginCell().storeUint(0, 4).endCell(); // 0000
    //     const result = await task3.getSolution(1n, 2n, input);
    //     expect(result).toEqual(output);
    // });
    // it ("111-111 -> 101010", async () => {
    //     const next = beginCell().storeUint(7, 3).endCell();
    //     const input = beginCell().storeUint(7, 3).storeRef(next).endCell();  
    //     const output = beginCell().storeUint(42, 6).endCell();
    //     const result = await task3.getSolution(3n, 2n, input);
    //     // console.log(output);
    //     // console.log(result);
    //     // console.log(output.beginParse().loadUint(6));
    //     // console.log(result.beginParse().loadUint(6));
    //     expect(result.beginParse().loadUint(6)).toEqual(output.beginParse().loadUint(6));
    // });
    // it ("111 -> 101", async () => {
    //     const input = beginCell().storeUint(7, 3).endCell(); // 111 -> 101
    //     const output = beginCell().storeUint(5, 3).endCell(); // 101
    //     const result = await task3.getSolution(3n, 2n, input);
    //     expect(result.beginParse().loadUint(3)).toEqual(output.beginParse().loadUint(3));
    // });
    // it ("00101-0100010 -> 001111110011", async () => {
    //     const next = beginCell().storeUint(34, 7).endCell();
    //     const input = beginCell().storeUint(5, 5).storeRef(next).endCell(); // 111 -> 101
    //     const output = beginCell().storeUint(1011, 12).endCell(); // 
    //     const result = await task3.getSolution(2n, 3n, input);
    //     expect(result.beginParse().loadUint(12)).toEqual(output.beginParse().loadUint(12));
    // });
    // it ("0000 -> 0000", async () => {
    //     const input = beginCell().storeUint(0, 4).endCell(); // 0000
    //     const output = beginCell().storeUint(0, 4).endCell(); // 
    //     const result = await task3.getSolution(3n, 2n, input);
    //     expect(result.beginParse().loadUint(4)).toEqual(output.beginParse().loadUint(4));
    // });
    it ("big one", async () => {
        const str_size = 1023;

        let s3 = generateRandomBinaryString(str_size);
        const node3 = write_to_Cell(s3);
        let s2 = generateRandomBinaryString(str_size);
        const node2 = write_to_Cell(s2, node3);
        let s1 = generateRandomBinaryString(str_size);
        const input = write_to_Cell(s1, node2);

        const concated = s1 + s2 + s3;
        const flag = "101";
        const value = "10";
        const changed = concated.replace(new RegExp(flag, 'g'), value);

        const output3 = write_to_Cell(changed.substring(str_size * 2, str_size * 3));
        const output2 = write_to_Cell(changed.substring(str_size * 1, str_size * 2), output3);
        const output1 = write_to_Cell(changed.substring(str_size * 0, str_size * 1), output2);

        const result = await task3.getSolution(5n, 2n, input);

        console.log(concated);
        console.log(changed);
        console.log(result.bits);
        console.log(result.depth());
        console.log(output1);
        console.log(result);
    });
});
