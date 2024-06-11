import { db } from "/helpers/api";

export const causesXconsequencesRepo = {
  getAll,
  getByCauseId,
  getById,
  create,
  update,
  delete: _delete,
};

async function getAll() {
  return await db.tbl_causes_x_consequences.findAll();
}

async function getById(id) {
  return await db.tbl_causes_x_consequences.findByPk(id);
}

async function getByCauseId(id){
  return await db.tbl_causes_x_consequences.findAll({
    where: {
      cxc_fk_causes: id,
    },
  });
}

async function create(params) {
  const causesXconsequence = new db.tbl_causes_x_consequences(params);
  await causesXconsequence.save();
}

async function update(id, params) {
  const causesXconsequence = await db.tbl_causes_x_consequences.findByPk(id);
  if (!causesXconsequence) throw "CausesXConsequence not found";
  Object.assign(causesXconsequence, params);
  await causesXconsequence.save();
}

async function _delete(id) {
  const causesXconsequence = await db.tbl_causes_x_consequences.findByPk(id);
  if (!causesXconsequence) throw "CausesXConsequence not found";
  await causesXconsequence.destroy();
}
