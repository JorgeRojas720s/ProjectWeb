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
  let eventId = await saveEvents(params);

  console.log("🙌eventcodeeeeee: ", eventId);

  let causesIds = await saveCauses(params, eventId);

  console.log("🎶🎶🎶🎶🎶");

  let consequencesIds = await saveConsequence(params);
  console.log("🤬 ~ create ~ consequencesIds:", consequencesIds);

  await saveCausesXConsequences(causesIds, consequencesIds);
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

async function saveCauses(params, eventId) {
  console.log("causaaaa");
  let causesIds = [];

  for (let i = 0; i < params.causa.length; i++) {
    console.log("causaaaaaaa: ", params.causa[i]);
    const causaData = {
      cau_cause: params.causa[i],
      cau_fk_event: eventId,
    };
    const cause = new db.tbl_causes(causaData);
    await cause.save();
    causesIds.push(cause.cau_id);
  }

  console.log("😶‍🌫️ ~ saveCauses ~ causesIds:", causesIds);
  return causesIds;
}

async function saveConsequence(params) {
  console.log("consequenciaaa ", params.consequencia);
  let consequencesIds = [];

  for (let i = 0; i < params.consequencia.length; i++) {
    console.log("consequenciaaa: ", params.consequencia[i]);
    const consequenceData = {
      con_consequence: params.consequencia[i],
    };
    const consequence = new db.tbl_consequences(consequenceData);
    await consequence.save();
    consequencesIds.push(consequence.con_id);
  }
  return consequencesIds;
}

async function saveCausesXConsequences(causesIds, consequencesIds) {



  // const data = {
  //   cxc_fk_causes: 
  //   cxc_fk_consequences: 
  // }

  const cxc = new db.tbl_causes_x_consequences(data);
  await cxc.save();
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
