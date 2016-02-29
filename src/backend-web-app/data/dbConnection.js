import configService from '../configService';
import Q from 'q';
import {MongoClient, ObjectId} from 'mongodb';


//establish one connection when app starts
let _connection = null;
export function connection() {
    if (_connection) {
        console.log('connection already established');
        return Q.when(_connection);
    }

    const deferred = Q.defer();

    const {url} = configService.db;

    MongoClient.connect(url, (err, conn) => {
        if(err) {
            deferred.reject(err)
        }
        else {
            _connection = conn;
            deferred.resolve(conn);
        }
    })

    return deferred.promise;
}

export function closeConnection() {
    if(_connection) {
        _connection.close();
        _connection = null;
    }
}

export function dbId(id){
    return new ObjectId(id);
}