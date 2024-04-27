import { apiHandler, riskDescriptionsRepo } from "/helpers/api";

export default apiHandler({
  get: getById,
  put: update,
  delete: _delete,
});

async function getById(req, res) {
  const { id } = req.query;
  const riskDescription = await riskDescriptionsRepo.getById(id);
  if (!riskDescription) {
    return res.status(404).json({ error: "Risk description not found" });
  }
  return res.status(200).json(riskDescription);
}

async function update(req, res) {
  const { id } = req.query;
  try {
    await riskDescriptionsRepo.update(id, req.body);
    return res
      .status(200)
      .json({ message: "Risk description updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Risk description updated error" });
  }
}

async function _delete(req, res) {
  const { id } = req.query;
  try {
    await riskDescriptionsRepo._delete(id);
    return res
      .status(200)
      .json({ message: "Risk description deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Risk description deleted error" });
  }
}


