import { apiHandler, causesRepo } from "/helpers/api";

export default apiHandler({
  get: getAll,
  post: create,
});

<<<<<<< HEAD
async function getAll(req, res){
    const causes = await causesRepo.getAll();
    return res.status(200).json(causes);
}
=======
async function getAll(req, res) {
  const causes = await causesRepo.getAll();
  return res.status(200).json(causes);
}

async function create(req, res) {
  await causesRepo.create(req.body);
  return res.status(200).json({ message: "Cause created successfully" });
}
>>>>>>> fabiux
