import master from './master';
import highlight from '../utils';

// random error generator
const isErroneous = () => Math.random() < 0.05;

// recursively receive and process tasks
const getTask = (client, firstCall = false) => {
  // notify on minion status
  if (firstCall) {
    console.log(highlight(`Minion ${process.pid} is now processing tasks`));
  }
  client
    .multi()
    .exists('master') // check for a master
    .rpop('tasks')    // fetch a task
    .exec((error, data) => {
      if (error) {
        throw new Error(error);
      }

      // predicates
      const masterPresent = data[0] === 1;
      const task = data[1];

      // avoid null messages
      if (task) {
        // error generator
        if (isErroneous()) {
          console.log(highlight(`Minion ${process.pid} has found an error in ${task}`));
          client.rpush('errors', task);
        } else {
          console.log(`Task done by ${process.pid}: ${task}`);
        }
      }

      // promote to master if no master exists
      if (masterPresent) {
        setTimeout(getTask, 500, client);
      } else {
        master(client);
      }
    });
};

export default client => getTask(client, true);

