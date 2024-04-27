import { apiHandler, selectedActionsRepo } from "/helpers/api";

export default apiHandler({
  get: getAll,
  post: create,
});

async function getAll(req, res) {
  const selectedActions = await selectedActionsRepo.getAll();
  return res.status(200).json(selectedActions);
}

async function create(req, res) {
  await selectedActionsRepo.create(req.body);
  return res
    .status(200)
    .json({ message: "Selected action created successfully" });
}
