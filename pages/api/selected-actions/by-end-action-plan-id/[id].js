import { apiHandler, selectedActionsRepo } from "/helpers/api";

export default apiHandler({
  get: getByEndActionPlanId,
});

async function getByEndActionPlanId(req, res) {
  const { id } = req.query;
  const selectedActions = await selectedActionsRepo.getByEndActionPlanId(id);

  if (!selectedActions) {
    return res
      .status(404)
      .json({ error: "No selected actions found for the given end action plan" });
  }

  return res.status(200).json(selectedActions);
}