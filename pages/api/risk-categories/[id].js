import { apiHandler, riskCategoryRepo } from "/helpers/api";

export default apiHandler({
  get: getById,
  put: update,
  delete: _delete,
});

async function getById(req, res) {
  const { id } = req.query;
  const riskCategory = await riskCategoryRepo.getById(id);
  if (!riskCategory) {
    return res.status(404).json({ error: "Risk category not found" });
  }
  return res.status(200).json(riskCategory);
}

async function update(req, res) {
  const { id } = req.query;
  try {
    await riskCategoryRepo.update(id, req.body);
    return res
      .status(200)
      .json({ message: "Risk category updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Risk category updated error" });
  }
}

async function _delete(req, res) {
  const { id } = req.query;
  try {
    await riskCategoryRepo._delete(id);
    return res
      .status(200)
      .json({ message: "Risk category deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Risk category deleted error" });
  }
}
