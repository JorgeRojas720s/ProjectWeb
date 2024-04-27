import { apiHandler, followupPlanRepo } from "/helpers/api";

export default apiHandler({
  get: getAll,
  post: create,
});

async function getAll(req, res) {
  const followupPlans = await followupPlanRepo.getAll();
  return res.status(200).json(followupPlans);
}

async function create(req, res) {
  await followupPlanRepo.create(req.body);
  return res
    .status(200)
    .json({ message: "Follow-up plan created successfully" });
}



