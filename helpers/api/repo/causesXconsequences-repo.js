import { db } from "/helpers/api";

export const causesXconsequencesRepo = {
  getAll,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.tbl_causesXconsequences.findAll();
}

async function getById(id) {
  return await db.tbl_causesXconsequences.findByPk(id);
}

async function create(params) {
  const causesXconsequence = new db.tbl_causesXconsequences(params);
  await causesXconsequence.save();
}

async function update(id, params) {
  const causesXconsequence = await db.tbl_causesXconsequences.findByPk(id);
  if (!causesXconsequence) throw "CausesXConsequence not found";
  Object.assign(causesXconsequence, params);
  await causesXconsequence.save();
}

async function _delete(id) {
  const causesXconsequence = await db.tbl_causesXconsequences.findByPk(id);
  if (!causesXconsequence) throw "CausesXConsequence not found";
  await causesXconsequence.destroy();
}
