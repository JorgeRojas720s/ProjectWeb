import { apiHandler, riskClassificationsRepo } from "/helpers/api";

export default apiHandler({
  get: getAll,
  post: create,
});

async function getAll(req, res) {
  const riskClassifications = await riskClassificationsRepo.getAll();
  return res.status(200).json(riskClassifications);
}

async function create(req, res) {
  await riskClassificationsRepo.create(req.body);
  return res
    .status(200)
    .json({ message: "Risk classification created successfully" });
}
