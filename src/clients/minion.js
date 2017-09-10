import master from './master';
import highlight from '../utils';

// random error generator
const isErroneous = () => Math.random() < 0.05;

// recursively receive and process tasks
const getTask = ({ name, client }, firstCall = false) => client
  .multi()
  .get('master') // check for a master
  .rpop('tasks')    // fetch a task
  .exec((error, data) => {
    if (error) {
      throw new Error(error);
    }
    // notify on minion status
    if (firstCall) {
      console.log(highlight(`Minion ${name} is now processing tasks`));
    }

    const currentMaster = data[0];
    const task = data[1];

    // avoid null messages
    if (task) {
      // error generator
      if (isErroneous()) {
        console.log(highlight(`Minion ${name} has found an error in ${task}`));
        client.rpush('errors', task);
      } else {
        console.log(`Task done by ${name}: ${task}`);
      }
    }

    // move to master if master id matches client id
    if (currentMaster && currentMaster === name) {
      console.log(highlight(`No master was found, ${name} is moving to master status`));
      master({ name, client });
    } else {
      // promote to master if no master exists
      if (!currentMaster) {
        client.set('master', name, 'PX', 1501, 'NX');
      }
      setTimeout(getTask, 1, { name, client });
    }
  });

export default instance => getTask(instance, true);

