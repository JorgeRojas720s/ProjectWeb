import { apiHandler, riskCategoriesRepo } from "/helpers/api";

export default apiHandler({
  get: getByClassificationId,
});

async function getByClassificationId(req, res) {
  const { id } = req.query;
  const riskCategories = await riskCategoriesRepo.getByClassificationId(id);

  if (!riskCategories) {
    return res
      .status(404)
      .json({ error: "No risk categories found for the given risk classification" });
  }

  return res.status(200).json(riskCategories);
}