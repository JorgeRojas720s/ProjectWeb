import { apiHandler, consequencesRepo } from "/helpers/api";

export default apiHandler({
  get: getById,
  put: update,
  delete: _delete,
});

async function getById(req, res) {
  const { id } = req.query;
  const consequence = await consequencesRepo.getById(id);
  if (!consequence) {
    return res.status(404).json({ error: "Consequence not found" });
  }
  return res.status(200).json(consequence);
}

async function update(req, res) {
  const { id } = req.query;
  try {
    await consequencesRepo.update(id, req.body);
    return res
      .status(200)
      .json({ message: "Consequence updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Consequence updated error" });
  }
}

async function _delete(req, res) {
  const { id } = req.query;
  try {
    await consequencesRepo._delete(id);
    return res
      .status(200)
      .json({ message: "Consequence deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Consequence deleted error" });
  }
}
