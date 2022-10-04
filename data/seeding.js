require("dotenv").config();
const { faker } = require("@faker-js/faker");
const debug = require("debug")("seeding");
const bcrypt = require("bcryptjs");

const db = require("../app/config/db");

db.queryCount = 0;

faker.locale = "fr";
const NB_USERS = 10;
const NB_WORKSPACES = 5;

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
      password: bcrypt.hashSync("Password123!", 8),
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

  const coworkerId = await db.query(`SELECT role.id FROM role WHERE role.description = 'coworker'`);
  const hostId = await db.query(`SELECT role.id FROM role WHERE role.description = 'host'`);
  const password = bcrypt.hashSync("Password123!", 8);


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
    VALUES ('Corentin', 'Vanaquer', 'corentin.vanaquer@cosyworking.fr', '${password}', 'Corentin.V', '${faker.internet.avatar()}', 'male', 'Je suis un super hôte', ${hostId.rows[0].id}),
    ('Quentin', 'Roggy', 'quentin.roggy@cosyworking.fr', '${password}', 'Quentin.R', '${faker.internet.avatar()}', 'male', 'Je suis un super coworker', ${coworkerId.rows[0].id}),
    ${usersValues} RETURNING id;`;

  const result = await db.query(queryString);
  return result.rows;
}

async function insertEquipment() {
  const equipments = [
    [
      "('Imprimante'",
      "'/lib/images/equipment/imprimante.png')"
    ],
    [
      "('Fibre'",
      "'/lib/images/equipment/fibre.png')"
    ],
    [
      "('Cuisine'",
      "'/lib/images/equipment/cuisine.png')"
    ],
    [
      "('Double écran'",
      "'/lib/images/equipment/double-screen.png')"
    ],
    [
      "('Enceinte'",
      "'/lib/images/equipment/enceinte.png')"
    ],
    [
      "('Piscine'",
      "'/lib/images/equipment/piscine.png')"
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
    "('Terminé')",
    "('Non disponible')"
  ];

  const queryString = `INSERT INTO "state" ("description") VALUES ${states} RETURNING id;`;

  const result = await db.query(queryString);

  return result.rows;
}

async function generateWorkspaces(nbWorkspace) {

  const result = await db.query(`SELECT "user".id FROM "user" JOIN role ON role.id = "user".role_id WHERE role.description = 'host';`);

  const userIds = [];

  for (key in result.rows) {
    userIds.push(result.rows[key].id);
  }

  const workspaces = [];

  for (let iWorkspace = 0; iWorkspace < nbWorkspace; iWorkspace++) {
    const workspace = {
      title: faker.lorem.words(3),
      description: faker.lorem.lines(3),
      address: faker.address.streetAddress(),
      zip_code: faker.address.zipCode('#####'),
      city: faker.address.cityName(),
      longitude: faker.address.longitude(),
      latitude: faker.address.latitude(),
      half_day_price: faker.datatype.number(10),
      day_price: faker.datatype.number({min: 10, max: 100}),
      availability: true,
      user_id: userIds[Math.floor(Math.random() * userIds.length)]
    }

    workspace.address = workspace.address.replace(/'/g, "''");

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
    '${workspace.half_day_price}',
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
      "half_day_price",
      "day_price",
      "availability",
      "user_id"
    )
    VALUES 
    ${workspaceValues} RETURNING id;`;

  const result = await db.query(queryString);

  return result.rows;
}

async function insertEquipmentForWorkspace() {
  const wokspacesResult = await db.query(`SELECT id FROM workspace`);
  const equipmentResult = await db.query(`SELECT id FROM equipment`);

  const workspaceIds = [];
  const equipmentsIds = []

  for (key in wokspacesResult.rows) {
    workspaceIds.push(wokspacesResult.rows[key].id);
  }

  for (key in equipmentResult.rows) {
    equipmentsIds.push(equipmentResult.rows[key].id);
  }

  let valueString = ''

  for (let i = 0; i < 10; i++) {
    const workspaceId = workspaceIds[Math.floor(Math.random() * workspaceIds.length)];
    const equipmentId = equipmentsIds[Math.floor(Math.random() * equipmentsIds.length)];
    valueString += `(${equipmentId}, ${workspaceId}),`;
  }

  valueString = valueString.slice(0, -1);

  const queryString = `INSERT INTO workspace_has_equipment ("equipment_id", "workspace_id") VALUES ${valueString} RETURNING id;`;

  const result = await db.query(queryString);

  return result.rows;

}

async function insertBooking() {

  for (let i = 0; i < 5; i++) {
    await db.query(`INSERT INTO booking_ref DEFAULT VALUES`);
  }


  const coworkerResult = await db.query(`SELECT "user".id FROM "user" JOIN role ON role.id = "user".role_id WHERE role.description = 'coworker' LIMIT 3;`);

  const coworkerId = [];

  for (key in coworkerResult.rows) {
    coworkerId.push(coworkerResult.rows[key].id);
  }
  
  const queryString = `INSERT INTO booking ("start_date","end_date","user_id","workspace_id","state_id","booking_ref_id") VALUES 
  ('2022-12-04 07:00:00+01', '2022-12-04 11:00:00+01', ${coworkerId[0]}, 1, 1, 1), 
  ('2022-12-04 12:00:00+01', '2022-12-04 16:00:00+01', ${coworkerId[1]}, 1, 1, 2),
  ('2022-12-04 12:00:00+01', '2022-12-04 16:00:00+01', ${coworkerId[2]}, 3, 1, 3),
  ('2022-12-05 07:00:00+01', '2022-12-05 16:00:00+01', ${coworkerId[2]}, 3, 1, 3),
  ('2022-12-06 11:00:00+01', '2022-12-06 16:00:00+01', ${coworkerId[2]}, 3, 1, 3),
  ('2022-12-09 11:00:00+01', '2022-12-09 16:00:00+01', ${coworkerId[2]}, 2, 1, 4)
  RETURNING id;`;

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
  const workspaces = await generateWorkspaces(NB_WORKSPACES);
  const insertedWorkspace = await insertWorkspaces(workspaces);
  debug(`${insertedWorkspace.length} workspaces inserted.`);

  /**
   * Affectation des Equipments à des workspaces
   */
   const insertedItems = await insertEquipmentForWorkspace();
   debug(`${insertedItems.length} workspaces has equipment inserted.`);

   /**
    * Création de bookings en auto
    */
    const bookings = await insertBooking();
    debug(`${bookings.length} booking inserted.`);
})();
