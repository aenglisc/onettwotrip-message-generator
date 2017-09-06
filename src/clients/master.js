import word from 'random-words';
import highlight from '../utils';

// generates three random words
const generateTask = () => `${word()}-${word()}-${word()}`;

// recursively generate and send tasks
const sendTasks = ({ name, client }, firstCall = false, task = generateTask()) => client
  .multi()
  .set('master', name, 'PX', 1501) // set master marker
  .rpush('tasks', task)            // send task
  .exec((err) => {
    if (err) {
      throw new Error(err);
    }
    // notify on master status
    if (firstCall) {
      console.log(highlight(`Master ${name} is now generating tasks`));
    }
    console.log(`New task by ${name}: ${task}`);
    setTimeout(sendTasks, 500, { name, client });
  });

export default client => sendTasks(client, true);
