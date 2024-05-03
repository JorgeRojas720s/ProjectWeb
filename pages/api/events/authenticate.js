import { apiHandler, eventsRepo } from '/helpers/api';

export default apiHandler({
    post: authenticate
});

async function authenticate(req, res) {
    const event = await eventsRepo.authenticate(req.body);
    return res.status(200).json(event);
}