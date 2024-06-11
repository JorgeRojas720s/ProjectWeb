import { apiHandler, riskDescriptionsRepo } from "/helpers/api";

export default apiHandler({
  get: getByCategoryId,
});

async function getByCategoryId(req, res) {
  const { id } = req.query;
  const riskDescription = await riskDescriptionsRepo.getByCategoryId(id);

  if (!riskDescription) {
    return res
      .status(404)
      .json({ error: "No risk classification found for the given consequence" });
  }

  return res.status(200).json(riskDescription);
}