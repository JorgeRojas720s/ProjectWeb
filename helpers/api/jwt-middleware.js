import { expressjwt } from 'express-jwt';
import util from 'util';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();

export { jwtMiddleware };

function jwtMiddleware(req, res) {
    const middleware = expressjwt({ secret: serverRuntimeConfig.secret, algorithms: ['HS256'] }).unless({
        path: [
            '/api/events',
            '/api/causes',
            '/api/consequences',
            // public routes that don't require authentication
            "/api/events/register"
        ]
    });

    return util.promisify(middleware)(req, res);
}