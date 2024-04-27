import { apiHandler, riskDescriptionsRepo } from "/helpers/api";

export default apiHandler({
  get: getAll,
  post: create,
});

async function getAll(req, res) {
  const riskDescriptions = await riskDescriptionsRepo.getAll();
  return res.status(200).json(riskDescriptions);
}

async function create(req, res) {
  await riskDescriptionsRepo.create(req.body);
  return res
    .status(200)
    .json({ message: "Risk description created successfully" });
}


