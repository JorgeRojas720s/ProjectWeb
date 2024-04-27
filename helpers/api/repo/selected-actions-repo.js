import getConfig from "next/config";
import { db } from "/helpers/api";

const { serverRuntimeConfig } = getConfig();

export const selectedActionsRepo = {
  getAll,
  getById,
  create,
  update,
  _delete,
};

async function getAll() {
  return await db.tbl_selected_actions.findAll();
}

async function getById(id) {
  return await db.tbl_selected_actions.findByPk(id);
}

async function create(params) {
  const selectedAction = new db.tbl_selected_actions(params);
  await selectedAction.save();
}

async function update(id, params) {
  const selectedAction = await db.tbl_selected_actions.findByPk(id);
  if (!selectedAction) throw "Selected action not found";

  Object.assign(selectedAction, params);
  await selectedAction.save();
}

async function _delete(id) {
  const selectedAction = await db.tbl_selected_actions.findByPk(id);
  if (!selectedAction) throw "Selected action not found";

  await selectedAction.destroy();
}




