import getConfig from "next/config";
import { db } from "/helpers/api";

const { serverRuntimeConfig } = getConfig();

export const eventsRepo = {
  getAll,
  getById,
  getAll,
  create,
  update,
  _delete,
};

async function getAll(params) {
  return await db.tbl_events.findAll();
}

async function getById(id) {
  return await db.tbl_events.findByPk(id);
}

async function create(params) {
  const event = new db.tbl_events(params);

  // save user
  await event.save();
}

async function update(id, params) {
  const event = await db.tbl_events.findByPk(id);
  if (!event) throw "Event not found";

  Object.assign(event, params);
  await user.save();
}

async function _delete(id) {
  const event = await db.tbl_events.findByPk(id);
  if (!event) throw "Event not found";

  await event.destroy();
}
