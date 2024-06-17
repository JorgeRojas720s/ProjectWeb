import jwt from "jsonwebtoken";
import { db } from "/helpers/api";
import getConfig from "next/config";

const { serverRuntimeConfig } = getConfig();

export const eventsRepo = {
  authenticate,
  getAll,
  getById,
  create,
  update,
  _delete,
};

async function authenticate(obj) {
  // Simplemente verificar si existe algún evento en la base de datos
  const event = await db.tbl_events.findByPk(obj.eve_id);

  if (!event) {
    throw "Event not found";
  }

  // Generar el token con el ID del evento y una clave secreta
  const token = jwt.sign({ id: event.eve_id }, serverRuntimeConfig.secret, {
    expiresIn: "7d",
  });

  return {
    ...event.toJSON(),
    token,
  };
}

async function getAll() {
  return await db.tbl_events.findAll();
}

async function getById(id) {
  return await db.tbl_events.findByPk(id);
}

async function create(params) {
  console.log("paraaaaaams ✅✅✅", params);

  let eventId = await saveEvents(params);

  await saveFormData(params, eventId);
}

async function saveRisks(params, idsCauses) {
  console.log("tamaniooooo: 🙌🙌", idsCauses.length);

  for (let index = 0; index < idsCauses.length; index++) {
    let riskClasificationIds = [];

    //!RiskClassification
    await saveRiskClassification(
      params,
      riskClasificationIds,
      idsCauses,
      index
    );

    //!RiskCategory
     await saveRiskCategory(params, riskClasificationIds, index);
  }
}

async function saveRiskCategory(params, riskClasificationIds, index) {
  console.log("riskClasifi: ", riskClasificationIds);

  let categories = params.eventRisk[index]["riskCategory"];

  console.log("Hola: ", categories)

  for (let index2 = 0; index2 < riskClasificationIds.length; index2++) {
    for (let index3 = 0; index3 < categories.length; index3++) {
      const dataRiskCategory = {
        rcg_category: categories[index3],
        rcg_fk_classification: riskClasificationIds[index2],
      };
      console.log(
        "que pasaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaS 🤬🤬",
        dataRiskCategory
      );
      const riskCategory = new db.tbl_risk_category(dataRiskCategory);
      await riskCategory.save();
    }
  }
}

async function saveRiskClassification(
  params,
  riskClasificationIds,
  idsCauses,
  index
) {
  console.log("causesIdsssssssss: ", idsCauses[index]["causesIds"]);
  let causesIds = idsCauses[index]["causesIds"];

  for (let index1 = 0; index1 < causesIds.length; index1++) {
    const dataRiskClassification = {
      rcf_classification: params.eventRisk[index]["riskClassification"],
      rcf_fk_consequences: causesIds[index1], //!Cambiar el nombre se la foranea de ser a causas!!!!
    };
    console.log("Rissssssk ☢️☢️", dataRiskClassification);
    const riskClasification = new db.tbl_risk_classification(
      dataRiskClassification
    );
    await riskClasification.save();
    riskClasificationIds.push(riskClasification.rcf_id);
  }
}

async function saveEvents(params) {
  const eventData = {
    eve_title: params.event[0],
    eve_description: params.event[1],
  };
  console.log("paraaams: ", eventData);
  const event = new db.tbl_events(eventData);
  await event.save();
  return event.eve_id;
}

async function saveFormData(params, eventId) {
  let idsCauses = [];

  for (let i = 0; i < params.causasYConsecuencias.length; i++) {
    let causes = [];
    let consequences = [];
    let causesIds = [];
    let consequencesIds = [];

    causes = params.causasYConsecuencias[i]["causa"];
    consequences = params.causasYConsecuencias[i]["consecuencia"];

    //! Cause
    await saveCauses(causes, eventId, causesIds);

    idsCauses.push({ causesIds: causesIds });

    //!Consequence
    await saveConsequences(consequences, consequencesIds);

    //!CXC
    await saveCausesXConsequences(causesIds, consequencesIds);
  }

  //!Risks
  console.log("Causes Ids: 🤖🤖: ", idsCauses);
  await saveRisks(params, idsCauses);
}

async function saveCauses(causes, eventId, causesIds) {
  for (let k = 0; k < causes.length; k++) {
    const causeData = {
      cau_cause: causes[k],
      cau_fk_event: eventId,
    };
    const cause = new db.tbl_causes(causeData);
    await cause.save();
    causesIds.push(cause.cau_id);
  }
}

async function saveConsequences(consequences, consequencesIds) {
  for (let j = 0; j < consequences.length; j++) {
    const consequenceData = {
      con_consequence: consequences[j],
    };
    const consequence = new db.tbl_consequences(consequenceData);
    await consequence.save();
    consequencesIds.push(consequence.con_id);
  }
}

async function saveCausesXConsequences(causesIds, consequencesIds) {
  for (let x = 0; x < causesIds.length; x++) {
    for (let p = 0; p < consequencesIds.length; p++) {
      const cxcData = {
        cxc_fk_causes: causesIds[x],
        cxc_fk_consequences: consequencesIds[p],
      };
      const cxc = new db.tbl_causes_x_consequences(cxcData);
      await cxc.save();
    }
  }
}

async function update(id, params) {
  const event = await db.tbl_events.findByPk(id);
  if (!event) throw "Event not found";

  Object.assign(event, params);
  await event.save();
}

async function _delete(id) {
  const event = await db.tbl_events.findByPk(id);
  if (!event) throw "Event not found";

  await event.destroy();
}
