import request from 'superagent';
import superAgentPromise from 'superagent-promise';

const requestClient = superAgentPromise(request, Promise);

export default requestClient;
