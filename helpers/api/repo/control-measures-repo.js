import { db } from "/helpers/api";

export const controlMeasuresRepo = {
  getAll,
  getById,
  create,
  update,
  _delete,
  getByConsequenceId,
};

async function getAll() {
  return await db.tbl_control_measures.findAll();
}

async function getById(id) {
  return await db.tbl_control_measures.findByPk(id);
}

async function create(params) {
  const controlMeasure = new db.tbl_control_measures(params);
  await controlMeasure.save();
}

async function update(id, params) {
  const controlMeasure = await db.tbl_control_measures.findByPk(id);
  if (!controlMeasure) throw "Control measure not found";

  Object.assign(controlMeasure, params);
  await controlMeasure.save();
}

async function _delete(id) {
  const controlMeasure = await db.tbl_control_measures.findByPk(id);
  if (!controlMeasure) throw "Control measure not found";

  await controlMeasure.destroy();
}


async function getByConsequenceId(consequenceId) {
  return await db.tbl_control_measures.findAll({
    where: {
      ctm_fk_consequences: consequenceId,
    },
  });
}