import Q from 'q';
import {connection, dbId} from './dbConnection';

const POOL_COLLECTION = 'pools';

/**
 * Gets basic information about all pools available to a user
 * @param userId {string}
 * @returns {Promise.<T>}
 */
export function getAvailablePools(userId) {
    return connection()
        .then(conn => {
            const pools = conn.collection(POOL_COLLECTION);
            //need to select by UserId
            return Q(pools.find({userId}).toArray())
        })
        .then(pools => {
            return pools;
        });
}

/**
 * Gets Pool info by Id
 * @param poolId {string}
 * @returns {*|Promise.<T>}
 */
export function getPoolById(poolId) {
    return connection()
        .then(conn => {
            const pools = conn.collection(POOL_COLLECTION)
            return pools.findOne({_id: dbId(poolId)});
        });
}

/**
 * Create a Pool and returns the newly created Pool's Id
 * @param poolConfig {object}
 * @returns {*|Promise.<T>}
 */
export function createPool(poolConfig) {
    //poolName, username,
    let {poolName, username} = poolConfig;

    return connection()
        .then(conn => {

            const pools = conn.collection(POOL_COLLECTION);

            function fetchNewPool() {
                return pools.findOne({poolName}, {fields: {_id: 1}}).then(({_id}) => _id);
            }

            return pools.insertOne({poolName, username})
                .then(fetchNewPool);
        });
}