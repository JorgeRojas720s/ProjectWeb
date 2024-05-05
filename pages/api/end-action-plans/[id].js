import { apiHandler, endActionPlansRepo } from "/helpers/api";

export default apiHandler({
  get: getById,
  put: update,
  delete: _delete,
});

async function getById(req, res) {
  const { id } = req.query;
  const endActionPlan = await endActionPlansRepo.getById(id);
  if (!endActionPlan) {
    return res.status(404).json({ error: "End action plan not found" });
  }
  return res.status(200).json(endActionPlan);
}

async function update(req, res) {
  const { id } = req.query;
  try {
    await endActionPlansRepo.update(id, req.body);
    return res
      .status(200)
      .json({ message: "End action plan updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "End action plan updated error" });
  }
}

async function _delete(req, res) {
  const { id } = req.query;
  try {
    await endActionPlansRepo._delete(id);
    return res
      .status(200)
      .json({ message: "End action plan deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "End action plan deleted error" });
  }
}
