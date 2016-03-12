import { db } from '../configService';
import Q from 'q';
import { MongoClient, ObjectId } from 'mongodb';


// establish one connection when app starts
let _connection = null;
export function connection() {
  if (_connection) {
    return Q.when(_connection);
  }

  return MongoClient.connect(db.url)
    .then(conn => {
      _connection = conn;
      return conn;
    });
}

// TODO close this connection on cleanup per SO -http://stackoverflow.com/questions/14031763/doing-a-cleanup-action-just-before-node-js-exits
export function closeConnection() {
  if (_connection) {
    _connection.close();
    _connection = null;
  }
}

// TODO validate id requirements
export function dbId(id) {
  return new ObjectId(id);
}
