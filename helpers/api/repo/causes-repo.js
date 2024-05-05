import getConfig from "next/config";
import { db } from "/helpers/api";
import { where } from "sequelize";

const { serverRuntimeConfig } = getConfig();

export const causesRepo = {
  getAll,
  getById,
  create,
  update,
  _delete,
};

async function getAll() {
  return await db.tbl_causes.findAll();
}

async function getById(id) {
  return await db.tbl_causes.findByPk(id);
}

async function create(params) {
  const cause = new db.tbl_causes(params);
  await cause.save();
}

async function update(id, params) {
  const cause = await db.tbl_causes.findByPk(id);
  if (!cause) throw "Cause not found";

  Object.assign(cause, params);
  await cause.save();
}

async function _delete(id) {
  const cause = await db.tbl_causes.findByPk(id);
  if (!cause) throw "Cause not found";

  await cause.destroy();
}
