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
  if (params.eventRisk.length !== 0) {
    console.log("tamaniooooo: 🙌🙌", idsCauses.length);

    for (let index = 0; index < idsCauses.length; index++) {
      let riskClasificationIds = [];
      let riskCategoryIds = [];

      //!RiskClassification
      await saveRiskClassification(
        params,
        riskClasificationIds,
        idsCauses,
        index
      );

      //!RiskCategory
      await saveRiskCategory(
        params,
        riskClasificationIds,
        index,
        riskCategoryIds
      );

      //!RiskDescription
      await saveRiskDescription(params, riskCategoryIds, index);
    }
  }
}

async function saveRiskDescription(params, riskCategoryIds, index) {
  let descriptions = params.eventRisk[index]["riskDescription"];
  console.log("jejejje: 👻", riskCategoryIds);
  console.log("descriiiiiiiiiiis: ", descriptions);

  for (let index1 = 0; index1 < riskCategoryIds.length; index1++) {
    for (let index2 = 0; index2 < descriptions.length; index2++) {
      console.log("aqi?")
      const dataRiskDescription = {
        rdc_description: descriptions[index2],
        rdc_fk_category: riskCategoryIds[index1],
      };
      const riskDescription = new db.tbl_risk_description(dataRiskDescription);
      riskDescription.save();
    }
    console.log("quepeo")
  }
  console.log("jupu")
}

async function saveRiskCategory(
  params,
  riskClasificationIds,
  index,
  riskCategoryIds
) {
  console.log("riskClasifi: ", riskClasificationIds);

  let categories = params.eventRisk[index]["riskCategory"];
  // let descriptions = params.eventRisk[index]["riskDescription"]

  console.log("Hola: ", categories);

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
      riskCategoryIds.push(riskCategory.rcg_id);
    }
  }
}

async function saveRiskClassification(
  params,
  riskClasificationIds,
  idsCauses,
  index
) {
  console.log("causesIdssssssss👽s: ", idsCauses[index]["causesIds"]);
  console.log("popopopopopop: ", params.eventRisk[index]["riskClassification"]);
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
  let idsConsequences = [];

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

    idsConsequences.push({ consequencesIds: consequencesIds });

    //!CXC
    await saveCausesXConsequences(causesIds, consequencesIds);
  }

  //!Risks
  console.log("Causes Ids: 🤖🤖: ", idsCauses);
  await saveRisks(params, idsCauses);

  //!Actions
  console.log("Consequences Ids: 🤖🤖: ", idsConsequences);
  await saveActions(params, idsConsequences);

  //!Control Measures
  await saveControlMeasures(params, idsConsequences);
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

async function saveActions(params, idsConsequences) {
  console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkk", params.eventAction.length !== 0);
  if (params.eventAction.length !== 0) {
    console.log("jola");
    for (let index = 0; index < idsConsequences.length; index++) {
      let proposedActionId;
      let followupPlanId;
      let endActionPlanId;

      //!Proposed Action
      proposedActionId = await saveProposedAction(
        params,
        idsConsequences,
        index
      );

      //!Folloup Plans
      followupPlanId = await saveFollowupPlans(params, index);

      //!End Acion Plan
      endActionPlanId = await saveEndActionPlan(
        params,
        index,
        proposedActionId
      );

      // //!Selected Actions falta
      await saveSelectedActions(
        params,
        index,
        proposedActionId,
        followupPlanId,
        endActionPlanId
      );
    }
  }
}

async function saveFollowupPlans(params, index) {
  const dataFollowupPlans = {
    fpp_id_responsible: params.eventAction[index]["responsible"][0],
    fpp_date: params.eventAction[index]["date"], //!Revisa poque en bd es tipo datetime
    fpp_indicator: params.eventAction[index]["indicator"][0],
  };

  const followupPlan = new db.tbl_followup_plan(dataFollowupPlans);
  await followupPlan.save();
  return followupPlan.fpp_id;
}

async function saveProposedAction(params, idsConsequences, index) {
  let consequencesIds = idsConsequences[index]["consequencesIds"];

  console.log("ConsequencesIds Group: ", consequencesIds);

  for (let index1 = 0; index1 < consequencesIds.length; index1++) {
    console.log("que pasoS", params.eventAction[index]["proposedAction"][0]);
    const dataProposedAction = {
      pda_action: params.eventAction[index]["proposedAction"][0],
      pda_fk_consequences: consequencesIds[index1],
    };
    const proposedAction = new db.tbl_proposed_actions(dataProposedAction);
    await proposedAction.save();
    return proposedAction.pda_id;
  }
}

async function saveEndActionPlan(params, index, proposedActionId) {
  console.log("EndActiooooooon?S");
  const dataEndActionPlan = {
    eap_compilance: params.eventAction[index]["compliance"], //!Esta mal escrito en bd Compliance
    eap_justification: params.eventAction[index]["justification"],
    eap_fk_proposed_action: proposedActionId,
  };

  const endActionPlan = new db.tbl_end_action_plan(dataEndActionPlan);

  await endActionPlan.save();
  return endActionPlan.eap_id;
}

async function saveSelectedActions(
  params,
  index,
  proposedActionId,
  followupPlanId,
  endActionPlanId
) {
  let selectedAtions = params.eventAction[index]["selectedActions"];

  console.log("seleccccccccccet: ", selectedAtions)

  for (let index1 = 0; index1 < selectedAtions.length; index1++) {
    const dataSelectedAction = {
      sda_action: selectedAtions[index1],
      sda_fk_proposed_actions: proposedActionId,
      sda_fk_end_action_plan: endActionPlanId,
      sda_fk_followup_plan: followupPlanId,
    };

    const selectedAction = new db.tbl_selected_actions(dataSelectedAction);
    await selectedAction.save();
  }
}

async function saveControlMeasures(params, idsConsequences) {
  if (params.eventControl.length !== 0) {
    for (let index = 0; index < idsConsequences.length; index++) {
      for (
        let index1 = 0;
        index1 < idsConsequences[index]["consequencesIds"].length;
        index1++
      ) {
        let objControlMeasures = params.eventControl[index];

        const dataControlMeasures = {
          ctm_fcm_probability: objControlMeasures["probabilidad"],
          ctm_fcm_impact: objControlMeasures["impacto"],
          ctm_fcm_risk_level: objControlMeasures["nivelRiesgo"],
          ctm_wcm_existing: objControlMeasures["medidasControl"],
          ctm_wcm_attitude: objControlMeasures["actitud"],
          ctm_wcm_aptitude: objControlMeasures["aptitud"],
          ctm_wcm_risk_level: objControlMeasures["nivelRiesgoFinal"],
          ctm_wcm_acceptability: objControlMeasures["parametroAceptabilidad"],
          ctm_fk_consequences:
            idsConsequences[index]["consequencesIds"][index1],
        };

        let controlMeasures = new db.tbl_control_measures(dataControlMeasures);
        await controlMeasures.save();
      }
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
