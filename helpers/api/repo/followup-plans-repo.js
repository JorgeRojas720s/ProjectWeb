import getConfig from "next/config";
import { db } from "/helpers/api";

const { serverRuntimeConfig } = getConfig();

export const followupPlansRepo = {
  getAll,
  getById,
  create,
  update,
  _delete,
};

async function getAll() {
  return await db.tbl_followup_plan.findAll();
}

async function getById(id) {
  return await db.tbl_followup_plan.findByPk(id);
}

async function create(params) {
  const followupPlan = new db.tbl_followup_plan(params);
  await followupPlan.save();
}

async function update(id, params) {
  const followupPlan = await db.tbl_followup_plan.findByPk(id);
  if (!followupPlan) throw "Follow-up plan not found";

  Object.assign(followupPlan, params);
  await followupPlan.save();
}

async function _delete(id) {
  const followupPlan = await db.tbl_followup_plan.findByPk(id);
  if (!followupPlan) throw "Follow-up plan not found";

  await followupPlan.destroy();
}
