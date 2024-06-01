import { apiHandler, causesXconsequencesRepo } from "/helpers/api";

export default apiHandler({
  get: getByCauseId,
});

async function getByCauseId(req, res) {
  const { id } = req.query;
  const consequences = await causesXconsequencesRepo.getByCauseId(id);

  if (!consequences) {
    return res
      .status(404)
      .json({ error: "No causes found for the given consequence" });
  }

  return res.status(200).json(consequences);
}