import { apiHandler, endActionPlanRepo } from "/helpers/api";

export default apiHandler({
  get: getAll,
  post: create,
});

async function getAll(req, res) {
  const endActionPlans = await endActionPlanRepo.getAll();
  return res.status(200).json(endActionPlans);
}

async function create(req, res) {
  await endActionPlanRepo.create(req.body);
  return res
    .status(200)
    .json({ message: "End action plan created successfully" });
}
