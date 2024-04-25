import getConfig from "next/config";
import { db } from "/helpers/api";

const { serverRuntimeConfig } = getConfig();

export const eventsRepo = {
  getAll,
  getById,
  create,
  update,
  _delete,
};

async function getAll(params) {
  return await db.tbl_consequences.findAll();
}

async function getById(id) {
  return await db.tbl_consequences.findByPk(id);
}

async function create(params) {
  const consequence = new db.tbl_consequences(params);

  // save user
  await consequence.save();
}

async function update(id, params) {
  const consequence = await db.tbl_consequences.findByPk(id);

  Object.assign(consequence, params);

  await consequence.save();
}

async function _delete(id) {
  const consequence = await db.tbl_consequences.findByPk(id);
  if (!consequence) throw "consequence not found";

  await consequence.destroy();
}
