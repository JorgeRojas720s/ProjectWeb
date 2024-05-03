import { apiHandler, causesRepo } from "/helpers/api";

export default apiHandler({
  get: getById,
  put: update,
  delete: _delete,
});

async function getById(req, res) {
  const { id } = req.query;
  const cause = await causesRepo.getById(id);
  if (!causes) {
    return res.status(404).json({ error: "Cause not found" });
  }
  return res.status(200).json(cause);
}

async function update(req, res) {
  const { id } = req.query;
  try {
    await causesRepo.update(id, req.body);
    return res.status(200).json({ message: "Cause updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Cause updated error" });
  }
}

async function _delete(req, res) {
  const { id } = req.query;
  try {
    await causesRepo._delete(id);
    return res.status(200).json({ message: "Cause deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Cause deleted error" });
  }
}
