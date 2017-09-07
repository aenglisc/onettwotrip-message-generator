import master from './master';
import highlight from '../utils';

// random error generator
const isErroneous = () => Math.random() < 0.05;

// recursively receive and process tasks
const getTask = ({ name, client }, firstCall = false) => client
  .multi()
  .exists('master') // check for a master
  .rpop('tasks')    // fetch a task
  .exec((error, data) => {
    if (error) {
      throw new Error(error);
    }
    // notify on minion status
    if (firstCall) {
      console.log(highlight(`Minion ${process.pid} is now processing tasks`));
    }

    const masterPresent = data[0] === 1;
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

    // promote to master if no master exists
    if (masterPresent) {
      setTimeout(getTask, 50, { name, client });
    } else {
      client.set('master', name, 'PX', 1501);
      // multiple instances can detect the absence of a master
      // the last one to do it is promoted
      setTimeout(() => {
        client.get('master', (err, current) => {
          if (name === current) {
            console.log(highlight(`No master was found, ${name} is moving to master status`));
            master({ name, client });
          } else {
            getTask({ name, client });
          }
        });
      }, 50);
    }
  });

export default instance => getTask(instance, true);

