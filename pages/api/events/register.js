import { apiHandler, eventsRepo } from '/helpers/api';

export default apiHandler({
    post: register
});

async function register(req, res) {
   
    console.log("🚀 ~ register ~ body:", req.body)
    await eventsRepo.create(req.body);
    return res.status(200).json({message: "Event Created"});
}
