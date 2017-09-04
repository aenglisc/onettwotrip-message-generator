import client from 'redis';
import getErrors from './getErrors';
import dispatch from './clients';

const getErrorsOption = process.argv[2] === '--getErrors';

export default () => (getErrorsOption ? getErrors(client.createClient())
                                      : dispatch(client.createClient()));
