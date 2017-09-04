import master from './master';
import minion from './minion';
import highlight from '../utils';

export default client => client
  .exists('master', (error, message) => {
    if (error) {
      throw new Error(error);
    }
    if (message === 1) {
      console.log(highlight(`Minion ${process.pid} is now processing tasks`));
      minion(client);
    } else {
      console.log(highlight(`Master ${process.pid} is now generating tasks`));
      master(client);
    }
  });
