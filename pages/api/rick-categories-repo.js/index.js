import { apiHandler, riskCategoriesRepo } from "/helpers/api";

export default apiHandler({
  get: getAll,
  post: create,
});

async function getAll(req, res) {
  const riskCategories = await riskCategoriesRepo.getAll();
  return res.status(200).json(riskCategories);
}

async function create(req, res) {
  await riskCategoriesRepo.create(req.body);
  return res
    .status(200)
    .json({ message: "Risk category created successfully" });
}
