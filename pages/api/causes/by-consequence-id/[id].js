import { apiHandler, causesRepo } from "/helpers/api";

export default apiHandler({
  get: getByConsequenceId,
});

async function getByConsequenceId(req, res) {
  const { id } = req.query;
  const causes = await causesRepo.getByConsequenceId(id);

  if (!causes) {
    return res
      .status(404)
      .json({ error: "No causes found for the given consequence" });
  }

  return res.status(200).json(causes);
}
