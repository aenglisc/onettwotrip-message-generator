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

    // predicates
    const hasErrors = errorCount && errorCount > 0;
    const oneError = errorCount && errorCount === 1;

    // string modifiers
    const logCount = hasErrors ? errorCount : 'No';
    const singularOrPlural = oneError ? ' has' : 's have';

    console.log(highlight(`${logCount} error${singularOrPlural} been found`));

    data[0].forEach((item, index) => console.log(`${index + 1}: ${item}`));

    console.log(highlight('Finished'));
    process.exit(0);
  });
