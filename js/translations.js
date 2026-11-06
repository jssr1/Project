export const fr = {
  meta: {
    title: "Inside the Computer — Comprendre le fonctionnement d'un ordinateur",
    description: "Parcours interactif en français pour comprendre les composants, les données, le binaire, les images et la vidéo."
  },
  a11y: { skip: "Aller au contenu", nav: "Navigation principale", openMenu: "Ouvrir le menu", closeMenu: "Fermer le menu" },
  brand: { name: "Inside the Computer", tagline: "Laboratoire numérique interactif" },
  nav: { home: "Accueil", decouvrir: "Découvrir", circulation: "Circulation", binaire: "Binaire", images: "Images", video: "Vidéo", synthese: "Synthése" },
  common: { next: "Section suivante", back: "Retour", previous: "Précédent", play: "Lecture", pause: "Pause", restart: "Recommencer", reset: "Réinitialiser", step: "Étape", interactive: "Interactif", explore: "Explorer", select: "Sélectionner" },
  home: {
    kicker: "Projet universitaire — Parcours d'apprentissage",
    title: "Comprendre le fonctionnement d'un ordinateur",
    lead: "Explorez les composants, suivez le trajet des données, manipulez le binaire, composez des pixels et observez comment les images deviennent une vidéo.",
    ctaStart: "Commencer le parcours", ctaFlow: "Suivre une donnée"
  },
  decouvrir: {
    eyebrow: "Section 1", title: "Découvrir l'ordinateur",
    lead: "Un ordinateur combine plusieurs composants spécialisés. Sélectionnez un composant pour comprendre son rôle, ses échanges et un exemple concret.",
    status: "Interactif", hint: "Survolez ou sélectionnez un composant pour afficher son rôle.",
    labels: { role: "Rôle", comm: "Communication", example: "Exemple", note: "À retenir" },
    parts: {
      cpu: { name: "Processeur (CPU)", chip: "Calcul", tagline: "Le centre de calcul qui exécute les instructions.", role: "Le CPU lit, décode et exécute les instructions des programmes. Il effectue les calculs et prend les décisions logiques.", comm: "Il échange rapidement des données avec la RAM, coordonne les périphériques via la carte mère et envoie du travail au GPU si nécessaire.", example: "Quand vous ouvrez un document, le CPU exécute les instructions du logiciel pour afficher le contenu et réagir à vos actions." },
      ram: { name: "Mémoire vive (RAM)", chip: "Temporaire", tagline: "La mémoire de travail rapide de l'ordinateur.", role: "La RAM conserve temporairement les données et instructions utilisées au moment présent.", comm: "Elle sert de zone d'échange rapide entre le CPU, les programmes et les fichiers chargés depuis le stockage.", example: "Une page web ouverte ou une vidéo en cours de lecture utilise la RAM pour un accès rapide.", note: "La RAM est volatile : son contenu disparaît en général lorsque l'ordinateur s'éteint." },
      gpu: { name: "Carte graphique (GPU)", chip: "Affichage", tagline: "Le composant spécialisé dans le calcul visuel.", role: "Le GPU traite en parallèle de nombreuses opérations liées aux images, à la vidéo et à l'affichage.", comm: "Il reçoit des données préparées par le CPU et la RAM, produit des images, puis envoie le résultat vers l'écran.", example: "Lors de la lecture d'une vidéo, le GPU aide à préparer et afficher les images." },
      storage: { name: "Stockage (SSD/HDD)", chip: "Durable", tagline: "La mémoire qui conserve les données dans le temps.", role: "Le stockage garde le système, les applications et les fichiers même lorsque l'ordinateur est éteint.", comm: "Les données sont lues depuis le stockage puis chargées en RAM avant d'être traitées par le CPU.", example: "Vos documents et le système d'exploitation sont enregistrés sur un SSD ou un disque dur.", note: "Un SSD est généralement plus rapide qu'un disque dur mécanique (HDD)." },
      motherboard: { name: "Carte mère", chip: "Connexion", tagline: "La plateforme qui relie tous les composants.", role: "La carte mère connecte les composants et permet leur alimentation et leurs échanges de signaux.", comm: "Elle transporte les données entre CPU, RAM, GPU, stockage et périphériques grâce à des bus et des ports.", example: "Quand vous branchez un clavier ou un écran, la carte mère participe à la transmission des informations." },
      io: { name: "Périphériques d'entrée et de sortie", chip: "Interaction", tagline: "Les interfaces entre l'utilisateur et la machine.", role: "Les périphériques d'entrée envoient des informations à l'ordinateur. Les périphériques de sortie présentent les résultats.", comm: "Ils communiquent avec le système via la carte mère et les contrôleurs associés.", example: "Entrée : clavier, souris, microphone. Sortie : écran, haut-parleurs, imprimante." }
    }
  },
  circulation: {
    eyebrow: "Section 2", title: "Comment circulent les données ?",
    lead: "Exemple : un étudiant appuie sur la touche A. Suivez les étapes, de la saisie à l'affichage.",
    status: "Interactif", caveat: "Modèle pédagogique simplifié : le trajet réel peut varier selon le matériel et le logiciel.",
    controls: { play: "Lancer", pause: "Pause", next: "Étape suivante", prev: "Précédent", restart: "Recommencer", step: "Étape" },
    nodes: { keyboard: "Clavier", encode: "Encodage", ram: "RAM", cpu: "CPU", display: "Affichage", screen: "Écran" },
    steps: [
      { label: "Saisie", title: "La touche A est détectée", body: "Le clavier détecte l'appui sur la touche A et envoie un signal numérique au système.", detail: "Entrée : touche A" },
      { label: "Représentation numérique", title: "Le caractère est encodé", body: "Le caractère A est représenté par un code. En ASCII, A correspond à 65, soit 01000001 en binaire sur 1 octet.", detail: "A → ASCII 65 → 01000001" },
      { label: "Mémoire", title: "La donnée est placée en RAM", body: "La valeur encodée est stockée temporairement en RAM pour que les programmes puissent y accéder rapidement.", detail: "01000001 en mémoire vive" },
      { label: "Traitement", title: "Le CPU traite l'information", body: "Le processeur exécute les instructions du programme : il lit la donnée, la traite et prépare le résultat à afficher.", detail: "Traitement par le CPU" },
      { label: "Affichage", title: "Le résultat apparaît à l'écran", body: "Le système graphique transforme l'information en pixels. L'écran affiche alors la lettre A.", detail: "Pixels ? écran : A" }
    ]
  },
  binaire: {
    eyebrow: "Section 3", title: "Le langage binaire",
    lead: "Les ordinateurs représentent l'information avec des 0 et des 1. Manipulez des bits, convertissez des nombres et observez l'encodage des caractères.",
    status: "Interactif",
    tabs: { switches: "Bits", dec2bin: "Décimal → binaire", bin2dec: "Binaire → décimal", text: "Texte" },
    facts: [
      { t: "Bit", b: "Un bit vaut 0 ou 1 : la plus petite unité d'information." },
      { t: "Octet", b: "Un octet regroupe 8 bits. Il peut représenter 256 valeurs (0 à 255)." },
      { t: "ASCII", b: "ASCII associe certains caractères à des codes, par exemple A = 65." },
      { t: "Unicode", b: "Unicode représente un très grand nombre de caractères (lettres, symboles, emoji)." }
    ],
    switches: { title: "Interrupteurs binaires", lead: "Activez les bits pour composer un octet et lire sa valeur décimale.", decimal: "Valeur décimale", byte: "Octet (8 bits)", sum: "Calcul", example: "Exemple" },
    dec2bin: { title: "Convertisseur décimal → binaire", lead: "Entrez un nombre entre 0 et 255 pour obtenir sa représentation binaire sur 8 bits.", input: "Nombre décimal (0–255)", convert: "Convertir", result: "Résultat binaire", steps: "étapes (divisions par 2)", error: "Entrez un entier entre 0 et 255.", nonneg: "Entrez un entier positif ou nul.", range: "Utilisez une valeur entre 0 et 255 pour un octet." },
    bin2dec: { title: "Convertisseur binaire → décimal", lead: "Entrez un nombre binaire (composé de 0 et de 1) pour obtenir sa valeur décimale.", input: "Nombre binaire", convert: "Convertir", result: "Résultat décimal", empty: "Entrez un nombre binaire.", invalid: "Utilisez uniquement 0 et 1.", length: "Nombre trop long (16 bits max)." },
    text: { title: "Encodage de texte (ASCII / Unicode)", lead: "Saisissez un caractère ou un mot pour voir les codes associés.", input: "Texte", empty: "Saisissez du texte pour afficher son encodage.", char: "Caractère", code: "Code", hex: "Hexadécimal", bin: "Binaire (UTF-8)", note: "Les caractères accentués ou les emoji peuvent utiliser plusieurs octets en UTF-8." }
  },
  images: {
    eyebrow: "Section 4", title: "Comment une image est-elle affichée ?",
    lead: "Une image numérique est une grille de pixels. Chaque pixel possède une couleur, souvent décrite en RGB (Rouge, Vert, Bleu).",
    status: "Interactif",
    facts: [
      { t: "Pixel", b: "Plus petit élément d'une image numérique." },
      { t: "Résolution", b: "Nombre de pixels en largeur × hauteur." },
      { t: "RGB", b: "Couleur formée par Rouge, Vert, Bleu (valeurs 0–255)." },
      { t: "Profondeur", b: "Nombre de bits utilisés pour coder la couleur." },
      { t: "Formats", b: "PNG, JPEG, WebP : choix selon qualité, transparence et taille." },
      { t: "Compression", b: "Réduit la taille du fichier, avec ou sans perte d'information." }
    ],
    lab: {
      title: "Laboratoire de pixels", lead: "Cliquez ou glissez sur la grille pour dessiner. Chaque case est un pixel.",
      color: "Couleur", paint: "Peindre", erase: "Effacer", clear: "Effacer la grille", grid: "Grille", zoom: "Zoom",
      selected: "Pixel sélectionné", none: "Sélectionnez un pixel pour voir ses valeurs.", pos: "Position", rgb: "RGB", hex: "Hexadécimal", channels: "Canaux (binaire 8 bits)"
    },
    res: { title: "Résolution et détail", lead: "La même forme paraît plus détaillée avec davantage de pixels.", low: "Moins de pixels", high: "Plus de pixels", note: "Plus de pixels permettent de représenter plus de détails." }
  },
  video: {
    eyebrow: "Section 5", title: "Comment fonctionne une vidéo ?",
    lead: "Une vidéo affiche une succession rapide d'images. Les FPS, la résolution, les codecs et le décodage déterminent la fluidité et la taille.",
    status: "Interactif",
    facts: [
      { t: "Images successives", b: "Une vidéo est une suite d'images fixes affichées rapidement." },
      { t: "FPS", b: "Images par seconde : influence la fluidité du mouvement." },
      { t: "Résolution", b: "Dimensions de chaque image (largeur × hauteur)." },
      { t: "Compression", b: "Réduit les données en exploitant les ressemblances entre images." },
      { t: "Codec", b: "Méthode de codage/décodage (ex. H.264, AV1)." },
      { t: "Décodage", b: "Le système reconstruit les images compressées pour les afficher." }
    ],
    sim: {
      title: "Simulateur FPS", lead: "Faites varier les images par seconde pour observer la fluidité du mouvement.",
      fps: "Images par seconde (FPS)", play: "Lire", pause: "Pause", restart: "Recommencer",
      frame: "Image", total: "Images totales", note: "Un FPS plus élevé donne généralement un mouvement plus fluide.", noteLow: "Avec peu d'images par seconde, le mouvement paraît saccadé.", noteHigh: "Avec davantage d'images par seconde, le mouvement paraît plus fluide.", resolution: "Résolution", duration: "Durée"
    }
  },
  synthese: {
    eyebrow: "Section 6", title: "Récapitulatif et quiz",
    lead: "Revoyez les notions essentielles, puis vérifiez votre compréhension avec un quiz interactif.",
    status: "Interactif", recapTitle: "Ce qu'il faut retenir",
    recap: [
      "Le CPU traite les instructions, la RAM stocke temporairement, le GPU aide à l'affichage, le stockage conserve les données, et la carte mère relie l'ensemble.",
      "Une action comme appuyer sur A devient une donnée numérique, passe par la mémoire et le traitement, puis produit un affichage.",
      "Le binaire utilise des bits (0/1). Un octet contient 8 bits. ASCII et Unicode encodent les caractères.",
      "Une image est formée de pixels ; la résolution, le RGB et la profondeur de couleur influencent son rendu et sa taille.",
      "Une vidéo est une séquence d'images. Les FPS influencent la fluidité ; codecs et compression réduisent les données."
    ],
    quiz: {
      title: "Quiz interactif", intro: "Répondez aux questions pour vérifier votre compréhension. Aucun chronométre : prenez le temps de réfléchir.",
      start: "Commencer le quiz", next: "Question suivante", finish: "Voir le résultat", restart: "Recommencer",
      score: "Score", correct: "Bonne réponse", incorrect: "Réponse à revoir",
      progress: "Question {current} sur {total}", result: "Vous avez obtenu {score} sur {total}.", choose: "Choisir une réponse",
      completeTitle: "Quiz terminé", review: "Conseil : revenez aux sections concernées pour consolider les notions.",
      questions: [
        { q: "Quel composant exécute les instructions d'un programme ?", options: ["Le CPU", "Le SSD", "L'écran", "Le clavier"], a: 0, why: "Le CPU (processeur) lit et exécute les instructions." },
        { q: "Quel est le rôle principal de la RAM ?", options: ["Stocker durablement les fichiers", "Conserver temporairement les données en cours d'utilisation", "Afficher les pixels", "Alimenter l'ordinateur"], a: 1, why: "La RAM est une mémoire de travail rapide et temporaire." },
        { q: "Combien de bits contient un octet ?", options: ["4", "8", "16", "64"], a: 1, why: "Un octet regroupe 8 bits." },
        { q: "En ASCII, la lettre A correspond à quelle valeur décimale ?", options: ["1", "10", "65", "97"], a: 2, why: "A majuscule correspond au code ASCII 65 (01000001 en binaire)." },
        { q: "De quoi est composée une image numérique ?", options: ["De pistes audio", "De pixels", "De paquets réseau uniquement", "De secteurs mécaniques"], a: 1, why: "Une image numérique est une grille de pixels." },
        { q: "Que signifie FPS dans une vidéo ?", options: ["Fichiers par seconde", "Images par seconde", "Pixels fixes standard", "Fréquence de stockage"], a: 1, why: "FPS indique le nombre d'images affichées chaque seconde." },
        { q: "Quel élément relie principalement les composants entre eux ?", options: ["La carte mère", "Le haut-parleur", "Le fichier JPEG", "Le codec seul"], a: 0, why: "La carte mère connecte les composants et permet leurs échanges." }
      ]
    }
  },
  footer: { line: "Inside the Computer — parcours interactif sur le fonctionnement d'un ordinateur.", note: "Projet éducatif en HTML, CSS et JavaScript." },
  noscript: { title: "JavaScript est requis.", body: "Ce parcours utilise JavaScript pour la navigation et les activités interactives." }
};

fr.computer = {
  status: "Interactif",
  parts: {
    cpu: { name: fr.decouvrir.parts.cpu.name, chip: fr.decouvrir.parts.cpu.chip, tagline: fr.decouvrir.parts.cpu.tagline, role: fr.decouvrir.parts.cpu.role, comm: fr.decouvrir.parts.cpu.comm, example: fr.decouvrir.parts.cpu.example, cycle: { fetch: { name: "Lecture", body: "Le CPU lit l'instruction suivante depuis la mémoire." }, decode: { name: "Décodage", body: "Le CPU interpréte l'instruction." }, execute: { name: "Exécution", body: "Le CPU exécute l'opération demandée." } } },
    ram: { name: fr.decouvrir.parts.ram.name, chip: fr.decouvrir.parts.ram.chip, tagline: fr.decouvrir.parts.ram.tagline, role: fr.decouvrir.parts.ram.role, comm: fr.decouvrir.parts.ram.comm, example: fr.decouvrir.parts.ram.example, note: fr.decouvrir.parts.ram.note },
    gpu: { name: fr.decouvrir.parts.gpu.name, chip: fr.decouvrir.parts.gpu.chip, tagline: fr.decouvrir.parts.gpu.tagline, role: fr.decouvrir.parts.gpu.role, comm: fr.decouvrir.parts.gpu.comm, example: fr.decouvrir.parts.gpu.example },
    storage: { name: fr.decouvrir.parts.storage.name, chip: fr.decouvrir.parts.storage.chip, tagline: fr.decouvrir.parts.storage.tagline, role: fr.decouvrir.parts.storage.role, comm: fr.decouvrir.parts.storage.comm, example: fr.decouvrir.parts.storage.example, note: fr.decouvrir.parts.storage.note },
    motherboard: { name: fr.decouvrir.parts.motherboard.name, chip: fr.decouvrir.parts.motherboard.chip, tagline: fr.decouvrir.parts.motherboard.tagline, role: fr.decouvrir.parts.motherboard.role, comm: fr.decouvrir.parts.motherboard.comm, example: fr.decouvrir.parts.motherboard.example },
    power: { name: "Alimentation", chip: "Énergie", tagline: "Fournit l'énergie électrique aux composants.", role: "L'alimentation adapte le courant et distribue l'énergie nécessaire au fonctionnement de l'ordinateur.", comm: "Elle alimente la carte mère, qui distribue ensuite l'énergie aux composants.", example: "Sans alimentation stable, les composants ne peuvent pas fonctionner." },
    io: { name: fr.decouvrir.parts.io.name, chip: fr.decouvrir.parts.io.chip, tagline: fr.decouvrir.parts.io.tagline, role: fr.decouvrir.parts.io.role, comm: fr.decouvrir.parts.io.comm, example: fr.decouvrir.parts.io.example }
  },
  anatomy: { hint: "Survolez ou sélectionnez un composant sur le schéma", count: "7 composants reliés par des bus de données", components: "Composants de l'ordinateur", panelLabel: "Détails du composant", idleKicker: "Composants", idleTitle: "Sélectionnez un composant", idleBody: "Cliquez sur un élément du schéma pour afficher son rôle, ses échanges et un exemple concret.", inside: "Détails", cycle: "Cycle d'instruction", cycleHint: "étapes simplifiées", connected: "Connecté à", note: "À retenir", role: "Rôle", comm: "Communication", example: "Exemple" },
  board: { cpuSub: "CALCUL / CONTRÔLE", ramSub: "MÉMOIRE VIVE", gpuSub: "RENDU PARALLÈLE", storageSub: "SSD · HDD", boardSub: "CHIPSET · BUS", powerSub: "12 V · 5 V · 3,3 V", ioSub: "USB · AUDIO · RÉSEAU", ioLabel: "Entrées / sorties" }
};
fr.binaryLab = {
  title: "Langage binaire", status: "Interactif",
  intro: { bits: "Les ordinateurs représentent les informations avec des 0 et des 1. Testez les conversions et l'encodage." },
  tabs: { switches: "Bits", dec2bin: "Décimal → binaire", bin2dec: "Binaire → décimal", text: "Texte", journey: "Circulation" },
  facts: { bit: { t: "Bit", b: fr.binaire.facts[0].b }, byte: { t: "Octet", b: fr.binaire.facts[1].b }, ascii: { t: "ASCII", b: fr.binaire.facts[2].b }, unicode: { t: "Unicode", b: fr.binaire.facts[3].b }, utf8: { t: "UTF-8", b: "UTF-8 encode les caractères Unicode en un ou plusieurs octets." } },
  switches: { title: fr.binaire.switches.title, lead: fr.binaire.switches.lead, example: fr.binaire.switches.example },
  dec2bin: { title: fr.binaire.dec2bin.title, lead: fr.binaire.dec2bin.lead, input: fr.binaire.dec2bin.input, convert: fr.binaire.dec2bin.convert, result: fr.binaire.dec2bin.result, steps: fr.binaire.dec2bin.steps, nonneg: fr.binaire.dec2bin.nonneg, range: fr.binaire.dec2bin.range },
  bin2dec: { title: fr.binaire.bin2dec.title, lead: fr.binaire.bin2dec.lead, input: fr.binaire.bin2dec.input, convert: fr.binaire.bin2dec.convert, result: fr.binaire.bin2dec.result, empty: fr.binaire.bin2dec.empty, invalid: fr.binaire.bin2dec.invalid, length: fr.binaire.bin2dec.length },
  textlab: { title: fr.binaire.text.title, lead: fr.binaire.text.lead, input: fr.binaire.text.input, sample: "Exemples", note: fr.binaire.text.note, char: fr.binaire.text.char, code: fr.binaire.text.code, utf8: "UTF-8", bytes: "octets", binary: fr.binaire.text.bin },
  journeyLead: "Suivez le trajet d'une donnée dans l'ordinateur."
};
fr.followData = {
  title: "Circulation des données", caveat: fr.circulation.caveat,
  controls: { play: "Lancer", pause: "Pause", next: "Étape suivante", previous: "Précédent", restart: "Recommencer", speed: "Vitesse", progress: "Progression", step: "Étape" },
  diagram: { keyboard: "Clavier", processing: "Encodage / Mémoire", graphics: "Affichage", monitor: "Écran", signal: "Le trajet de la touche A." },
  steps: {
    "0": { label: fr.circulation.steps[0].label, title: fr.circulation.steps[0].title, body: fr.circulation.steps[0].body, detail: fr.circulation.steps[0].detail },
    "1": { label: fr.circulation.steps[1].label, title: fr.circulation.steps[1].title, body: fr.circulation.steps[1].body, detail: fr.circulation.steps[1].detail },
    "2": { label: fr.circulation.steps[2].label, title: fr.circulation.steps[2].title, body: fr.circulation.steps[2].body, detail: fr.circulation.steps[2].detail },
    "3": { label: fr.circulation.steps[3].label, title: fr.circulation.steps[3].title, body: fr.circulation.steps[3].body, detail: fr.circulation.steps[3].detail },
    "4": { label: fr.circulation.steps[4].label, title: fr.circulation.steps[4].title, body: fr.circulation.steps[4].body, detail: fr.circulation.steps[4].detail }
  }
};
fr.pixelLab = {
  status: "Interactif", eyebrow: fr.images.eyebrow, title: fr.images.title, lead: fr.images.lead,
  concepts: { title: "Notions clés", pixel: { t: "Pixel", b: fr.images.facts[0].b }, resolution: { t: "Résolution", b: fr.images.facts[1].b }, rgb: { t: "RGB", b: fr.images.facts[2].b }, channels: { t: "Canaux", b: "Rouge, Vert, Bleu composent la couleur d'un pixel." }, bitdepth: { t: "Profondeur", b: fr.images.facts[3].b }, formats: { t: "Formats", b: fr.images.facts[4].b }, compression: { t: "Compression", b: fr.images.facts[5].b } },
  grid: { title: fr.images.lab.title, lead: fr.images.lab.lead, color: fr.images.lab.color, toolPaint: fr.images.lab.paint, toolErase: fr.images.lab.erase, clear: fr.images.lab.clear, zoom: fr.images.lab.zoom, selected: fr.images.lab.selected, none: fr.images.lab.none, pos: fr.images.lab.pos, rgb: fr.images.lab.rgb, hex: fr.images.lab.hex, binary: fr.images.lab.channels },
  res: { title: fr.images.res.title, lead: fr.images.res.lead, compareLabel: "Comparer", note: fr.images.res.note },
  calc: { title: "Taille d'une image (non compressée)", lead: "Estimation simple : largeur × hauteur × 3 octets (RGB 24 bits).", width: "Largeur (px)", height: "Hauteur (px)", formula: "Formule", bytes: "Octets" },
  formats: { title: "Formats et compression", png: { t: "PNG", b: "Compression sans perte, adapté aux graphiques." }, jpeg: { t: "JPEG", b: "Compression avec perte, efficace pour les photos." }, svg: { t: "SVG", b: "Image vectorielle décrite par des formes." }, webp: { t: "WebP", b: "Format moderne, avec ou sans perte." }, raw: { t: "Données brutes", b: "Très volumineuses, proches des pixels non compressés." } },
  upload: { title: "Observer une image", lead: "Chargez une image locale pour l'inspecter (traitement dans votre navigateur).", pick: "Choisir une image", note: "Aucun envoi réseau : le fichier reste sur votre appareil." }
};
fr.videoLab = {
  status: "Interactif", eyebrow: fr.video.eyebrow, title: fr.video.title, lead: fr.video.lead,
  concepts: { title: "Notions clés", frames: { t: "Images", b: fr.video.facts[0].b }, fps: { t: "FPS", b: fr.video.facts[1].b }, resolution: { t: "Résolution", b: fr.video.facts[2].b }, codecs: { t: "Codecs", b: fr.video.facts[4].b }, compression: { t: "Compression", b: fr.video.facts[3].b }, audio: { t: "Audio", b: "Le son est synchronisé avec les images." }, containers: { t: "Conteneur", b: "Le fichier vidéo regroupe vidéo, audio et métadonnées." } },
  sim: { title: fr.video.sim.title, lead: fr.video.sim.lead, fps: fr.video.sim.fps, resolution: fr.video.sim.resolution, duration: fr.video.sim.duration, play: fr.video.sim.play, pause: fr.video.sim.pause, restart: fr.video.sim.restart, frame: fr.video.sim.frame, fpsOut: "FPS", resOut: "Résolution", total: fr.video.sim.total, note: fr.video.sim.note },
  compare: { title: "Comparer la fluidité", low: "Moins d'images/s", high: "Plus d'images/s", body: "La différence vient du nombre d'images affichées chaque seconde." },
  calc: { title: "Taille estimée (débit)", lead: "Estimation simplifiée : taille = débit × durée.", bitrate: "Débit (Mbit/s)", duration: "Durée (s)", formula: (v)=>`Débit ${v.br} Mbit/s × ${v.dur} s = ${v.bits} bits ≈ ${v.mb} Mo (décimal) / ${v.mib} Mio (binaire)`, bits: "Bits", mb: "Taille" },
  pipe: { title: "Du codage à l'affichage", frames: "Images", encoding: "Encodage", compressed: "Compressé", decoding: "Décodage", screen: "Écran", body: "Les images sont encodées/compressées, stockées ou transmises, puis décodées avant affichage." }
};
fr.modules = {
  quiz: {
    title: "Quiz interactif", placeholderTitle: "Quiz interactif", lead: fr.synthese.quiz.intro, placeholderBody: fr.synthese.quiz.intro,
    eyebrow: "ÉVALUATION DES CONNAISSANCES", resultEyebrow: "BILAN DE VOTRE PARCOURS",
    questionCount: "Questions", instantFeedback: "✓", feedbackLabel: "Correction immédiate",
    noTimer: "∞", timeLabel: "À votre rythme", questionLabel: "QUESTION",
    progressLabel: "Progression du quiz",
    levelGreat: "Très bonne maîtrise des notions", levelMid: "Bonne base, quelques notions à consolider",
    levelLow: "Continuez à vous entraîner : chaque étape compte",
    start: fr.synthese.quiz.start, next: fr.synthese.quiz.next, finish: fr.synthese.quiz.finish, restart: fr.synthese.quiz.restart,
    score: fr.synthese.quiz.score, correct: fr.synthese.quiz.correct, incorrect: fr.synthese.quiz.incorrect,
    progress: fr.synthese.quiz.progress, completeTitle: fr.synthese.quiz.completeTitle,
    completeBody: "Vous avez répondu correctement à {score} question(s) sur {total}.",
    choose: fr.synthese.quiz.choose, scope: ["Composants et circulation des données", "Binaire, images et vidéo", "Compréhension globale du parcours"],
    missions: [fr.synthese.quiz.review], questions: fr.synthese.quiz.questions
  }
};
fr.binary = fr.binaire; fr.image = fr.images;

const listeners = new Set();
function lookup(obj, key) { return String(key || '').split('.').reduce((n, s) => (n && typeof n === 'object' ? n[s] : undefined), obj); }
fr.computer.parts.cpu.parts = {
  control: { name: "Unité de contrôle", desc: "Dirige le déroulement des instructions et coordonne les autres éléments." },
  alu: { name: "UAL (unité arithmétique et logique)", desc: "Effectue les calculs et les comparaisons logiques." },
  registers: { name: "Registres", desc: "Très petites mémoires ultra-rapides qui contiennent les données en cours de traitement." }
};

export function t(key, values = {}) {
  let v = lookup(fr, key);
  if (v === undefined && key && !String(key).startsWith('modules.')) v = lookup(fr, 'modules.' + key);
  if (v === undefined) return key;
  if (typeof v === 'function') return v(values || {});
  if (typeof v !== 'string') return v;
  return v.replace(/\{(\w+)\}/g, (_, k) => (values && values[k] != null ? values[k] : `{${k}}`));
}
export function applyTranslations(root = document) {
  if (!root || !root.querySelectorAll) return;
  root.querySelectorAll('[data-i18n]').forEach((el) => { const v = t(el.dataset.i18n); if (typeof v === 'string') el.textContent = v; });
  root.querySelectorAll('[data-i18n-aria-label]').forEach((el) => { const v = t(el.dataset.i18nAriaLabel); if (typeof v === 'string') el.setAttribute('aria-label', v); });
  root.querySelectorAll('[data-i18n-title]').forEach((el) => { const v = t(el.dataset.i18nTitle); if (typeof v === 'string') el.setAttribute('title', v); });
  root.querySelectorAll('[data-i18n-placeholder]').forEach((el) => { const v = t(el.dataset.i18nPlaceholder); if (typeof v === 'string') el.setAttribute('placeholder', v); });
  root.querySelectorAll('[data-i18n-content]').forEach((el) => { const v = t(el.dataset.i18nContent); if (typeof v === 'string') el.setAttribute('content', v); });
  const view = document.body && document.body.dataset ? document.body.dataset.view : null;
  if (!view || view === 'home') document.title = t('meta.title');
}
export function initTranslations() { document.documentElement.lang = 'fr'; document.documentElement.dir = 'ltr'; if (document.documentElement.dataset) document.documentElement.dataset.lang = 'fr'; applyTranslations(); return 'fr'; }
export function getLanguage() { return 'fr'; }
export function setLanguage() { if (typeof document !== 'undefined') { document.documentElement.lang = 'fr'; document.documentElement.dir = 'ltr'; } applyTranslations(); listeners.forEach((fn) => { try { fn('fr'); } catch (e) {} }); return 'fr'; }
export function onLanguageChange(fn) { listeners.add(fn); return () => listeners.delete(fn); }
export function getSupportedLanguages() { return ['fr']; }
export function dirFor() { return 'ltr'; }

fr.binaryLab.dec2bin.label = fr.binaire.dec2bin.input;
fr.binaryLab.dec2bin.hint = fr.binaire.dec2bin.error;
fr.binaryLab.dec2bin.error = fr.binaire.dec2bin.error;
fr.binaryLab.dec2bin.padded = "Représentation sur 8 bits";
fr.binaryLab.dec2bin.readUp = "Lecture des restes";
fr.binaryLab.dec2bin.remainder = "reste";
fr.binaryLab.dec2bin.stepsTitle = fr.binaire.dec2bin.steps;
fr.binaryLab.bin2dec.label = fr.binaire.bin2dec.input;
fr.binaryLab.bin2dec.hint = fr.binaire.bin2dec.invalid;
fr.binaryLab.text = { title: fr.binaire.text.title, lead: fr.binaire.text.lead, label: fr.binaire.text.input, placeholder: "Ex. : A, Bonjour", noteTitle: "À noter", note: fr.binaire.text.note, empty: fr.binaire.text.empty, col: { char: fr.binaire.text.char, cp: fr.binaire.text.code, enc: "Type", bytes: "Octets", bin: fr.binaire.text.bin } };
fr.binaryLab.text.byteCount = "{n} octet(s)";
fr.pixelLab.grid.selected = "Pixel sélectionné";
fr.pixelLab.calc.kb = "Kio"; fr.pixelLab.calc.mb = "Mio"; fr.pixelLab.calc.note = "Estimation sans compression (RGB 24 bits).";
fr.pixelLab.upload = { title: "Observer une image", lead: "Chargez une image locale pour inspecter des pixels échantillonnés.", pick: "Choisir une image", file: "Fichier", dims: "Dimensions", sample: "Échantillon", none: "Aucune image chargée.", tip: "Le traitement reste dans votre navigateur." };
fr.videoLab.sim.framesTotal = "Images totales"; fr.videoLab.sim.counter = "Compteur d'images";
fr.videoLab.calc.note = "Estimation simplifiée à partir du débit.";
fr.videoLab.comp = { title: "Comparer la fluidité", low: { t: "Peu d'images/s", b: fr.video.sim.noteLow }, high: { t: "Plus d'images/s", b: fr.video.sim.noteHigh } };
Object.assign(fr.videoLab.comp, {
  intra: { t: "Compression intra-image", b: "Chaque image est compressée seule, comme une image fixe, en supprimant les détails peu visibles." },
  inter: { t: "Compression inter-images", b: "On ne mémorise que ce qui change d'une image à l'autre, car beaucoup de zones restent identiques." },
  key: { t: "Images clés", b: "Une image complète est enregistrée régulièrement ; les suivantes décrivent seulement les différences." },
  motion: { t: "Estimation du mouvement", b: "Le codeur repère les zones qui se déplacent et les décrit par un vecteur au lieu de les stocker à nouveau." }
});
fr.videoLab.pipe.cap = "Les images sont encodées, compressées, puis décodées pour l'affichage.";

export const translations = { fr };
