import highlight from './utils';

export default client => client
  .multi()
  .lrange('errors', 0, -1)
  .ltrim('errors', 1, 0)
  .exec((error, data) => {
    if (error) {
      throw new Error(error);
    }
    const errorCount = data[0].length;

    if (errorCount && errorCount > 0) {
      console.log(highlight(`${errorCount} errors have been found`));
    } else {
      console.log(highlight('No errors have been found'));
    }

    data[0].forEach((item, index) => console.log(`${index}: ${item}`));
    console.log(highlight('Finished'));
    process.exit(0);
  });
