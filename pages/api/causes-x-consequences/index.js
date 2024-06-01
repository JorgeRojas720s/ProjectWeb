import { apiHandler, causesXconsequencesRepo } from "/helpers/api";

export default apiHandler({
  get: getAll,
  post: create,
});

async function getAll(req, res) {
  const causesXconsequences = await causesXconsequencesRepo.getAll();
  return res.status(200).json(causesXconsequences);
}

async function create(req, res) {
  await causesXconsequencesRepo.create(req.body);
  return res
    .status(200)
    .json({ message: "CausesXConsequence created successfully" });
}
