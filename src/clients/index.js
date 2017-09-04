import master from './master';
import minion from './minion';

export default client => client
  .exists('master', (error, message) => {
    if (error) {
      throw new Error(error);
    }
    if (message === 1) {
      minion(client);
    } else {
      master(client);
    }
  });
