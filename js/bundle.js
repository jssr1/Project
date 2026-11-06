(()=>{var Tt=Object.defineProperty;var z=(e,t,a)=>()=>{if(a)throw a[0];try{return e&&(t=e(e=0)),t}catch(s){throw a=[s],s}};var O=(e,t)=>{for(var a in t)Tt(e,a,{get:t[a],enumerable:!0})};function ke(e,t){return String(t||"").split(".").reduce((a,s)=>a&&typeof a=="object"?a[s]:void 0,e)}function n(e,t={}){let a=ke(i,e);return a===void 0&&e&&!String(e).startsWith("modules.")&&(a=ke(i,"modules."+e)),a===void 0?e:typeof a=="function"?a(t||{}):typeof a!="string"?a:a.replace(/\{(\w+)\}/g,(s,r)=>t&&t[r]!=null?t[r]:`{${r}}`)}function x(e=document){if(!e||!e.querySelectorAll)return;e.querySelectorAll("[data-i18n]").forEach(a=>{let s=n(a.dataset.i18n);typeof s=="string"&&(a.textContent=s)}),e.querySelectorAll("[data-i18n-aria-label]").forEach(a=>{let s=n(a.dataset.i18nAriaLabel);typeof s=="string"&&a.setAttribute("aria-label",s)}),e.querySelectorAll("[data-i18n-title]").forEach(a=>{let s=n(a.dataset.i18nTitle);typeof s=="string"&&a.setAttribute("title",s)}),e.querySelectorAll("[data-i18n-placeholder]").forEach(a=>{let s=n(a.dataset.i18nPlaceholder);typeof s=="string"&&a.setAttribute("placeholder",s)}),e.querySelectorAll("[data-i18n-content]").forEach(a=>{let s=n(a.dataset.i18nContent);typeof s=="string"&&a.setAttribute("content",s)});let t=document.body&&document.body.dataset?document.body.dataset.view:null;(!t||t==="home")&&(document.title=n("meta.title"))}function Te(){return document.documentElement.lang="fr",document.documentElement.dir="ltr",document.documentElement.dataset&&(document.documentElement.dataset.lang="fr"),x(),"fr"}function q(e){return Ce.add(e),()=>Ce.delete(e)}var i,Ce,k=z(()=>{i={meta:{title:"Inside the Computer \u2014 Comprendre le fonctionnement d'un ordinateur",description:"Parcours interactif en fran\xE7ais pour comprendre les composants, les donn\xE9es, le binaire, les images et la vid\xE9o."},a11y:{skip:"Aller au contenu",nav:"Navigation principale",openMenu:"Ouvrir le menu",closeMenu:"Fermer le menu"},brand:{name:"Inside the Computer",tagline:"Laboratoire num\xE9rique interactif"},nav:{home:"Accueil",decouvrir:"D\xE9couvrir",circulation:"Circulation",binaire:"Binaire",images:"Images",video:"Vid\xE9o",synthese:"Synth\xE9se"},common:{next:"Section suivante",back:"Retour",previous:"Pr\xE9c\xE9dent",play:"Lecture",pause:"Pause",restart:"Recommencer",reset:"R\xE9initialiser",step:"\xC9tape",interactive:"Interactif",explore:"Explorer",select:"S\xE9lectionner"},home:{kicker:"Projet universitaire \u2014 Parcours d'apprentissage",title:"Comprendre le fonctionnement d'un ordinateur",lead:"Explorez les composants, suivez le trajet des donn\xE9es, manipulez le binaire, composez des pixels et observez comment les images deviennent une vid\xE9o.",ctaStart:"Commencer le parcours",ctaFlow:"Suivre une donn\xE9e"},decouvrir:{eyebrow:"Section 1",title:"D\xE9couvrir l'ordinateur",lead:"Un ordinateur combine plusieurs composants sp\xE9cialis\xE9s. S\xE9lectionnez un composant pour comprendre son r\xF4le, ses \xE9changes et un exemple concret.",status:"Interactif",hint:"Survolez ou s\xE9lectionnez un composant pour afficher son r\xF4le.",labels:{role:"R\xF4le",comm:"Communication",example:"Exemple",note:"\xC0 retenir"},parts:{cpu:{name:"Processeur (CPU)",chip:"Calcul",tagline:"Le centre de calcul qui ex\xE9cute les instructions.",role:"Le CPU lit, d\xE9code et ex\xE9cute les instructions des programmes. Il effectue les calculs et prend les d\xE9cisions logiques.",comm:"Il \xE9change rapidement des donn\xE9es avec la RAM, coordonne les p\xE9riph\xE9riques via la carte m\xE8re et envoie du travail au GPU si n\xE9cessaire.",example:"Quand vous ouvrez un document, le CPU ex\xE9cute les instructions du logiciel pour afficher le contenu et r\xE9agir \xE0 vos actions."},ram:{name:"M\xE9moire vive (RAM)",chip:"Temporaire",tagline:"La m\xE9moire de travail rapide de l'ordinateur.",role:"La RAM conserve temporairement les donn\xE9es et instructions utilis\xE9es au moment pr\xE9sent.",comm:"Elle sert de zone d'\xE9change rapide entre le CPU, les programmes et les fichiers charg\xE9s depuis le stockage.",example:"Une page web ouverte ou une vid\xE9o en cours de lecture utilise la RAM pour un acc\xE8s rapide.",note:"La RAM est volatile : son contenu dispara\xEEt en g\xE9n\xE9ral lorsque l'ordinateur s'\xE9teint."},gpu:{name:"Carte graphique (GPU)",chip:"Affichage",tagline:"Le composant sp\xE9cialis\xE9 dans le calcul visuel.",role:"Le GPU traite en parall\xE8le de nombreuses op\xE9rations li\xE9es aux images, \xE0 la vid\xE9o et \xE0 l'affichage.",comm:"Il re\xE7oit des donn\xE9es pr\xE9par\xE9es par le CPU et la RAM, produit des images, puis envoie le r\xE9sultat vers l'\xE9cran.",example:"Lors de la lecture d'une vid\xE9o, le GPU aide \xE0 pr\xE9parer et afficher les images."},storage:{name:"Stockage (SSD/HDD)",chip:"Durable",tagline:"La m\xE9moire qui conserve les donn\xE9es dans le temps.",role:"Le stockage garde le syst\xE8me, les applications et les fichiers m\xEAme lorsque l'ordinateur est \xE9teint.",comm:"Les donn\xE9es sont lues depuis le stockage puis charg\xE9es en RAM avant d'\xEAtre trait\xE9es par le CPU.",example:"Vos documents et le syst\xE8me d'exploitation sont enregistr\xE9s sur un SSD ou un disque dur.",note:"Un SSD est g\xE9n\xE9ralement plus rapide qu'un disque dur m\xE9canique (HDD)."},motherboard:{name:"Carte m\xE8re",chip:"Connexion",tagline:"La plateforme qui relie tous les composants.",role:"La carte m\xE8re connecte les composants et permet leur alimentation et leurs \xE9changes de signaux.",comm:"Elle transporte les donn\xE9es entre CPU, RAM, GPU, stockage et p\xE9riph\xE9riques gr\xE2ce \xE0 des bus et des ports.",example:"Quand vous branchez un clavier ou un \xE9cran, la carte m\xE8re participe \xE0 la transmission des informations."},io:{name:"P\xE9riph\xE9riques d'entr\xE9e et de sortie",chip:"Interaction",tagline:"Les interfaces entre l'utilisateur et la machine.",role:"Les p\xE9riph\xE9riques d'entr\xE9e envoient des informations \xE0 l'ordinateur. Les p\xE9riph\xE9riques de sortie pr\xE9sentent les r\xE9sultats.",comm:"Ils communiquent avec le syst\xE8me via la carte m\xE8re et les contr\xF4leurs associ\xE9s.",example:"Entr\xE9e : clavier, souris, microphone. Sortie : \xE9cran, haut-parleurs, imprimante."}}},circulation:{eyebrow:"Section 2",title:"Comment circulent les donn\xE9es ?",lead:"Exemple : un \xE9tudiant appuie sur la touche A. Suivez les \xE9tapes, de la saisie \xE0 l'affichage.",status:"Interactif",caveat:"Mod\xE8le p\xE9dagogique simplifi\xE9 : le trajet r\xE9el peut varier selon le mat\xE9riel et le logiciel.",controls:{play:"Lancer",pause:"Pause",next:"\xC9tape suivante",prev:"Pr\xE9c\xE9dent",restart:"Recommencer",step:"\xC9tape"},nodes:{keyboard:"Clavier",encode:"Encodage",ram:"RAM",cpu:"CPU",display:"Affichage",screen:"\xC9cran"},steps:[{label:"Saisie",title:"La touche A est d\xE9tect\xE9e",body:"Le clavier d\xE9tecte l'appui sur la touche A et envoie un signal num\xE9rique au syst\xE8me.",detail:"Entr\xE9e : touche A"},{label:"Repr\xE9sentation num\xE9rique",title:"Le caract\xE8re est encod\xE9",body:"Le caract\xE8re A est repr\xE9sent\xE9 par un code. En ASCII, A correspond \xE0 65, soit 01000001 en binaire sur 1 octet.",detail:"A \u2192 ASCII 65 \u2192 01000001"},{label:"M\xE9moire",title:"La donn\xE9e est plac\xE9e en RAM",body:"La valeur encod\xE9e est stock\xE9e temporairement en RAM pour que les programmes puissent y acc\xE9der rapidement.",detail:"01000001 en m\xE9moire vive"},{label:"Traitement",title:"Le CPU traite l'information",body:"Le processeur ex\xE9cute les instructions du programme : il lit la donn\xE9e, la traite et pr\xE9pare le r\xE9sultat \xE0 afficher.",detail:"Traitement par le CPU"},{label:"Affichage",title:"Le r\xE9sultat appara\xEEt \xE0 l'\xE9cran",body:"Le syst\xE8me graphique transforme l'information en pixels. L'\xE9cran affiche alors la lettre A.",detail:"Pixels ? \xE9cran : A"}]},binaire:{eyebrow:"Section 3",title:"Le langage binaire",lead:"Les ordinateurs repr\xE9sentent l'information avec des 0 et des 1. Manipulez des bits, convertissez des nombres et observez l'encodage des caract\xE8res.",status:"Interactif",tabs:{switches:"Bits",dec2bin:"D\xE9cimal \u2192 binaire",bin2dec:"Binaire \u2192 d\xE9cimal",text:"Texte"},facts:[{t:"Bit",b:"Un bit vaut 0 ou 1 : la plus petite unit\xE9 d'information."},{t:"Octet",b:"Un octet regroupe 8 bits. Il peut repr\xE9senter 256 valeurs (0 \xE0 255)."},{t:"ASCII",b:"ASCII associe certains caract\xE8res \xE0 des codes, par exemple A = 65."},{t:"Unicode",b:"Unicode repr\xE9sente un tr\xE8s grand nombre de caract\xE8res (lettres, symboles, emoji)."}],switches:{title:"Interrupteurs binaires",lead:"Activez les bits pour composer un octet et lire sa valeur d\xE9cimale.",decimal:"Valeur d\xE9cimale",byte:"Octet (8 bits)",sum:"Calcul",example:"Exemple"},dec2bin:{title:"Convertisseur d\xE9cimal \u2192 binaire",lead:"Entrez un nombre entre 0 et 255 pour obtenir sa repr\xE9sentation binaire sur 8 bits.",input:"Nombre d\xE9cimal (0\u2013255)",convert:"Convertir",result:"R\xE9sultat binaire",steps:"\xE9tapes (divisions par 2)",error:"Entrez un entier entre 0 et 255.",nonneg:"Entrez un entier positif ou nul.",range:"Utilisez une valeur entre 0 et 255 pour un octet."},bin2dec:{title:"Convertisseur binaire \u2192 d\xE9cimal",lead:"Entrez un nombre binaire (compos\xE9 de 0 et de 1) pour obtenir sa valeur d\xE9cimale.",input:"Nombre binaire",convert:"Convertir",result:"R\xE9sultat d\xE9cimal",empty:"Entrez un nombre binaire.",invalid:"Utilisez uniquement 0 et 1.",length:"Nombre trop long (16 bits max)."},text:{title:"Encodage de texte (ASCII / Unicode)",lead:"Saisissez un caract\xE8re ou un mot pour voir les codes associ\xE9s.",input:"Texte",empty:"Saisissez du texte pour afficher son encodage.",char:"Caract\xE8re",code:"Code",hex:"Hexad\xE9cimal",bin:"Binaire (UTF-8)",note:"Les caract\xE8res accentu\xE9s ou les emoji peuvent utiliser plusieurs octets en UTF-8."}},images:{eyebrow:"Section 4",title:"Comment une image est-elle affich\xE9e ?",lead:"Une image num\xE9rique est une grille de pixels. Chaque pixel poss\xE8de une couleur, souvent d\xE9crite en RGB (Rouge, Vert, Bleu).",status:"Interactif",facts:[{t:"Pixel",b:"Plus petit \xE9l\xE9ment d'une image num\xE9rique."},{t:"R\xE9solution",b:"Nombre de pixels en largeur \xD7 hauteur."},{t:"RGB",b:"Couleur form\xE9e par Rouge, Vert, Bleu (valeurs 0\u2013255)."},{t:"Profondeur",b:"Nombre de bits utilis\xE9s pour coder la couleur."},{t:"Formats",b:"PNG, JPEG, WebP : choix selon qualit\xE9, transparence et taille."},{t:"Compression",b:"R\xE9duit la taille du fichier, avec ou sans perte d'information."}],lab:{title:"Laboratoire de pixels",lead:"Cliquez ou glissez sur la grille pour dessiner. Chaque case est un pixel.",color:"Couleur",paint:"Peindre",erase:"Effacer",clear:"Effacer la grille",grid:"Grille",zoom:"Zoom",selected:"Pixel s\xE9lectionn\xE9",none:"S\xE9lectionnez un pixel pour voir ses valeurs.",pos:"Position",rgb:"RGB",hex:"Hexad\xE9cimal",channels:"Canaux (binaire 8 bits)"},res:{title:"R\xE9solution et d\xE9tail",lead:"La m\xEAme forme para\xEEt plus d\xE9taill\xE9e avec davantage de pixels.",low:"Moins de pixels",high:"Plus de pixels",note:"Plus de pixels permettent de repr\xE9senter plus de d\xE9tails."}},video:{eyebrow:"Section 5",title:"Comment fonctionne une vid\xE9o ?",lead:"Une vid\xE9o affiche une succession rapide d'images. Les FPS, la r\xE9solution, les codecs et le d\xE9codage d\xE9terminent la fluidit\xE9 et la taille.",status:"Interactif",facts:[{t:"Images successives",b:"Une vid\xE9o est une suite d'images fixes affich\xE9es rapidement."},{t:"FPS",b:"Images par seconde : influence la fluidit\xE9 du mouvement."},{t:"R\xE9solution",b:"Dimensions de chaque image (largeur \xD7 hauteur)."},{t:"Compression",b:"R\xE9duit les donn\xE9es en exploitant les ressemblances entre images."},{t:"Codec",b:"M\xE9thode de codage/d\xE9codage (ex. H.264, AV1)."},{t:"D\xE9codage",b:"Le syst\xE8me reconstruit les images compress\xE9es pour les afficher."}],sim:{title:"Simulateur FPS",lead:"Faites varier les images par seconde pour observer la fluidit\xE9 du mouvement.",fps:"Images par seconde (FPS)",play:"Lire",pause:"Pause",restart:"Recommencer",frame:"Image",total:"Images totales",note:"Un FPS plus \xE9lev\xE9 donne g\xE9n\xE9ralement un mouvement plus fluide.",noteLow:"Avec peu d'images par seconde, le mouvement para\xEEt saccad\xE9.",noteHigh:"Avec davantage d'images par seconde, le mouvement para\xEEt plus fluide.",resolution:"R\xE9solution",duration:"Dur\xE9e"}},synthese:{eyebrow:"Section 6",title:"R\xE9capitulatif et quiz",lead:"Revoyez les notions essentielles, puis v\xE9rifiez votre compr\xE9hension avec un quiz interactif.",status:"Interactif",recapTitle:"Ce qu'il faut retenir",recap:["Le CPU traite les instructions, la RAM stocke temporairement, le GPU aide \xE0 l'affichage, le stockage conserve les donn\xE9es, et la carte m\xE8re relie l'ensemble.","Une action comme appuyer sur A devient une donn\xE9e num\xE9rique, passe par la m\xE9moire et le traitement, puis produit un affichage.","Le binaire utilise des bits (0/1). Un octet contient 8 bits. ASCII et Unicode encodent les caract\xE8res.","Une image est form\xE9e de pixels ; la r\xE9solution, le RGB et la profondeur de couleur influencent son rendu et sa taille.","Une vid\xE9o est une s\xE9quence d'images. Les FPS influencent la fluidit\xE9 ; codecs et compression r\xE9duisent les donn\xE9es."],quiz:{title:"Quiz interactif",intro:"R\xE9pondez aux questions pour v\xE9rifier votre compr\xE9hension. Aucun chronom\xE9tre : prenez le temps de r\xE9fl\xE9chir.",start:"Commencer le quiz",next:"Question suivante",finish:"Voir le r\xE9sultat",restart:"Recommencer",score:"Score",correct:"Bonne r\xE9ponse",incorrect:"R\xE9ponse \xE0 revoir",progress:"Question {current} sur {total}",result:"Vous avez obtenu {score} sur {total}.",choose:"Choisir une r\xE9ponse",completeTitle:"Quiz termin\xE9",review:"Conseil : revenez aux sections concern\xE9es pour consolider les notions.",questions:[{q:"Quel composant ex\xE9cute les instructions d'un programme ?",options:["Le CPU","Le SSD","L'\xE9cran","Le clavier"],a:0,why:"Le CPU (processeur) lit et ex\xE9cute les instructions."},{q:"Quel est le r\xF4le principal de la RAM ?",options:["Stocker durablement les fichiers","Conserver temporairement les donn\xE9es en cours d'utilisation","Afficher les pixels","Alimenter l'ordinateur"],a:1,why:"La RAM est une m\xE9moire de travail rapide et temporaire."},{q:"Combien de bits contient un octet ?",options:["4","8","16","64"],a:1,why:"Un octet regroupe 8 bits."},{q:"En ASCII, la lettre A correspond \xE0 quelle valeur d\xE9cimale ?",options:["1","10","65","97"],a:2,why:"A majuscule correspond au code ASCII 65 (01000001 en binaire)."},{q:"De quoi est compos\xE9e une image num\xE9rique ?",options:["De pistes audio","De pixels","De paquets r\xE9seau uniquement","De secteurs m\xE9caniques"],a:1,why:"Une image num\xE9rique est une grille de pixels."},{q:"Que signifie FPS dans une vid\xE9o ?",options:["Fichiers par seconde","Images par seconde","Pixels fixes standard","Fr\xE9quence de stockage"],a:1,why:"FPS indique le nombre d'images affich\xE9es chaque seconde."},{q:"Quel \xE9l\xE9ment relie principalement les composants entre eux ?",options:["La carte m\xE8re","Le haut-parleur","Le fichier JPEG","Le codec seul"],a:0,why:"La carte m\xE8re connecte les composants et permet leurs \xE9changes."}]}},footer:{line:"Inside the Computer \u2014 parcours interactif sur le fonctionnement d'un ordinateur.",note:"Projet \xE9ducatif en HTML, CSS et JavaScript."},noscript:{title:"JavaScript est requis.",body:"Ce parcours utilise JavaScript pour la navigation et les activit\xE9s interactives."}};i.computer={status:"Interactif",parts:{cpu:{name:i.decouvrir.parts.cpu.name,chip:i.decouvrir.parts.cpu.chip,tagline:i.decouvrir.parts.cpu.tagline,role:i.decouvrir.parts.cpu.role,comm:i.decouvrir.parts.cpu.comm,example:i.decouvrir.parts.cpu.example,cycle:{fetch:{name:"Lecture",body:"Le CPU lit l'instruction suivante depuis la m\xE9moire."},decode:{name:"D\xE9codage",body:"Le CPU interpr\xE9te l'instruction."},execute:{name:"Ex\xE9cution",body:"Le CPU ex\xE9cute l'op\xE9ration demand\xE9e."}}},ram:{name:i.decouvrir.parts.ram.name,chip:i.decouvrir.parts.ram.chip,tagline:i.decouvrir.parts.ram.tagline,role:i.decouvrir.parts.ram.role,comm:i.decouvrir.parts.ram.comm,example:i.decouvrir.parts.ram.example,note:i.decouvrir.parts.ram.note},gpu:{name:i.decouvrir.parts.gpu.name,chip:i.decouvrir.parts.gpu.chip,tagline:i.decouvrir.parts.gpu.tagline,role:i.decouvrir.parts.gpu.role,comm:i.decouvrir.parts.gpu.comm,example:i.decouvrir.parts.gpu.example},storage:{name:i.decouvrir.parts.storage.name,chip:i.decouvrir.parts.storage.chip,tagline:i.decouvrir.parts.storage.tagline,role:i.decouvrir.parts.storage.role,comm:i.decouvrir.parts.storage.comm,example:i.decouvrir.parts.storage.example,note:i.decouvrir.parts.storage.note},motherboard:{name:i.decouvrir.parts.motherboard.name,chip:i.decouvrir.parts.motherboard.chip,tagline:i.decouvrir.parts.motherboard.tagline,role:i.decouvrir.parts.motherboard.role,comm:i.decouvrir.parts.motherboard.comm,example:i.decouvrir.parts.motherboard.example},power:{name:"Alimentation",chip:"\xC9nergie",tagline:"Fournit l'\xE9nergie \xE9lectrique aux composants.",role:"L'alimentation adapte le courant et distribue l'\xE9nergie n\xE9cessaire au fonctionnement de l'ordinateur.",comm:"Elle alimente la carte m\xE8re, qui distribue ensuite l'\xE9nergie aux composants.",example:"Sans alimentation stable, les composants ne peuvent pas fonctionner."},io:{name:i.decouvrir.parts.io.name,chip:i.decouvrir.parts.io.chip,tagline:i.decouvrir.parts.io.tagline,role:i.decouvrir.parts.io.role,comm:i.decouvrir.parts.io.comm,example:i.decouvrir.parts.io.example}},anatomy:{hint:"Survolez ou s\xE9lectionnez un composant sur le sch\xE9ma",count:"7 composants reli\xE9s par des bus de donn\xE9es",components:"Composants de l'ordinateur",panelLabel:"D\xE9tails du composant",idleKicker:"Composants",idleTitle:"S\xE9lectionnez un composant",idleBody:"Cliquez sur un \xE9l\xE9ment du sch\xE9ma pour afficher son r\xF4le, ses \xE9changes et un exemple concret.",inside:"D\xE9tails",cycle:"Cycle d'instruction",cycleHint:"\xE9tapes simplifi\xE9es",connected:"Connect\xE9 \xE0",note:"\xC0 retenir",role:"R\xF4le",comm:"Communication",example:"Exemple"},board:{cpuSub:"CALCUL / CONTR\xD4LE",ramSub:"M\xC9MOIRE VIVE",gpuSub:"RENDU PARALL\xC8LE",storageSub:"SSD \xB7 HDD",boardSub:"CHIPSET \xB7 BUS",powerSub:"12 V \xB7 5 V \xB7 3,3 V",ioSub:"USB \xB7 AUDIO \xB7 R\xC9SEAU",ioLabel:"Entr\xE9es / sorties"}};i.binaryLab={title:"Langage binaire",status:"Interactif",intro:{bits:"Les ordinateurs repr\xE9sentent les informations avec des 0 et des 1. Testez les conversions et l'encodage."},tabs:{switches:"Bits",dec2bin:"D\xE9cimal \u2192 binaire",bin2dec:"Binaire \u2192 d\xE9cimal",text:"Texte",journey:"Circulation"},facts:{bit:{t:"Bit",b:i.binaire.facts[0].b},byte:{t:"Octet",b:i.binaire.facts[1].b},ascii:{t:"ASCII",b:i.binaire.facts[2].b},unicode:{t:"Unicode",b:i.binaire.facts[3].b},utf8:{t:"UTF-8",b:"UTF-8 encode les caract\xE8res Unicode en un ou plusieurs octets."}},switches:{title:i.binaire.switches.title,lead:i.binaire.switches.lead,example:i.binaire.switches.example},dec2bin:{title:i.binaire.dec2bin.title,lead:i.binaire.dec2bin.lead,input:i.binaire.dec2bin.input,convert:i.binaire.dec2bin.convert,result:i.binaire.dec2bin.result,steps:i.binaire.dec2bin.steps,nonneg:i.binaire.dec2bin.nonneg,range:i.binaire.dec2bin.range},bin2dec:{title:i.binaire.bin2dec.title,lead:i.binaire.bin2dec.lead,input:i.binaire.bin2dec.input,convert:i.binaire.bin2dec.convert,result:i.binaire.bin2dec.result,empty:i.binaire.bin2dec.empty,invalid:i.binaire.bin2dec.invalid,length:i.binaire.bin2dec.length},textlab:{title:i.binaire.text.title,lead:i.binaire.text.lead,input:i.binaire.text.input,sample:"Exemples",note:i.binaire.text.note,char:i.binaire.text.char,code:i.binaire.text.code,utf8:"UTF-8",bytes:"octets",binary:i.binaire.text.bin},journeyLead:"Suivez le trajet d'une donn\xE9e dans l'ordinateur."};i.followData={title:"Circulation des donn\xE9es",caveat:i.circulation.caveat,controls:{play:"Lancer",pause:"Pause",next:"\xC9tape suivante",previous:"Pr\xE9c\xE9dent",restart:"Recommencer",speed:"Vitesse",progress:"Progression",step:"\xC9tape"},diagram:{keyboard:"Clavier",processing:"Encodage / M\xE9moire",graphics:"Affichage",monitor:"\xC9cran",signal:"Le trajet de la touche A."},steps:{0:{label:i.circulation.steps[0].label,title:i.circulation.steps[0].title,body:i.circulation.steps[0].body,detail:i.circulation.steps[0].detail},1:{label:i.circulation.steps[1].label,title:i.circulation.steps[1].title,body:i.circulation.steps[1].body,detail:i.circulation.steps[1].detail},2:{label:i.circulation.steps[2].label,title:i.circulation.steps[2].title,body:i.circulation.steps[2].body,detail:i.circulation.steps[2].detail},3:{label:i.circulation.steps[3].label,title:i.circulation.steps[3].title,body:i.circulation.steps[3].body,detail:i.circulation.steps[3].detail},4:{label:i.circulation.steps[4].label,title:i.circulation.steps[4].title,body:i.circulation.steps[4].body,detail:i.circulation.steps[4].detail}}};i.pixelLab={status:"Interactif",eyebrow:i.images.eyebrow,title:i.images.title,lead:i.images.lead,concepts:{title:"Notions cl\xE9s",pixel:{t:"Pixel",b:i.images.facts[0].b},resolution:{t:"R\xE9solution",b:i.images.facts[1].b},rgb:{t:"RGB",b:i.images.facts[2].b},channels:{t:"Canaux",b:"Rouge, Vert, Bleu composent la couleur d'un pixel."},bitdepth:{t:"Profondeur",b:i.images.facts[3].b},formats:{t:"Formats",b:i.images.facts[4].b},compression:{t:"Compression",b:i.images.facts[5].b}},grid:{title:i.images.lab.title,lead:i.images.lab.lead,color:i.images.lab.color,toolPaint:i.images.lab.paint,toolErase:i.images.lab.erase,clear:i.images.lab.clear,zoom:i.images.lab.zoom,selected:i.images.lab.selected,none:i.images.lab.none,pos:i.images.lab.pos,rgb:i.images.lab.rgb,hex:i.images.lab.hex,binary:i.images.lab.channels},res:{title:i.images.res.title,lead:i.images.res.lead,compareLabel:"Comparer",note:i.images.res.note},calc:{title:"Taille d'une image (non compress\xE9e)",lead:"Estimation simple : largeur \xD7 hauteur \xD7 3 octets (RGB 24 bits).",width:"Largeur (px)",height:"Hauteur (px)",formula:"Formule",bytes:"Octets"},formats:{title:"Formats et compression",png:{t:"PNG",b:"Compression sans perte, adapt\xE9 aux graphiques."},jpeg:{t:"JPEG",b:"Compression avec perte, efficace pour les photos."},svg:{t:"SVG",b:"Image vectorielle d\xE9crite par des formes."},webp:{t:"WebP",b:"Format moderne, avec ou sans perte."},raw:{t:"Donn\xE9es brutes",b:"Tr\xE8s volumineuses, proches des pixels non compress\xE9s."}},upload:{title:"Observer une image",lead:"Chargez une image locale pour l'inspecter (traitement dans votre navigateur).",pick:"Choisir une image",note:"Aucun envoi r\xE9seau : le fichier reste sur votre appareil."}};i.videoLab={status:"Interactif",eyebrow:i.video.eyebrow,title:i.video.title,lead:i.video.lead,concepts:{title:"Notions cl\xE9s",frames:{t:"Images",b:i.video.facts[0].b},fps:{t:"FPS",b:i.video.facts[1].b},resolution:{t:"R\xE9solution",b:i.video.facts[2].b},codecs:{t:"Codecs",b:i.video.facts[4].b},compression:{t:"Compression",b:i.video.facts[3].b},audio:{t:"Audio",b:"Le son est synchronis\xE9 avec les images."},containers:{t:"Conteneur",b:"Le fichier vid\xE9o regroupe vid\xE9o, audio et m\xE9tadonn\xE9es."}},sim:{title:i.video.sim.title,lead:i.video.sim.lead,fps:i.video.sim.fps,resolution:i.video.sim.resolution,duration:i.video.sim.duration,play:i.video.sim.play,pause:i.video.sim.pause,restart:i.video.sim.restart,frame:i.video.sim.frame,fpsOut:"FPS",resOut:"R\xE9solution",total:i.video.sim.total,note:i.video.sim.note},compare:{title:"Comparer la fluidit\xE9",low:"Moins d'images/s",high:"Plus d'images/s",body:"La diff\xE9rence vient du nombre d'images affich\xE9es chaque seconde."},calc:{title:"Taille estim\xE9e (d\xE9bit)",lead:"Estimation simplifi\xE9e : taille = d\xE9bit \xD7 dur\xE9e.",bitrate:"D\xE9bit (Mbit/s)",duration:"Dur\xE9e (s)",formula:e=>`D\xE9bit ${e.br} Mbit/s \xD7 ${e.dur} s = ${e.bits} bits \u2248 ${e.mb} Mo (d\xE9cimal) / ${e.mib} Mio (binaire)`,bits:"Bits",mb:"Taille"},pipe:{title:"Du codage \xE0 l'affichage",frames:"Images",encoding:"Encodage",compressed:"Compress\xE9",decoding:"D\xE9codage",screen:"\xC9cran",body:"Les images sont encod\xE9es/compress\xE9es, stock\xE9es ou transmises, puis d\xE9cod\xE9es avant affichage."}};i.modules={quiz:{title:"Quiz interactif",placeholderTitle:"Quiz interactif",lead:i.synthese.quiz.intro,placeholderBody:i.synthese.quiz.intro,start:i.synthese.quiz.start,next:i.synthese.quiz.next,finish:i.synthese.quiz.finish,restart:i.synthese.quiz.restart,score:i.synthese.quiz.score,correct:i.synthese.quiz.correct,incorrect:i.synthese.quiz.incorrect,progress:i.synthese.quiz.progress,completeTitle:i.synthese.quiz.completeTitle,completeBody:"Vous avez r\xE9pondu correctement \xE0 {score} question(s) sur {total}.",choose:i.synthese.quiz.choose,scope:["Composants et circulation des donn\xE9es","Binaire, images et vid\xE9o","Compr\xE9hension globale du parcours"],missions:[i.synthese.quiz.review],questions:i.synthese.quiz.questions}};i.binary=i.binaire;i.image=i.images;Ce=new Set;i.computer.parts.cpu.parts={control:{name:"Unit\xE9 de contr\xF4le",desc:"Dirige le d\xE9roulement des instructions et coordonne les autres \xE9l\xE9ments."},alu:{name:"UAL (unit\xE9 arithm\xE9tique et logique)",desc:"Effectue les calculs et les comparaisons logiques."},registers:{name:"Registres",desc:"Tr\xE8s petites m\xE9moires ultra-rapides qui contiennent les donn\xE9es en cours de traitement."}};i.binaryLab.dec2bin.label=i.binaire.dec2bin.input;i.binaryLab.dec2bin.hint=i.binaire.dec2bin.error;i.binaryLab.dec2bin.error=i.binaire.dec2bin.error;i.binaryLab.dec2bin.padded="Repr\xE9sentation sur 8 bits";i.binaryLab.dec2bin.readUp="Lecture des restes";i.binaryLab.dec2bin.remainder="reste";i.binaryLab.dec2bin.stepsTitle=i.binaire.dec2bin.steps;i.binaryLab.bin2dec.label=i.binaire.bin2dec.input;i.binaryLab.bin2dec.hint=i.binaire.bin2dec.invalid;i.binaryLab.text={title:i.binaire.text.title,lead:i.binaire.text.lead,label:i.binaire.text.input,placeholder:"Ex. : A, Bonjour",noteTitle:"\xC0 noter",note:i.binaire.text.note,empty:i.binaire.text.empty,col:{char:i.binaire.text.char,cp:i.binaire.text.code,enc:"Type",bytes:"Octets",bin:i.binaire.text.bin}};i.binaryLab.text.byteCount="{n} octet(s)";i.pixelLab.grid.selected="Pixel s\xE9lectionn\xE9";i.pixelLab.calc.kb="Kio";i.pixelLab.calc.mb="Mio";i.pixelLab.calc.note="Estimation sans compression (RGB 24 bits).";i.pixelLab.upload={title:"Observer une image",lead:"Chargez une image locale pour inspecter des pixels \xE9chantillonn\xE9s.",pick:"Choisir une image",file:"Fichier",dims:"Dimensions",sample:"\xC9chantillon",none:"Aucune image charg\xE9e.",tip:"Le traitement reste dans votre navigateur."};i.videoLab.sim.framesTotal="Images totales";i.videoLab.sim.counter="Compteur d'images";i.videoLab.calc.note="Estimation simplifi\xE9e \xE0 partir du d\xE9bit.";i.videoLab.comp={title:"Comparer la fluidit\xE9",low:{t:"Peu d'images/s",b:i.video.sim.noteLow},high:{t:"Plus d'images/s",b:i.video.sim.noteHigh}};Object.assign(i.videoLab.comp,{intra:{t:"Compression intra-image",b:"Chaque image est compress\xE9e seule, comme une image fixe, en supprimant les d\xE9tails peu visibles."},inter:{t:"Compression inter-images",b:"On ne m\xE9morise que ce qui change d'une image \xE0 l'autre, car beaucoup de zones restent identiques."},key:{t:"Images cl\xE9s",b:"Une image compl\xE8te est enregistr\xE9e r\xE9guli\xE8rement ; les suivantes d\xE9crivent seulement les diff\xE9rences."},motion:{t:"Estimation du mouvement",b:"Le codeur rep\xE8re les zones qui se d\xE9placent et les d\xE9crit par un vecteur au lieu de les stocker \xE0 nouveau."}});i.videoLab.pipe.cap="Les images sont encod\xE9es, compress\xE9es, puis d\xE9cod\xE9es pour l'affichage."});function Be(){return`
  <svg class="anatomy__svg" viewBox="0 0 1000 640" preserveAspectRatio="xMidYMid meet" focusable="false">
    <defs>
      <linearGradient id="anatomy-board-fill" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="var(--anatomy-board-1)"></stop>
        <stop offset="1" stop-color="var(--anatomy-board-2)"></stop>
      </linearGradient>
      <linearGradient id="anatomy-metal-fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="var(--anatomy-metal-1)"></stop>
        <stop offset="1" stop-color="var(--anatomy-metal-2)"></stop>
      </linearGradient>
      <pattern id="anatomy-grid" width="32" height="32" patternUnits="userSpaceOnUse">
        <path d="M32 0H0V32" class="anatomy__grid-line"></path>
      </pattern>
    </defs>

    <rect class="anatomy__board-bg" x="16" y="16" width="968" height="608" rx="16"></rect>
    <rect class="anatomy__board-grid" x="16" y="16" width="968" height="608" rx="16" fill="url(#anatomy-grid)"></rect>
    <rect class="anatomy__board-edge" x="29" y="29" width="942" height="582" rx="10"></rect>

    <g class="anatomy__mounts" aria-hidden="true">
      <circle cx="48" cy="48" r="7"></circle>
      <circle cx="952" cy="48" r="7"></circle>
      <circle cx="48" cy="592" r="7"></circle>
      <circle cx="952" cy="592" r="7"></circle>
      <path d="M43 48h10M48 43v10M947 48h10M952 43v10M43 592h10M48 587v10M947 592h10M952 587v10"></path>
    </g>

    <g class="anatomy__traces" aria-hidden="true">
      <path d="M122 92H168V128"></path>
      <path d="M376 232H438"></path>
      <path d="M376 300H410V340H432"></path>
      <path d="M410 152V188H430"></path>
      <path d="M634 232H700V300H742"></path>
      <path d="M714 440H742"></path>
      <path d="M598 440H574V476H562"></path>
      <path d="M600 492V552H540"></path>
      <path d="M758 250V278H742"></path>
      <path d="M286 322V344"></path>
      <path d="M630 384V360H660"></path>
    </g>

    <g class="anatomy__caps" aria-hidden="true">
      <circle cx="410" cy="176" r="5"></circle>
      <circle cx="410" cy="198" r="5"></circle>
      <circle cx="410" cy="220" r="5"></circle>
      <circle cx="660" cy="344" r="5"></circle>
      <circle cx="682" cy="344" r="5"></circle>
    </g>

    <text class="anatomy__silkscreen" x="176" y="58">ITC-01 / MAINBOARD</text>
    <text class="anatomy__silkscreen anatomy__silkscreen--end" x="954" y="606" text-anchor="end">REV 02</text>

    <!-- Data links -->
    <g class="anatomy__links" aria-hidden="true">
      <path id="anatomy-link-cpu-ram" class="anatomy__link" data-link data-a="cpu" data-b="ram" data-tone="blue" d="M382 232H462"></path>
      <path id="anatomy-link-cpu-gpu" class="anatomy__link" data-link data-a="cpu" data-b="gpu" data-tone="purple" d="M368 322V394"></path>
      <path id="anatomy-link-cpu-mobo" class="anatomy__link" data-link data-a="cpu" data-b="motherboard" data-tone="cyan" d="M376 310C470 345 560 365 630 384"></path>
      <path id="anatomy-link-mobo-storage" class="anatomy__link" data-link data-a="motherboard" data-b="storage" data-tone="green" d="M714 440H770"></path>
      <path id="anatomy-link-power-mobo" class="anatomy__link" data-link data-a="power" data-b="motherboard" data-tone="amber" d="M758 204C736 280 700 340 690 384"></path>
      <path id="anatomy-link-io-mobo" class="anatomy__link" data-link data-a="io" data-b="motherboard" data-tone="blue" d="M122 362C122 560 500 585 620 530C640 518 650 505 658 492"></path>
      <path id="anatomy-link-gpu-io" class="anatomy__link" data-link data-a="gpu" data-b="io" data-tone="purple" d="M112 452C72 452 72 400 84 362"></path>
    </g>

    <g class="anatomy__particles" data-particle-layer aria-hidden="true"></g>

    <!-- 01 CPU -->
    <g class="anatomy__part" data-part="cpu">
      <rect class="anatomy__hit" x="186" y="132" width="198" height="198" rx="8"></rect>
      <rect class="anatomy__metal" x="194" y="140" width="182" height="182" rx="6"></rect>
      <rect class="anatomy__part-deep" x="206" y="152" width="158" height="158" rx="3"></rect>
      <g class="anatomy__pins">
        <path d="M198 164H188M198 184H188M198 204H188M198 224H188M198 244H188M198 264H188M198 284H188M198 304H188"></path>
        <path d="M372 164H382M372 184H382M372 204H382M372 224H382M372 244H382M372 264H382M372 284H382M372 304H382"></path>
        <path d="M220 144V134M244 144V134M268 144V134M292 144V134M316 144V134M340 144V134M220 318V328M244 318V328M268 318V328M292 318V328M316 318V328M340 318V328"></path>
      </g>
      <rect class="anatomy__die" x="252" y="197" width="66" height="66" rx="2"></rect>
      <path class="anatomy__die-core" d="M262 207h46v46h-46z"></path>
      <rect class="anatomy__fan-ring" x="233" y="179" width="104" height="104" rx="14"></rect>
      <g class="anatomy__fan">
        <path d="M285 208v-18"></path>
        <path d="M285 208v-18" transform="rotate(90 285 231)"></path>
        <path d="M285 208v-18" transform="rotate(180 285 231)"></path>
        <path d="M285 208v-18" transform="rotate(270 285 231)"></path>
      </g>
      <circle class="anatomy__fan-hub" cx="285" cy="231" r="6"></circle>
      <g class="anatomy__badge" transform="translate(194 140)">
        <circle r="10"></circle>
        <text y="3">01</text>
      </g>
      <text class="anatomy__label" x="285" y="358" text-anchor="middle" data-i18n="computer.parts.cpu.name">CPU</text>
      <text class="anatomy__sublabel" x="285" y="372" text-anchor="middle" data-i18n="computer.board.cpuSub">CONTROL \xB7 ALU \xB7 REGISTERS</text>
    </g>

    <!-- 02 RAM -->
    <g class="anatomy__part" data-part="ram">
      <rect class="anatomy__hit" x="448" y="100" width="204" height="264" rx="6"></rect>
      <g class="anatomy__ram-stick">
        <rect class="anatomy__part-base" x="462" y="112" width="34" height="238" rx="3"></rect>
        <rect class="anatomy__part-deep" x="468" y="122" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__part-deep" x="468" y="160" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__part-deep" x="468" y="198" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__part-deep" x="468" y="236" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__contacts" x="466" y="310" width="26" height="26" rx="1"></rect>
        <rect class="anatomy__notch" x="474" y="338" width="10" height="6"></rect>
      </g>
      <g class="anatomy__ram-stick">
        <rect class="anatomy__part-base" x="508" y="112" width="34" height="238" rx="3"></rect>
        <rect class="anatomy__part-deep" x="514" y="122" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__part-deep" x="514" y="160" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__part-deep" x="514" y="198" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__part-deep" x="514" y="236" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__contacts" x="512" y="310" width="26" height="26" rx="1"></rect>
        <rect class="anatomy__notch" x="520" y="338" width="10" height="6"></rect>
      </g>
      <g class="anatomy__ram-stick">
        <rect class="anatomy__part-base" x="554" y="112" width="34" height="238" rx="3"></rect>
        <rect class="anatomy__part-deep" x="560" y="122" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__part-deep" x="560" y="160" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__part-deep" x="560" y="198" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__part-deep" x="560" y="236" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__contacts" x="558" y="310" width="26" height="26" rx="1"></rect>
        <rect class="anatomy__notch" x="566" y="338" width="10" height="6"></rect>
      </g>
      <g class="anatomy__ram-stick">
        <rect class="anatomy__part-base" x="600" y="112" width="34" height="238" rx="3"></rect>
        <rect class="anatomy__part-deep" x="606" y="122" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__part-deep" x="606" y="160" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__part-deep" x="606" y="198" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__part-deep" x="606" y="236" width="22" height="30" rx="1"></rect>
        <rect class="anatomy__contacts" x="604" y="310" width="26" height="26" rx="1"></rect>
        <rect class="anatomy__notch" x="612" y="338" width="10" height="6"></rect>
      </g>
      <g class="anatomy__badge" transform="translate(462 112)">
        <circle r="10"></circle>
        <text y="3">02</text>
      </g>
      <text class="anatomy__label" x="547" y="378" text-anchor="middle" data-i18n="computer.parts.ram.name">RAM</text>
      <text class="anatomy__sublabel" x="547" y="390" text-anchor="middle" data-i18n="computer.board.ramSub">WORKING MEMORY</text>
    </g>

    <!-- 03 GPU -->
    <g class="anatomy__part" data-part="gpu">
      <rect class="anatomy__hit" x="108" y="386" width="462" height="148" rx="6"></rect>
      <rect class="anatomy__metal" x="108" y="390" width="12" height="140" rx="2"></rect>
      <rect class="anatomy__part-base" x="118" y="394" width="444" height="128" rx="4"></rect>
      <rect class="anatomy__part-deep" x="126" y="402" width="428" height="102" rx="3"></rect>
      <rect class="anatomy__pcie" x="126" y="505" width="380" height="9" rx="1"></rect>
      <circle class="anatomy__fan-ring" cx="210" cy="452" r="38"></circle>
      <circle class="anatomy__fan-ring" cx="430" cy="452" r="38"></circle>
      <g class="anatomy__fan anatomy__fan--gpu">
        <path d="M210 420V438"></path>
        <path d="M210 420V438" transform="rotate(60 210 452)"></path>
        <path d="M210 420V438" transform="rotate(120 210 452)"></path>
        <path d="M210 420V438" transform="rotate(180 210 452)"></path>
        <path d="M210 420V438" transform="rotate(240 210 452)"></path>
        <path d="M210 420V438" transform="rotate(300 210 452)"></path>
        <path d="M430 420V438"></path>
        <path d="M430 420V438" transform="rotate(60 430 452)"></path>
        <path d="M430 420V438" transform="rotate(120 430 452)"></path>
        <path d="M430 420V438" transform="rotate(180 430 452)"></path>
        <path d="M430 420V438" transform="rotate(240 430 452)"></path>
        <path d="M430 420V438" transform="rotate(300 430 452)"></path>
      </g>
      <circle class="anatomy__fan-hub" cx="210" cy="452" r="5"></circle>
      <circle class="anatomy__fan-hub" cx="430" cy="452" r="5"></circle>
      <g class="anatomy__badge" transform="translate(126 402)">
        <circle r="10"></circle>
        <text y="3">03</text>
      </g>
      <text class="anatomy__label" x="320" y="446" text-anchor="middle" data-i18n="computer.parts.gpu.name">GPU</text>
      <text class="anatomy__sublabel" x="320" y="460" text-anchor="middle" data-i18n="computer.board.gpuSub">PARALLEL RENDER</text>
    </g>

    <!-- 04 Storage -->
    <g class="anatomy__part" data-part="storage">
      <rect class="anatomy__hit" x="756" y="292" width="194" height="230" rx="6"></rect>
      <rect class="anatomy__part-base" x="770" y="306" width="170" height="104" rx="4"></rect>
      <rect class="anatomy__part-deep" x="782" y="318" width="58" height="36" rx="2"></rect>
      <rect class="anatomy__part-deep" x="848" y="318" width="58" height="36" rx="2"></rect>
      <rect class="anatomy__part-deep" x="782" y="362" width="124" height="26" rx="2"></rect>
      <text class="anatomy__micro" x="785" y="378">SSD</text>
      <rect class="anatomy__part-base" x="770" y="420" width="170" height="86" rx="4"></rect>
      <circle class="anatomy__platter" cx="812" cy="463" r="30"></circle>
      <circle class="anatomy__platter-inner" cx="812" cy="463" r="10"></circle>
      <path class="anatomy__arm" d="M874 463H828L818 456"></path>
      <text class="anatomy__micro anatomy__micro--end" x="926" y="500" text-anchor="end">HDD</text>
      <g class="anatomy__badge" transform="translate(770 306)">
        <circle r="10"></circle>
        <text y="3">04</text>
      </g>
      <text class="anatomy__label" x="855" y="286" text-anchor="middle" data-i18n="computer.parts.storage.name">SSD / HDD</text>
      <text class="anatomy__sublabel" x="855" y="298" text-anchor="middle" data-i18n="computer.board.storageSub">SSD \xB7 HDD</text>
    </g>

    <!-- 05 Motherboard / chipset -->
    <g class="anatomy__part" data-part="motherboard">
      <rect class="anatomy__hit" x="592" y="378" width="128" height="120" rx="6"></rect>
      <rect class="anatomy__part-base" x="598" y="384" width="116" height="108" rx="4"></rect>
      <rect class="anatomy__part-deep" x="612" y="398" width="88" height="80" rx="2"></rect>
      <rect class="anatomy__chip-die" x="638" y="424" width="36" height="36" rx="2"></rect>
      <path class="anatomy__chip-lines" d="M638 412h36M638 472h36M626 424v36M686 424v36"></path>
      <g class="anatomy__badge" transform="translate(598 384)">
        <circle r="10"></circle>
        <text y="3">05</text>
      </g>
      <text class="anatomy__label" x="656" y="516" text-anchor="middle" data-i18n="computer.parts.motherboard.name">Motherboard</text>
      <text class="anatomy__sublabel" x="656" y="528" text-anchor="middle" data-i18n="computer.board.boardSub">CHIPSET \xB7 BUSES</text>
    </g>

    <!-- 06 Power supply -->
    <g class="anatomy__part" data-part="power">
      <rect class="anatomy__hit" x="750" y="82" width="200" height="168" rx="6"></rect>
      <rect class="anatomy__part-base" x="758" y="90" width="184" height="150" rx="4"></rect>
      <rect class="anatomy__part-deep" x="770" y="102" width="160" height="126" rx="3"></rect>
      <circle class="anatomy__fan-ring" cx="826" cy="165" r="42"></circle>
      <circle class="anatomy__fan-hub" cx="826" cy="165" r="8"></circle>
      <g class="anatomy__vents">
        <path d="M888 120H932M888 136H932M888 152H932M888 168H932M888 184H932M888 200H932"></path>
      </g>
      <circle class="anatomy__power-led" cx="926" cy="222" r="4"></circle>
      <g class="anatomy__badge" transform="translate(758 90)">
        <circle r="10"></circle>
        <text y="3">06</text>
      </g>
      <text class="anatomy__label" x="850" y="72" text-anchor="middle" data-i18n="computer.parts.power.name">Power supply</text>
      <text class="anatomy__sublabel" x="850" y="84" text-anchor="middle" data-i18n="computer.board.powerSub">12 V \xB7 5 V \xB7 3.3 V</text>
    </g>

    <!-- 07 Input / output -->
    <g class="anatomy__part" data-part="io">
      <rect class="anatomy__hit" x="36" y="102" width="96" height="266" rx="6"></rect>
      <rect class="anatomy__part-base" x="42" y="108" width="84" height="254" rx="5"></rect>
      <g class="anatomy__ports">
        <rect x="52" y="120" width="28" height="16" rx="2"></rect>
        <rect x="86" y="120" width="28" height="16" rx="2"></rect>
        <rect x="52" y="144" width="28" height="16" rx="2"></rect>
        <rect x="86" y="144" width="28" height="16" rx="2"></rect>
        <rect x="52" y="168" width="62" height="20" rx="2"></rect>
        <rect x="52" y="198" width="62" height="26" rx="2"></rect>
        <circle cx="64" cy="244" r="7"></circle>
        <circle cx="88" cy="244" r="7"></circle>
        <rect x="52" y="264" width="62" height="18" rx="2"></rect>
        <rect x="52" y="292" width="62" height="24" rx="2"></rect>
        <rect x="52" y="326" width="28" height="18" rx="2"></rect>
        <rect x="86" y="326" width="28" height="18" rx="2"></rect>
      </g>
      <g class="anatomy__badge" transform="translate(42 108)">
        <circle r="10"></circle>
        <text y="3">07</text>
      </g>
      <text class="anatomy__label" x="84" y="78" text-anchor="middle" data-i18n="computer.board.ioLabel">Input / Output</text>
      <text class="anatomy__sublabel" x="84" y="92" text-anchor="middle" data-i18n="computer.board.ioSub">USB \xB7 AUDIO \xB7 NET</text>
    </g>
  </svg>`}var je=z(()=>{});var Ye={};O(Ye,{destroyComputerLab:()=>re,initComputerLab:()=>ia});function Qt(){return Ge.map(e=>`
      <button class="anatomy__chip" type="button" data-part="${e.id}"
        aria-controls="component-panel" aria-pressed="false">
        <span class="anatomy__chip-num">${e.num}</span>
        <span class="anatomy__chip-name" data-i18n="${e.chipKey}"></span>
      </button>`).join("")}function Wt(){return`
    <div class="anatomy">
      <div class="anatomy__stage">
        <div class="anatomy__stage-head">
          <p class="anatomy__hint">
            <span class="signal-dot signal-dot--small" aria-hidden="true"></span>
            <span>${n("computer.anatomy.hint")}</span>
          </p>
          <p class="anatomy__count">${n("computer.anatomy.count")}</p>
        </div>
        <div class="anatomy__board">${Be()}</div>
        <div class="anatomy__index" data-component-index role="group" aria-label="${n("computer.anatomy.components")}">
          ${Qt()}
        </div>
      </div>
      <aside class="anatomy__panel" id="component-panel" role="region" aria-live="polite" aria-label="${n("computer.anatomy.panelLabel")}"></aside>
    </div>`}function Yt(){return`
    <div class="anatomy__idle">
      <svg class="anatomy__idle-mark" viewBox="0 0 48 48" fill="none" aria-hidden="true">
        <rect x="9.5" y="9.5" width="29" height="29" rx="3" stroke="currentColor"></rect>
        <rect x="20" y="20" width="8" height="8" rx="1" fill="currentColor"></rect>
        <path d="M15 3v6M24 3v6M33 3v6M15 39v6M24 39v6M33 39v6M3 15h6M3 24h6M3 33h6M39 15h6M39 24h6M39 33h6"
          stroke="currentColor" stroke-linecap="round"></path>
      </svg>
      <p class="anatomy__idle-kicker">${n("computer.anatomy.idleKicker")}</p>
      <h2>${n("computer.anatomy.idleTitle")}</h2>
      <p>${n("computer.anatomy.idleBody")}</p>
    </div>`}function Jt(){let e=["control","alu","registers"].map(r=>{let o=`computer.parts.cpu.parts.${r}`;return`<div class="anatomy__cpu-part"><dt>${n(`${o}.name`)}</dt><dd>${n(`${o}.desc`)}</dd></div>`}).join(""),t=R.map((r,o)=>{let p=o===m.cycleStep;return`<button type="button" class="anatomy__cycle-step" data-cycle-step="${o}"
      aria-pressed="${p}">${n(`computer.parts.cpu.cycle.${r}.name`)}</button>`}).join(""),a=R[m.cycleStep],s=(m.cycleStep+1)/R.length*100;return`
    <section class="anatomy__block anatomy__block--cpu">
      <h3 class="anatomy__block-label">${n("computer.anatomy.inside")}</h3>
      <dl class="anatomy__cpu-parts">${e}</dl>
      <div class="anatomy__cycle" data-cycle>
        <div class="anatomy__cycle-head">
          <span class="anatomy__cycle-title">${n("computer.anatomy.cycle")}</span>
          <span class="anatomy__cycle-count" data-cycle-count>${m.cycleStep+1} / ${R.length}</span>
        </div>
        <div class="anatomy__cycle-tabs" role="group" aria-label="${n("computer.anatomy.cycleHint")}">
          ${t}
        </div>
        <div class="anatomy__cycle-bar" aria-hidden="true"><span data-cycle-bar style="width: ${s}%"></span></div>
        <p class="anatomy__cycle-body" aria-live="polite" data-cycle-body>
          ${n(`computer.parts.cpu.cycle.${a}.body`)}
        </p>
      </div>
    </section>`}function Xt(e){let t=e.related.map(s=>{let r=oe.get(s);return`<button type="button" class="anatomy__related-btn" data-related="${s}">
        <span class="anatomy__related-num">${r.num}</span>${n(r.nameKey)}
      </button>`}).join(""),a=e.noteKey?`<aside class="anatomy__note">
        <span class="anatomy__note-mark" aria-hidden="true">!</span>
        <p><span class="anatomy__note-label">${n("computer.anatomy.note")}</span>${n(e.noteKey)}</p>
      </aside>`:"";return`
    <article class="anatomy__entry" data-tone="${e.tone}">
      <header class="anatomy__entry-head">
        <span class="anatomy__entry-num">${e.num}</span>
        <div>
          <h2>${n(e.nameKey)}</h2>
          <p class="anatomy__entry-tagline">${n(e.taglineKey)}</p>
        </div>
      </header>
      <section class="anatomy__block">
        <h3 class="anatomy__block-label">${n("computer.anatomy.role")}</h3>
        <p>${n(e.roleKey)}</p>
      </section>
      ${a}
      <section class="anatomy__block">
        <h3 class="anatomy__block-label">${n("computer.anatomy.comm")}</h3>
        <p>${n(e.commKey)}</p>
      </section>
      ${e.cpu?Jt():""}
      <section class="anatomy__block anatomy__block--example">
        <h3 class="anatomy__block-label">${n("computer.anatomy.example")}</h3>
        <p>${n(e.exampleKey)}</p>
      </section>
      <section class="anatomy__block anatomy__block--related">
        <h3 class="anatomy__block-label">${n("computer.anatomy.connected")}</h3>
        <div class="anatomy__related">${t}</div>
      </section>
    </article>`}function Zt(e,t){return t?t==="motherboard"?!0:e.dataset.a===t||e.dataset.b===t:!1}function ea(){let e=m.selected,t=oe.get(e);m.board.classList.toggle("is-selecting",!!e),m.parts.forEach(s=>{let r=s.dataset.part;s.classList.toggle("is-selected",r===e),s.classList.toggle("is-related",!!(t&&t.related.includes(r)))}),m.chips.forEach(s=>{s.setAttribute("aria-pressed",String(s.dataset.part===e))});let a=new Map;m.links.forEach(s=>{let r=Zt(s,e);s.classList.toggle("is-live",r),a.set(s.id,r)}),m.particles.forEach(({element:s,linkId:r})=>{s.classList.toggle("is-dimmed",!a.get(r))})}function Qe(e=!1){let t=oe.get(m.selected);m.panel.innerHTML=t?Xt(t):Yt(),e&&(m.panel.classList.remove("is-entering"),m.panel.offsetWidth,m.panel.classList.add("is-entering"))}function ta(){if(window.innerWidth>=900)return;let e=m.panel.getBoundingClientRect();(e.top>window.innerHeight*.74||e.bottom<120)&&m.panel.scrollIntoView({behavior:L.matches?"auto":"smooth",block:"start"})}function se(e,{source:t="board",animate:a=!0}={}){oe.get(e)&&(m.selected=e,m.cycleStep=0,ea(),Qe(a),t!=="init"&&ta())}function aa(e){if(m.selected!=="cpu"||!Number.isInteger(e)||e<0||e>=R.length)return;m.cycleStep=e;let t=m.panel.querySelector("[data-cycle]");if(!t)return;t.querySelectorAll("[data-cycle-step]").forEach(o=>{o.setAttribute("aria-pressed",String(Number(o.dataset.cycleStep)===e))});let a=t.querySelector("[data-cycle-count]");a&&(a.textContent=`${e+1} / ${R.length}`);let s=t.querySelector("[data-cycle-bar]");s&&(s.style.width=`${(e+1)/R.length*100}%`);let r=t.querySelector("[data-cycle-body]");r&&(r.textContent=n(`computer.parts.cpu.cycle.${R[e]}.body`))}function We(){var t;let e=(t=m.svg)==null?void 0:t.querySelector("[data-particle-layer]");e==null||e.replaceChildren(),m.particles=[]}function Oe(){if(!m.svg)return;We();let e=m.svg.querySelector("[data-particle-layer]");e&&m.links.forEach(t=>{let a=t.classList.contains("is-live"),s=t.dataset.tone||"cyan",r=["anatomy-link-cpu-ram","anatomy-link-cpu-gpu","anatomy-link-io-mobo"].includes(t.id)?2:1,o=3.2+Number(t.id.length%5)*.35;for(let p=0;p<r;p+=1){let b=document.createElementNS(ge,"circle");if(b.setAttribute("r","3"),b.setAttribute("class",`anatomy__particle anatomy__particle--${s}`),b.dataset.linkId=t.id,L.matches){b.classList.add("anatomy__particle--static");let h=t.getPointAtLength(t.getTotalLength()*(.42+p*.24));b.setAttribute("cx",h.x),b.setAttribute("cy",h.y)}else{let h=document.createElementNS(ge,"animateMotion");h.setAttribute("dur",`${o+p*.4}s`),h.setAttribute("begin",`${-p*o*.5}s`),h.setAttribute("repeatCount","indefinite"),h.setAttribute("rotate","auto");let u=document.createElementNS(ge,"mpath");u.setAttribute("href",`#${t.id}`),u.setAttributeNS(Gt,"xlink:href",`#${t.id}`),h.append(u),b.append(h)}b.classList.toggle("is-dimmed",!a),e.append(b),m.particles.push({element:b,linkId:t.id})}})}function ia(e){var h;if(!(e instanceof HTMLElement))return null;if(m.root===e)return{root:e,destroy:re};if(re(),m.root=e,m.body=e.querySelector(".lab-frame__body"),!m.body)return null;e.classList.add("lab-frame--mounted","lab-frame--anatomy"),e.dataset.moduleState="mounted",m.body.innerHTML=Wt(),x(e),m.board=m.body.querySelector(".anatomy__board"),m.svg=m.body.querySelector(".anatomy__svg"),m.panel=m.body.querySelector("#component-panel"),m.index=m.body.querySelector("[data-component-index]"),m.parts=[...m.body.querySelectorAll(".anatomy__part")],m.chips=[...m.body.querySelectorAll(".anatomy__chip")],m.links=[...m.body.querySelectorAll("[data-link]")];let t=u=>{let y=u.target.closest("[data-part]");y&&se(y.dataset.part,{source:"chip"})},a=u=>{let y=u.target.closest(".anatomy__part");y&&se(y.dataset.part,{source:"board"})},s=u=>{var C;let y=u.target.closest("[data-cycle-step]");if(y){aa(Number(y.dataset.cycleStep));return}let w=u.target.closest("[data-related]");if(!w)return;let A=w.dataset.related;se(A,{source:"panel"}),(C=m.chips.find(P=>P.dataset.part===A))==null||C.focus({preventScroll:!0})},r=u=>{var y,w;u.detail.view==="computer"?!L.matches&&!document.hidden&&((y=m.svg)==null||y.unpauseAnimations()):(w=m.svg)==null||w.pauseAnimations()},o=()=>{var u,y;document.hidden||document.body.dataset.view!=="computer"?(u=m.svg)==null||u.pauseAnimations():L.matches||(y=m.svg)==null||y.unpauseAnimations()},p=()=>{var u,y;Oe(),!L.matches&&!document.hidden?(u=m.svg)==null||u.unpauseAnimations():(y=m.svg)==null||y.pauseAnimations()},b=q(()=>{x(e),Qe(!1)});return m.index.addEventListener("click",t),m.board.addEventListener("click",a),m.panel.addEventListener("click",s),document.addEventListener("app:navigate",r),document.addEventListener("visibilitychange",o),typeof L.addEventListener=="function"?L.addEventListener("change",p):typeof L.addListener=="function"&&L.addListener(p),Oe(),se("cpu",{source:"init",animate:!1}),(document.hidden||document.body.dataset.view!=="computer")&&((h=m.svg)==null||h.pauseAnimations()),m.cleanup=()=>{var u,y,w;(u=m.index)==null||u.removeEventListener("click",t),(y=m.board)==null||y.removeEventListener("click",a),(w=m.panel)==null||w.removeEventListener("click",s),document.removeEventListener("app:navigate",r),document.removeEventListener("visibilitychange",o),b(),typeof L.removeEventListener=="function"?L.removeEventListener("change",p):typeof L.removeListener=="function"&&L.removeListener(p),We()},{root:e,destroy:re}}function re(){var e,t;(e=m.cleanup)==null||e.call(m),m.cleanup=null,m.root&&(m.root.classList.remove("lab-frame--mounted","lab-frame--anatomy"),m.root.dataset.moduleState="pending",(t=m.body)==null||t.replaceChildren()),Object.assign(m,{root:null,body:null,board:null,svg:null,panel:null,index:null,parts:[],chips:[],links:[],particles:[],selected:null,cycleStep:0})}var ge,Gt,R,Ge,oe,L,m,Je=z(()=>{k();je();ge="http://www.w3.org/2000/svg",Gt="http://www.w3.org/1999/xlink",R=["fetch","decode","execute"],Ge=[{id:"cpu",num:"01",tone:"cyan",related:["ram","gpu","motherboard"],nameKey:"computer.parts.cpu.name",chipKey:"computer.parts.cpu.chip",taglineKey:"computer.parts.cpu.tagline",roleKey:"computer.parts.cpu.role",commKey:"computer.parts.cpu.comm",exampleKey:"computer.parts.cpu.example",cpu:!0},{id:"ram",num:"02",tone:"blue",related:["cpu","motherboard","storage"],nameKey:"computer.parts.ram.name",chipKey:"computer.parts.ram.chip",taglineKey:"computer.parts.ram.tagline",roleKey:"computer.parts.ram.role",commKey:"computer.parts.ram.comm",exampleKey:"computer.parts.ram.example",noteKey:"computer.parts.ram.note"},{id:"gpu",num:"03",tone:"purple",related:["cpu","motherboard","io"],nameKey:"computer.parts.gpu.name",chipKey:"computer.parts.gpu.chip",taglineKey:"computer.parts.gpu.tagline",roleKey:"computer.parts.gpu.role",commKey:"computer.parts.gpu.comm",exampleKey:"computer.parts.gpu.example"},{id:"storage",num:"04",tone:"green",related:["motherboard","ram","cpu"],nameKey:"computer.parts.storage.name",chipKey:"computer.parts.storage.chip",taglineKey:"computer.parts.storage.tagline",roleKey:"computer.parts.storage.role",commKey:"computer.parts.storage.comm",exampleKey:"computer.parts.storage.example",noteKey:"computer.parts.storage.note"},{id:"motherboard",num:"05",tone:"neutral",related:["cpu","ram","gpu","storage","power","io"],nameKey:"computer.parts.motherboard.name",chipKey:"computer.parts.motherboard.chip",taglineKey:"computer.parts.motherboard.tagline",roleKey:"computer.parts.motherboard.role",commKey:"computer.parts.motherboard.comm",exampleKey:"computer.parts.motherboard.example",allLinks:!0},{id:"power",num:"06",tone:"amber",related:["motherboard","cpu","gpu"],nameKey:"computer.parts.power.name",chipKey:"computer.parts.power.chip",taglineKey:"computer.parts.power.tagline",roleKey:"computer.parts.power.role",commKey:"computer.parts.power.comm",exampleKey:"computer.parts.power.example"},{id:"io",num:"07",tone:"cyan",related:["motherboard","cpu","gpu"],nameKey:"computer.parts.io.name",chipKey:"computer.parts.io.chip",taglineKey:"computer.parts.io.tagline",roleKey:"computer.parts.io.role",commKey:"computer.parts.io.comm",exampleKey:"computer.parts.io.example"}],oe=new Map(Ge.map(e=>[e.id,e])),L=window.matchMedia("(prefers-reduced-motion: reduce)"),m={root:null,body:null,board:null,svg:null,panel:null,index:null,parts:[],chips:[],links:[],particles:[],selected:null,cycleStep:0,cleanup:null}});var rt={};O(rt,{destroyFollowDataLab:()=>H,initFollowDataLab:()=>xe});function oa(){return ra/c.speed}function Xe(){return`
    <div class="dataflow" aria-label="${n("followData.title")}">
      <div class="dataflow__top">
        <div class="dataflow__progress-wrap">
          <div class="dataflow__progress-head">
            <span class="dataflow__progress-label">${n("followData.controls.progress")}</span>
            <span class="dataflow__progress-value" data-df-progress>1 / ${S}</span>
          </div>
          <div class="dataflow__progress" role="progressbar" aria-valuemin="1" aria-valuemax="${S}" aria-valuenow="1" data-df-progressbar>
            <span class="dataflow__progress-fill" data-df-fill style="width:20%"></span>
          </div>
          <ol class="dataflow__stepper" aria-label="${n("followData.controls.progress")}">
            ${Array.from({length:S},(e,t)=>`<li><button type="button" class="dataflow__step-dot" data-df-step="${t}" aria-label="${n("followData.controls.step")} ${t+1}" aria-current="${t===0?"step":"false"}"><span>${t+1}</span><em>${n(`followData.steps.${t}.label`)}</em></button></li>`).join("")}
          </ol>
        </div>
        <p class="dataflow__caveat" role="note">${n("followData.caveat")}</p>
      </div>

      <div class="dataflow__board">
        <div class="dataflow__diagram">
          ${la()}
        </div>
        <aside class="dataflow__panel" data-df-panel aria-live="polite"></aside>
      </div>

      <div class="dataflow__controls" role="group" aria-label="${n("followData.controls.play")}">
        <button type="button" class="dataflow__btn dataflow__btn--primary" data-df-action="toggle" aria-pressed="false">
          <span class="dataflow__btn-icon" data-df-toggle-icon aria-hidden="true">\u25B6</span>
          <span data-df-toggle-label>${n("followData.controls.play")}</span>
        </button>
        <button type="button" class="dataflow__btn" data-df-action="prev">${n("followData.controls.previous")}</button>
        <button type="button" class="dataflow__btn" data-df-action="next">${n("followData.controls.next")}</button>
        <button type="button" class="dataflow__btn" data-df-action="restart">${n("followData.controls.restart")}</button>
        <label class="dataflow__speed">
          <span>${n("followData.controls.speed")}</span>
          <select data-df-speed aria-label="${n("followData.controls.speed")}">
            ${sa.map(e=>`<option value="${e}"${e===1?" selected":""}>${e}\xD7</option>`).join("")}
          </select>
        </label>
      </div>
    </div>`}function la(){return`
  <svg class="dataflow__svg" viewBox="0 0 980 360" preserveAspectRatio="xMidYMid meet" focusable="false" role="img" aria-label="${n("followData.title")}">
    <defs>
      <linearGradient id="df-path" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="var(--cyan)" stop-opacity="0.1"></stop>
        <stop offset="0.5" stop-color="var(--blue)" stop-opacity="0.22"></stop>
        <stop offset="1" stop-color="var(--green)" stop-opacity="0.16"></stop>
      </linearGradient>
      <filter id="df-glow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="4" result="b"></feGaussianBlur>
        <feMerge><feMergeNode in="b"></feMergeNode><feMergeNode in="SourceGraphic"></feMergeNode></feMerge>
      </filter>
    </defs>

    <path id="df-link-0" class="dataflow__link" data-df-link="0" d="M148 180 C190 180, 215 180, 255 180"></path>
    <path id="df-link-1" class="dataflow__link" data-df-link="1" d="M425 180 C468 180, 500 180, 545 180"></path>
    <path id="df-link-2" class="dataflow__link" data-df-link="2" d="M715 180 C758 180, 792 180, 835 180"></path>
    <g class="dataflow__particles" data-df-particles></g>

    <!-- Keyboard -->
    <g class="dataflow__node" data-df-node="0" transform="translate(18,84)">
      <rect class="dataflow__node-bg" x="0" y="0" width="130" height="192" rx="10"></rect>
      <rect class="dataflow__key" x="18" y="26" width="94" height="72" rx="8"></rect>
      <text class="dataflow__key-char" x="65" y="74" text-anchor="middle">A</text>
      <g class="dataflow__keys-mini" opacity="0.55">
        <rect x="18" y="110" width="26" height="18" rx="3"></rect><rect x="50" y="110" width="26" height="18" rx="3"></rect><rect x="82" y="110" width="30" height="18" rx="3"></rect>
        <rect x="18" y="134" width="38" height="18" rx="3"></rect><rect x="62" y="134" width="50" height="18" rx="3"></rect>
      </g>
      <text class="dataflow__node-label" x="65" y="176" text-anchor="middle">${n("followData.diagram.keyboard")}</text>
    </g>

    <!-- Processing / Memory -->
    <g class="dataflow__node" data-df-node="1" transform="translate(255,64)">
      <rect class="dataflow__node-bg dataflow__node-bg--wide" x="0" y="0" width="170" height="232" rx="10"></rect>
      <rect class="dataflow__sub" x="16" y="18" width="138" height="78" rx="6"></rect>
      <text class="dataflow__sub-k" x="85" y="42" text-anchor="middle">01000001</text>
      <text class="dataflow__sub-s" x="85" y="60" text-anchor="middle">ASCII 65</text>
      <text class="dataflow__sub-s dataflow__sub-s--dim" x="85" y="78" text-anchor="middle">A</text>
      <rect class="dataflow__sub dataflow__sub--ram" x="16" y="106" width="138" height="44" rx="6"></rect>
      <text class="dataflow__sub-k" x="85" y="132" text-anchor="middle">RAM</text>
      <rect class="dataflow__sub dataflow__sub--cpu" x="16" y="158" width="138" height="44" rx="6"></rect>
      <text class="dataflow__sub-s dataflow__cpu-cycle" x="85" y="184" text-anchor="middle" data-df-cycle>${n("followData.steps.3.detail")}</text>
      <text class="dataflow__node-label" x="85" y="220" text-anchor="middle">${n("followData.diagram.processing")}</text>
    </g>

    <!-- Graphics -->
    <g class="dataflow__node" data-df-node="2" transform="translate(545,84)">
      <rect class="dataflow__node-bg" x="0" y="0" width="170" height="192" rx="10"></rect>
      <rect class="dataflow__sub dataflow__sub--gpu" x="16" y="22" width="138" height="58" rx="6"></rect>
      <text class="dataflow__sub-k" x="85" y="56" text-anchor="middle">GPU / Display</text>
      <g class="dataflow__pixels" data-df-pixels transform="translate(43,96)">
        ${ca()}
      </g>
      <text class="dataflow__node-label" x="85" y="176" text-anchor="middle">${n("followData.diagram.graphics")}</text>
    </g>

    <!-- Monitor -->
    <g class="dataflow__node" data-df-node="3" transform="translate(835,78)">
      <rect class="dataflow__node-bg" x="0" y="0" width="127" height="204" rx="10"></rect>
      <rect class="dataflow__monitor" x="14" y="18" width="99" height="108" rx="6"></rect>
      <text class="dataflow__monitor-char" x="63" y="88" text-anchor="middle" data-df-monitor>A</text>
      <rect class="dataflow__stand" x="50" y="126" width="26" height="18" rx="2"></rect>
      <rect class="dataflow__stand" x="34" y="142" width="58" height="6" rx="2"></rect>
      <text class="dataflow__node-label" x="63" y="186" text-anchor="middle">${n("followData.diagram.monitor")}</text>
    </g>

    <text class="dataflow__signal-label" x="490" y="348" text-anchor="middle">${n("followData.diagram.signal")}</text>
  </svg>`}function ca(){let e=["00100","01010","10001","10001","11111","10001","10001"],t="";return e.forEach((a,s)=>{[...a].forEach((r,o)=>{t+=`<rect class="dataflow__px${r==="1"?" is-on":""}" data-df-px="${s}-${o}" x="${o*17}" y="${s*9}" width="14" height="7" rx="1.5"></rect>`})}),t}function da(e){return`
    <div class="dataflow__panel-inner" data-tone="${e}">
      <span class="dataflow__panel-step">${n("followData.controls.step")} ${e+1} / ${S}</span>
      <h2 class="dataflow__panel-title">${n(`followData.steps.${e}.title`)}</h2>
      <p class="dataflow__panel-body">${n(`followData.steps.${e}.body`)}</p>
      <div class="dataflow__panel-detail"><code>${n(`followData.steps.${e}.detail`)}</code></div>
    </div>`}function it(){var t;c.particles.forEach(a=>a.remove()),c.particles=[];let e=(t=c.body)==null?void 0:t.querySelector("[data-df-particles]");e==null||e.replaceChildren()}function pa(){return window.matchMedia("(prefers-reduced-motion: reduce)").matches}function nt(){if(pa()||!c.body)return;it();let e=c.body.querySelector("[data-df-particles]");if(!e)return;let t=Math.max(0,c.step-1);for(let a=0;a<=t&&a<3;a+=1)for(let s=0;s<3;s+=1){let r=document.createElementNS(Q,"g");r.setAttribute("class",`dataflow__particle dataflow__particle--${a}`);let o=document.createElementNS(Q,"circle");o.setAttribute("r","7"),o.setAttribute("class","dataflow__particle-halo");let p=document.createElementNS(Q,"circle");p.setAttribute("r","2.6"),p.setAttribute("class","dataflow__particle-core");let b=document.createElementNS(Q,"animateMotion");b.setAttribute("dur",`${(2.4-a*.15)/c.speed}s`),b.setAttribute("repeatCount","indefinite"),b.setAttribute("begin",`${-s*.8/c.speed}s`);let h=document.createElementNS(Q,"mpath");h.setAttribute("href",`#df-link-${a}`),h.setAttributeNS(na,"xlink:href",`#df-link-${a}`),b.append(h),r.append(o,p,b),e.append(r),c.particles.push(r)}}function ve(){if(!c.body)return;let e=c.body.querySelector("[data-df-panel]");e&&(e.innerHTML=da(c.step)),c.body.querySelectorAll("[data-df-node]").forEach(u=>{let y=Number(u.dataset.dfNode);u.classList.toggle("is-active",y===c.step||c.step>=2&&y===1||c.step>=3&&y===2),u.classList.toggle("is-current",y===Math.min(c.step,3)),u.classList.toggle("is-done",y<c.step&&y!==1&&y!==2)}),c.body.querySelectorAll("[data-df-link]").forEach(u=>{let y=Number(u.dataset.dfLink);u.classList.toggle("is-live",y<c.step),u.classList.toggle("is-current",y===c.step-1)}),c.body.querySelectorAll("[data-df-step]").forEach(u=>{let y=Number(u.dataset.dfStep);u.setAttribute("aria-current",y===c.step?"step":"false"),u.classList.toggle("is-done",y<c.step)});let t=`${c.step+1} / ${S}`,a=c.body.querySelector("[data-df-progress]");a&&(a.textContent=t);let s=c.body.querySelector("[data-df-progressbar]");s&&s.setAttribute("aria-valuenow",String(c.step+1));let r=c.body.querySelector("[data-df-fill]");r&&(r.style.width=`${(c.step+1)/S*100}%`);let o=c.body.querySelector('[data-df-action="prev"]'),p=c.body.querySelector('[data-df-action="next"]');o&&(o.disabled=c.step===0),p&&(p.disabled=c.step===S-1);let b=c.body.querySelector("[data-df-monitor]");b&&b.classList.toggle("is-visible",c.step>=4),c.body.querySelectorAll("[data-df-px]").forEach(u=>{u.classList.toggle("is-visible",c.step>=4&&u.classList.contains("is-on"))});let h=c.body.querySelector("[data-df-cycle]");h&&(h.textContent=n("followData.steps.3.detail")),nt()}function $(e){var r,o,p;c.playing=!!e&&c.step<S-1,c.playing?(c.last=0,c.raf=requestAnimationFrame(st)):c.raf&&(cancelAnimationFrame(c.raf),c.raf=0);let t=(r=c.body)==null?void 0:r.querySelector('[data-df-action="toggle"]'),a=(o=c.body)==null?void 0:o.querySelector("[data-df-toggle-icon]"),s=(p=c.body)==null?void 0:p.querySelector("[data-df-toggle-label]");t&&t.setAttribute("aria-pressed",String(c.playing)),a&&(a.textContent=c.playing?"\u275A\u275A":"\u25B6"),s&&(s.textContent=c.playing?n("followData.controls.pause"):n("followData.controls.play"))}function W(e,t={}){let a=Math.max(0,Math.min(S-1,e));a===c.step&&!t.force||(c.step=a,c.elapsed=0,ve(),c.step>=S-1&&$(!1))}function st(e){if(c.playing){if(c.last||(c.last=e),c.elapsed+=e-c.last,c.last=e,c.elapsed>=oa()&&(c.elapsed=0,c.step<S-1&&(c.step+=1,ve()),c.step>=S-1)){$(!1);return}c.raf=requestAnimationFrame(st)}}function Ze(e){var a;let t=(a=e.target.closest("[data-df-action]"))==null?void 0:a.dataset.dfAction;if(!t){let s=e.target.closest("[data-df-step]");s&&($(!1),W(Number(s.dataset.dfStep)));return}t==="toggle"?$(!c.playing):t==="next"?($(!1),W(c.step+1)):t==="prev"?($(!1),W(c.step-1)):t==="restart"&&($(!1),W(0,{force:!0}))}function et(e){let t=e.target.closest("[data-df-speed]");t&&(c.speed=Number(t.value)||1,c.elapsed=0,c.playing&&nt())}function tt(){document.hidden&&$(!1)}function at(e){e.detail.view!=="circulation"&&e.detail.view!=="binaire"&&$(!1)}function xe(e,t={}){if(!(e instanceof HTMLElement))return null;let a=!!t.embedded;return c.root&&H(),c.root=e,c.embedded=a,c.body=t.body instanceof HTMLElement?t.body:e.querySelector(".lab-frame__body"),c.body?(e.classList.add("follow-data-host"),a||(e.classList.add("lab-frame--mounted","lab-frame--dataflow"),e.dataset.moduleState="mounted"),c.body.innerHTML=Xe(),x(c.body),c.body.addEventListener("click",Ze),c.body.addEventListener("change",et),document.addEventListener("visibilitychange",tt),document.addEventListener("app:navigate",at),c.langOff=q(()=>{if(!c.body)return;let s=c.playing;$(!1),c.body.innerHTML=Xe(),x(c.body),ve(),s&&$(!0)}),W(0,{force:!0}),c.cleanup=()=>{var s,r,o;$(!1),it(),(s=c.body)==null||s.removeEventListener("click",Ze),(r=c.body)==null||r.removeEventListener("change",et),document.removeEventListener("visibilitychange",tt),document.removeEventListener("app:navigate",at),(o=c.langOff)==null||o.call(c),c.langOff=null},{root:e,destroy:H}):null}function H(){var s;let{root:e,embedded:t,body:a}=c;(s=c.cleanup)==null||s.call(c),c.cleanup=null,e&&(e.classList.remove("follow-data-host"),t||(e.classList.remove("lab-frame--mounted","lab-frame--dataflow"),e.dataset&&e.dataset.moduleState==="mounted"&&(e.dataset.moduleState="pending"),a==null||a.replaceChildren())),Object.assign(c,{root:null,body:null,embedded:!1,step:0,playing:!1,speed:1,raf:0,last:0,elapsed:0,langOff:null,particles:[]})}var Q,na,S,sa,ra,c,_e=z(()=>{k();Q="http://www.w3.org/2000/svg",na="http://www.w3.org/1999/xlink",S=5,sa=[.5,1,1.5,2],ra=5200,c={root:null,body:null,embedded:!1,cleanup:null,step:0,playing:!1,speed:1,raf:0,last:0,elapsed:0,langOff:null,particles:[]}});var ot={};O(ot,{destroyBinaryLab:()=>le,initBinaryLab:()=>qa});function G(e){return String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}function ma(e){return e.reduce((t,a,s)=>t+(a?1<<7-s:0),0)}function ba(e){if(e=Math.floor(Number(e)),!Number.isFinite(e)||e<0)return{error:"nonneg"};if(e>255)return{error:"range",n:e};if(e===0)return{n:0,steps:[{q:0,r:0}],binary:"00000000"};let t=[],a=e;for(;a>0;){let r=Math.floor(a/2),o=a%2;t.push({x:a,q:r,r:o}),a=r}let s=t.map(r=>r.r).reverse().join("");return{n:e,steps:t,raw:s,binary:s.padStart(8,"0")}}function fa(e){let t=String(e||"").trim().replace(/\s+/g,"");if(!t)return{error:"empty"};if(!/^[01]+$/.test(t))return{error:"invalid",raw:t};if(t.length>16)return{error:"length",raw:t};let a=t.split("").map(Number),s=[],r=0;for(let o=0;o<a.length;o++){let p=a.length-1-o,b=2**p,h=a[o]*b;a[o]&&s.push({bit:1,power:p,place:b,val:h}),r+=h}return{raw:t,bits:a,total:r,terms:s,powers:a.map((o,p)=>({b:o,p:a.length-1-p,v:o*2**(a.length-1-p)}))}}function ha(e){return e<=127?[e]:e<=2047?[192|e>>6,128|e&63]:e<=65535?[224|e>>12,128|e>>6&63,128|e&63]:[240|e>>18,128|e>>12&63,128|e>>6&63,128|e&63]}function ya(e){return Array.from(String(e||"")).slice(0,24).map(a=>{let s=a.codePointAt(0),r=ha(s),o=s<=127;return{ch:a===" "?"\u2420":a,raw:a,cp:s,hex:"U+"+s.toString(16).toUpperCase().padStart(s>65535?5:4,"0"),bytes:r,byteHex:r.map(p=>p.toString(16).toUpperCase().padStart(2,"0")),binary:r.map(p=>p.toString(2).padStart(8,"0")),isAscii:o,name:o?"ASCII":"Unicode"}})}function ga(){return`
  <div class="binlab">
    <nav class="binlab__tabs" role="tablist" aria-label="${n("binaryLab.title")}">
      ${ua.map(e=>`<button type="button" role="tab" class="binlab__tab" data-bl-tab="${e}" aria-selected="${f.tab===e}" aria-controls="bl-panel-${e}" id="bl-tab-${e}">${n("binaryLab.tabs."+e)}</button>`).join("")}
    </nav>

    <div class="binlab__intro">
      <p>${n("binaryLab.intro.bits")}</p>
      <div class="binlab__facts">
        <div class="binlab__fact"><strong>${n("binaryLab.facts.bit.t")}</strong><span>${n("binaryLab.facts.bit.b")}</span></div>
        <div class="binlab__fact"><strong>${n("binaryLab.facts.byte.t")}</strong><span>${n("binaryLab.facts.byte.b")}</span></div>
        <div class="binlab__fact"><strong>${n("binaryLab.facts.ascii.t")}</strong><span>${n("binaryLab.facts.ascii.b")}</span></div>
        <div class="binlab__fact"><strong>${n("binaryLab.facts.unicode.t")}</strong><span>${n("binaryLab.facts.unicode.b")}</span></div>
        <div class="binlab__fact"><strong>${n("binaryLab.facts.utf8.t")}</strong><span>${n("binaryLab.facts.utf8.b")}</span></div>
      </div>
    </div>

    <section class="binlab__panel" role="tabpanel" id="bl-panel-switches" aria-labelledby="bl-tab-switches" ${f.tab!=="switches"?"hidden":""}>
      ${va()}
    </section>
    <section class="binlab__panel" role="tabpanel" id="bl-panel-dec2bin" aria-labelledby="bl-tab-dec2bin" ${f.tab!=="dec2bin"?"hidden":""}>
      ${xa()}
    </section>
    <section class="binlab__panel" role="tabpanel" id="bl-panel-bin2dec" aria-labelledby="bl-tab-bin2dec" ${f.tab!=="bin2dec"?"hidden":""}>
      ${_a()}
    </section>
    <section class="binlab__panel" role="tabpanel" id="bl-panel-text" aria-labelledby="bl-tab-text" ${f.tab!=="text"?"hidden":""}>
      ${wa()}
    </section>
    <section class="binlab__panel binlab__panel--journey" role="tabpanel" id="bl-panel-journey" aria-labelledby="bl-tab-journey" ${f.tab!=="journey"?"hidden":""}>
      <div class="binlab__journey-head">
        <h3>${n("binaryLab.tabs.journey")}</h3>
        <p>${n("binaryLab.journeyLead")}</p>
      </div>
      <div class="binlab__journey-host" data-bl-journey></div>
    </section>
  </div>`}function va(){let e=ma(f.bits);return`
  <div class="sim">
    <div class="sim__head">
      <h3>${n("binaryLab.switches.title")}</h3>
      <p>${n("binaryLab.switches.lead")}</p>
    </div>
    <div class="bits" role="group" aria-label="${n("binaryLab.switches.title")}">
      ${f.bits.map((t,a)=>{let s=2**(7-a);return`
        <button type="button" class="bit ${t?"is-on":""}" data-bl-bit="${a}" aria-pressed="${t?"true":"false"}">
          <span class="bit__place">${s}</span>
          <span class="bit__switch"><span class="bit__knob"></span></span>
          <span class="bit__val">${t}</span>
        </button>`}).join("")}
    </div>
    <div class="sim__result" aria-live="polite">
      <div class="sim__equation">
        <code class="sim__binary">${f.bits.join("")}</code>
        <span class="sim__eq">=</span>
        <strong class="sim__decimal">${e}</strong>
      </div>
      <p class="sim__explain">${n("binaryLab.switches.example")} <code>00000101 = 0+0+0+0+0+4+0+1 = 5</code>.</p>
      <p class="sim__explain sim__explain--calc">${f.bits.map((t,a)=>t?2**(7-a):null).filter(t=>t!==null).join(" + ")||"0"} = <strong>${e}</strong></p>
    </div>
  </div>`}function xa(){let e=ba(f.decInput),t="";return e.error==="nonneg"||e.error==="range"||!e.steps?t=`<p class="sim__error">${n("binaryLab.dec2bin.error")}</p>`:t=`
      <div class="sim__result" aria-live="polite">
        <div class="sim__equation"><strong class="sim__decimal">${e.n}</strong><span class="sim__eq">=</span><code class="sim__binary">${e.binary}</code></div>
        <h4>${n("binaryLab.dec2bin.stepsTitle")}</h4>
        <ol class="steps">
          ${e.steps.map((a,s)=>`<li><code>${a.x} \xF7 2 = ${a.q}</code> <span>${n("binaryLab.dec2bin.remainder")}</span> <strong>${a.r}</strong></li>`).join("")}
        </ol>
        <p class="sim__explain">${n("binaryLab.dec2bin.readUp")} <code>${e.raw}</code> \u2192 ${n("binaryLab.dec2bin.padded")} <code>${e.binary}</code>.</p>
      </div>`,`
  <div class="sim">
    <div class="sim__head"><h3>${n("binaryLab.dec2bin.title")}</h3><p>${n("binaryLab.dec2bin.lead")}</p></div>
    <label class="sim__field"><span>${n("binaryLab.dec2bin.label")}</span>
      <input type="number" min="0" max="255" step="1" inputmode="numeric" value="${G(f.decInput)}" data-bl-dec placeholder="0\u2013255" />
    </label>
    <p class="sim__hint">${n("binaryLab.dec2bin.hint")}</p>
    ${t}
  </div>`}function _a(){let e=fa(f.binInput),t="";return e.error?t=`<p class="sim__error">${n("binaire.bin2dec."+e.error)}</p>`:t=`
    <div class="sim__result" aria-live="polite">
      <div class="sim__equation"><code class="sim__binary">${G(e.raw)}</code><span class="sim__eq">=</span><strong class="sim__decimal">${e.total}</strong></div>
      <div class="placegrid" aria-label="place values">
        ${e.powers.map(a=>`<div class="placegrid__cell ${a.b?"is-on":""}"><span class="placegrid__p">2<sup>${a.p}</sup></span><span class="placegrid__v">${a.b?2**a.p:"\xB7"}</span><span class="placegrid__b">${a.b}</span></div>`).join("")}
      </div>
      <p class="sim__explain">${e.powers.filter(a=>a.b).map(a=>`${2**a.p}`).join(" + ")||"0"} = <strong>${e.total}</strong></p>
    </div>`,`
  <div class="sim">
    <div class="sim__head"><h3>${n("binaryLab.bin2dec.title")}</h3><p>${n("binaryLab.bin2dec.lead")}</p></div>
    <label class="sim__field"><span>${n("binaryLab.bin2dec.label")}</span>
      <input type="text" inputmode="numeric" pattern="[01 ]+" value="${G(f.binInput)}" data-bl-bin placeholder="01000001" autocomplete="off" spellcheck="false" />
    </label>
    <p class="sim__hint">${n("binaryLab.bin2dec.hint")}</p>
    ${t}
  </div>`}function wa(){let e=ya(f.textInput);return`
  <div class="sim">
    <div class="sim__head"><h3>${n("binaryLab.text.title")}</h3><p>${n("binaryLab.text.lead")}</p></div>
    <label class="sim__field sim__field--wide"><span>${n("binaryLab.text.label")}</span>
      <input type="text" value="${G(f.textInput)}" data-bl-text maxlength="24" placeholder="${G(n("binaryLab.text.placeholder"))}" autocomplete="off" />
    </label>
    <p class="sim__note"><strong>${n("binaryLab.text.noteTitle")}</strong> ${n("binaryLab.text.note")}</p>
    <div class="sim__result" aria-live="polite">
      <div class="enc-table-wrap">
        <table class="enc-table">
          <thead><tr>
            <th>${n("binaryLab.text.col.char")}</th><th>${n("binaryLab.text.col.cp")}</th><th>${n("binaryLab.text.col.enc")}</th><th>${n("binaryLab.text.col.bytes")}</th><th>${n("binaryLab.text.col.bin")}</th>
          </tr></thead>
          <tbody>
            ${e.map(t=>`<tr class="${t.isAscii?"":"is-multi"}"><td class="enc-char">${G(t.ch)}</td><td><code>${t.hex}</code><small>(${t.cp})</small></td><td><span class="enc-tag ${t.isAscii?"is-ascii":"is-uni"}">${t.name}</span></td><td><code>${t.byteHex.join(" ")}</code> <small>${n("binaryLab.text.byteCount",{n:t.bytes.length})}</small></td><td><code class="enc-bin">${t.binary.join(" ")}</code></td></tr>`).join("")||`<tr><td colspan="5">${n("binaryLab.text.empty")}</td></tr>`}
          </tbody>
        </table>
      </div>
    </div>
  </div>`}function N(e){var a,s,r,o,p;if(!f.body)return;let t=(p=(s=(a=document.activeElement)==null?void 0:a.dataset)==null?void 0:s.blBit)!=null?p:(o=(r=document.activeElement)==null?void 0:r.dataset)==null?void 0:o.blTab;if(H(),f.follow=null,f.body.innerHTML=ga(),x(f.body),La(),f.tab==="journey"){let b=f.body.querySelector("[data-bl-journey]"),h=f.root;b&&h&&(f.follow=xe(h,{body:b,embedded:!0}))}}function La(){f.body.querySelectorAll("[data-bl-tab]").forEach(s=>s.addEventListener("click",()=>{f.tab=s.dataset.blTab,N()})),f.body.querySelectorAll("[data-bl-bit]").forEach(s=>s.addEventListener("click",()=>{let r=Number(s.dataset.blBit);f.bits[r]=f.bits[r]?0:1,N()}));let e=f.body.querySelector("[data-bl-dec]");e&&e.addEventListener("input",s=>{f.decInput=s.target.value,N(),$a()});let t=f.body.querySelector("[data-bl-bin]");t&&t.addEventListener("input",s=>{f.binInput=s.target.value,N(),Sa()});let a=f.body.querySelector("[data-bl-text]");a&&a.addEventListener("input",s=>{f.textInput=s.target.value,N(),Ma()})}function $a(){var t;let e=(t=f.body)==null?void 0:t.querySelector("[data-bl-dec]");e&&(e.focus(),e.setSelectionRange(e.value.length,e.value.length))}function Sa(){var t;let e=(t=f.body)==null?void 0:t.querySelector("[data-bl-bin]");e&&(e.focus(),e.setSelectionRange(e.value.length,e.value.length))}function Ma(){var t;let e=(t=f.body)==null?void 0:t.querySelector("[data-bl-text]");e&&(e.focus(),e.setSelectionRange(e.value.length,e.value.length))}function qa(e){return e instanceof HTMLElement?f.root===e?{root:e,destroy:le}:(le(),f.root=e,f.body=e.querySelector(".lab-frame__body"),f.body?(e.classList.add("lab-frame--mounted","lab-frame--binlab"),e.dataset.moduleState="mounted",f.langOff=q(()=>N()),N(),x(e),f.cleanup=()=>{var t;H(),(t=f.langOff)==null||t.call(f)},{root:e,destroy:le}):null):null}function le(){var e,t;(e=f.cleanup)==null||e.call(f),f.cleanup=null,H(),f.root&&(f.root.classList.remove("lab-frame--mounted","lab-frame--binlab"),f.root.dataset.moduleState="pending",(t=f.body)==null||t.replaceChildren()),Object.assign(f,{root:null,body:null,cleanup:null,langOff:null,tab:"switches",follow:null})}var f,ua,lt=z(()=>{k();_e();f={root:null,body:null,cleanup:null,langOff:null,tab:"switches",bits:[0,0,0,0,0,1,0,1],decInput:"42",binInput:"101101",textInput:"Hi \u{1F44B}",follow:null},ua=["switches","dec2bin","bin2dec","text","journey"]});var ht={};O(ht,{destroyImageLab:()=>ce,initImageLab:()=>Ia});function mt(e,t="#0b1d33"){return Array.from({length:e*e},()=>t)}function Se(e,t,a){return t*a+e}function ka(){let e=d.res*d.res;(!d.pixels||d.pixels.length!==e)&&(d.pixels=mt(d.res)),d.sel&&(d.sel.x>=d.res||d.sel.y>=d.res)&&(d.sel=null)}function ct(e,t){e<0||t<0||e>=d.res||t>=d.res||(d.pixels[Se(e,t,d.res)]=d.tool==="erase"?"#0b1d33":d.color,d.sel={x:e,y:t})}function dt(e,t){let a=t.getBoundingClientRect(),s=(e.touches?e.touches[0].clientX:e.clientX)-a.left,r=(e.touches?e.touches[0].clientY:e.clientY)-a.top;return{x:Le(Math.floor(s/a.width*d.res),0,d.res-1),y:Le(Math.floor(r/a.height*d.res),0,d.res-1)}}function $e(){var p;let e=(p=d.body)==null?void 0:p.querySelector("[data-px-canvas]");if(!e)return;let t=d.res,a=d.zoom,s=window.devicePixelRatio||1,r=t*a;e.style.width=r+"px",e.style.height=r+"px",e.width=Math.floor(r*s),e.height=Math.floor(r*s);let o=e.getContext("2d");o.setTransform(s,0,0,s,0,0);for(let b=0;b<t;b++)for(let h=0;h<t;h++)o.fillStyle=d.pixels[Se(h,b,t)],o.fillRect(h*a,b*a,a,a);o.strokeStyle="rgba(167,184,204,.16)",o.lineWidth=1,o.beginPath();for(let b=0;b<=t;b++)o.moveTo(b*a+.5,0),o.lineTo(b*a+.5,t*a),o.moveTo(0,b*a+.5),o.lineTo(t*a,b*a+.5);o.stroke(),d.sel&&(o.strokeStyle="#35c5e8",o.lineWidth=Math.max(2,a/8),o.strokeRect(d.sel.x*a+1,d.sel.y*a+1,a-2,a-2))}function bt(){if(!d.sel)return`<p class="px-inspect__empty">${n("pixelLab.grid.none")}</p>`;let e=d.pixels[Se(d.sel.x,d.sel.y,d.res)],{r:t,g:a,b:s}=Aa(e);return`<div class="px-inspect__pos"><span>${n("pixelLab.grid.pos")}</span> <code>x:${d.sel.x+1}, y:${d.sel.y+1}</code></div><div class="px-inspect__swatch" style="background:${e}"></div><dl class="px-inspect__dl"><div><dt>${n("pixelLab.grid.rgb")}</dt><dd><code>RGB(${t}, ${a}, ${s})</code></dd></div><div><dt>${n("pixelLab.grid.hex")}</dt><dd><code>${e.toUpperCase()}</code></dd></div><div><dt>${n("pixelLab.grid.binary")}</dt><dd class="px-inspect__bins"><span class="ch ch--r"><em>R</em> <code>${we(t)}</code></span><span class="ch ch--g"><em>G</em> <code>${we(a)}</code></span><span class="ch ch--b"><em>B</em> <code>${we(s)}</code></span></dd></div></dl>`}function ft(){return Math.max(0,Math.floor(Number(d.calcW)||0))*Math.max(0,Math.floor(Number(d.calcH)||0))*3}function Ta(){let e=ft();return`
  <div class="pxlab">
    <section class="pxlab__concepts"><h3>${n("pixelLab.concepts.title")}</h3><div class="pxlab__facts">${[["pixel","pixel"],["resolution","resolution"],["rgb","rgb"],["channels","channels"],["bitdepth","bitdepth"],["formats","formats"],["compression","compression"]].map(([t])=>`<div class="pxlab__fact"><strong>${n("pixelLab.concepts."+t+".t")}</strong><span>${n("pixelLab.concepts."+t+".b")}</span></div>`).join("")}</div></section>
    <section class="pxlab__grid-sec"><div class="pxlab__grid-head"><h3>${n("pixelLab.grid.title")}</h3><p>${n("pixelLab.grid.lead")}</p></div>
      <div class="pxlab__grid-layout">
        <div class="pxlab__tools">
          <label class="pxlab__field"><span>${n("pixelLab.grid.color")}</span><input type="color" value="${Ca(d.color)}" data-px-color /></label>
          <div class="pxlab__palette">${Ea.map(t=>`<button type="button" class="swatch ${d.color.toLowerCase()===t?"is-active":""}" data-px-swatch="${t}" style="--sw:${t}" aria-label="${t}"></button>`).join("")}</div>
          <div class="pxlab__toolrow"><button type="button" class="pxlab__btn ${d.tool==="paint"?"is-active":""}" data-px-tool="paint">${n("pixelLab.grid.toolPaint")}</button><button type="button" class="pxlab__btn ${d.tool==="erase"?"is-active":""}" data-px-tool="erase">${n("pixelLab.grid.toolErase")}</button><button type="button" class="pxlab__btn" data-px-clear>${n("pixelLab.grid.clear")}</button></div>
          <label class="pxlab__field"><span>${n("pixelLab.grid.zoom")}</span><input type="range" min="8" max="28" step="1" value="${d.zoom}" data-px-zoom /><output>${d.zoom}px</output></label>
          <label class="pxlab__field"><span>${n("images.lab.grid")}</span><select data-px-res>${[8,16,24,32].map(t=>`<option value="${t}" ${d.res===t?"selected":""}>${t} \xD7 ${t}</option>`).join("")}</select></label>
        </div>
        <div class="pxlab__canvas-wrap"><div class="pxlab__canvas-scroll"><canvas class="pxlab__canvas" data-px-canvas></canvas></div></div>
        <div class="pxlab__inspect" data-px-inspect>${bt()}</div>
      </div>
    </section>
    <div class="pxlab__bottom">
      <section class="pxlab__card"><h3>${n("pixelLab.res.title")}</h3><p>${n("pixelLab.res.lead")}</p><p class="pxlab__note">${n("pixelLab.res.note")}</p><div class="vidpipe" aria-hidden="true"><div class="vidpipe__step"><span class="vidpipe__label">8\xD78</span></div><div class="vidpipe__arrow">\u2192</div><div class="vidpipe__step"><span class="vidpipe__label">16\xD716</span></div><div class="vidpipe__arrow">\u2192</div><div class="vidpipe__step is-active"><span class="vidpipe__label">32\xD732</span></div></div></section>
      <section class="pxlab__card"><h3>${n("pixelLab.calc.title")}</h3><p>${n("pixelLab.calc.lead")}</p><div class="pxlab__calc-form"><label class="pxlab__field"><span>${n("pixelLab.calc.width")}</span><input type="number" min="1" value="${d.calcW}" data-px-w /></label><label class="pxlab__field"><span>${n("pixelLab.calc.height")}</span><input type="number" min="1" value="${d.calcH}" data-px-h /></label></div><div class="pxlab__calc-result" data-px-calc><code>largeur \xD7 hauteur \xD7 3 = ${e.toLocaleString("fr-FR")} octets (RGB)</code><div class="pxlab__stats"><div><span>${n("pixelLab.calc.bytes")}</span><strong>${e.toLocaleString("fr-FR")}</strong></div><div><span>\u2248 Kio</span><strong>${(e/1024).toFixed(1)}</strong></div><div><span>\u2248 Mio</span><strong>${(e/1048576).toFixed(2)}</strong></div></div></div><p class="pxlab__note">${n("pixelLab.calc.note")}</p></section>
    </div>
    <section class="pxlab__card"><h3>${n("pixelLab.formats.title")}</h3><div class="pxlab__facts">${["png","jpeg","webp","svg","raw"].map(t=>`<div class="pxlab__fact"><strong>${n("pixelLab.formats."+t+".t")}</strong><span>${n("pixelLab.formats."+t+".b")}</span></div>`).join("")}</div></section>
  </div>`}function Pa(){let e=d.body.querySelector("[data-px-canvas]");if(!e)return;let t=r=>{d.drawing=!0;let o=dt(r,e);ct(o.x,o.y),$e(),pt(),r.preventDefault()},a=r=>{if(!d.drawing)return;let o=dt(r,e);ct(o.x,o.y),$e(),pt(),r.preventDefault()},s=()=>{d.drawing=!1};e.addEventListener("pointerdown",t),e.addEventListener("pointermove",a),window.addEventListener("pointerup",s),d._unbind=()=>{e.removeEventListener("pointerdown",t),e.removeEventListener("pointermove",a),window.removeEventListener("pointerup",s)},e.style.touchAction="none"}function pt(){let e=d.body.querySelector("[data-px-inspect]");e&&(e.innerHTML=bt())}function ut(){let e=ft(),t=d.body.querySelector("[data-px-calc]");t&&(t.innerHTML=`<code>largeur \xD7 hauteur \xD7 3 = ${e.toLocaleString("fr-FR")} octets (RGB)</code><div class="pxlab__stats"><div><span>${n("pixelLab.calc.bytes")}</span><strong>${e.toLocaleString("fr-FR")}</strong></div><div><span>\u2248 Kio</span><strong>${(e/1024).toFixed(1)}</strong></div><div><span>\u2248 Mio</span><strong>${(e/1048576).toFixed(2)}</strong></div></div>`)}function F(){var e;d.body&&((e=d._unbind)==null||e.call(d),ka(),d.body.innerHTML=Ta(),x(d.body),$e(),Pa())}function Ia(e){return e instanceof HTMLElement?d.root===e&&d.body?{root:e,destroy:ce}:(ce(),d.root=e,d.body=e.querySelector(".lab-frame__body"),d.body?(e.classList.add("lab-frame--mounted"),e.dataset.moduleState="mounted",F(),d.body.addEventListener("input",t=>{t.target.matches("[data-px-color]")&&(d.color=t.target.value,F()),t.target.matches("[data-px-zoom]")&&(d.zoom=Number(t.target.value)||16,F()),t.target.matches("[data-px-res]")&&(d.res=Number(t.target.value)||16,d.pixels=null,F()),t.target.matches("[data-px-w]")&&(d.calcW=t.target.value,ut()),t.target.matches("[data-px-h]")&&(d.calcH=t.target.value,ut())}),d.body.addEventListener("click",t=>{let a=t.target.closest("[data-px-swatch]");a&&(d.color=a.dataset.pxSwatch,F());let s=t.target.closest("[data-px-tool]");s&&(d.tool=s.dataset.pxTool,F()),t.target.closest("[data-px-clear]")&&(d.pixels=mt(d.res),d.sel=null,F())}),{root:e,destroy:ce}):null):null}function ce(){var e;(e=d._unbind)==null||e.call(d),d.root&&(d.root.classList.remove("lab-frame--mounted"),d.root.dataset&&(d.root.dataset.moduleState="pending")),d.root=null,d.body=null,d.pixels=null,d.sel=null}var Ea,Le,Aa,we,Ca,d,yt=z(()=>{k();Ea=["#35c5e8","#2675d8","#38c98b","#f2b45e","#ff7a85","#ffffff","#0b1d33"],Le=(e,t,a)=>Math.max(t,Math.min(a,e)),Aa=e=>{let t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e||"");return t?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}:{r:11,g:29,b:51}},we=e=>Le(e|0,0,255).toString(2).padStart(8,"0"),Ca=e=>String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),d={root:null,body:null,res:16,pixels:null,color:"#35c5e8",tool:"paint",zoom:16,drawing:!1,sel:null,calcW:1920,calcH:1080}});var $t={};O($t,{destroyVideoLab:()=>de,initVideoLab:()=>Fa});function qe(){return pe[l.resKey]||pe["720p"]}function B(){return Math.max(1,Math.round(l.fps*l.duration))}function Y(){var Ee;let e=(Ee=l.body)==null?void 0:Ee.querySelector("[data-v-sim]");if(!e)return;let[t,a]=qe(),s=520,r=Math.round(s*(a/t));e.style.width="100%",e.style.maxWidth=s+"px",e.style.aspectRatio=`${t}/${a}`;let o=window.devicePixelRatio||1,p=Math.floor(e.clientWidth*o)||Math.floor(s*o),b=Math.floor(p*(a/t));(e.width!==p||e.height!==b)&&(e.width=p,e.height=b),l.buffer||(l.buffer=document.createElement("canvas"),l.bufferCtx=l.buffer.getContext("2d"));let h=l.buffer;(h.width!==t||h.height!==a)&&(h.width=t,h.height=a);let u=l.bufferCtx,y=u.createLinearGradient(0,0,0,a);y.addColorStop(0,"#071225"),y.addColorStop(1,"#0b1a33"),u.fillStyle=y,u.fillRect(0,0,t,a),u.strokeStyle="rgba(138,172,220,0.06)",u.lineWidth=Math.max(1,t/480);for(let I=0;I<10;I++)u.beginPath(),u.moveTo(I*t/10,0),u.lineTo(I*t/10,a),u.stroke();let w=l.frameIndex/Math.max(1,l.fps),A=(.08+.84*(.5+.5*Math.sin(w*1.6)))*t,C=(.18+.58*(.5+.5*Math.sin(w*2.4+.7)))*a,P=Math.max(10,a*.055);u.globalAlpha=.18;for(let I=3;I>=1;I--){let Ae=w-I*.016666666666666666,Ct=(.08+.84*(.5+.5*Math.sin(Ae*1.6)))*t,kt=(.18+.58*(.5+.5*Math.sin(Ae*2.4+.7)))*a;u.fillStyle="#4be3e0",u.beginPath(),u.arc(Ct,kt,P*.85,0,Math.PI*2),u.fill()}u.globalAlpha=1;let X=u.createRadialGradient(A-P*.3,C-P*.3,P*.2,A,C,P);X.addColorStop(0,"#d7ffff"),X.addColorStop(.35,"#4be3e0"),X.addColorStop(1,"#167a8a"),u.fillStyle=X,u.beginPath(),u.arc(A,C,P,0,Math.PI*2),u.fill(),u.strokeStyle="rgba(255,255,255,0.35)",u.lineWidth=Math.max(1,t/480),u.stroke(),u.fillStyle="rgba(0,0,0,0.35)",u.fillRect(10,10,Math.max(120,t*.28),Math.max(22,a*.08)),u.fillStyle="#9fb6d1",u.font=`${Math.max(10,Math.floor(a*.045))}px monospace`,u.fillText(`f:${l.frameIndex+1}/${B()}`,16,10+Math.max(16,a*.058));let me=e.getContext("2d");me.imageSmoothingEnabled=l.resKey==="1080p",me.clearRect(0,0,p,b),me.drawImage(h,0,0,p,b)}function U(){if(!l.body)return;let e=(r,o)=>{let p=l.body.querySelector(r);p&&(p.textContent=o)};e("[data-v-counter]",`${l.frameIndex+1} / ${B()}`),e("[data-v-fps-out]",`${l.fps}`);let[t,a]=qe();e("[data-v-res-out]",`${l.resKey} (${t}\xD7${a})`),e("[data-v-total]",`${B()}`);let s=l.body.querySelector("[data-v-toggle]");s&&(s.textContent=l.playing?n("videoLab.sim.pause"):n("videoLab.sim.play"),s.setAttribute("aria-pressed",l.playing?"true":"false"))}function wt(e){if(!l.playing||!l.root)return;l.lastTs||(l.lastTs=e);let t=Math.min(.1,(e-l.lastTs)/1e3);l.lastTs=e,l.simTime+=t;let a=1/l.fps,s=B();l.frameIndex=Math.floor(l.simTime/a)%s,l.simTime>=l.duration&&(l.simTime=l.simTime%Math.max(.001,l.duration)),Y(),U(),l.raf=requestAnimationFrame(wt)}function K(e){l.playing=!!e,l.playing?(l.lastTs=0,l.raf=requestAnimationFrame(wt)):l.raf&&(cancelAnimationFrame(l.raf),l.raf=0),U()}function Me(){let e=Number(l.bitrate)||0,t=Number(l.calcDur)||0,a=e*1e6*t,s=a/8,r=s/1e6,o=s/(1024*1024);return`
    <code>${n("videoLab.calc.formula",{br:V(e),dur:V(t),bits:V(Math.round(a)),mb:V(r.toFixed(2)),mib:V(o.toFixed(2))})}</code>
    <div class="vidlab__stats">
      <div><span>${n("videoLab.calc.bits")}</span><strong>${V(Math.round(a))}</strong></div>
      <div><span>${n("videoLab.calc.mb")}</span><strong>${V(r.toFixed(2))} MB</strong></div>
    </div>`}function Da(){return`<div class="vidpipe" data-v-pipe>${[["frames","frames","\u{1F4F7}"],["encoding","encoding","\u2699\uFE0F"],["compressed","compressed","\u{1F5DC}\uFE0F"],["decoding","decoding","\u25B6"],["screen","screen","\u{1F5A5}\uFE0F"]].map((t,a)=>`${a?'<div class="vidpipe__arrow" aria-hidden="true">\u2192</div>':""}<div class="vidpipe__step ${a===l.pipePhase?"is-active":""}" data-pipe-step="${a}"><span class="vidpipe__icon">${t[2]}</span><span class="vidpipe__label">${n("videoLab.pipe."+t[1])}</span></div>`).join("")}</div>`}function Ra(){let[e,t]=qe();return`
  <div class="vidlab">
    <section class="vidlab__concepts">
      <h3>${n("videoLab.concepts.title")}</h3>
      <div class="vidlab__facts">
        ${["frames","fps","resolution","codecs","compression","audio","containers"].map(a=>`<div class="vidlab__fact"><strong>${n("videoLab.concepts."+a+".t")}</strong><span>${n("videoLab.concepts."+a+".b")}</span></div>`).join("")}
      </div>
    </section>

    <section class="vidlab__sim">
      <div class="vidlab__sim-head"><h3>${n("videoLab.sim.title")}</h3><p>${n("videoLab.sim.lead")}</p></div>
      <div class="vidlab__sim-layout">
        <div class="vidlab__controls">
          <label class="vidlab__field"><span>${n("videoLab.sim.fps")}</span><select data-v-fps>${za.map(a=>`<option value="${a}" ${l.fps===a?"selected":""}>${a}</option>`).join("")}</select></label>
          <label class="vidlab__field"><span>${n("videoLab.sim.resolution")}</span><select data-v-res>${Object.keys(pe).map(a=>{let s=pe[a];return`<option value="${a}" ${l.resKey===a?"selected":""}>${a} (${s[0]}\xD7${s[1]})</option>`}).join("")}</select></label>
          <label class="vidlab__field"><span>${n("videoLab.sim.duration")}</span><input type="range" min="1" max="15" step="1" value="${l.duration}" data-v-dur /><output data-v-dur-out>${l.duration}s</output></label>
          <div class="vidlab__btnrow">
            <button type="button" class="pxlab__btn is-active" data-v-toggle aria-pressed="true">${n("videoLab.sim.play")}</button>
            <button type="button" class="pxlab__btn" data-v-restart>${n("videoLab.sim.restart")}</button>
          </div>
          <div class="vidlab__readout" aria-live="polite">
            <div><span>${n("videoLab.sim.counter")}</span><strong data-v-counter>1 / ${B()}</strong></div>
            <div><span>${n("videoLab.sim.fps")}</span><strong data-v-fps-out>${l.fps}</strong></div>
            <div><span>${n("videoLab.sim.resolution")}</span><strong data-v-res-out>${l.resKey} (${e}\xD7${t})</strong></div>
            <div><span>${n("videoLab.sim.framesTotal")}</span><strong data-v-total>${B()}</strong></div>
          </div>
          <p class="vidlab__note">${n("videoLab.sim.note")}</p>
        </div>
        <div class="vidlab__stage"><canvas data-v-sim class="vidlab__canvas" aria-label="${n("videoLab.sim.title")}"></canvas></div>
      </div>
    </section>

    <section class="vidlab__card">
      <h3>${n("videoLab.comp.title")}</h3>
      <div class="vidlab__facts" style="margin-top:12px">
        ${["intra","inter","key","motion"].map(a=>`<div class="vidlab__fact"><strong>${n("videoLab.comp."+a+".t")}</strong><span>${n("videoLab.comp."+a+".b")}</span></div>`).join("")}
      </div>
    </section>

    <div class="vidlab__bottom">
      <section class="vidlab__card">
        <h3>${n("videoLab.calc.title")}</h3>
        <p>${n("videoLab.calc.lead")}</p>
        <div class="pxlab__calc-form" style="margin-top:12px">
          <label class="vidlab__field"><span>${n("videoLab.calc.bitrate")}</span><input type="number" min="0.1" step="0.1" value="${gt(l.bitrate)}" data-v-br /></label>
          <label class="vidlab__field"><span>${n("videoLab.calc.duration")}</span><input type="number" min="1" step="1" value="${gt(l.calcDur)}" data-v-cd /></label>
        </div>
        <div class="pxlab__calc-result" data-v-calc style="margin-top:12px">${Me()}</div>
        <p class="vidlab__note">${n("videoLab.calc.note")}</p>
      </section>
      <section class="vidlab__card">
        <h3>${n("videoLab.pipe.title")}</h3>
        <div style="margin-top:14px">${Da()}</div>
        <p class="vidlab__note" style="margin-top:14px">${n("videoLab.pipe.cap")}</p>
      </section>
    </div>
  </div>`}function Ha(){l.body&&(l.body.addEventListener("change",e=>{let t=e.target;t.matches("[data-v-fps]")&&(l.fps=Number(t.value),l.frameIndex=0,l.simTime=0,U(),Y()),t.matches("[data-v-res]")&&(l.resKey=t.value,U(),Y())}),l.body.addEventListener("input",e=>{let t=e.target;if(t.matches("[data-v-dur]")){l.duration=Number(t.value),l.frameIndex=l.frameIndex%Math.max(1,B());let a=l.body.querySelector("[data-v-dur-out]");a&&(a.textContent=l.duration+"s"),U()}if(t.matches("[data-v-br]")){l.bitrate=t.value;let a=l.body.querySelector("[data-v-calc]");a&&(a.innerHTML=Me())}if(t.matches("[data-v-cd]")){l.calcDur=t.value;let a=l.body.querySelector("[data-v-calc]");a&&(a.innerHTML=Me())}}),l.body.addEventListener("click",e=>{e.target.closest("[data-v-toggle]")&&K(!l.playing),e.target.closest("[data-v-restart]")&&(l.simTime=0,l.frameIndex=0,l.lastTs=0,Y(),U())}))}function Na(){Lt(),l.pipeTimer=setInterval(()=>{var e;l.pipePhase=(l.pipePhase+1)%5,(e=l.body)==null||e.querySelectorAll("[data-pipe-step]").forEach((t,a)=>t.classList.toggle("is-active",a===l.pipePhase))},900)}function Lt(){l.pipeTimer&&(clearInterval(l.pipeTimer),l.pipeTimer=0)}function vt(){document.hidden&&K(!1)}function xt(e){e.detail.view!=="video"&&K(!1)}function Fa(e){return e instanceof HTMLElement?l.root===e?{root:e,destroy:de}:(de(),l.root=e,l.body=e.querySelector(".lab-frame__body"),l.body?(e.classList.add("lab-frame--mounted","lab-frame--vidlab"),e.dataset.moduleState="mounted",l.langOff=q(()=>{let t=l.playing;K(!1),_t(),K(t)}),_t(),Ha(),Y(),U(),Na(),K(!0),document.addEventListener("visibilitychange",vt),document.addEventListener("app:navigate",xt),l.cleanup=()=>{var t;K(!1),Lt(),(t=l.langOff)==null||t.call(l),document.removeEventListener("visibilitychange",vt),document.removeEventListener("app:navigate",xt)},{root:e,destroy:de}):null):null}function _t(){l.body&&(l.body.innerHTML=Ra(),x(l.body))}function de(){var e,t;(e=l.cleanup)==null||e.call(l),l.cleanup=null,l.root&&(l.root.classList.remove("lab-frame--mounted","lab-frame--vidlab"),l.root.dataset.moduleState="pending",(t=l.body)==null||t.replaceChildren()),Object.assign(l,{root:null,body:null,cleanup:null,langOff:null,playing:!1,lastTs:0,raf:0,pipeTimer:0,buffer:null,bufferCtx:null})}var za,pe,gt,V,l,St=z(()=>{k();za=[12,24,30,60],pe={"480p":[854,480],"720p":[1280,720],"1080p":[1920,1080]},gt=e=>String(e).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t]),V=e=>Number(e).toLocaleString(void 0,{maximumFractionDigits:2}),l={root:null,body:null,cleanup:null,langOff:null,fps:24,resKey:"720p",duration:5,playing:!0,simTime:0,frameIndex:0,lastTs:0,raf:0,bitrate:8,calcDur:60,pipePhase:0,pipeTimer:0,buffer:null,bufferCtx:null}});var Mt={};O(Mt,{destroyQuizLab:()=>ue,initQuizLab:()=>Ba});function Va(){return n("modules.quiz")||{}}function Ua(){let e=n("synthese.recap");return Array.isArray(e)?e:[]}function Ka(){let e=n("synthese.recapTitle");return typeof e=="string"?e:"R\xE9capitulatif"}function g(e,t={},a=[]){let s=document.createElement(e);for(let[r,o]of Object.entries(t))r==="class"?s.className=o:r==="text"?s.textContent=o:r==="html"?s.innerHTML=o:r.startsWith("on")&&typeof o=="function"?s.addEventListener(r.slice(2),o):o!==!1&&o!=null&&s.setAttribute(r,o===!0?"":String(o));for(let r of[].concat(a))r!=null&&s.append(r);return s}function j(){if(!(v!=null&&v.body))return;let e=Va(),t=Array.isArray(e.questions)?e.questions:[],a=v;a.total=t.length;let s=a.body;if(s.innerHTML="",s.className="quiz-ui",!t.length){s.append(g("p",{class:"quiz-empty",text:e.placeholderBody||"No questions available."}));return}if(a.phase==="intro"){let r=g("div",{class:"quiz-card quiz-card--intro"},[g("h3",{class:"quiz-card__title",text:e.placeholderTitle||e.title||"Quiz"}),g("p",{class:"quiz-card__body",text:e.lead||e.placeholderBody||""}),g("ul",{class:"scope-list quiz-scope"},[0,1,2].map(p=>{var b,h;return g("li",{text:((b=e.scope)==null?void 0:b[String(p)])||((h=e.scope)==null?void 0:h[p])||""})}).filter(p=>p.textContent)),g("div",{class:"quiz-actions"},[g("button",{type:"button",class:"button button--primary quiz-start",text:e.start||"Start quiz",onclick:()=>{a.phase="question",a.index=0,a.score=0,a.answered=!1,a.choice=null,j()}})])]),o=Ua();if(o.length){let p=g("section",{class:"recap"},[g("h3",{class:"recap__title",text:Ka()}),g("ol",{class:"recap-grid"},o.map((b,h)=>g("li",{class:"recap-item"},[g("span",{class:"recap-item__n",text:String(h+1).padStart(2,"0")}),g("span",{text:b})])))]);s.append(p)}s.append(r)}else if(a.phase==="question"){let r=t[a.index];if(!r){a.phase="complete",j();return}let o=(e.progress||"Question {current} of {total}").replace("{current}",a.index+1).replace("{total}",a.total),p=g("p",{class:"quiz-live sr-only","aria-live":"polite","aria-atomic":"true",text:a.feedback||""}),b=(r.options||[]).map((u,y)=>g("button",{type:"button",class:"quiz-option"+(a.answered?y===r.a?" is-correct":y===a.choice?" is-incorrect":"":"")+(a.choice===y?" is-selected":""),disabled:!!a.answered,text:String(u),onclick:()=>{if(a.answered)return;a.choice=y,a.answered=!0;let A=y===r.a;A&&(a.score+=1),a.feedback=(A?e.correct||"Correct":e.incorrect||"Not quite")+(r.why?" \u2014 "+r.why:""),j();let C=s.querySelector(".quiz-live");C&&(C.textContent=a.feedback)}})),h=g("div",{class:"quiz-card"},[g("div",{class:"quiz-meta"},[g("span",{class:"quiz-progress",text:o}),g("span",{class:"quiz-score",text:`${e.score||"Score"}: ${a.score}/${a.total}`})]),g("h3",{class:"quiz-question",text:r.q||""}),g("div",{class:"quiz-options",role:"group","aria-label":e.choose||"Choose an answer"},b),a.feedback?g("div",{class:"quiz-feedback "+(a.choice===r.a?"is-correct":"is-incorrect"),role:"status",text:a.feedback}):null,g("div",{class:"quiz-actions"},[g("button",{type:"button",class:"button button--primary quiz-next",text:a.index+1>=a.total?e.finish||"See results":e.next||"Next question",disabled:!a.answered,onclick:()=>{a.answered&&(a.index+1>=a.total?a.phase="complete":(a.index+=1,a.answered=!1,a.choice=null,a.feedback=""),j())}})]),p]);s.append(h)}else if(a.phase==="complete"){let r=(e.completeBody||"You answered {score} of {total} correctly.").replace("{score}",a.score).replace("{total}",a.total),o=Array.isArray(e.missions)?e.missions:[];s.append(g("div",{class:"quiz-card quiz-card--complete"},[g("h3",{class:"quiz-card__title",text:e.completeTitle||"Quiz complete"}),g("p",{class:"quiz-card__body",text:r}),g("p",{class:"quiz-result",text:`${e.score||"Score"}: ${a.score}/${a.total}`}),o.length?g("div",{class:"quiz-missions"},[g("h4",{text:e.missionTitle||"What to review"}),g("ul",{},o.map(p=>g("li",{text:String(p)})))]):null,g("div",{class:"quiz-actions"},[g("button",{type:"button",class:"button button--primary",text:e.restart||"Restart",onclick:()=>{a.phase="intro",a.index=0,a.score=0,a.answered=!1,a.choice=null,a.feedback="",j()}})]),g("div",{class:"quiz-live sr-only","aria-live":"polite","aria-atomic":"true",text:r})]))}try{x(s)}catch{}}function Ba(e){if(!(e instanceof HTMLElement))return null;if((v==null?void 0:v.root)===e)return{root:e,destroy:ue};ue();let t=e.querySelector("#quiz-lab-body")||e.querySelector(".lab-frame__body")||e;return v={root:e,body:t,phase:"intro",index:0,score:0,total:0,answered:!1,choice:null,feedback:"",unsub:null},e.classList.add("lab-frame--mounted"),e.dataset.moduleState="mounted",j(),v.unsub=q(()=>{v!=null&&v.root&&j()}),{root:e,destroy:ue}}function ue(){if(v!=null&&v.unsub)try{v.unsub()}catch{}v!=null&&v.root&&(v.root.classList.remove("lab-frame--mounted"),v.root.dataset.moduleState="pending"),v=null}var v,qt=z(()=>{k();v=null});k();k();var Pt=["home","decouvrir","circulation","binaire","images","video","synthese"],ae=new Set(Pt),ie="home",It="(min-width: 961px)",Z=ie,Pe=!1,T=!1,_=null;function be(e=window.location.hash){let t=e.replace(/^#/,"").replace(/^\/+/,"").split(/[/?#]/)[0];return ae.has(t)?t:null}function zt(e){var r;let t=document.getElementById(e),a=(r=t==null?void 0:t.querySelector("h1"))==null?void 0:r.textContent.replace(/\s+/g," ").trim(),s=n("brand.name");document.title=!a||a===s||e==="home"?n("meta.title"):`${a} \u2014 ${s}`}function Dt(e){document.querySelectorAll(".primary-nav [data-nav-link]").forEach(t=>{t.dataset.navLink===e?t.setAttribute("aria-current","page"):t.removeAttribute("aria-current")})}function ze(e,{focus:t=!1,scroll:a=!0,notify:s=!0}={}){var p;let r=ae.has(e)?e:ie,o=Z;return Z=r,document.body.dataset.view=r,document.querySelectorAll("main [data-view]").forEach(b=>{let h=b.dataset.view===r;b.hidden=!h,b.classList.toggle("is-active",h)}),Dt(r),zt(r),a&&window.scrollTo({top:0,left:0,behavior:"auto"}),t&&((p=document.getElementById("main-content"))==null||p.focus({preventScroll:!0})),s&&r!==o&&document.dispatchEvent(new CustomEvent("app:navigate",{detail:{view:r,previousView:o}})),r}function De(e,{focus:t=!0,replace:a=!1,scroll:s=!0}={}){let r=ae.has(e)?e:ie,o=`#${r}`;return window.location.hash!==o&&window.history[a?"replaceState":"pushState"]({view:r},"",o),Re(),ze(r,{focus:t,scroll:s})}function ee(){return Z}function Ie(){let e=be();!e||e===Z||De(e,{focus:!1,replace:!0})}function te(e,{restoreFocus:t=!1}={}){!(_!=null&&_.menuToggle)||!(_!=null&&_.nav)||(T=!!e,document.body.classList.toggle("nav-open",T),_.menuToggle.setAttribute("aria-expanded",String(T)),_.menuToggle.setAttribute("aria-label",T?n("a11y.closeMenu"):n("a11y.openMenu")),_.scrim&&(_.scrim.hidden=!T),T?window.requestAnimationFrame(()=>{var a;(a=_.nav.querySelector("a"))==null||a.focus()}):t&&_.menuToggle.focus())}function Re(e){T&&te(!1,e)}function Rt(e){let t=e.target.closest("a[data-nav-link]");if(!t||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey)return;let a=t.dataset.navLink;ae.has(a)&&(e.preventDefault(),De(a,{focus:!0}))}function Ht(e){e.key==="Escape"&&T&&(e.preventDefault(),te(!1,{restoreFocus:!0}))}function Nt(){var t,a;(t=_.menuToggle)==null||t.addEventListener("click",()=>{te(!T,{restoreFocus:!0})}),(a=_.scrim)==null||a.addEventListener("click",()=>{te(!1,{restoreFocus:!0})}),window.matchMedia(It).addEventListener("change",s=>{s.matches&&Re()})}function He(){if(Pe)return{getCurrentView:ee};Pe=!0,_={nav:document.getElementById("primary-nav"),menuToggle:document.querySelector("[data-menu-toggle]"),scrim:document.querySelector("[data-nav-scrim]")},document.addEventListener("click",Rt),document.addEventListener("keydown",Ht),window.addEventListener("popstate",Ie),window.addEventListener("hashchange",Ie),Nt();let e=be()||ie;return ze(e,{focus:!1,scroll:!1,notify:!1}),be()||window.history.replaceState({view:e},"",`#${e}`),{getCurrentView:ee}}var D="http://www.w3.org/2000/svg",Ft="http://www.w3.org/1999/xlink",E=window.matchMedia("(prefers-reduced-motion: reduce)"),M={machine:null,particleLayer:null,header:null},Ne=!1,he=!1,ne=!1;function Ve(){var e;(e=M.particleLayer)==null||e.replaceChildren(),ne=!1}function Vt(e,t,a){let s=document.createElementNS(D,"g");s.setAttribute("class",`particle particle--${e}`);let r=document.createElementNS(D,"circle");r.setAttribute("r","6"),r.setAttribute("class","particle__halo");let o=document.createElementNS(D,"circle");o.setAttribute("r","2.1"),o.setAttribute("class","particle__core");let p=document.createElementNS(D,"animateMotion");return p.setAttribute("dur",`${t}s`),p.setAttribute("begin",`${a}s`),p.setAttribute("repeatCount","indefinite"),p.setAttribute("calcMode","linear"),p.setAttribute("rotate","auto"),s.append(r,o,p),s}function Ut(){let{machine:e,particleLayer:t}=M;!e||!t||e.querySelectorAll(".machine__flow").forEach(a=>{let s=typeof a.getTotalLength=="function"?a.getTotalLength():0;if(!s)return;let r=a.getPointAtLength(s*.56),o=a.dataset.flow||"cyan",p=document.createElementNS(D,"g");p.setAttribute("class",`particle particle--${o}`),p.setAttribute("transform",`translate(${r.x} ${r.y})`);let b=document.createElementNS(D,"circle");b.setAttribute("r","6"),b.setAttribute("class","particle__halo");let h=document.createElementNS(D,"circle");h.setAttribute("r","2.4"),h.setAttribute("class","particle__core"),p.append(b,h),t.append(p)})}function Kt(){let{machine:e,particleLayer:t}=M;if(!(!e||!t||ne)){if(E.matches){Ut(),ne=!0;return}e.querySelectorAll(".machine__flow").forEach(a=>{if(!a.id)return;let s=Math.max(1,Number(a.dataset.count)||1),r=Math.max(1,Number(a.dataset.duration)||3),o=a.dataset.flow||"cyan";for(let p=0;p<s;p+=1){let b=-r*p/s,h=Vt(o,r,b.toFixed(2)),u=document.createElementNS(D,"mpath");u.setAttribute("href",`#${a.id}`),u.setAttributeNS(Ft,"xlink:href",`#${a.id}`),h.querySelector("animateMotion").append(u),t.append(h)}}),ne=!0}}function ye(e){let{machine:t}=M;!t||typeof t.pauseAnimations!="function"||(e&&!E.matches&&!document.hidden?t.unpauseAnimations():t.pauseAnimations())}function fe({rebuild:e=!1}={}){let t=document.body.dataset.view==="home";!M.machine||!M.particleLayer||(t?(e&&Ve(),Kt(),ye(!0)):ye(!1))}function Bt(){document.querySelectorAll("[data-scroll-to]").forEach(e=>{e.addEventListener("click",()=>{let t=document.getElementById(e.dataset.scrollTo);t&&(t.scrollIntoView({behavior:E.matches?"auto":"smooth",block:"start"}),t.hasAttribute("tabindex")||t.setAttribute("tabindex","-1"),t.focus({preventScroll:!0}))})}),document.querySelectorAll("[data-scroll-top]").forEach(e=>{e.addEventListener("click",()=>{var t;window.scrollTo({top:0,left:0,behavior:E.matches?"auto":"smooth"}),(t=document.getElementById("main-content"))==null||t.focus({preventScroll:!0})})})}function Ue(){document.querySelectorAll("[data-reveal]").forEach(e=>{e.classList.add("is-revealed")})}function jt(){let e=[...document.querySelectorAll("[data-reveal]")];if(!e.length)return;if(E.matches||!("IntersectionObserver"in window)){Ue();return}let t=new IntersectionObserver(a=>{a.forEach(s=>{s.isIntersecting&&(s.target.classList.add("is-revealed"),t.unobserve(s.target))})},{rootMargin:"0px 0px -8% 0px",threshold:.12});e.forEach(a=>t.observe(a))}function Fe(){var e;he=!1,(e=M.header)==null||e.classList.toggle("is-scrolled",window.scrollY>10)}function Ot(){M.header=document.querySelector(".site-header"),M.header&&(Fe(),window.addEventListener("scroll",()=>{he||(he=!0,window.requestAnimationFrame(Fe))},{passive:!0}))}function Ke(){if(Ne)return;Ne=!0,M.machine=document.getElementById("machine-svg"),M.particleLayer=document.getElementById("machine-particles"),Ot(),Bt(),jt(),fe(),document.addEventListener("app:navigate",t=>{fe({rebuild:t.detail.view==="home"})}),document.addEventListener("visibilitychange",()=>{ye(!document.hidden)});let e=()=>{E.matches&&(Ve(),Ue()),fe({rebuild:!0})};typeof E.addEventListener=="function"?E.addEventListener("change",e):typeof E.addListener=="function"&&E.addListener(e)}var ja={decouvrir:()=>Promise.resolve().then(()=>(Je(),Ye)).then(e=>e.initComputerLab),circulation:()=>Promise.resolve().then(()=>(_e(),rt)).then(e=>e.initFollowDataLab),binaire:()=>Promise.resolve().then(()=>(lt(),ot)).then(e=>e.initBinaryLab),images:()=>Promise.resolve().then(()=>(yt(),ht)).then(e=>e.initImageLab),video:()=>Promise.resolve().then(()=>(St(),$t)).then(e=>e.initVideoLab),synthese:()=>Promise.resolve().then(()=>(qt(),Mt)).then(e=>e.initQuizLab)},Oa=Symbol("pending"),J=new Map;async function Et(e){let t=ja[e];if(!(!t||J.has(e))){J.set(e,Oa);try{let a=await t(),s=document.getElementById(`${e}-lab`);if(!s)return;let r=a(s);r?(J.set(e,r),document.dispatchEvent(new CustomEvent("app:labmounted",{detail:{view:e}}))):J.delete(e)}catch(a){J.delete(e),console.error(`Chargement impossible pour \xAB ${e} \xBB.`,a)}}}function At(){document.documentElement.classList.add("js"),Te(),document.addEventListener("app:navigate",e=>{Et(e.detail.view)}),He(),Ke(),Et(ee()),document.documentElement.classList.add("is-ready")}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",At,{once:!0}):At();})();
