import { apiHandler, proposedActionsRepo } from "/helpers/api";

export default apiHandler({
  get: getById,
  put: update,
  delete: _delete,
});

async function getById(req, res) {
  const { id } = req.query;
  const proposedAction = await proposedActionsRepo.getById(id);
  if (!proposedAction) {
    return res.status(404).json({ error: "Proposed action not found" });
  }
  return res.status(200).json(proposedAction);
}

async function update(req, res) {
  const { id } = req.query;
  try {
    await proposedActionsRepo.update(id, req.body);
    return res
      .status(200)
      .json({ message: "Proposed action updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Proposed action updated error" });
  }
}

async function _delete(req, res) {
  const { id } = req.query;
  try {
    await proposedActionsRepo._delete(id);
    return res
      .status(200)
      .json({ message: "Proposed action deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Proposed action deleted error" });
  }
}
