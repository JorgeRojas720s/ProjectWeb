import getConfig from "next/config";
import { db } from "/helpers/api";

const { serverRuntimeConfig } = getConfig();

export const endActionPlansRepo = {
  getAll,
  getById,
  create,
  update,
  _delete,
  getByProposedActionId,
};

async function getAll() {
  return await db.tbl_end_action_plan.findAll();
}

async function getById(id) {
  return await db.tbl_end_action_plan.findByPk(id);
}

async function create(params) {
  const endActionPlan = new db.tbl_end_action_plan(params);
  await endActionPlan.save();
}

async function update(id, params) {
  const endActionPlan = await db.tbl_end_action_plan.findByPk(id);
  if (!endActionPlan) throw "End action plan not found";

  Object.assign(endActionPlan, params);
  await endActionPlan.save();
}

async function _delete(id) {
  const endActionPlan = await db.tbl_end_action_plan.findByPk(id);
  if (!endActionPlan) throw "End action plan not found";

  await endActionPlan.destroy();
}

async function getByProposedActionId(proposedActionId) {
  return await db.tbl_end_action_plan.findAll({
    where: {
      eap_fk_proposed_action: proposedActionId,
    },
  });
}
