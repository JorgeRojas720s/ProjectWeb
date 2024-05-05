import getConfig from "next/config";
import mysql from "mysql2/promise";
import { Sequelize } from "sequelize";
import { models} from "/helpers/api" //luego veo

const { serverRuntimeConfig } = getConfig();

export const db = {
  initialized: false,
  initialize,
};

function initModels(sequelize){
    // init models and add them to the exported db object
    db.tbl_events = models.Event(sequelize);
    db.tbl_consequences = models.Consequence(sequelize);
    db.tbl_causes = models.Cause(sequelize);
    db.tbl_risk_classification = models.RiskClassification(sequelize);
    db.tbl_risk_category = models.RiskCategory(sequelize);
    db.tbl_risk_description = models.RiskDescription(sequelize);
    db.tbl_control_measures = models.ControlMeasures(sequelize);
    db.tbl_proposed_actions = models.ProposedAction(sequelize);
    db.tbl_followup_plan = models.FollowupPlan(sequelize);
    db.tbl_end_action_plan = models.EndActionPlan(sequelize);
    db.tbl_selected_actions = models.SelectedAction(sequelize);
}

// initialize db and models, called on first api request from /helpers/api/api-handler.js
async function initialize() {
  // create db if it doesn't already exist
  const { host, port, user, password, database } = serverRuntimeConfig.dbConfig;
  const connection = await mysql.createConnection({
    host,
    port,
    user,
    password,
  });
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
  console.log("initialixe");

  // connect to db
  const sequelize = new Sequelize(database, user, password, {
    dialect: "mysql",
  });

  initModels(sequelize);
  // db.tbl_events = eventsModel(sequelize);

  // sync all models with database
  await sequelize.sync({ alter: true });

  db.initialized = true;
}

// sequelize models with schema definitions

// function eventsModel(sequelize) {
//   console.log("modeeeeeeeeeeeeeeeeeeeel");
//   const attributes = {//     eve_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
//     eve_description: { type: DataTypes.STRING, allowNull: false },
//   };

//   const options = {
//     timestamps: false,
//   };

//   return sequelize.define("tbl_events", attributes, options);
// }
