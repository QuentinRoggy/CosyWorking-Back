require("dotenv").config();
const { faker } = require("@faker-js/faker");
const debug = require("debug")("seeding");
const bcrypt = require("bcryptjs");

const db = require("../app/config/db");

db.queryCount = 0;

faker.locale = "fr";
const NB_USERS = 50;
// const NB_WORKSPACES = 10;

function pgQuoteEscape(row) {
  const newRow = {};
  Object.entries(row).forEach(([prop, value]) => {
      if (typeof value !== 'string') {
          newRow[prop] = value;
          return;
      }
      newRow[prop] = value.replaceAll("'", "''");
  });
  return newRow;
}

async function insertRoles() {
  const roles = [
    "('coworker')",
    "('host')",
    "('admin')"
  ];

  const queryString = `INSERT INTO "role" ("description") VALUES ${roles} RETURNING id;`;

  const result = await db.query(queryString);

  return result.rows;
}

function generateUsers(nbUsers, roleIds) {
  const users = [];
  const hostIds = [];
  for (let iUsers = 0; iUsers < nbUsers; iUsers ++) {
    const user = {
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      email: faker.internet.email(this.first_name, this.last_name),
      password: bcrypt.hashSync("password", 8),
      username: faker.internet.userName(this.first_name, this.last_name),
      avatar: faker.internet.avatar(),
      gender: faker.name.sexType(),
      about: faker.lorem.lines(),
      role_id: roleIds[faker.datatype.number({ min: 0, max: 1})],

      checkRole(){
        if (this.role_id === 2 ) {
          hostIds.push(iUsers+1);
        }
      }
    };
    
    user.checkRole();

    users.push(user);
  }

  const result = {
    users,
    hostIds
  }

  return result;
}

async function insertUsers(users) {
  await db.query('TRUNCATE TABLE "user" RESTART IDENTITY CASCADE');

  const usersValues = users.map((user) => `(
    '${user.first_name}',
    '${user.last_name}',
    '${user.email}',
    '${user.password}',
    '${user.username}',
    '${user.avatar}',
    '${user.gender}',
    '${user.about}',
    '${user.role_id}'
  )`);

  const queryString = `
    INSERT INTO "user" 
    (
      "first_name",
      "last_name",
      "email",
      "password",
      "username",
      "avatar",
      "gender",
      "about",
      "role_id"
    )
    VALUES ${usersValues} RETURNING id;`;

  const result = await db.query(queryString);
  return result.rows;
}

async function insertEquipment() {
  const equipments = [
    [
      "('Imprimante'",
      "'/lien1')"
    ],
    [
      "('Fibre'",
      "'/lien2')"
    ],
    [
      "('Cuisine'",
      "'/lien3')"
    ],
    [
      "('Double écran'",
      "'/lien4')"
    ],
    [
      "('Enceinte'",
      "'/lien5')"
    ],
    [
      "('Piscine'",
      "'/lien6')"
    ],
  ];

  const queryString = `INSERT INTO "equipment" ("description", "icon_link") VALUES ${equipments} RETURNING id;`;
  const result = await db.query(queryString);

  return result.rows;
}

async function insertStates() {
  const states = [
    "('En attente')",
    "('Validé')",
    "('Annulé')",
    "('Terminé')"
  ];

  const queryString = `INSERT INTO "state" ("description") VALUES ${states} RETURNING id;`;

  const result = await db.query(queryString);

  return result.rows;
}

function generateWorkspaces(nbWorkspace, userIds) {

  debug(userIds);

  const workspaces = [];
  for (let iWorkspace = 0; iWorkspace < nbWorkspace; iWorkspace++) {
    const workspace = {
      title: faker.lorem.words(3),
      description: faker.lorem.lines(3),
      address: faker.address.streetAddress(),
      zip_code: faker.address.zipCode(),
      city: faker.address.cityName(),
      longitude: faker.address.longitude(),
      latitude: faker.address.latitude(),
      morning_price: faker.datatype.number(50),
      afternoon_price: faker.datatype.number(50),
      day_price: faker.datatype.number(100),
      availability: true,
      user_id: userIds[Math.floor(Math.random() * userIds.length)]
    }

    workspaces.push(workspace);
  }

  return workspaces;
}

async function insertWorkspaces(workspaces) {
  await db.query('TRUNCATE TABLE "workspace" RESTART IDENTITY CASCADE');

  const workspaceValues = workspaces.map((workspace) => `(
    '${workspace.title}',
    '${workspace.description}',
    '${workspace.address}',
    '${workspace.zip_code}',
    '${workspace.city}',
    '${workspace.longitude}',
    '${workspace.latitude}',
    '${workspace.morning_price}',
    '${workspace.afternoon_price}',
    '${workspace.day_price}',
    '${workspace.availability}',
    '${workspace.user_id}'
  )`);

  const queryString = `
    INSERT INTO "workspace" 
    (
      "title",
      "description",
      "address",
      "zip_code",
      "city",
      "longitude",
      "latitude",
      "morning_price",
      "afternoon_price",
      "day_price",
      "availability",
      "user_id"
    )
    VALUES 
    ${workspaceValues} RETURNING id;`;

  const result = await db.query(queryString);

  return result.rows;
}

(async () => {
  /**
  * Ajout des rôles en BDD
  */
  const insertedRoles = await insertRoles();
  const rolesIds = insertedRoles.map((role) => role.id);
  debug(`${insertedRoles.length} roles inserted.`);

  /**
  * Générations d'utilisateurs fake
  * Ajout de ces utilisateurs en BDD
  */
  const result = generateUsers(NB_USERS, rolesIds);
  const users = result.users.map((user) => user);
  const insertedUsers = await insertUsers(users);
  debug(`${insertedUsers.length} users inserted.`);
  const userIds = insertedUsers.map((user) => user.id);

  /**
   * Ajout des équipements en BDD
   */
  const insertedEquipments = await insertEquipment();
  const equipmentsIds = insertedEquipments.map((equipment) => equipment.id);
  debug(`${insertedEquipments.length} equipments inserted.`);

  /**
   * Ajout des states en BDD
   */
  const insertedStates = await insertStates();
  const stateIds = insertedStates.map((state) => state.id);
  debug(`${insertedStates.length} states inserted.`);

  /**
  * Générations de workspace fake
  * Ajout de ces workspace en BDD
  */  
  //  const workspaces = generateWorkspaces(NB_WORKSPACES, result.hostIds);
  //  const insertedWorkspace = await insertWorkspaces(workspaces);
  //  debug(`${insertedWorkspace.length} workspaces inserted.`);
  //  const workspaceIds = insertedWorkspace.map((workspace) => workspace.id);
})();
