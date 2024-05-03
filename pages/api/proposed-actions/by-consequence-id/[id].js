import { apiHandler, proposedActionsRepo } from "/helpers/api";

export default apiHandler({
  get: getByConsequenceId,
});

async function getByConsequenceId(req, res) {
  const { id } = req.query;
  const proposedActions = await proposedActionsRepo.getByConsequenceId(id);

  if (!proposedActions) {
    return res
      .status(404)
      .json({ error: "No proposed actions found for the given consequence" });
  }

  return res.status(200).json(proposedActions);
}