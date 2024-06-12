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

  await saveCausesAndConsequences(params, eventId);
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

async function saveCausesAndConsequences(params, eventId) {

  for (let i = 0; i < params.causasYConsecuencias.length; i++) {
    let causes = [];
    let consequences = [];
    let causesIds = [];
    let consequencesIds = [];

    causes = params.causasYConsecuencias[i]["causa"];
    consequences = params.causasYConsecuencias[i]["consecuencia"];

    //! Cause
    await saveCauses(causes, eventId, causesIds);

    //!Consequence
    await saveConsequences(consequences, consequencesIds);

    //!CXC
    await saveCausesXConsequences(causesIds, consequencesIds)
  }
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
