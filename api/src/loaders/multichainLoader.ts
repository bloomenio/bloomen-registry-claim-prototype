import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import * as multichain from 'multichain-node';
import { Container } from 'typedi';

import { MultichainService } from '../api/services/MultichainService';

export const multichainLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {

        const multichainInstance = multichain({
            port: 8002,
            host: '127.0.0.1',
            user: 'multichainrpc',
            pass: 'this-is-insecure-change-it',
        });
        const mcService = Container.get(MultichainService);
        mcService.setInstance(multichainInstance);
    }
};
