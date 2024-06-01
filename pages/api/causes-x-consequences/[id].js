import { apiHandler, causesXconsequencesRepo } from "/helpers/api";

export default apiHandler({
  get: getById,
  put: update,
  delete: _delete,
});

async function getById(req, res) {
  const { id } = req.query;
  const causesXconsequence = await causesXconsequencesRepo.getById(id);
  if (!causesXconsequence) {
    return res.status(404).json({ error: "CausesXConsequence not found" });
  }
  return res.status(200).json(causesXconsequence);
}

async function update(req, res) {
  const { id } = req.query;
  try {
    await causesXconsequencesRepo.update(id, req.body);
    return res
      .status(200)
      .json({ message: "CausesXConsequence updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "CausesXConsequence update error" });
  }
}

async function _delete(req, res) {
  const { id } = req.query;
  try {
    await causesXconsequencesRepo._delete(id);
    return res
      .status(200)
      .json({ message: "CausesXConsequence deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "CausesXConsequence delete error" });
  }
}
