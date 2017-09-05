import highlight from './utils';

export default client => client
  .multi()
  .lrange('errors', 0, -1)  // get all errors
  .ltrim('errors', 1, 0)    // clear all errors
  .exec((error, data) => {
    if (error) {
      throw new Error(error);
    }

    const errorCount = data[0].length;
    const hasErrors = errorCount && errorCount > 0;

    console.log(highlight(`${hasErrors ? errorCount + 1 : 'No'} errors have been found`));

    data[0].forEach((item, index) => console.log(`${index}: ${item}`));

    console.log(highlight('Finished'));
    process.exit(0);
  });
