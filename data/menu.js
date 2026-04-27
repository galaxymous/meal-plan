// Menu transcribed from nutritionist's PDF.
// Structure: weeks[N].days[i] = { midi: { items, type }, soir: { items, type } }
// `type` drives the icon/image selection. `items` is an array of bullet lines.
// To correct anything, edit the items array of the relevant cell.

const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];

const MENU = {
  1: [
    {
      midi: { type: "feculents-proteine", items: ["Protéines + belle part de féculents (1 bol complet cuit)", "+/- légumes si faim", "Skyr ou yaourt"] },
      soir: { type: "proteine-legumes", items: ["Protéines + légumes au choix", "Fromage blanc"] },
    },
    {
      midi: { type: "proteine-legumes", items: ["Protéines + légumes", "Produit laitier maigre protéiné"] },
      soir: { type: "bouillon", items: ["Bouillon : 75 cL d'eau + légumes dans l'eau de cuisson", "Protéines maigres à volonté"] },
    },
    {
      midi: { type: "proteine-legumes", items: ["Protéines + légumes", "Yaourt"] },
      soir: { type: "fruit", items: ["Protéines + légumes", "1 fruit (tout sauf banane)"] },
    },
    {
      midi: { type: "fruit", items: ["Protéines + légumes", "Skyr", "1 fruit (tout sauf banane)"] },
      soir: { type: "bouillon", items: ["Bouillon : 75 cL d'eau + légumes dans l'eau de cuisson", "Protéines maigres à volonté"] },
    },
    {
      midi: { type: "proteine-legumes", items: ["Protéines + légumes", "Yaourt"] },
      soir: { type: "feculents", items: ["Féculents + légumes", "Yaourt"] },
    },
    {
      midi: { type: "proteine-legumes", items: ["Protéines + légumes", "Yaourt ou fruit"] },
      soir: { type: "fruit", items: ["Fruits à volonté", "Protéines maigres à volonté"] },
    },
    {
      midi: { type: "proteine-legumes", items: ["Protéines + légumes"] },
      soir: { type: "crudites", items: ["Crudités au choix, sauce allégée", "Protéines maigres à volonté"] },
    },
  ],
  2: [
    {
      midi: { type: "feculents-proteine", items: ["Protéines + belle part de féculents (1 bol complet cuit)", "+/- légumes si faim", "Skyr ou yaourt"] },
      soir: { type: "proteine-legumes", items: ["Protéines + légumes au choix", "Fromage blanc"] },
    },
    {
      midi: { type: "proteine-legumes", items: ["Protéines + légumes", "Produit laitier maigre protéiné"] },
      soir: { type: "bouillon", items: ["Bouillon vermicelles", "Protéines à volonté"] },
    },
    {
      midi: { type: "proteine-legumes", items: ["Protéines + légumes", "Yaourt"] },
      soir: { type: "fruit", items: ["Protéines + légumes", "1 fruit (tout sauf banane)"] },
    },
    {
      midi: { type: "fruit", items: ["Protéines + légumes", "Skyr", "1 fruit (tout sauf banane)"] },
      soir: { type: "bouillon", items: ["Bouillon", "Protéines maigres à volonté"] },
    },
    {
      midi: { type: "libre", items: ["LIBRE"] },
      soir: { type: "libre", items: ["LIBRE"] },
    },
    {
      midi: { type: "proteine-legumes", items: ["Protéines + légumes", "Yaourt ou fruit"] },
      soir: { type: "fruit", items: ["Fruits à volonté", "Protéines maigres à volonté"] },
    },
    {
      midi: { type: "proteine-legumes", items: ["Protéines + légumes"] },
      soir: { type: "crudites", items: ["Crudités, sauce allégée", "Protéines maigres à volonté"] },
    },
  ],
  3: [
    {
      midi: { type: "feculents-proteine", items: ["Protéines + féculents", "Produit laitier"] },
      soir: { type: "proteine-legumes", items: ["Protéines + légumes au choix", "Fromage blanc"] },
    },
    {
      midi: { type: "proteine-legumes", items: ["Protéines + légumes", "Produit laitier maigre protéiné"] },
      soir: { type: "crudites", items: ["Crudités", "1 verre de gazpacho", "1 soupe miso", "Protéines à volonté"] },
    },
    {
      midi: { type: "proteine-legumes", items: ["Protéines + légumes", "Yaourt"] },
      soir: { type: "libre", items: ["LIBRE"] },
    },
    {
      midi: { type: "libre", items: ["LIBRE"] },
      soir: { type: "libre", items: ["LIBRE"] },
    },
    {
      midi: { type: "fromage", items: ["Fromage + crudités, sauce allégée"] },
      soir: { type: "fruit", items: ["Fruits à volonté (au choix)", "Protéines maigres à volonté"] },
    },
    {
      midi: { type: "proteine-legumes", items: ["Protéines + légumes", "Yaourt ou fruit"] },
      soir: { type: "fruit", items: ["Fruits à volonté", "Protéines maigres à volonté"] },
    },
    {
      midi: { type: "proteine-legumes", items: ["Protéines + légumes"] },
      soir: { type: "crudites", items: ["Crudités, sauce allégée", "Protéines maigres à volonté"] },
    },
  ],
  4: [
    {
      midi: { type: "fruit", items: ["Protéines + légumes", "Fruit"] },
      soir: { type: "feculents", items: ["Féculents + légumes", "Yaourt ou fromage blanc"] },
    },
    {
      midi: { type: "proteine-legumes", items: ["Protéines + légumes", "Produit laitier maigre protéiné"] },
      soir: { type: "crudites", items: ["Crudités", "1 verre de gazpacho", "1 soupe miso", "Protéines maigres à volonté"] },
    },
    {
      midi: { type: "proteine-legumes", items: ["Protéines + légumes", "Yaourt"] },
      soir: { type: "fromage", items: ["Fromage-crudités", "Fruit ou yaourt"] },
    },
    {
      midi: { type: "libre", items: ["LIBRE"] },
      soir: { type: "crudites", items: ["Crudités", "1 verre de gazpacho", "1 soupe miso", "Protéines maigres à volonté"] },
    },
    {
      midi: { type: "fromage", items: ["Fromage + crudités (par exemple tomates/mozza)", "1 c. à soupe d'huile d'olive", "Protéine maigre"] },
      soir: { type: "crudites", items: ["Crudités", "Protéines"] },
    },
    {
      midi: { type: "feculents-proteine", items: ["Féculents + protéines"] },
      soir: { type: "proteine-legumes", items: ["Légumes ++", "Protéines maigres à volonté"] },
    },
    {
      midi: { type: "proteine-legumes", items: ["Protéines + légumes"] },
      soir: { type: "crudites", items: ["Crudités, sauce allégée", "Protéines maigres à volonté"] },
    },
  ],
  5: [
    {
      midi: { type: "fruit", items: ["Protéines + légumes", "1 fruit"] },
      soir: { type: "proteine-legumes", items: ["Protéines + légumes au choix", "Fromage blanc"] },
    },
    {
      midi: { type: "proteine-legumes", items: ["Protéines + légumes", "Produit laitier maigre protéiné"] },
      soir: { type: "bouillon", items: ["Crudités + bol de bouillon ou soupe miso", "1 part de protéines", "Fromage blanc"] },
    },
    {
      midi: { type: "proteine-legumes", items: ["Protéines + légumes", "Yaourt"] },
      soir: { type: "fruit", items: ["Protéines + légumes", "1 fruit au choix"] },
    },
    {
      midi: { type: "fruit", items: ["Protéines + légumes", "Skyr", "1 fruit (tout sauf banane)"] },
      soir: { type: "bouillon", items: ["Bouillon", "Protéines maigres à volonté"] },
    },
    {
      midi: { type: "proteine-legumes", items: ["Protéines + légumes", "Fromage blanc"] },
      soir: { type: "feculents", items: ["Féculents + légumes", "1 fruit"] },
    },
    {
      midi: { type: "proteine-legumes", items: ["Protéines + légumes", "Yaourt ou fruit"] },
      soir: { type: "fruit", items: ["Fruits à volonté", "Protéines maigres à volonté"] },
    },
    {
      midi: { type: "proteine-legumes", items: ["Protéines + légumes"] },
      soir: { type: "crudites", items: ["Crudités, sauce allégée", "Protéines maigres à volonté"] },
    },
  ],
};

// Sauce + rule recipes shown in modals and in the rules accordion.
const RULES = {
  proteinesMaigres: {
    title: "Protéines maigres",
    body: "Viande maigre (filet de poulet, jambon de volaille, steak 5%), poisson (poisson blanc, thon, darne de saumon en papillote), œuf, skyr, fromage blanc 0% (si aromatisé, moins de 12 g de sucres / 100 g).",
  },
  feculents: {
    title: "Féculents au choix",
    body: "Riz, pâtes, lentilles, etc.",
  },
  matieresGrasses: {
    title: "Matières grasses (2 premières semaines)",
    body: "Hors jour libre, seules matières grasses autorisées : la sauce allégée et la sauce dragon ci-dessous.",
  },
  fruit: {
    title: "Fruits",
    body: "Lorsque fruit : entier, non cuit, non en jus.",
  },
};

const SAUCES = {
  allegee: {
    title: "Sauce allégée (chaude ou froide)",
    body: [
      "1 c. à soupe de skyr",
      "2 c. à soupe de crème liquide à 4 %",
      "1 petite c. à café de moutarde",
      "Trait de vinaigre (pas en version chaude) et/ou citron",
      "Herbes type ciboulette ciselée (surgelée OK)",
      "Sel, poivre, épices selon les goûts",
    ],
  },
  dragon: {
    title: "Sauce dragon (pour une bouteille à conserver au frais)",
    body: [
      "70 g de sauce soja",
      "200 mL d'eau",
      "1 c. à soupe de pâte de sésame (tahini)",
      "1 c. à café d'ail en poudre",
      "5 c. à soupe de flocons de levure maltée",
      "80 g de vinaigre de cidre",
      "1 c. à soupe d'huile d'olive",
      "2 c. à soupe de graines de chia",
      "Tout mixer au robot ou au pied plongeur. Conserver dans une bouteille ou un grand pot type pot de confiture.",
    ],
  },
};

// Liste de courses — pensée anti-ballonnement.
// Évite : brocolis, choux, chou-fleur, oignons crus, légumineuses en grande quantité,
// poireaux crus, asperges, artichauts. Pas de banane (selon le menu).
const SHOPPING = [
  {
    title: "Protéines maigres",
    note: "Varie chaque semaine pour ne pas se lasser.",
    items: [
      "Filets de poulet",
      "Escalopes de dinde",
      "Jambon de volaille (tranches)",
      "Steak haché 5 % MG",
      "Œufs (boîte de 12)",
      "Cabillaud / lieu noir / colin (frais ou surgelé)",
      "Darnes de saumon",
      "Thon au naturel (boîtes)",
      "Crevettes décortiquées",
      "Tofu nature ferme",
    ],
  },
  {
    title: "Légumes (doux pour le ventre)",
    note: "Choisis des légumes qui ne ballonnent pas. Brocolis, choux et chou-fleur volontairement écartés.",
    items: [
      "Courgettes ⭐",
      "Carottes",
      "Concombre",
      "Tomates (cerises et grappes)",
      "Poivrons rouges et jaunes",
      "Aubergines",
      "Haricots verts (frais ou surgelés)",
      "Épinards frais (à cuire)",
      "Mâche, roquette, laitue",
      "Endives",
      "Radis",
      "Champignons de Paris",
      "Courge butternut",
    ],
  },
  {
    title: "Féculents",
    note: "Privilégie le riz basmati et le quinoa, plus digestes que les pâtes complètes ou les lentilles en grosse portion.",
    items: [
      "Riz basmati",
      "Quinoa",
      "Pâtes (semi-complètes ou blanches)",
      "Patate douce",
      "Pommes de terre à chair ferme",
      "Vermicelles (pour bouillons)",
    ],
  },
  {
    title: "Fruits",
    note: "Entiers, non cuits, non en jus. Pas de banane.",
    items: [
      "Fraises, framboises, myrtilles",
      "Kiwis",
      "Oranges, mandarines",
      "Ananas (frais)",
      "Pêches, nectarines",
      "Raisin (en petites quantités)",
      "Citrons (jaune et vert)",
      "Pommes (en petite quantité, mieux tolérées cuites)",
    ],
  },
  {
    title: "Laitiers",
    note: "Lis les étiquettes — skyr et fromage blanc 0% aromatisés doivent rester < 12 g de sucres / 100 g.",
    items: [
      "Skyr nature",
      "Fromage blanc 0 % MG",
      "Yaourts nature",
      "Crème liquide à 4 %",
      "Mozzarella di bufala",
      "Feta",
      "Chèvre frais",
    ],
  },
  {
    title: "Condiments & sauces",
    note: "Pour tes sauces allégée et dragon.",
    items: [
      "Moutarde de Dijon",
      "Vinaigre de cidre",
      "Sauce soja",
      "Pâte de sésame (tahini)",
      "Levure maltée (en flocons)",
      "Ail en poudre",
      "Graines de chia",
      "Huile d'olive (jours autorisés)",
      "Bouillon (cubes ou en poudre, légumes / volaille)",
      "Miso (pâte)",
    ],
  },
  {
    title: "Herbes & épices",
    note: "Indispensables pour donner du goût sans matières grasses.",
    items: [
      "Ciboulette (fraîche ou surgelée)",
      "Persil plat",
      "Basilic",
      "Coriandre",
      "Aneth",
      "Thym, romarin",
      "Gingembre frais",
      "Curry, cumin, paprika fumé",
      "Sel, poivre, fleur de sel",
    ],
  },
];

// Visual identity per meal type: photo (in /images) + fallback gradient.
const TYPE_VISUAL = {
  "feculents-proteine": { image: "images/feculents-proteine.jpg", gradient: "linear-gradient(135deg, #f9d976 0%, #f39c6b 100%)" },
  "proteine-legumes":   { image: "images/proteine-legumes.jpg",   gradient: "linear-gradient(135deg, #a8e063 0%, #56ab2f 100%)" },
  "bouillon":           { image: "images/bouillon.jpg",           gradient: "linear-gradient(135deg, #ffd29c 0%, #d96941 100%)" },
  "fruit":              { image: "images/fruit.jpg",              gradient: "linear-gradient(135deg, #ff9a9e 0%, #fad0c4 100%)" },
  "feculents":          { image: "images/feculents.jpg",          gradient: "linear-gradient(135deg, #fceabb 0%, #f8b500 100%)" },
  "crudites":           { image: "images/crudites.jpg",           gradient: "linear-gradient(135deg, #c1efb1 0%, #5fa371 100%)" },
  "fromage":            { image: "images/fromage.jpg",             gradient: "linear-gradient(135deg, #fff1a8 0%, #f0c060 100%)" },
  "libre":              { image: "images/libre.jpg",              gradient: "linear-gradient(135deg, #fceabb 0%, #fbd786 100%)" },
};

// 3-5 concrete dish ideas per meal type — all compatible with the nutritionist's
// constraints (lean proteins, no added fat beyond allowed sauces, simple cooking).
const MEAL_EXAMPLES = {
  "feculents-proteine": {
    title: "Idées : protéines + féculents",
    dishes: [
      { name: "Bowl poulet-riz-courgettes", note: "Filet de poulet grillé, riz basmati, courgettes vapeur, sauce allégée." },
      { name: "Pâtes thon-citron", note: "Pâtes complètes, thon au naturel, zeste de citron, herbes, poivre." },
      { name: "Lentilles & œuf poché", note: "Lentilles vertes mijotées (oignon, carotte), œuf poché, persil." },
      { name: "Saumon en papillote & quinoa", note: "Darne de saumon papillote (citron + aneth), quinoa, brocolis vapeur." },
    ],
  },
  "proteine-legumes": {
    title: "Idées : protéines + légumes",
    dishes: [
      { name: "Poulet grillé & haricots verts", note: "Filet de poulet citron-thym, haricots verts vapeur, sauce dragon." },
      { name: "Cabillaud & ratatouille", note: "Cabillaud vapeur, ratatouille sans huile (tomate, courgette, aubergine)." },
      { name: "Omelette aux champignons", note: "2 œufs, champignons poêlés à sec, salade verte, sauce allégée." },
      { name: "Steak 5% & poêlée légumes", note: "Steak haché 5% MG, poêlée brocolis-courgettes-poivron, herbes." },
      { name: "Thon & salade composée", note: "Thon au naturel, mâche, tomates cerises, concombre, sauce allégée." },
    ],
  },
  "bouillon": {
    title: "Idées : bouillons",
    dishes: [
      { name: "Bouillon poulet-poireaux", note: "Eau, poireaux, carotte, blanc de poulet effiloché, gingembre." },
      { name: "Bouillon vermicelles & œuf", note: "Bouillon de légumes maison, vermicelles, œuf battu en filet." },
      { name: "Soupe miso enrichie", note: "Miso, tofu soyeux, algues wakame, ciboule, crevettes vapeur." },
      { name: "Bouillon Tom Yum léger", note: "Bouillon volaille, citronnelle, gingembre, citron vert, crevettes." },
    ],
  },
  "fruit": {
    title: "Idées : repas + fruit",
    dishes: [
      { name: "Skyr-fruits rouges", note: "Skyr nature, framboises ou myrtilles, cannelle." },
      { name: "Salade poulet-pomme", note: "Poulet froid, pomme verte, mâche, sauce allégée." },
      { name: "Œufs & kiwi", note: "Œufs durs, légumes croquants, kiwi en dessert." },
      { name: "Fromage blanc & pêche", note: "Fromage blanc 0%, pêche, pincée de cardamome." },
    ],
  },
  "feculents": {
    title: "Idées : féculents + légumes",
    dishes: [
      { name: "Risotto de quinoa-épinards", note: "Quinoa façon risotto (bouillon), épinards, parmesan râpé fin." },
      { name: "Pâtes aux légumes du soleil", note: "Pâtes complètes, sauce tomate maison, basilic, courgette." },
      { name: "Riz sauté express", note: "Riz, petits pois, carotte, blancs d'œufs brouillés, sauce soja." },
      { name: "Patate douce rôtie & lentilles", note: "Patate douce au four, lentilles corail tiédies, coriandre." },
    ],
  },
  "crudites": {
    title: "Idées : crudités",
    dishes: [
      { name: "Carpaccio courgette-citron", note: "Courgettes en lamelles, citron, herbes, fleur de sel." },
      { name: "Tomates-concombre-radis", note: "Trio croquant, sauce dragon ou allégée, ciboulette." },
      { name: "Salade chou-carotte", note: "Chou blanc émincé, carotte râpée, vinaigrette légère." },
      { name: "Gazpacho express", note: "Tomates, concombre, poivron, ail, mixés au blender, frais." },
    ],
  },
  "fromage": {
    title: "Idées : fromage + crudités",
    dishes: [
      { name: "Tomate-mozzarella basilic", note: "Mozzarella di bufala, tomates, basilic, 1 c.à.s d'huile d'olive." },
      { name: "Feta & salade grecque", note: "Feta, concombre, tomate, oignon rouge, origan." },
      { name: "Chèvre frais & crudités", note: "Chèvre frais, bâtonnets de carotte, radis, ciboulette." },
    ],
  },
  "libre": {
    title: "Jour libre ✨",
    dishes: [
      { name: "Profite !", note: "Mange ce qui te fait plaisir, sans culpabilité — c'est prévu dans le plan." },
    ],
  },
};

const TYPE_EMOJI = {
  "feculents-proteine": "🍚",
  "proteine-legumes":   "🥗",
  "bouillon":           "🍜",
  "fruit":              "🍎",
  "feculents":          "🍝",
  "crudites":           "🥒",
  "fromage":            "🧀",
  "libre":              "✨",
};
