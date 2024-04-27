import { apiHandler, selectedActionsRepo } from "/helpers/api";

export default apiHandler({
  get: getById,
  put: update,
  delete: _delete,
});

async function getById(req, res) {
  const { id } = req.query;
  const selectedAction = await selectedActionsRepo.getById(id);
  if (!selectedAction) {
    return res.status(404).json({ error: "Selected action not found" });
  }
  return res.status(200).json(selectedAction);
}

async function update(req, res) {
  const { id } = req.query;
  try {
    await selectedActionsRepo.update(id, req.body);
    return res
      .status(200)
      .json({ message: "Selected action updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Selected action updated error" });
  }
}

async function _delete(req, res) {
  const { id } = req.query;
  try {
    await selectedActionsRepo._delete(id);
    return res
      .status(200)
      .json({ message: "Selected action deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Selected action deleted error" });
  }
}
