import getConfig from "next/config";
import { db } from "/helpers/api";

const { serverRuntimeConfig } = getConfig();

export const riskClassificationsRepo = {
  getAll,
  getById,
  create,
  update,
  _delete,
  getByConsequenceId,
};

async function getAll() {
  return await db.tbl_risk_classification.findAll();
}

async function getById(id) {
  return await db.tbl_risk_classification.findByPk(id);
}

async function create(params) {
  const riskClassification = new db.tbl_risk_classification(params);
  await riskClassification.save();
}

async function update(id, params) {
  const riskClassification = await db.tbl_risk_classification.findByPk(id);
  if (!riskClassification) throw "Risk classification not found";

  Object.assign(riskClassification, params);
  await riskClassification.save();
}

async function _delete(id) {
  const riskClassification = await db.tbl_risk_classification.findByPk(id);
  if (!riskClassification) throw "Risk classification not found";

  await riskClassification.destroy();
}

async function getByConsequenceId(consequenceId) {
  return await db.tbl_risk_classification.findAll({
    where: {
      rcf_fk_consequences: consequenceId,
    },
  });
}
