import { apiHandler, selectedActionsRepo } from "/helpers/api";

export default apiHandler({
  get: getByProposedActionId,
});

async function getByProposedActionId(req, res) {
  const { id } = req.query;
  const selectedActions = await selectedActionsRepo.getByProposedActionId(id);

  if (!selectedActions) {
    return res
      .status(404)
      .json({ error: "No selected actions found for the given proposed action" });
  }

  return res.status(200).json(selectedActions);
}