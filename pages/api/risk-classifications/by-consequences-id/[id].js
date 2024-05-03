import { apiHandler, riskClassificationsRepo } from "/helpers/api";

export default apiHandler({
  get: getByConsequenceId,
});

async function getByConsequenceId(req, res) {
  const { id } = req.query;
  const rickClassification = await riskClassificationsRepo.getByConsequenceId(id);

  if (!rickClassification) {
    return res
      .status(404)
      .json({ error: "No risk classification found for the given consequence" });
  }

  return res.status(200).json(rickClassification);
}