BEGIN

INSERT INTO public.role(
	description)
	VALUES 
        ('coworker'),
        ('host'),
        ('admin');


INSERT INTO public."user"(
	last_name, first_name, email, password, username, avatar, about, gender, role_id)
	VALUES 
        ('Vanaquer', 'Corentin', 'vanaquer@cosyworking.fr', 'password123$', 'Corentin.V', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/578.jpg', 'Je suis un super hôte', 'male', 2),
        ('Roggy', 'Quentin', 'roggy@cosyworking.fr', 'password123$', 'Quentin.R', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/578.jpg', 'Je suis primé meilleur hôte de la Maine-et-Loire', 'male', 2),
        ('Kiwi', 'Jade', 'kiwi@cosyworking.fr', 'password123$', 'Jade.K', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/851.jpg', 'Je suis fan du chocolat milka et de la moutarde de dijon', 'female', 2),
        ('Liorah', 'Ambre', 'liorah@cosyworking.fr', 'password123$', 'Ambre.L', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1138.jpg', 'Je suis grande, riche et indépendante', 'female', 2),
        ('Gouttin', 'Paul', 'gouttin@cosyworking.fr', 'password123$', 'Paul.G', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/40.jpg', 'Je suis célibataire, à la recherche de mon âme soeur', 'male', 2),
        ('Martin', 'Agath', 'martin@cosyworking.fr', 'password123$', 'Agath.M', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1179.jpg', 'Je suis dev nomade et cherche un bureau', 'female', 1),
        ('Boutoile', 'Pierre', 'boutoile@cosyworking.fr', 'password123$', 'Pierre.B', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/40.jpg', 'Bonjour, je suis gentil avec les chats et les plantes ', 'male', 1),
        ('Dubois', 'Alice', 'dubois@cosyworking.fr', 'password123$', 'Alice.D', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1050.jpg', 'Salut je prendrais soins de votre bureau acceptez moi please', 'female', 1),
        ('Nougah', 'Benjamin', 'nougah@cosyworking.fr', 'password123$', 'Benjamin.N', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/764.jpg', 'Hello je cherche des bureaux pour travailler sur un projet secret', 'male', 1),
        ('Brooks', 'Adelaide', 'brooks@cosyworking.fr', 'password123$', 'Adelaide.B', 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1050.jp', 'Hi, I am looking for a place to work with a big pool, work hard play hard!', 'female', 1);


INSERT INTO public.workspace(
	title, description, address, zip_code, city, longitude, latitude, half_day_price, day_price, availability, user_id)
	VALUES 
        ('Le Cocoon', 'Un bureau équipé pour votre bien être, décoré à travers la methode fengshui. Vous y serez épanouis et en sortirez plus heureux que jamais.', '30 rue Saint-Louis', '35000', 'Rennes', '-1.6840268', '48.1133316', 70, 140, true, 1),
        ('Happy Hour Loft', 'Mon loft est à votre service, vous pourrez y étancher votre soif et bien sûr y travailler comme il se doit', '8 rue Saint-Serge', '49100', 'Angers', '-0.55', '47.4667', 80, 160, true, 2),
        ('Bureau pas comme les autres', 'Bureau conceptuel dans une ambiance chat Sibérien. Pot de moutarde de Dijon offert', '5 rue Jacques Cellerier', '21000', 'Dijon', '5.0167', '47.3167', 40, 80, true, 3),
        ('Luxieuse Villa', 'Charmante Villa de 300m2, vous y trouverez une piscine à débordement sur le toit avec vu sur la Tour Effeil ', '3 Av. Anatole', '75007', 'Paris', '2.2966781', '48.8571483', 199, 399, true, 4),
        ('Charmant Atelier', 'Ancien atelier de poterie aménager en bureau, décoration inspiré du plus grand potier Bernard Palissy', '72 Pl. de Provence', '86000', 'Poitiers', '0.357187', '46.5894948', 30, 60, true, 5);


INSERT INTO public.image(
	link, main_image, workspace_id)
	VALUES 
        -- first
        ('/public/image/workspace/1', true, 1),
        ('/public/image/workspace/2', false, 1),
        ('/public/image/workspace/3', false, 1),
        ('/public/image/workspace/4', false, 1),
        ('/public/image/workspace/5', false, 1),
        -- second
        ('/public/image/workspace/6', true, 2),
        ('/public/image/workspace/7', false, 2),
        ('/public/image/workspace/8', false, 2),
        ('/public/image/workspace/9', false, 2),
        ('/public/image/workspace/10', false, 2),
        -- third
        ('/public/image/workspace/11', true, 3),
        ('/public/image/workspace/12', false, 3),
        ('/public/image/workspace/13', false, 3),
        ('/public/image/workspace/14', false, 3),
        ('/public/image/workspace/15', false, 3),
        -- forth
        ('/public/image/workspace/16', true, 4),
        ('/public/image/workspace/17', false, 4),
        ('/public/image/workspace/18', false, 4),
        ('/public/image/workspace/19', false, 4),
        ('/public/image/workspace/20', false, 4),
        -- fifth
        ('/public/image/workspace/21', true, 5),
        ('/public/image/workspace/22', false, 5),
        ('/public/image/workspace/23', false, 5),
        ('/public/image/workspace/24', false, 5),
        ('/public/image/workspace/25', false, 5);


INSERT INTO public.state(
	description)
	VALUES 
        ('En attente'),
        ('Validé'),
        ('Annulé'),
        ('Terminé'),
        ('Non disponible');

-- 5x booking_ref
INSERT INTO public.booking_ref
	DEFAULT VALUES;  

INSERT INTO public.booking_ref
	DEFAULT VALUES;  

INSERT INTO public.booking_ref
	DEFAULT VALUES;  

INSERT INTO public.booking_ref
	DEFAULT VALUES; 

INSERT INTO public.booking_ref
	DEFAULT VALUES;  


INSERT INTO public.equipment_has_workspace(
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
        (2, 5);


INSERT INTO public.booking(
        start_date, end_date, user_id, workspace_id, state_id, booking_ref_id)
        VALUES 
        -- first
        ('2022-10-20T06:00:00Z', '2022-10-20T15:00:00Z', 6, 1, 2, 1),
        ('2022-10-21T11:00:00Z', '2022-10-20T15:00:00Z', 6, 1, 2, 1),
        -- second
        ('2022-10-20T06:00:00Z', '2022-10-20T15:00:00Z', 7, 2, 2, 2),
        ('2022-10-21T11:00:00Z', '2022-10-20T15:00:00Z', 7, 2, 2, 2),
        -- thirdt
        ('2022-10-20T06:00:00Z', '2022-10-20T15:00:00Z', 8, 3, 2, 3),
        ('2022-10-21T11:00:00Z', '2022-10-20T15:00:00Z', 8, 3, 2, 3),
        -- forth
        ('2022-10-20T06:00:00Z', '2022-10-20T15:00:00Z', 9, 4, 2, 4),
        ('2022-10-21T11:00:00Z', '2022-10-20T15:00:00Z', 9, 4, 2, 4),
        -- fifth
        ('2022-10-20T06:00:00Z', '2022-10-20T15:00:00Z', 10, 5, 2, 5),
        ('2022-10-21T11:00:00Z', '2022-10-20T15:00:00Z', 10, 5, 2, 5);


INSERT INTO public.equipment(
        description, icon_link)
        VALUES 
        ('Imprimante', '/public/image/equipment/printer'),
        ('Fibre', '/public/image/equipment/fiber'),
        ('Cuisine', '/public/image/equipment/kitchen'),
        ('Double écran', '/public/image/equipment/screen'),
        ('Enceinte', '/public/image/equipment/speaker'),
        ('Piscine', '/public/image/equipment/pool');


COMMIT

