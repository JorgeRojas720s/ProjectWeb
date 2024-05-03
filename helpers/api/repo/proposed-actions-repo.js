import getConfig from "next/config";
import { db } from "/helpers/api";

const { serverRuntimeConfig } = getConfig();

export const proposedActionsRepo = {
  getAll,
  getById,
  create,
  update,
  _delete,
  getByConsequenceId,
};

async function getAll() {
  return await db.tbl_proposed_actions.findAll();
}

async function getById(id) {
  return await db.tbl_proposed_actions.findByPk(id);
}

async function create(params) {
  const proposedAction = new db.tbl_proposed_actions(params);
  await proposedAction.save();
}

async function update(id, params) {
  const proposedAction = await db.tbl_proposed_actions.findByPk(id);
  if (!proposedAction) throw "Proposed action not found";

  Object.assign(proposedAction, params);
  await proposedAction.save();
}

async function _delete(id) {
  const proposedAction = await db.tbl_proposed_actions.findByPk(id);
  if (!proposedAction) throw "Proposed action not found";

  await proposedAction.destroy();
}

async function getByConsequenceId(consequenceId) {
  return await db.tbl_proposed_actions.findAll({
    where: {
      pda_fk_consequences: consequenceId,
    },
  });
}
