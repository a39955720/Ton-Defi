import { toNano } from '@ton/core';
import { TonDefi } from '../wrappers/TonDefi';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const tonDefi = provider.open(await TonDefi.fromInit());

    await tonDefi.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        }
    );

    await provider.waitForDeploy(tonDefi.address);

    // run methods on `tonDefi`
}
