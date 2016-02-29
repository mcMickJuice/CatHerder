import Q from 'q';
import {connection, dbId} from './dbConnection';

const POOL_COLLECTION = 'pools';

export function getAvailablePools(userId) {
    return connection()
        .then(conn => {
            const pools = conn.collection(POOL_COLLECTION);
            //need to select by UserId
            return Q(pools.find({}).toArray())
        })
        .then(pools => {
            return pools;
        });
}

export function getPoolById(poolId) {
    return connection()
        .then(conn => {
            const pools = conn.collection(POOL_COLLECTION)
            return pools.findOne({_id: dbId(poolId)});
        });
}

export function createPool(poolConfig) {

}