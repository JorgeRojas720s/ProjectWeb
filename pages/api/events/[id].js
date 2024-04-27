import { apiHandler, eventsRepo } from "/helpers/api";

export default apiHandler({
  get: getById,
  put: update,
  delete: _delete,
});

async function getById(req, res) {
  const { id } = req.query;
  const event = await eventsRepo.getById(id);
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }
  return res.status(200).json(event);
}

async function update(req, res) {
  const { id } = req.query;
  try {
    await eventsRepo.update(id, req.body);
    return res.status(200).json({ message: "Event updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Event updated error" });
  }
}

async function _delete(req, res) {
  const { id } = req.query;
  try {
    await eventsRepo._delete(id);
    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Event deleted error" });
  }
}
