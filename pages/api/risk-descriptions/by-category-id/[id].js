import { apiHandler, riskDescriptionsRepo } from "/helpers/api";

export default apiHandler({
  get: getByCategoryId,
});

async function getByCategoryId(req, res) {
  const { id } = req.query;
  const riskDescriptions = await riskDescriptionsRepo.getByCategoryId(id);

  if (!riskCategory) {
    return res
      .status(404)
      .json({ error: "No risk descriptions found for the given risk category" });
  }

  return res.status(200).json(riskDescriptions);
}