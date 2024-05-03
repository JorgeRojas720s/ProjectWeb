import { apiHandler, endActionPlansRepo } from "/helpers/api";

export default apiHandler({
  get: getByProposedActionId,
});

async function getByProposedActionId(req, res) {
  const { id } = req.query;
  const endActionPlans = await endActionPlansRepo.getByProposedActionId(id);

  if (!endActionPlans) {
    return res
      .status(404)
      .json({ error: "No end action plans found for the given proposed action" });
  }

  return res.status(200).json(endActionPlans);
}