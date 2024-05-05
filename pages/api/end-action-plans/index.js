import { apiHandler, endActionPlansRepo } from "/helpers/api";

export default apiHandler({
  get: getAll,
  post: create,
});

async function getAll(req, res) {
  const endActionPlans = await endActionPlansRepo.getAll();
  return res.status(200).json(endActionPlans);
}

async function create(req, res) {
  await endActionPlansRepo.create(req.body);
  return res
    .status(200)
    .json({ message: "End action plan created successfully" });
}
