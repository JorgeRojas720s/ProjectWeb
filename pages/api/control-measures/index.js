import { apiHandler, controlMeasuresRepo } from "/helpers/api";

export default apiHandler({
  get: getAll,
  post: create,
});

async function getAll(req, res) {
  const controlMeasures = await controlMeasuresRepo.getAll();
  return res.status(200).json(controlMeasures);
}

async function create(req, res) {
  await controlMeasuresRepo.create(req.body);
  return res
    .status(200)
    .json({ message: "Control measure created successfully" });
}


