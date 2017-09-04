import master from './master';
import highlight from '../utils';

const isErroneous = () => Math.random() < 0.05;

const getTask = client => client
  .multi()
  .exists('master')
  .rpop('tasks')
  .exec((error, data) => {
    if (error) {
      throw new Error(error);
    }
    const masterPresent = data[0] === 1;
    const task = data[1];
    if (task) {
      if (isErroneous()) {
        console.log(highlight(`Minion ${process.pid} has found an error in ${task}`));
        client.rpush('errors', task);
      } else {
        console.log(`Task done by ${process.pid}: ${task}`);
      }
    }
    if (masterPresent) {
      setTimeout(getTask, 500, client);
    } else {
      master(client);
    }
  });

const init = (client) => {
  console.log(highlight(`Minion ${process.pid} is now processing tasks`));
  return getTask(client);
};

export default client => init(client);
