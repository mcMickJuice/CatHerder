import {db} from '../configService';
import Q from 'q';
import {MongoClient, ObjectId} from 'mongodb';


//establish one connection when app starts
let _connection = null;
export function connection() {
    console.log('request in connection');
    if (_connection) {
        return Q.when(_connection);
    }

    const deferred = Q.defer();

    try{
        MongoClient.connect(db.url, (err, conn) => {
            if(err) {
                console.log('an error occurred in mongo connect')
                deferred.reject(err)
            }
            else {
                _connection = conn;
                deferred.resolve(conn);
            }
        });
    }
    catch(e){
        console.log('an error occurred');
        deferred.reject(err);
    }


    return deferred.promise;
}

export function closeConnection() {
    if(_connection) {
        _connection.close();
        _connection = null;
    }
}

//TODO validate id requirements
export function dbId(id){
    return new ObjectId(id);
}