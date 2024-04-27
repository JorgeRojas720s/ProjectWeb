import {apiHandler, causesRepo} from '/helpers/api';

export default apiHandler({
    get: getAll
});

async function getAll(req, res){
    const causes = await causesRepo.getAll();
    return res.status(200).json(causes);
}