import master from './master';
import minion from './minion';

export default instance => instance.client
  // check for a master on launch
  .exists('master', (error, message) => {
    if (error) {
      throw new Error(error);
    }
    if (message === 1) {
      minion(instance);
    } else {
      instance.client.set('master', process.pid, 'PX', 1501);
      master(instance);
    }
  });
