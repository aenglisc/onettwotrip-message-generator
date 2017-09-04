import word from 'random-words';
import highlight from '../utils';

const generateTask = () => `${word()}-${word()}-${word()}`;

const sendTask = (client) => {
  const task = generateTask();
  client
    .multi()
    .get('master')
    .set('master', process.pid, 'PX', 1501)
    .rpush('tasks', task)
    .exec((err) => {
      if (err) {
        throw new Error(err);
      }
      console.log(`New task by ${process.pid}: ${task}`);
      setTimeout(sendTask, 500, client);
    });
};

export default client => sendTask(client);
