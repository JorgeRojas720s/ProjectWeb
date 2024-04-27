import { apiHandler, proposedActionsRepo } from "/helpers/api";

export default apiHandler({
  get: getAll,
  post: create,
});

async function getAll(req, res) {
  const proposedActions = await proposedActionsRepo.getAll();
  return res.status(200).json(proposedActions);
}

async function create(req, res) {
  await proposedActionsRepo.create(req.body);
  return res
    .status(200)
    .json({ message: "Proposed action created successfully" });
}
