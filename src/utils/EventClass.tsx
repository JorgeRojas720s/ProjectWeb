// @ts-nocheck
interface EventClassProps {
  code?: string;
  event?: string;
  causes?: string[];
  consequences?: string[];
  controMeasurements?: string[];
  endActionPlan?: string[];
  followUpPlans?: string[];
  proposedActions?: string[];
  riskCategories?: string[];
  riskClassiffications?: string[];
  riskDescriptions?: string[];
  selectedActions?: string[];
  token?: string;
}

interface FetchProps {
  url: string;
  code?: int;
  method?: string;
  body?;
}

class EventClass {
  code?: string;
  event?: string;
  causes?: string[];
  consequences?: string[];
  controMeasurements?: string[];
  endActionPlan?: string[];
  followUpPlans?: string[];
  proposedActions?: string[];
  riskCategories?: string[];
  riskClassiffications?: string[];
  riskDescriptions?: string[];
  selectedActions?: string[];
  token?: string;
  //construtor
  constructor({
    code,
    event,
    causes,
    consequences,
    controMeasurements,
    endActionPlan,
    followUpPlans,
    proposedActions,
    riskCategories,
    riskClassiffications,
    riskDescriptions,
    selectedActions,
  }: EventClassProps) {
    code && (this.code = code);
    event && (this.event = event);
    causes && (this.causes = causes);
    consequences && (this.consequences = consequences);
    controMeasurements && (this.controMeasurements = controMeasurements);
    endActionPlan && (this.endActionPlan = endActionPlan);
    followUpPlans && (this.followUpPlans = followUpPlans);
    proposedActions && (this.proposedActions = proposedActions);
    riskCategories && (this.riskCategories = riskCategories);
    riskClassiffications && (this.riskClassiffications = riskClassiffications);
    riskDescriptions && (this.riskDescriptions = riskDescriptions);
    selectedActions && (this.selectedActions = selectedActions);
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
    return response.json();
  }

  async getToken(code: int) {
    const response = await this.fetch({
      url: "events/authenticate",
      method: "POST",
      body: { eve_id: code },
    });
    this.token = response.token;
  }

  async getCauses(code: int) {
    await this.getToken(code);
    let causes = await this.fetch({
      url: "causes/by-event-id",
      code: code,
      method: "GET",
    });
    
    return await Promise.all(causes);
  }
  async createEvent(obj) {
    let code, event;
    let causes = new Array();
    let consequences = new Array();
    let controMeasurements = new Array();
    let endActionPlan = new Array();
    let followUpPlans = new Array();
    let proposedActions = new Array();
    let riskCategories = new Array();
    let riskClassiffications = new Array();
    let riskDescriptions = new Array();
    let selectedActions = new Array();
    code = obj.eve_id;
    event = obj.eve_description;
    
    causes = await this.getCauses(code);

    const objEvent = new EventClass({ code, event, causes });
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
    result += `causes: ${
      this.causes !== undefined && this.causes !== null
        ? "[" + this.causes.map((c) => `\n\t"code:${c.cau_id}\n\tcause:${c.cau_cause}"`).join("\t") + "]"
        : ""
    },\n`;
    result += `consequences: ${
      this.consequences !== undefined && this.consequences !== null
        ? "[" + this.consequences.map((c) => `"${c}"`).join(", ") + "]"
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
