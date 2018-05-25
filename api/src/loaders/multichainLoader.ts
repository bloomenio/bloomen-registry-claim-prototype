import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import * as multichain from 'multichain-node';
import { Container } from 'typedi';

import { MultichainService } from '../api/services/MultichainService';
import { env } from '../env';

export const multichainLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {

        const multichainInstance = multichain({
            port: env.multichain.port,
            host: env.multichain.host,
            user: env.multichain.user,
            pass: env.multichain.pass,
        });
        const mcService = Container.get(MultichainService);
        mcService.setInstance(multichainInstance);
    }
};
