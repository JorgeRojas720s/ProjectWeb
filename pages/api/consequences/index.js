import {apiHandler, consequencesRepo} from '/helpers/api';

export default apiHandler({
    get: getAll
});

async function getAll(req, res){
    const consequence = await consequencesRepo.getAll();
    return res.status(200).json(consequence);
}