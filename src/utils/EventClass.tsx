// @ts-nocheck
interface EventClassProps {
  code?: string;
  event?: string;
  title?: string;
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
  causesXConsequences: string[{ causes: []; consequences: [] }];
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
    title,
    causes,
    consequences,
    controMeasurements,
    causesXConsequences,
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
    title && (this.title = title);
    causes && (this.causes = causes);
    consequences && (this.consequences = consequences);
    causesXConsequences && (this.causesXConsequences = causesXConsequences);
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
    let causesXConsequences = new Array({ causes: [], consequences: [] });
    if (causes) {
      for (let cause of causes) {
        console.log("id: " + cause.cau_id);
        cxc = await this.getData({
          code: cause.cau_id,
          url: "causes-x-consequences/by-cause-id",
          method: "GET",
        });

        let cons = [];
        if (cxc ) {
          cons = await this.getConsequencesOfCauses(cxc);
        }
        console.log("conssss: ", cons);
        causesXConsequences.push({
          causes: cause,
          consequences: cons,
        });
      }
    }
    return causesXConsequences;
  }

  async causeInRisk(id) {
    const response = await this.fetch({
      url: "risk-classifications/by-consequences-id",
      code: id,
      method: "GET",
    });
    if ((response === undefined) | null && response.lenght < 1) {
      return false;
    }
    return response;
  }

  async getRiskCategory(id) {
    let categoriesXDescriptions;
    const riskCategories = await this.fetch({
      url: "risk-categories/by-risk-classification-id",
      code: id,
      method: "GET",
    });
    if (riskCategories.length > 0) {
      for (let rc of riskCategories) {
        if ((rc.rcg_id != null) | undefined) {
          const response = await this.getRiskDescription(rc.rcg_id);
        }
      }
    }
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
    if (riskClassification.length > 0) {
      let riskCategory, riskDescription;
      console.log("arra");
      for (let rc of riskClassification) {
        riskCategory = await this.getRiskCategory(rc.rcf_id);
        riskDescription = await this.getRiskDescription();
      }
    } else {
      console.log("ño");
    }
  }

  async getRisks(causes) {
    for (let cause of causes) {
      if (await this.causeInRisk(cause.cau_id)) {
        const response = await this.getCauseRisk(cause.cau_id);
      }
    }
  }

  async createEvent(obj: CreateEventPops) {
    let code, event, title;
    let causes = new Array();
    let consequences = new Array();
    let causesXConsequences = new Array({});
    let controMeasurements = new Array();
    let causesXRisk = new Array({
      cause: [],
      risks: [
        { riskCategory: "", riskClassification: "", riskDescription: "" },
      ],
    });
    let endActionPlan = new Array();
    let followUpPlans = new Array();
    let proposedActions = new Array();
    let riskCategories = new Array();
    let riskClassiffications = new Array();
    let riskDescriptions = new Array();
    let selectedActions = new Array();
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

    //el error está a la hora de hacer el casuses[0] dice que no es un objeto iretable y el programa se cae (solucionado, utilizar los métodos de la clase array en lugar de usar [index])

    const objEvent = new EventClass({
      code,
      event,
      title,
      causes,
      consequences,
      controMeasurements,
      causesXConsequences,
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
