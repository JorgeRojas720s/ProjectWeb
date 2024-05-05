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
  getByEventId,
  getByConsequenceId,
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

async function getByEventId(eventId) {
  return await db.tbl_causes.findAll({
    where: {
      cau_fk_event: eventId,
    },
  });
}

async function getByConsequenceId(consequenceId) {
  return await db.tbl_causes.findAll({
    where: {
      cau_fk_consequences: consequenceId,
    },
  });
}
