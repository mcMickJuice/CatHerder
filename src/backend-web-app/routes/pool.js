import {Router} from 'express';
import * as poolDataService from '../data/poolDataService';

export default function setupPoolRoutes(app) {
    const router = Router();

    router.get('/', (req, res, next) => {
        const {username} = req.user; //this is set in requestAuthorizationMiddleware
        poolDataService.getAvailablePools(username) //userId
            .then(pools => res.json({pools}))
            .catch(next);
    });

    router.get('/:poolId', (req, res, next) => {
        poolDataService.getPoolById(req.params.poolId)
            .then(pool => res.json({pool}))
            .catch(next)
    });

    router.post('/', (req, res, next) => {
        poolDataService.createPool(req.body.config)
            .then(poolId => res.json({poolId}))
            .catch(next);
    });

    app.use('/pools', router);
};

