import { apiHandler, riskCategoriesRepo } from "/helpers/api";

export default apiHandler({
  get: getByClassificationId,
});

async function getByClassificationId(req, res) {
  const { id } = req.query;
  const riskCategory = await riskCategoriesRepo.getByClassificationId(id);

  if (!riskCategory) {
    return res
      .status(404)
      .json({ error: "No risk classification found for the given consequence" });
  }

  return res.status(200).json(riskCategory);
}