import word from 'random-words';
import minion from './minion';
import highlight from '../utils';

// generates three random words
const genTask = () => `${word()}-${word()}-${word()}`;

// recursively generate and send tasks
const sendTask = ({ name, client }, firstCall = false, task = genTask()) => client
  .get('master', (err, master) => {
    if (err) {
      throw new Error(err);
    }
    if (!master || (master && master === name)) {
      if (firstCall) {
        console.log(highlight(`Master ${name} is now generating tasks`));
      }
      client.set('master', name, 'PX', 1501);
      client.rpush('tasks', task);

      console.log(`New task by ${name}: ${task}`);
      setTimeout(sendTask, 500, { name, client });
    } else {
      console.log(highlight(`Master ${master} was found, ${name} is moving back to minion status`));
      minion({ name, client });
    }
  });

export default instance => sendTask(instance, true);
