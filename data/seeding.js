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


  const queryString = `
  INSERT INTO public.role(
    description)
    VALUES 
          ('coworker'),
          ('host'),
          ('admin')
  RETURNING *;
  `;

  const result = await db.query(queryString);

  return result.rows;
}


async function insertUsers(users) {
  await db.query('TRUNCATE TABLE "user" RESTART IDENTITY CASCADE');

  const password = bcrypt.hashSync('Password123$', 8);

  const queryString = `
  INSERT INTO public."user"(
    last_name, first_name, email, password, username, avatar, about, gender, role_id)
    VALUES 
          ('Vanaquer', 'Corentin', 'vanaquer@cosyworking.fr', '${password}', 'Corentin.V', 'https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/avatar%2F578.jpeg?alt=media&token=da04a5ba-2a26-43a9-ba44-ba2d3f8b360e', 'Je suis un super hôte', 'male', 2),
          ('Roggy', 'Quentin', 'roggy@cosyworking.fr', '${password}', 'Quentin.R', 'https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/avatar%2F578.jpeg?alt=media&token=da04a5ba-2a26-43a9-ba44-ba2d3f8b360e', 'Je suis primé meilleur hôte de la Maine-et-Loire', 'male', 2),
          ('Kiwi', 'Jade', 'kiwi@cosyworking.fr', '${password}', 'Jade.K', 'https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/avatar%2F851.jpeg?alt=media&token=c822340c-92cb-4f38-b9f7-dead03c526b9', 'Je suis fan du chocolat milka et de la moutarde de dijon', 'female', 2),
          ('Liorah', 'Ambre', 'liorah@cosyworking.fr', '${password}', 'Ambre.L', 'https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/avatar%2F1138.jpeg?alt=media&token=9de18f3c-e6c7-4123-af32-61a063d4f91e', 'Je suis grande, riche et indépendante', 'female', 2),
          ('Gouttin', 'Paul', 'gouttin@cosyworking.fr', '${password}', 'Paul.G', 'https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/avatar%2F40.jpeg?alt=media&token=a4bf6a1a-80cc-4d53-a45b-ce5c26c91fbd', 'Je suis célibataire, à la recherche de mon âme soeur', 'male', 2),
          ('Martin', 'Agath', 'martin@cosyworking.fr', '${password}', 'Agath.M', 'https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/avatar%2F1179.jpeg?alt=media&token=4a996f74-7e11-4fef-8e55-1d8ff3370c74', 'Je suis dev nomade et cherche un bureau', 'female', 1),
          ('Boutoile', 'Pierre', 'boutoile@cosyworking.fr', '${password}', 'Pierre.B', 'https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/avatar%2F40.jpeg?alt=media&token=a4bf6a1a-80cc-4d53-a45b-ce5c26c91fbd', 'Bonjour, je suis gentil avec les chats et les plantes ', 'male', 1),
          ('Dubois', 'Alice', 'dubois@cosyworking.fr', '${password}', 'Alice.D', 'https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/avatar%2F1050.jpeg?alt=media&token=611ad0be-aed1-4a75-b3cd-7128d7c73ecd', 'Salut je prendrais soins de votre bureau acceptez moi please', 'female', 1),
          ('Nougah', 'Benjamin', 'nougah@cosyworking.fr', '${password}', 'Benjamin.N', 'https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/avatar%2F764.jpeg?alt=media&token=d43bc6cd-7ffc-491f-bf36-908b0f05ec25', 'Hello je cherche des bureaux pour travailler sur un projet secret', 'male', 1),
          ('Brooks', 'Adelaide', 'brooks@cosyworking.fr', '${password}', 'Adelaide.B', 'https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/avatar%2F1050.jpeg?alt=media&token=611ad0be-aed1-4a75-b3cd-7128d7c73ecd', 'Hi, I am looking for a place to work with a big pool, work hard play hard!', 'female', 1)
  RETURNING id;
  `;

  const result = await db.query(queryString);
  return result.rows;
}

async function insertEquipment() {


  const queryString = `
  INSERT INTO public.equipment(
    description, icon_link)
    VALUES 
    ('Imprimante', 'https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/equipment%2F3022251.png?alt=media&token=22d75a79-aaae-43bf-8a8a-312b0ae68db1'),
    ('Fibre', 'https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/equipment%2F6131198.png?alt=media&token=1675a3fd-db04-4568-adb3-21ade83abb41'),
    ('Cuisine', 'https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/equipment%2F481486.png?alt=media&token=40117fdd-81f7-46ae-8391-409ccda9110e'),
    ('Double écran', 'https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/equipment%2F3018288.png?alt=media&token=6a168730-767d-4cf3-8cae-d0398c390c30'),
    ('Enceinte', 'https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/equipment%2F650504.png?alt=media&token=c52735ec-8e33-4772-9a13-db2292c500b1'),
    ('Piscine', 'https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/equipment%2F2932355.png?alt=media&token=6451aaed-33f9-404b-bcaf-de954989a593')
    RETURNING *;
    `;

  const result = await db.query(queryString);

  return result.rows;
}

async function insertStates() {


  const queryString = `
  INSERT INTO public.state(
    description)
    VALUES 
          ('En attente'),
          ('Validé'),
          ('Annulé'),
          ('Terminé'),
          ('Non disponible')
  RETURNING *;
  `;

  const result = await db.query(queryString);

  return result.rows;
}


async function insertWorkspaces(workspaces) {

  await db.query('TRUNCATE TABLE "workspace" RESTART IDENTITY CASCADE');


  const queryString = `
  INSERT INTO public.workspace(
    title, description, address, zip_code, city, longitude, latitude, half_day_price, day_price, availability, user_id)
    VALUES 
          ('Le Cocoon', 'Un bureau équipé pour votre bien être, décoré à travers la methode fengshui. Vous y serez épanouis et en sortirez plus heureux que jamais.', '30 rue Saint-Louis', '35000', 'rennes', '-1.6840268', '48.1133316', 70, 140, true, 1),
          ('Happy Hour Loft', 'Mon loft est à votre service, vous pourrez y étancher votre soif et bien sûr y travailler comme il se doit', '8 rue Saint-Serge', '49100', 'angers', '-0.55', '47.4667', 80, 160, true, 2),
          ('Bureau pas comme les autres', 'Bureau conceptuel dans une ambiance chat Sibérien. Pot de moutarde de Dijon offert', '5 rue Jacques Cellerier', '21000', 'dijon', '5.0167', '47.3167', 40, 80, true, 3),
          ('Luxueuse Villa', 'Charmante Villa de 300m2, vous y trouverez une piscine à débordement sur le toit avec vue sur la Tour Eiffel ', '3 Av. Anatole', '75007', 'paris', '2.2966781', '48.8571483', 199, 399, true, 4),
          ('Petite Villa', 'Petite Villa de 1300m2, parfait pour vos team building. ', '12 rue Desaix', '75015', 'paris', '2.294337574460753', '48.85408615197824', 80, 200, true, 1),
          ('Charmant Atelier', 'Ancien atelier de poterie aménager en bureau, décoration inspiré du plus grand potier Bernard Palissy', '72 Pl. de Provence', '86000', 'poitiers', '0.357187', '46.5894948', 30, 60, true, 5)
  RETURNING *;
`;


  const result = await db.query(queryString);

  return result.rows;
}

async function insertEquipmentForWorkspace() {

  const queryString = `
  INSERT INTO public.workspace_has_equipment(
    equipment_id, workspace_id)
    VALUES 
    (1, 1),
    (1, 2),
    (1, 3),
    (6, 4),
    (1, 5),
    (2, 1),
    (3, 2),
    (3, 3),
    (5, 4),
    (2, 5),
    (1, 6),
    (2, 6)
  RETURNING *;
  `;

  const result = await db.query(queryString);

  return result.rows;

}

async function insertBooking() {

  const queryString = `
  INSERT INTO public.booking(
    start_date, end_date, user_id, workspace_id, state_id, booking_ref_id, price)
    VALUES 
    -- first
    ('2022-10-20T06:00:00Z', '2022-10-20T15:00:00Z', 6, 1, 1, 1, 140),
    ('2022-10-21T11:00:00Z', '2022-10-21T15:00:00Z', 6, 1, 1, 1, 70),
    -- second
    ('2022-10-20T06:00:00Z', '2022-10-20T15:00:00Z', 7, 2, 2, 2, 160),
    ('2022-10-21T11:00:00Z', '2022-10-21T15:00:00Z', 7, 2, 2, 2, 80),
    -- thirdt
    ('2022-10-20T06:00:00Z', '2022-10-20T15:00:00Z', 8, 3, 3, 3, 80),
    ('2022-10-21T11:00:00Z', '2022-10-21T15:00:00Z', 8, 3, 3, 3, 40),
    -- forth
    ('2022-10-20T06:00:00Z', '2022-10-20T15:00:00Z', 9, 4, 2, 4, 399),
    ('2022-10-21T11:00:00Z', '2022-10-21T15:00:00Z', 9, 4, 2, 4, 199),
    -- fifth
    ('2022-10-20T06:00:00Z', '2022-10-20T15:00:00Z', 10, 5, 1, 5, 200),
    ('2022-10-21T11:00:00Z', '2022-10-21T15:00:00Z', 10, 5, 1, 5, 80),
    ('2022-10-22T06:00:00Z', '2022-10-22T15:00:00Z', 10, 5, 1, 5, 200),
    ('2022-10-23T06:00:00Z', '2022-10-23T15:00:00Z', 10, 5, 1, 5, 200),
    -- sixth
    ('2022-10-28T06:00:00Z', '2022-10-28T15:00:00Z', 6, 3, 1, 6, 80),
    ('2022-10-29T11:00:00Z', '2022-10-29T15:00:00Z', 6, 3, 1, 6, 40)
  RETURNING *;
  `;

  const result = await db.query(queryString);

  return result.rows;
}

async function insertImage() {

  const queryString = `
  INSERT INTO public.image(
    link, main_image, workspace_id)
    VALUES 
          -- first
          ('https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/workspace%2Fphoto-1416339442236-8ceb164046f8.avif?alt=media&token=5685961b-3d69-4c6d-8349-356b521ee233', true, 1),
          ('https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/workspace%2Fphoto-1618381801643-3d253a63a3861.avif?alt=media&token=e8fb6435-b9df-4989-8649-3609539bf7fd', false, 1),
          ('https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/workspace%2Fphoto-1618381801643-3d253a63a3862.avif?alt=media&token=184a41d9-0719-4d5d-9589-3dd4e9259bb1', false, 1),
          ('https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/workspace%2Fphoto-1618381801643-3d253a63a3863.avif?alt=media&token=489926e9-d9e2-40b6-b717-2d767395fc8d', false, 1),
          ('https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/workspace%2Fphoto-1618381801643-3d253a63a3864.avif?alt=media&token=5c9fe7cf-be12-4737-8c3c-42b93c46d51e', false, 1),
          -- second
          ('https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/workspace%2Fphoto-1497366811353-6870744d04b2.avif?alt=media&token=1939ac43-278c-481e-b177-a539e8efcdab', true, 2),
          ('https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/workspace%2Fphoto-1535957998253-26ae1ef295061.avif?alt=media&token=3671cbe4-9827-41e3-906e-4a81d7ef9d6e', false, 2),
          ('https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/workspace%2Fphoto-1535957998253-26ae1ef295062.avif?alt=media&token=0a9a9766-2d5a-44ac-8b24-f8d0bed69254', false, 2),
          ('https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/workspace%2Fphoto-1535957998253-26ae1ef295063.avif?alt=media&token=50807c38-bebb-4180-95bb-e1578d648aa5', false, 2),
          ('https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/workspace%2Fphoto-1535957998253-26ae1ef295064.avif?alt=media&token=3937812e-1479-424a-8e6a-c2fc73a0fa86', false, 2),
          -- third
          ('https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/workspace%2Fphoto-1585779034823-7e9ac8faec70.avif?alt=media&token=909e0358-51e2-4a31-a9d7-f9febddc1e71', true, 3),
          ('https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/workspace%2Fphoto-1556559322-b5071efadc881.avif?alt=media&token=820f0a05-ecb1-427e-8607-9e2cc80c993f', false, 3),
          ('https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/workspace%2Fphoto-1556559322-b5071efadc882.avif?alt=media&token=ec85244b-7409-4243-8fc2-3c604b8f0088', false, 3),
          ('https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/workspace%2Fphoto-1556559322-b5071efadc883.avif?alt=media&token=c1dee3ec-c26f-4280-9cc3-2f70827981ff', false, 3),
          ('https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/workspace%2Fphoto-1556559322-b5071efadc884.avif?alt=media&token=2686976b-4b30-45e4-bfd4-e01089da03c9', false, 3),
          -- forth
          ('https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/workspace%2Fphoto-1600585154340-be6161a56a0c.avif?alt=media&token=2d374fbb-e7fe-4718-94c8-4d3ceb7250d5', true, 4),
          ('https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/workspace%2Fphoto-1497215842964-222b430dc0941.avif?alt=media&token=f44f85fb-6f2d-420f-aafa-fa3b4a2b5732', false, 4),
          ('https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/workspace%2Fphoto-1497215842964-222b430dc0942.avif?alt=media&token=96a4c78e-ba26-42ff-a6be-2637741e8e15', false, 4),
          ('https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/workspace%2Fphoto-1497215842964-222b430dc0943.avif?alt=media&token=ec121618-a07a-4357-a031-9b51f029846d', false, 4),
          ('https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/workspace%2Fphoto-1497215842964-222b430dc0944.avif?alt=media&token=6156e1bf-67f7-4e40-8286-9d3f264fa602', false, 4),
          -- fifth
          ('https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/workspace%2Fphoto-1601397210737-a5534480bdc5.avif?alt=media&token=3da62b50-e105-40ea-9a0f-b98d4fa9038a', true, 5),
          ('https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/workspace%2Fphoto-1567987768246-df799f9c8afb1.avif?alt=media&token=5f5b3759-d404-446c-bd07-c4f0b26f17bd', false, 5),
          ('https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/workspace%2Fphoto-1567987768246-df799f9c8afb2.avif?alt=media&token=50e2be9a-e10e-4985-b392-6f7de2e39134', false, 5),
          ('https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/workspace%2Fphoto-1567987768246-df799f9c8afb3.avif?alt=media&token=0869d47f-a395-4eac-a4ce-a5e168ab820d', false, 5),
          ('https://firebasestorage.googleapis.com/v0/b/cosyworking-8e4f5.appspot.com/o/workspace%2Fphoto-1567987768246-df799f9c8afb4.avif?alt=media&token=cf270dc7-41c4-46ac-815c-ba6a8d77af20', false, 5)
  RETURNING *;
  `;

  const result = await db.query(queryString);

  return result.rows;

}

async function insertBookingRef() {

  const queryString = `
  INSERT INTO public.booking_ref (price) VALUES 
  (210),
  (240),   
  (120),   
  (598),   
  (680),
  (120);  
  `;

  // let data = [];

  // for(let i = 0; i < 6; i++){
  //   data.push(result);
  // }
  
  result = await db.query(queryString);
  return result;
}

(async () => {
  /**
  * Ajout des rôles en BDD
  */
  const insertedRoles = await insertRoles();
  debug(`${insertedRoles.length} roles inserted.`);

  /**
  * Ajout de ces utilisateurs en BDD
  */
  const insertedUsers = await insertUsers();
  debug(`${insertedUsers.length} users inserted.`);

  /**
   * Ajout des équipements en BDD
   */
  const insertedEquipments = await insertEquipment();
  debug(`${insertedEquipments.length} equipments inserted.`);

  /**
   * Ajout des states en BDD
   */
  const insertedStates = await insertStates();
  debug(`${insertedStates.length} states inserted.`);

  /**
  * Ajout de ces workspace en BDD
  */  
  const insertedWorkspace = await insertWorkspaces();
  debug(`${insertedWorkspace.length} workspaces inserted.`);

  /**
   * Affectation des Equipments à des workspaces
   */
   const insertedItems = await insertEquipmentForWorkspace();
   debug(`${insertedItems.length} workspaces has equipment inserted.`);

   /**
    * Création des bookingRef
    */
   const bookingRef = await insertBookingRef();
   debug(`${bookingRef.length} bookingRef inserted`);

   /**
    * Création de bookings en auto
    */
    const bookings = await insertBooking();
    debug(`${bookings.length} booking inserted.`);

    /**
     * Création des images de workspace
     */
    const images = await insertImage();
    debug(`${images.length} images inserted`);

})();
