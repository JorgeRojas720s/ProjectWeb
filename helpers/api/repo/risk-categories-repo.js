import getConfig from "next/config";
import { db } from "/helpers/api";

const { serverRuntimeConfig } = getConfig();

export const riskCategoriesRepo = {
  getAll,
  getById,
  create,
  update,
  _delete,
};

async function getAll() {
  return await db.tbl_risk_category.findAll();
}

async function getById(id) {
  return await db.tbl_risk_category.findByPk(id);
}

async function create(params) {
  const riskCategory = new db.tbl_risk_category(params);
  await riskCategory.save();
}

async function update(id, params) {
  const riskCategory = await db.tbl_risk_category.findByPk(id);
  if (!riskCategory) throw "Risk category not found";

  Object.assign(riskCategory, params);
  await riskCategory.save();
}

async function _delete(id) {
  const riskCategory = await db.tbl_risk_category.findByPk(id);
  if (!riskCategory) throw "Risk category not found";

  await riskCategory.destroy();
}
