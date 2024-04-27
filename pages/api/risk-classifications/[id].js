import { apiHandler, riskClassificationsRepo } from "/helpers/api";

export default apiHandler({
  get: getById,
  put: update,
  delete: _delete,
});

async function getById(req, res) {
  const { id } = req.query;
  const riskClassification = await riskClassificationsRepo.getById(id);
  if (!riskClassification) {
    return res.status(404).json({ error: "Risk classification not found" });
  }
  return res.status(200).json(riskClassification);
}

async function update(req, res) {
  const { id } = req.query;
  try {
    await riskClassificationsRepo.update(id, req.body);
    return res
      .status(200)
      .json({ message: "Risk classification updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Risk classification error" });
  }
}

async function _delete(req, res) {
  const { id } = req.query;
  try {
    await riskClassificationsRepo._delete(id);
    return res
      .status(200)
      .json({ message: "Risk classification deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Risk classification deleted error" });
  }
}
