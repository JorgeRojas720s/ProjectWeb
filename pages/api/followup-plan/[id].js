import { apiHandler, followupPlanRepo } from "/helpers/api";

export default apiHandler({
  get: getById,
  put: update,
  delete: _delete,
});

async function getById(req, res) {
  const { id } = req.query;
  const followupPlan = await followupPlanRepo.getById(id);
  if (!followupPlan) {
    return res.status(404).json({ error: "Follow-up plan not found" });
  }
  return res.status(200).json(followupPlan);
}

async function update(req, res) {
  const { id } = req.query;
  try {
    await followupPlanRepo.update(id, req.body);
    return res
      .status(200)
      .json({ message: "Follow-up plan updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function _delete(req, res) {
  const { id } = req.query;
  try {
    await followupPlanRepo._delete(id);
    return res
      .status(200)
      .json({ message: "Follow-up plan deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
}
