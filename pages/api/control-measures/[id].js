import { apiHandler, controlMeasuresRepo } from "/helpers/api";

export default apiHandler({
  get: getById,
  put: update,
  delete: _delete,
});

async function getById(req, res) {
  const { id } = req.query;
  const controlMeasure = await controlMeasuresRepo.getById(id);
  if (!controlMeasure) {
    return res.status(404).json({ error: "Control measure not found" });
  }
  return res.status(200).json(controlMeasure);
}

async function update(req, res) {
  const { id } = req.query;
  try {
    await controlMeasuresRepo.update(id, req.body);
    return res
      .status(200)
      .json({ message: "Control measure updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Control measure deleted error" });
  }
}

async function _delete(req, res) {
  const { id } = req.query;
  try {
    await controlMeasuresRepo._delete(id);
    return res
      .status(200)
      .json({ message: "Control measure deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Control measure deleted error" });
  }
}
