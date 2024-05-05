import getConfig from "next/config";
import { db } from "/helpers/api";

const { serverRuntimeConfig } = getConfig();

export const riskDescriptionsRepo = {
  getAll,
  getById,
  create,
  update,
  _delete,
};

async function getAll() {
  return await db.tbl_risk_description.findAll();
}

async function getById(id) {
  return await db.tbl_risk_description.findByPk(id);
}

async function create(params) {
  const riskDescription = new db.tbl_risk_description(params);
  await riskDescription.save();
}

async function update(id, params) {
  const riskDescription = await db.tbl_risk_description.findByPk(id);
  if (!riskDescription) throw "Risk description not found";

  Object.assign(riskDescription, params);
  await riskDescription.save();
}

async function _delete(id) {
  const riskDescription = await db.tbl_risk_description.findByPk(id);
  if (!riskDescription) throw "Risk description not found";

  await riskDescription.destroy();
}