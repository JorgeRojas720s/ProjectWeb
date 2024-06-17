import { DataTypes } from "sequelize";
export const models = {
  Event: eventsModel,
  Cause: causesModel,
  Consequence: consequencesModel,
  RiskClassification: riskClassificationModel,
  RiskCategory: riskCategoryModel,
  RiskDescription: riskDescriptionModel,
  ProposedAction: proposedActionsModel,
  SelectedAction: selectedActionsModel,
  FollowupPlan: followupPlanModel,
  EndActionPlan: endActionPlanModel,
  ControlMeasures: controlMeasuresModel,
  CausesXConsequences: causesXconsequencesModel,
};

function eventsModel(sequelize) {
  console.log("huhuhu", sequelize);
  const attributes = {
    eve_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    eve_title: { type: DataTypes.STRING, allowNull: false },
    eve_description: { type: DataTypes.STRING, allowNull: true },
  };

  const options = {
    timestamps: false,
  };

  return sequelize.define("tbl_events", attributes, options);
}

function causesModel(sequelize) {
  const attributes = {
    cau_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    cau_cause: { type: DataTypes.STRING, allowNull: false },
    cau_fk_event: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tbl_events",
        key: "eve_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  };

  const options = {
    timestamps: false,
  };

  return sequelize.define("tbl_causes", attributes, options);
}

function causesXconsequencesModel(sequelize){
  const attributes = {
    cxc_id:  {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    cxc_fk_causes: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "tbl_causes",
        key: "cau_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    cxc_fk_consequences: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "tbl_consequences",
        key: "con_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  };
  const options = {
    timestamps: false,
  };

  return sequelize.define("tbl_causes_x_consequences", attributes, options);


}

function consequencesModel(sequelize) {
  const attributes = {
    con_id:  {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: true,
    },
    con_consequence: { type: DataTypes.STRING, allowNull: true },
  };
  const options = {
    timestamps: false,
  };

  return sequelize.define("tbl_consequences", attributes, options);
}

function riskClassificationModel(sequelize) {
  const attributes = {
    rcf_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true},
    rcf_classification: { type: DataTypes.STRING, allowNull: false },
    rcf_fk_consequences: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tbl_causes",
        key: "cau_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  };
  const options = {
    timestamps: false,
  };

  return sequelize.define("tbl_risk_classification", attributes, options);
}

function riskCategoryModel(sequelize) {
  const attributes = {
    rcg_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement:true },
    rcg_category: { type: DataTypes.STRING, allowNull: false },
    rcg_fk_classification: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tbl_risk_classifications",
        key: "rcf_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  };
  const options = {
    timestamps: false,
  };

  return sequelize.define("tbl_risk_category", attributes, options);
}

function riskDescriptionModel(sequelize) {
  const attributes = {
    rdc_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true,  autoIncrement:true },
    rdc_classification: { type: DataTypes.STRING, allowNull: false },
    rdc_fk_category: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tbl_risk_categories",
        key: "rcg_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  };
  const options = {
    timestamps: false,
  };

  return sequelize.define("tbl_risk_description", attributes, options);
}

function proposedActionsModel(sequelize) {
  const attributes = {
    pda_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    pda_action: { type: DataTypes.STRING, allowNull: false },
    pda_fk_consequences: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tbl_consequences",
        key: "con_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  };
  const options = {
    timestamps: false,
  };

  return sequelize.define("tbl_proposed_actions", attributes, options);
}

//Aqui
function selectedActionsModel(sequelize) {
  const attributes = {
    sda_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    sda_action: { type: DataTypes.STRING, allowNull: false },
    sda_fk_proposed_actions: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tbl_proposed_actions",
        key: "pda_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    sda_fk_end_action_plan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tbl_end_action_plans",
        key: "eap_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    sda_fk_followup_plan: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tbl_followup_plans",
        key: "fpp_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  };
  const options = {
    timestamps: false,
  };

  return sequelize.define("tbl_selected_actions", attributes, options);
}

function followupPlanModel(sequelize) {
  const attributes = {
    fpp_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    fpp_id_responsible: { type: DataTypes.STRING, allowNull: false },
    fpp_date: { type: DataTypes.DATE, allowNull: false },
    fpp_indicator: { type: DataTypes.STRING, allowNull: false },
  };
  const options = {
    timestamps: false,
  };

  return sequelize.define("tbl_followup_plan", attributes, options);
}

function endActionPlanModel(sequelize) {
  const attributes = {
    eap_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    eap_compilance: { type: DataTypes.STRING, allowNull: false },
    eap_justification: { type: DataTypes.DATE, allowNull: false },
    eap_fk_proposed_action: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tbl_proposed_actions",
        key: "pda_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  };
  const options = {
    timestamps: false,
  };

  return sequelize.define("tbl_end_action_plan", attributes, options);
}

function controlMeasuresModel(sequelize) {
  const attributes = {
    ctm_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    ctm_fcm_probability: { type: DataTypes.INTEGER, allowNull: false },
    ctm_fcm_impact: { type: DataTypes.INTEGER, allowNull: false },
    ctm_fcm_risk_level: { type: DataTypes.STRING, allowNull: false },
    ctm_wcm_existing: { type: DataTypes.STRING, allowNull: false },
    ctm_wcm_attitude: { type: DataTypes.STRING, allowNull: false },
    ctm_wcm_aptitude: { type: DataTypes.STRING, allowNull: false },
    ctm_wcm_risk_level: { type: DataTypes.STRING, allowNull: false },
    ctm_wcm_acceptability: { type: DataTypes.STRING, allowNull: false },
    ctm_fk_consequences: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tbl_consequences",
        key: "con_id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  };
  const options = {
    timestamps: false,
  };

  return sequelize.define("tbl_control_measures", attributes, options);
}
