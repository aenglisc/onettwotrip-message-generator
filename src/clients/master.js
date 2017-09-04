import word from 'random-words';
import highlight from '../utils';

// generates three random words
const generateTask = () => `${word()}-${word()}-${word()}`;

// recursively generate and send tasks
const sendTasks = (client, firstCall = false) => {
  // notify on master status
  if (firstCall) {
    console.log(highlight(`Master ${process.pid} is now generating tasks`));
  }
  const task = generateTask();
  client
    .multi()
    .set('master', process.pid, 'PX', 1501) // set master marker
    .rpush('tasks', task)                   // send task
    .exec((err) => {
      if (err) {
        throw new Error(err);
      }
      console.log(`New task by ${process.pid}: ${task}`);
      setTimeout(sendTasks, 500, client);
    });
};

export default client => sendTasks(client, true);
