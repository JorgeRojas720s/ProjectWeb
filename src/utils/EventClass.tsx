//@ts-nocheck
interface EventClassProps {
  code?: string;
  event?: string;
  title?: string;
  causes?: string[];
  consequences?: string[];
  causesXConsequences?: string[];
  controMeasurements?: string[];
  consequencesXControlMeasurements?: string[];
  consequencesXActions?: string[];
  endActionPlan?: string[];
  followUpPlans?: string[];
  proposedActions?: string[];
  riskCategories?: string[];
  riskClassiffications?: string[];
  riskDescriptions?: string[];
  selectedActions?: string[];
  causesXRisk?: string[];
  token?: string;
}

interface FetchProps {
  url?: string;
  code?: string;
  method?: string;
  body?: object;
}

interface CreateEventPops {
  eve_id: string;
  eve_title: string;
  eve_description: string;
}

class EventClass {
  code?: string;
  event?: string;
  title?: string;
  causes?: string[];
  consequences?: string[];
  causesXConsequences: string[];
  controMeasurements?: string[];
  consequencesXControlMeasurements?: string[];
  consequencesXActions?: string[];
  endActionPlan?: string[];
  followUpPlans?: string[];
  proposedActions?: string[];
  riskCategories?: string[];
  riskClassiffications?: string[];
  riskDescriptions?: string[];
  selectedActions?: string[];
  causesXRisk?: string[];
  token?: string;
  //construtor
  constructor({
    code,
    event,
    title,
    causes,
    consequences,
    controMeasurements,
    causesXConsequences,
    consequencesXControlMeasurements,
    consequencesXActions,
    endActionPlan,
    followUpPlans,
    proposedActions,
    riskCategories,
    causesXRisk,
    riskClassiffications,
    riskDescriptions,
    selectedActions,
  }: EventClassProps) {
    code && (this.code = code);
    event && (this.event = event);
    title && (this.title = title);
    causes && (this.causes = causes);
    consequences && (this.consequences = consequences);
    causesXConsequences && (this.causesXConsequences = causesXConsequences);
    consequencesXControlMeasurements && (this.consequencesXControlMeasurements = consequencesXControlMeasurements);
    consequencesXActions && (this.consequencesXActions = consequencesXActions)
    controMeasurements && (this.controMeasurements = controMeasurements);
    endActionPlan && (this.endActionPlan = endActionPlan);
    followUpPlans && (this.followUpPlans = followUpPlans);
    proposedActions && (this.proposedActions = proposedActions);
    riskCategories && (this.riskCategories = riskCategories);
    riskClassiffications && (this.riskClassiffications = riskClassiffications);
    riskDescriptions && (this.riskDescriptions = riskDescriptions);
    selectedActions && (this.selectedActions = selectedActions);
    causesXRisk && (this.causesXRisk = causesXRisk);
  }
  //Metodos
  async fetch({ url, code, method, body }: FetchProps) {
    const baseUrl = "http://localhost:3000/api/";
    const apiURL = `${baseUrl + url}${
      code !== undefined || null ? "/" + code : ""
    }`;
    const response = await fetch(apiURL, {
      method: method,
      headers: {
        Accept: "application.json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token}`,
      },
      body: JSON.stringify(body),
      cache: "default",
    });
    if (response.status === 200) {
      return response.json();
    }
  }

  async getToken(code: string) {
    const response = await this.fetch({
      url: "events/authenticate",
      method: "POST",
      body: { eve_id: code },
    });
    this.token = response.token;
  }

  async getData({ code, url, method }: FetchProps) {
    let data = await this.fetch({
      url: url,
      code: code,
      method: method,
    });
    if (data && data.lenght > 1) {
      return await Promise.all(data);
    }
    return await Promise.resolve(data);
  }

  async getConsequencesOfCauses(cxc) {
    let cons = [];
    for (let consequence of cxc) {
      if (consequence.cxc_fk_consequences !== null) {
        let con = await this.getData({
          code: consequence.cxc_fk_consequences,
          url: "consequences",
          method: "GET",
        });
        cons.push(con);
      }
    }
    return cons;
  }

  async getCauses(causes) {
    let cxc = [];
    let causesXConsequences = new Array();
    if (causes) {
      for (let cause of causes) {
        cxc = await this.getData({
          code: cause.cau_id,
          url: "causes-x-consequences/by-cause-id",
          method: "GET",
        });

        let cons = [];
        if (cxc) {
          cons = await this.getConsequencesOfCauses(cxc);
        }
        causesXConsequences.push({
          causes: cause,
          consequences: cons,
        });
      }
    }
    return causesXConsequences;
  }

  async causeIn(id, url) {
    const response = await this.fetch({
      url: url,
      code: id,
      method: "GET",
    });
    if ((response === undefined) | null || response.length < 1) {
      return false;
    }
    return response;
  }

  async getRiskCategory(id) {
    const riskCategories = await this.fetch({
      url: "risk-categories/by-risk-classification-id",
      code: id,
      method: "GET",
    });
    let riskCategoriesXRiskDescription = [];
    if (riskCategories && riskCategories.length > 0) {
      for (let rc of riskCategories) {
        if ((rc.rcg_id != null) | undefined) {
          const response = await this.getRiskDescription(rc.rcg_id);

          riskCategoriesXRiskDescription.push({
            category: rc,
            description: response,
          });
        }
      }
    }
    return riskCategoriesXRiskDescription;
  }

  async getRiskDescription(id) {
    if ((id != undefined) | null) {
      const riskDescription = await this.fetch({
        url: "risk-description/by-risk-category-id",
        code: id,
        method: "GET",
      });
      return riskDescription;
    }
  }

  async getCauseRisk(id) {
    const riskClassification = await this.fetch({
      url: "risk-classifications/by-consequences-id",
      code: id,
      method: "GET",
    });
    let risk = [];
    if (riskClassification && riskClassification.length > 0) {
      let cxd;
      for (let rc of riskClassification) {
        cxd = await this.getRiskCategory(rc.rcf_id);
        risk.push({
          classification: rc,
          categoryXDescription: cxd,
        });
        break;
      }
    }
    return risk;
  }

  async getRisks(causes) {
    let causesXRisk = [];
    for (let cause of causes) {
      //causes in risk
      if (
        await this.causeIn(
          cause.cau_id,
          "risk-classifications/by-consequences-id"
        )
      ) {
        const response = await this.getCauseRisk(cause.cau_id);
        if (response.length > 0) {
          causesXRisk.push({
            cause: cause,
            risk: response,
          });
          //causes in control
        }
      }
    }
    return causesXRisk;
  }

  async getControlMesasures (consequences){
    let consequencesXControl = [];
    for (let cxc of consequences){
      for (let consequence of cxc.consequences){
        if (
          await this.causeIn(consequence.con_id, "control-measures/by-consequence-id")
        ) {
          consequencesXControl.push({
            consequence: consequence,
            control: await this.causeIn(consequence.con_id, "control-measures/by-consequence-id")
          })
        }
      }
    }
    return consequencesXControl;
  }

  async getSelectedAction(id){
    if(id != null | undefined){
      const response = await this.getData({
        code: id,
        url: 'selected-actions/by-proposed-action-id',
        method: 'GET'
      })
      if(response){
        return response;
      }
    }
  }

  async getSelectedActionsOneByOne(proposedAction){
    let selectedAction;
    if(proposedAction){
      for (let pa of proposedAction){
        selectedAction = await this.getSelectedAction(pa.pda_id);
      }
      if (selectedAction){
      return selectedAction
    }
  }
}

async getPlan(selectedAction){
  let followUpPlan;
  let endActionPlan = [];
  if(selectedAction){
    for (let sa of selectedAction){
      if(sa.sda_fk_end_action_plan != null){
        let response;
        let proposedAction;
        response = await this.getData({
          code: sa.sda_fk_end_action_plan,
          url: 'end-action-plans',
          method: 'GET'
        })
        if(response.eap_fk_proposed_action != null){
          proposedAction = await this.getData({
            code: response.eap_fk_proposed_action,
            url:'proposed-actions',
            method: 'GET'
          })
        }
        endActionPlan.push({
          endActionPlan: response,
          proposedAction: proposedAction
        })
      }
      if(sa.sda_fk_followup_plan != null){
        followUpPlan = await this.getData({
          code:sa.sda_fk_followup_plan,
          url: 'followup-plans',
          method: 'GET'
        })
      }
    }
    return {followUpPlan, endActionPlan};
  }
}

  async getActions(consequences){
    let consequencesXActions = [];
    let proposedAction;
    let selectedAction;
    let plan;
    for (let cxc of consequences){
      for (let consequence of cxc.consequences){
        if (await this.causeIn(consequence.con_id, "proposed-actions/by-consequence-id")) {
          proposedAction = await this.causeIn(consequence.con_id, "proposed-actions/by-consequence-id")
          selectedAction = await this.getSelectedActionsOneByOne(proposedAction)
          plan = await this.getPlan(selectedAction)
          }
          consequencesXActions.push({
            consequence: consequence,
            proposedAction: proposedAction,
            selectedAction: selectedAction,
            plan: plan
          })
      }
    }
    return consequencesXActions;
  }

  async createEvent(obj: CreateEventPops) {
    let code, event, title;
    let causes = new Array();
    let causesXConsequences = new Array();
    let consequencesXControlMeasurements = new Array();
    let causesXRisk = new Array({
      cause: [],
      risks: [
        { riskCategory: "", riskClassification: "", riskDescription: "" },
      ],
    });
    let consequencesXActions = new Array();
    code = obj.eve_id;
    event = obj.eve_description;
    title = obj.eve_title;
    await this.getToken(code);

    causes = await this.getData({
      code: code,
      url: "causes/by-event-id",
      method: "GET",
    });
    causesXConsequences = await this.getCauses(causes);
    causesXRisk = await this.getRisks(causes);
    if(causesXRisk.length < 1){
      consequencesXControlMeasurements = await this.getControlMesasures(causesXConsequences);
    }
    if(consequencesXControlMeasurements.length < 1){
      consequencesXActions = await this.getActions(causesXConsequences)
    }
    //el error está a la hora de hacer el casuses[0] dice que no es un objeto iretable y el programa se cae (solucionado, utilizar los métodos de la clase array en lugar de usar [index])

    const objEvent = new EventClass({
      code,
      event,
      title,
      causes,
      causesXRisk,
      causesXConsequences,
      consequencesXControlMeasurements,
      consequencesXActions,
    });
    return objEvent;
  }

  toString() {
    let result = `{`;
    result += `code: ${
      this.code !== undefined && this.code !== null ? this.code : ""
    },\n`;
    result += `event: ${
      this.event !== undefined && this.event !== null ? this.event : ""
    },\n`;
    result += `title:${(this.title !== undefined) | null ? this.title : ""},\n`;
    result += `causes: ${
      this.causes !== undefined && this.causes !== null
        ? "[" +
          this.causes
            .map((c) => `\n\t"code:${c.cau_id}\n\tcause:${c.cau_cause}"`)
            .join("\t") +
          "]"
        : ""
    },\n`;
    result += `consequences: ${
      this.consequences !== undefined && this.consequences !== null
        ? this.consequences.length > 1
          ? "[" +
            this.consequences
              .map(
                (c) =>
                  `\n\t"code:${c.con_id}\n\tconsequence:${c.con_consequence}`
              )
              .join("\t") +
            "]"
          : "\n\tcode:" +
            this.consequences.con_id +
            "\n\tconsequence:" +
            this.consequences.con_consequence
        : ""
    },\n`;
    result += `controMeasurements: ${
      this.controMeasurements !== undefined && this.controMeasurements !== null
        ? "[" + this.controMeasurements.map((c) => `"${c}"`).join(", ") + "]"
        : ""
    },\n`;
    result += `endActionPlan: ${
      this.endActionPlan !== undefined && this.endActionPlan !== null
        ? "[" + this.endActionPlan.map((c) => `"${c}"`).join(", ") + "]"
        : ""
    },\n`;
    result += `followUpPlans: ${
      this.followUpPlans !== undefined && this.followUpPlans !== null
        ? "[" + this.followUpPlans.map((c) => `"${c}"`).join(", ") + "]"
        : ""
    },\n`;
    result += `proposedActions: ${
      this.proposedActions !== undefined && this.proposedActions !== null
        ? "[" + this.proposedActions.map((c) => `"${c}"`).join(", ") + "]"
        : ""
    },\n`;
    result += `riskCategories: ${
      this.riskCategories !== undefined && this.riskCategories !== null
        ? "[" + this.riskCategories.map((c) => `"${c}"`).join(", ") + "]"
        : ""
    },\n`;
    result += `riskClassiffications: ${
      this.riskClassiffications !== undefined &&
      this.riskClassiffications !== null
        ? "[" + this.riskClassiffications.map((c) => `"${c}"`).join(", ") + "]"
        : ""
    },\n`;
    result += `riskDescriptions: ${
      this.riskDescriptions !== undefined && this.riskDescriptions !== null
        ? "[" + this.riskDescriptions.map((c) => `"${c}"`).join(", ") + "]"
        : ""
    },\n`;
    result += `selectedActions: ${
      this.selectedActions !== undefined && this.selectedActions !== null
        ? "[" + this.selectedActions.map((c) => `"${c}"`).join(", ") + "]"
        : ""
    }}`;

    return result;
  }
}
export default EventClass;
