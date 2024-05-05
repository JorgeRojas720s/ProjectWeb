import { apiHandler, selectedActionsRepo } from "/helpers/api";

export default apiHandler({
  get: getByFollowupPlanId,
});

async function getByFollowupPlanId(req, res) {
  const { id } = req.query;
  const selectedActions = await selectedActionsRepo.getByFollowupPlanId(id);

  if (!selectedActions) {
    return res
      .status(404)
      .json({ error: "No selected actions found for the given followup plan" });
  }

  return res.status(200).json(selectedActions);
}