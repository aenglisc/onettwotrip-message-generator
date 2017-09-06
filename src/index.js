import redis from 'redis';
import getErrors from './getErrors';
import dispatch from './clients';

// predicate
const getErrorsOption = process.argv[2] === '--getErrors';

// initiators
const init = () => dispatch({ name: process.pid.toString(), client: redis.createClient() });
const initGetErrors = () => getErrors(redis.createClient());

// get errors with the --getErrors option, otherwise run normally
export default () => (getErrorsOption ? initGetErrors()
                                      : init());
