import { apiHandler, consequencesRepo } from "/helpers/api";

export default apiHandler({
  get: getAll,
  post: create,
});

async function getAll(req, res) {
  const consequences = await consequencesRepo.getAll();
  return res.status(200).json(consequences);
}

async function create(req, res) {
  await consequencesRepo.create(req.body);
  return res.status(200).json({ message: "Consequence created successfully" });
}
