import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { TonDefi } from '../wrappers/TonDefi';
import '@ton/test-utils';

describe('TonDefi', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let tonDefi: SandboxContract<TonDefi>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        tonDefi = blockchain.openContract(await TonDefi.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await tonDefi.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: tonDefi.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and tonDefi are ready to use
    });
});
