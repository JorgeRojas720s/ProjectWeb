import { expressjwt } from "express-jwt";
import util from "util";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

export { jwtMiddleware };

function jwtMiddleware(req, res) {
  const middleware = expressjwt({
    secret: serverRuntimeConfig.secret,
    algorithms: ["HS256"],
  }).unless({
    path: [
      // public routes that don't require authentication
      "/api/events",
      "/api/causes",
      "/api/consequences",
      "/api/consequences-repo",
      "/api/risk-classifications-repo",
      "/api/risk-categories-repo",
      "/api//risk-descriptions-repo",
      "/api/proposed-actions-repo",
      "/api/selected-actions-repo",
      "/api/followup-plans-repo",
      "/api/end-action-plans-repo",
      "/api/control-measures-repo",
      "/api/events/register",
      "/api/events/authenticate",
    ],
  });

  return util.promisify(middleware)(req, res);
}
