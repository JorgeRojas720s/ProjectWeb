import { apiHandler, controlMeasuresRepo } from "/helpers/api";

export default apiHandler({
  get: getByConsequenceId,
});

async function getByConsequenceId(req, res) {
  const { id } = req.query;
  const controlMeasures = await controlMeasuresRepo.getByConsequenceId(id);

  if (!controlMeasures) {
    return res
      .status(404)
      .json({ error: "No control measures found for the given consequence" });
  }

  return res.status(200).json(controlMeasures);
}