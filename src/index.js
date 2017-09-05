import client from 'redis';
import getErrors from './getErrors';
import dispatch from './clients';

// predicate
const getErrorsOption = process.argv[2] === '--getErrors';

// get errors with the --getErrors option, otherwise run normally
export default () => (getErrorsOption ? getErrors(client.createClient())
                                      : dispatch(client.createClient()));
