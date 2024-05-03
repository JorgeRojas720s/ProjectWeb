import { apiHandler, causesRepo } from "/helpers/api";

export default apiHandler({
  get: getByEventId,
});

async function getByEventId(req, res) {
  const { id } = req.query;
  const causes = await causesRepo.getByEventId(id);

  if (!causes) {
    return res
      .status(404)
      .json({ error: "No causes found for the given event" });
  }

  return res.status(200).json(causes);
}
