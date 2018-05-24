import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { scheduleJob } from 'node-schedule';

export const scheduleLoader: MicroframeworkLoader = (settings: MicroframeworkSettings | undefined) => {
    if (settings) {

        scheduleJob('*/10 * * * * *', () => {
            console.log('tic-toc!' + new Date());
          });
    }
};
