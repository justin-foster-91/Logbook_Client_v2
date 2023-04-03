
const longarmWeapons = {
  // Name, Category, Level, Price, Damage, Range, Critical, Capacity, Usage, Bulk, Special, SFS Legal
  // Name: [Category, Level, Price, Damage, Range, Critical, Capacity, Usage, Bulk, Special, SFS Legal]
  "Needler Rifle","--",1,110,1d6 P,60 ft.,injection DC +2,12 darts,1,1,"analog, injection",TRUE
  "Caustolance, Liquidator","--",1,400,1d6 A,60 ft.,Injection DC +2,20 charges,1,1,Injection,TRUE
  "Needler Rifle, Tactical","--",1,200,1d6 P,70 ft.,Injection DC +2,14 darts,1,1,"Analog, injection",TRUE
  "Rackarack, Pulse","--",1,205,1d6 So,60 ft.,Nuisance,20 charges,2,1,"--",TRUE
  "Dusk Rifle, Static","--",2,900,1d4 C & E,60 ft.,"--",20,2,2,"Hybrid, line, unwieldy",FALSE
  "Meduza Rifle, Stinger ","--",2,720,1d8 A & S,40 ft.,Bind ,20 charges,2,1,"Analog, living ",TRUE
  "Thasphalt Rifle, Light","--",2,880,1d10 B,40 ft.,Push (5 ft.) ,80 thasphalt,1,2,"Analog, force ",FALSE
  "Formian Venomcaster, Tactical","--",3,"1,325",1d8 P,40 ft.,Injection DC +2,6 darts,1,1,"Analog, injection, unwieldy",TRUE
  "Frost Maw, Growl-class","--",3,"1,350",1d8 C,15 ft.,Bind 1d4 rounds,20,2,1,"Aurora, blast, living, unwieldy",FALSE
  "Net Gun, Wireframe","--",4,"1,750","--",30 ft.,"--",2 nets,1,1,Entangle ,TRUE
  "Data Rifle, Giga","--",5,"3,150",1d8 B or P or S,100 ft.,Knockdown ,20 charges,2,1,"Boost 1d4, codework (capacity 20, usage 2), force, modal",FALSE
  "Needler Rifle, Advanced","--",5,"3,000",1d8 P,70 ft.,Injection DC +2,14 darts,1,1,"Analog, injection",TRUE
  "Caustolance, Decimator","--",6,"4,500",2d6 A,60 ft.,Injection DC +2,20 charges,1,1,Injection,TRUE
  "Electrosystem Rifle, Buzzing","--",6,"4,500",2d10 E,60 ft.,Staggered,40 charges,4,1,"Blast, living, Swarm, unwieldy",FALSE
  "Meduza Rifle, Blitz ","--",6,"3,950",2d8 A & S,60 ft.,Bind ,20 charges,4,1,"Analog, living ",TRUE
  "Rackarack, Surge","--",6,"4,400",2d6 So,60 ft.,Nuisance,20 charges,2,1,Boost 1d4,TRUE
  "Chimera Graft, Growl-class","--",7,"6,250",1d12 F,40 ft.,Burn 1d6,20 petrol,1,1,"Automatic, integrated (1 slot), harrying, living, regrowth",TRUE
  "Dusk Rifle, Aurora","--",7,"6,500",2d4 C & E,60 ft.,"--",20,2,2,"Hybrid, line, unwieldy",FALSE
  "EM Induction Rifle, Static","--",7,"7,000",1d8 E,30 ft.,"--",40 charges,8,3,"Analog, boost 1d4, clockwork (capacity 40, usage 8), line, unwieldy",FALSE
  "Net Gun, Bolt","--",7,"5,250",3d4 E,30 ft.,Stunned ,2 nets,1,1,"Entangle, stun ",TRUE
  "Recombinator Ray","--",8,"9,500",2d10 A,60 ft.,Corrode 1d6,80,8,1,Antibiological,TRUE
  "Culling Ray, Lesser","--",8,"8,850",1d12 A & F,30 ft.,Irradiate,20 charges,1,2,"Blast, ignite 1d6",FALSE
  "Digitizer Rifle, Silver ","--",8,"8,000",2d8 So,80 ft.,digitize 1d8 ,40 charges,2,1,"Bright, professional (vidgamer), relic",FALSE
  "Thasphalt Rifle, Tactical","--",8,"8,500",2d10 B,60 ft.,Push (5 ft.) ,80 thasphalt,4,2,"Analog, force ",FALSE
  "Formian Venomcaster, Advanced","--",9,"12,750",3d8 P,60 ft.,Injection DC +2,12 darts,1,1,"Analog, injection, unwieldy",TRUE
  "Frost Maw, Snarl-class","--",9,"13,000",2d8 C,60 ft.,Bind 1d4 rounds,20,2,1,"Aurora, blast, living, unwieldy",FALSE
  "Nanite Thrower, Tactical","--",9,"13,300","--",60 ft.,wound,10 nanites,1,1,deconstruct 2d6,TRUE
  "Reality Rifle","--",10,"19,500",2d12 E,80 ft.,Confuse,40,8,2,"Mind-affecting, stun, subtle",TRUE
  "Data Rifle, Tera","--",10,"17,900",3d8 B or P or S,100 ft.,Knockdown ,20 charges,2,1,"Boost 1d8, codework (capacity 20, usage 2), force, modal",FALSE
  "Frost Maw, Roar-class","--",10,"19,000",4d8 C,80 ft.,Bind 1d4 rounds,20,2,1,"Aurora, blast, living, unwieldy",FALSE
  "Meduza Rifle, Assault ","--",10,"17,200",3d8 A & S,70 ft.,Bind ,40 charges,5,1,"Analog, living ",TRUE
  "Needler Rifle, Elite","--",10,"18,000",4d6 P,70 ft.,Injection DC +2,14 darts,1,1,"Analog, injection",TRUE
  "Chimera Graft, Snarl-class","--",11,"24,000",2d12 F,40 ft.,Burn 1d6,20 petrol,1,1,"Automatic, integrated (1 slot), harrying, living, regrowth",TRUE
  "Caustolance, Executioner","--",12,"38,000",5d6 A,60 ft.,Injection DC +2,20 charges,1,1,Injection,TRUE
  "Culling Ray, Standard","--",12,"34,500",2d12 A & F,30 ft.,Irradiate,20 charges,2,2,"Blast, ignite 3d6",FALSE
  "Dusk Rifle, Storm","--",12,"36,500",4d6 C & E,60 ft.,"--",40,4,2,"Hybrid, line, unwieldy",FALSE
  "Electrosystem Rifle, Jolting","--",12,"37,500",4d10 E,60 ft.,Staggered,40 charges,5,1,"Blast, living, Swarm, unwieldy",FALSE
  "EM Induction Rifle, Aurora","--",12,"36,400",3d8 E,60 ft.,"--",40 charges,8,3,"Analog, boost 1d8, clockwork (capacity 40, usage 8), line, unwieldy",FALSE
  "Nanite Thrower, Advanced","--",12,"35,400","--",60 ft.,wound,10 nanites,1,1,deconstruct 3d6,TRUE
  "Thasphalt Rifle, Advanced","--",12,"35,100",3d10 B,80 ft.,Push (10 ft.) ,80 thasphalt,8,2,"Analog, force ",FALSE
  "Rackarack, Drum","--",13,"46,100",5d6 So,60 ft.,Nuisance,20 charges,2,1,Boost 2d4,TRUE
  "Digitizer Rifle, Gold ","--",14,"65,000",5d8 So,80 ft.,digitize 2d8 ,80 charges,4,1,"Bright, professional (vidgamer), relic",FALSE
  "Formian Venomcaster, Elite","--",14,"70,600",7d8 P,80 ft.,Injection DC +2,12 darts,1,1,"Analog, entangle, injection, unwieldy",TRUE
  "Data Rifle, Peta","--",15,"113,300",5d8 B or P or S,120 ft.,Knockdown ,40 charges,4,1,"Boost 2d8, codework (capacity 40, usage 4), force, modal",FALSE
  "Meduza Rifle, Commander ","--",15,"100,000",7d8 A & S,80 ft.,Bind ,80 charges,5,1,"Analog, living ",TRUE
  "Nanite Thrower, Elite","--",15,"110,000","--",80 ft.,severe wound,10 nanites,2,1,deconstruct 4d6,TRUE
  "Needler Rifle, Paragon","--",15,"110,000",8d6 P,70 ft.,Injection DC +2,14 darts,1,1,"Analog, injection",TRUE
  "Thasphalt Rifle, Elite","--",16,"175,000",4d10 B,100 ft.,Push (10 ft.) ,80 thasphalt,10,2,"Analog, force ",FALSE
  "Chimera Graft, Roar-class","--",17,"218,000",4d12 F,40 ft.,Burn 1d6,20 petrol,1,1,"Automatic, integrated (1 slot), harrying, living, regrowth",TRUE
  "Dusk Rifle, Tempest","--",17,"260,000",8d6 C & E,60 ft.,"--",40,4,2,"Hybrid, line, unwieldy",FALSE
  "EM Induction Rifle, Storm","--",17,"255,000",6d8 E,90 ft.,"--",80 charges,16,3,"Analog, boost 3d8, clockwork (capacity 80, usage 16), line, unwieldy",FALSE
  "Caustolance, Eradicator","--",18,"400,000",12d6 A,60 ft.,Injection DC +2,20 charges,1,1,Injection,TRUE
  "Culling Ray, Greater","--",18,"350,000",4d12 A & F,30 ft.,Irradiate,40 charges,4,2,"Blast, ignite 5d6",FALSE
  "Electrosystem Rifle, Convulsion","--",18,"400,000",8d10 E,60 ft.,Stunned,40 charges,8,1,"Blast, living, Swarm, unwieldy",FALSE
  "Formian Venomcaster, Paragon","--",18,"398,000",10d10 P,80 ft.,Injection DC +2,24 darts,1,1,"Analog, entangle, injection, unwieldy",TRUE
  "Rackarack, Hammer","--",18,"371,000",6d10 So,60 ft.,Nuisance,40 charges,2,1,Boost 4d4,TRUE
  "Meduza Rifle, Gorgon ","--",19,"500,000",11d8 A & S,100 ft.,Bind ,80 charges,8,1,"Analog, living ",TRUE
  "Data Rifle, Exa","--",20,"875,000",11d8 B or P or S,120 ft.,Knockdown ,80 charges,8,1,"Boost 5d8, codework (capacity 40, usage 4), force, modal",FALSE
  "Digitizer Rifle, Holofoil ","--",20,"900,000",10d8 So,160 ft.,digitize 4d8 ,100 charges,5,1,"Bright, professional (vidgamer), relic",FALSE
  "Nanite Thrower, Paragon","--",20,"830,000","--",80 ft.,severe wound,10 nanites,2,1,deconstruct 5d6,TRUE
  "Needler Rifle, Supreme","--",20,"850,000",16d6 P,70 ft.,Injection DC +2,14 darts,1,1,"Analog, injection",TRUE
  "Numbing Beam, Tactical",Cryo,1,370,1d6 C,50 ft.,staggered,20 charges,1,1,nonlethal,TRUE
  "Ice Carbine, Subzero",Cryo,2,510,1d8 C & P,60 ft.,"--",20 charges,2,2,automatic,TRUE
  "Void Rifle, Grave-Class",Cryo,2,"1,020",1d6 C,60 ft.,suffocate,20 charges,1,1,antibiological,TRUE
  "Frailty Rifle, Atrophy-Class",Cryo,3,"1,650",1d6 C,60 ft.,"--",20 charges,2,1,necrotic,TRUE
  "Freeze Ray, Hiemal",Cryo,3,"1,420",1d4 C,30 ft.,staggered,20 charges,4,2,"line, unwieldy",TRUE
  "Zero Rifle, Frostbite-Class",Cryo,4,"2,330",1d8 C,60 ft.,staggered,40 charges,2,1,"--",TRUE
  "Numbing Beam, Advanced",Cryo,5,"3,050",1d8 C,50 ft.,staggered,20 charges,1,1,nonlethal,TRUE
  "Frost Projector, Frostbite-Class",Cryo,6,"5,100",1d10 C,30 ft.,staggered,40 charges,2,1,integrated (2 slots),TRUE
  "Void Rifle, Crypt-Class",Cryo,6,"4,400",1d8 C,60 ft.,suffocate,20 charges,1,1,antibiological,TRUE
  "Frailty Rifle, Rot-Class",Cryo,7,"7,700",2d6 C,60 ft.,"--",20 charges,2,2,necrotic,TRUE
  "Freeze Ray, Algid",Cryo,7,"6,300",2d4 C,30 ft.,staggered,20 charges,4,2,"line, unwieldy",TRUE
  "Zero Rifle, Hailstorm-Class",Cryo,8,"10,100",2d8 C,60 ft.,staggered,40 charges,2,2,"--",TRUE
  "Ice Carbine, Gelid",Cryo,9,"12,400",3d8 C & P,60 ft.,"--",40 charges,2,2,automatic,TRUE
  "Numbing Beam, Elite",Cryo,10,"18,000",3d6 C,80 ft.,staggered,20 charges,1,1,nonlethal,TRUE
  "Freeze Ray, Glacial",Cryo,11,"24,800",5d4 C,40 ft.,staggered,20 charges,4,2,"line, unwieldy",TRUE
  "Void Rifle, Tomb-Class",Cryo,11,"26,300",2d10 C,80 ft.,suffocate,40 charges,2,1,antibiological,TRUE
  "Frost Projector, Hailstorm-Class",Cryo,12,"42,000",2d10 C,30 ft.,staggered,40 charges,2,1,integrated (2 slots),TRUE
  "Frailty Rifle, Blight-Class",Cryo,13,"57,200",4d6 C,60 ft.,"--",40 charges,4,2,necrotic,TRUE
  "Ice Carbine, Ultracold",Cryo,13,"47,100",6d6 C & P,80 ft.,"--",40 charges,2,2,automatic,TRUE
  "Zero Rifle, Blizzard-Class",Cryo,14,"79,800",4d8 C,60 ft.,staggered,80 charges,4,2,"--",TRUE
  "Numbing Beam, Paragon",Cryo,15,"112,000",6d6 C,80 ft.,staggered,20 charges,1,1,nonlethal,TRUE
  "Freeze Ray, Isothermal",Cryo,16,"165,000",5d8 C,40 ft.,staggered,20 charges,4,2,"line, unwieldy",TRUE
  "Void Rifle, Ossuary-Class",Cryo,16,"182,000",4d10 C,100 ft.,suffocate,40 charges,1,1,antibiological,TRUE
  "Frailty Rifle, Epidemic-Class",Cryo,17,"297,000",7d6 C,60 ft.,"--",50 charges,5,2,necrotic,TRUE
  "Ice Carbine, Absolute-Zero",Cryo,17,"218,000",11d6 C & P,80 ft.,"--",40 charges,2,2,automatic,TRUE
  "Zero Rifle, Avalanche-Class",Cryo,18,"410,200",7d8 C,60 ft.,staggered,100 charges,5,2,"--",TRUE
  "Frost Projector, Blizzard-Class",Cryo,19,"680,000",5d10 C,30 ft.,staggered,40 charges,2,1,integrated (2 slots),TRUE
  "Void Rifle, Barrow-Class",Cryo,19,"606,000",6d10 C,100 ft.,suffocate,80 charges,2,1,antibiological,TRUE
  "Freeze Ray, Hypothermic",Cryo,20,"818,000",5d12 C,50 ft.,staggered,20 charges,4,2,"line, unwieldy",TRUE
  "Degenerator Rifle, Military",Degenerator,17,"242,000",7d8 A & So,50 ft.,Degeneration 4d6,40 charges,5,2,Hybrid,TRUE
  "Degenerator Rifle, Dominion",Degenerator,20,"810,000",10d8 A & So,50 ft.,Degeneration 5d6,80 charges,5,2,Hybrid,TRUE
  "Disruption Rifle, Minor",Dimensional Disruption,9,"15,000",3d8 So,50 ft.,staggered,40 charges,5,2,"boost 1d8, relic",TRUE
  "Disruption Rifle, Major",Dimensional Disruption,14,"80,000",6d8 So,40 ft.,staggered,40 charges,5,2,"boost 2d8, relic",TRUE
  "Dross Gun, Scrapper",Disintegrator,2,720,1d6 A,15 ft.,"--",20 charges,1,1,penetrating,TRUE
  "Dross Gun, Scoring",Disintegrator,5,"3,300",1d8 A,20 ft.,wound,20 charges,2,1,penetrating,TRUE
  "Disintegrator Rifle, Liquidator",Disintegrator,6,"4,750",1d20 A,30 ft.,corrode 1d6,40 charges,4,2,"--",TRUE
  "Dross Gun, Flux",Disintegrator,10,"19,200",2d12 A,20 ft.,severe wound,20 charges,4,1,penetrating,TRUE
  "Disintegrator Rifle, Decimator",Disintegrator,11,"29,000",3d10 A,30 ft.,corrode 2d6,40 charges,4,2,"--",TRUE
  "Disintegrator Rifle, Executioner",Disintegrator,16,"210,000",5d10 A,30 ft.,corrode 3d6,80 charges,8,2,"--",TRUE
  "Disintegrator Rifle, Eradicator",Disintegrator,20,"745,000",5d20 A,30 ft.,corrode 4d6,80 charges,8,2,"--",TRUE
  "Gulchgun",Flame,1,90,1d8 F,20 ft.,burn 1d6,4 shells,1,1,analog,TRUE
  "Flame Rifle",Flame,2,490,1d6 F,25 ft.,burn 1d6,20 petrol,5,1,"line, unwieldy",TRUE
  "Flare Rifle, Dazzler",Flame,3,445,2d4 F,60 ft.,burn 1d6,8 flares,1,1,"analog, bright, harrying",TRUE
  "Blaze Rifle, Ifrit-Class",Flame,4,"1,900",1d10 F,40 ft.,burn 1d6,40 petrol,2,1,"analog, unwieldy",TRUE
  "Petrol Converter, Light",Flame,4,"2,150",1d8 F or A,40 ft.,"--",40 petrol,2,1,"analog, modal (disintegrator)",TRUE
  "Dragon Rifle, Wyrmling",Flame,5,"3,020",1d8 F,6 ft.,burn 1d4,20 petrol,1,1,automatic,TRUE
  "Flare Rifle, Vivifier",Flame,6,"3,600",1d10 F,80 ft.,burn 2d4,8 flares,1,1,"analog, bright, harrying",TRUE
  "Blaze Rifle, Salamander-Class",Flame,7,"5,800",2d8 F,60 ft.,burn 2d6,40 petrol,2,1,"analog, unwieldy",TRUE
  "Petrol Converter, Tactical",Flame,7,"6,750",2d6 F or A,80 ft.,"--",40 petrol,4,1,"analog, modal (disintegrator)",TRUE
  "Igniter, Ember",Flame,8,"9,900","--",80 ft.,burn 2d6,40 charges,4,1,ignite 2d6,TRUE
  "Dragon Rifle, Drake",Flame,9,"13,400",3d6 F,60 ft.,burn 2d4,20 petrol,1,1,automatic,TRUE
  "Flare Rifle, Coruscator",Flame,10,"15,700",5d4 F,80 ft.,burn 2d6,12 flares,2,1,"analog, bright, harrying",TRUE
  "Petrol Converter, Advanced",Flame,10,"18,500",3d6 F or A,80 ft.,"--",40 petrol,1,1,"analog, modal (disintegrator)",TRUE
  "Blaze Rifle, Hellhound-Class",Flame,11,"23,200",3d10 F,60 ft.,burn 3d6,40 petrol,2,1,"analog, unwieldy",TRUE
  "Igniter, Blaze",Flame,12,"34,200","--",80 ft.,burn 3d6,40 charges,4,1,ignite 3d6,TRUE
  "Flare Rifle, Scorcher",Flame,13,"43,800",7d4 F,80 ft.,burn 3d6,12 flares,3,1,"analog, bright, harrying",TRUE
  "Dragon Rifle, Wyvern",Flame,14,"72,200",6d6 F,80 ft.,burn 3d4,20 petrol,1,1,automatic,TRUE
  "Petrol Converter, Elite",Flame,14,"76,500",5d6 F or A,80 ft.,"--",40 petrol,2,1,"analog, modal (disintegrator)",TRUE
  "Igniter, Inferno",Flame,15,"108,000","--",80 ft.,burn 4d6,40 charges,4,1,ignite 4d6,TRUE
  "Blaze Rifle, Firedrake-Class",Flame,16,"153,000",5d10 F,60 ft.,burn 4d6,40 petrol,2,1,"analog, unwieldy",TRUE
  "Flare Rifle, Nova",Flame,17,"201,000",12d4 F,100 ft.,burn 4d6,12 flares,4,1,"analog, bright, harrying",TRUE
  "Igniter, Solar Flare",Flame,18,"360,000","--",80 ft.,burn 5d6,40 charges,4,1,ignite 5d6,TRUE
  "Petrol Converter, Paragon",Flame,18,"385,000",9d6 F or A,80 ft.,"--",40 petrol,2,1,"analog, modal (disintegrator)",TRUE
  "Dragon Rifle, True ",Flame,19,"559,000",11d6 F,100 ft.,burn 4d4,20 petrol,1,1,automatic,TRUE
  "Blaze Rifle, Pheonix-Class",Flame,20,"765,000",9d10 F,80 ft.,burn 5d6,40 petrol,2,1,"analog, unwieldy",TRUE
  "Laser Rifle, Azimuth",Laser,1,425,1d8 F,120 ft.,burn 1d6,20 charges,1,1,"--",TRUE
  "Serpent Laser, Azimuth",Laser,2,500,2d4 F,100 ft.,burn 1d4,20 charges,10,1,"--",TRUE
  "Infinity Rifle, Tactical",Laser,3,"1,300",1d6 F,40 ft.,"--",20 charges,1,1,boost 1d6,TRUE
  "Excavation Laser, Light",Laser,4,"2,050",1d10 F,60 ft.,"--",40 charges,2,2,"penetrating, professional (mining)",TRUE
  "Serpent Laser, Corona",Laser,5,"2,700",2d6 F,100 ft.,burn 2d4,40 charges,20,1,"--",TRUE
  "Laser Rifle, Corona",Laser,6,"4,650",2d6 F,120 ft.,burn 1d6,40 charges,1,1,"--",TRUE
  "Infinity Rifle, Advanced",Laser,7,"6,100",2d4 F,60 ft.,"--",20 charges,1,1,boost 2d4,TRUE
  "Serpent Laser, Aphelion",Laser,8,"8,800",2d8 F,120 ft.,burn 3d4,40 charges,20,1,"--",TRUE
  "Laser Rifle, Aphelion",Laser,9,"14,300",3d6 F,120 ft.,burn 1d6,40 charges,1,1,"--",TRUE
  "Infinity Rifle, Elite",Laser,10,"17,100",2d6 F,80 ft.,"--",20 charges,1,1,boost 2d6,TRUE
  "Autobeam Rifle, Tactical",Laser,11,"26,900",5d4 F,60 ft.,burn 2d4,40 charges,4,2,automatic,TRUE
  "Excavation Laser, Medium",Laser,12,"36,000",3d10 F,60 ft.,"--",40 charges,2,2,"penetrating, professional (mining)",TRUE
  "Laser Rifle, Perihelion",Laser,13,"53,800",5d6 F,130 ft.,burn 2d6,100 charges,2,1,"--",TRUE
  "Serpent Laser, Perihelion",Laser,14,"66,000",3d12 F,120 ft.,burn 4d4,40 charges,20,1,"--",TRUE
  "Autobeam Rifle, Advanced",Laser,15,"95,500",7d4 F,60 ft.,burn 3d4,100 charges,10,2,automatic,TRUE
  "Infinity Rifle, Paragon",Laser,16,"155,000",4d6 F,100 ft.,"--",20 charges,1,1,boost 4d6,TRUE
  "Laser Rifle, Parallax",Laser,17,"248,000",8d6 F,150 ft.,burn 4d6,100 charges,2,1,"--",TRUE
  "Excavation Laser, Heavy",Laser,18,"380,000",6d10 F,60 ft.,"--",80 charges,4,2,"penetrating, professional (mining)",TRUE
  "Autobeam Rifle, Elite",Laser,19,"548,100",12d4 F,60 ft.,burn 5d4,100 charges,5,2,automatic,TRUE
  "Laser Rifle, Zenith",Laser,20,"722,000",11d6 F,150 ft.,burn 5d6,100 charges,2,1,"--",TRUE
  "Plasma Bolter, Tactical",Plasma,1,260,1d10 E & F,40 ft.,"--",20 charges,4,2,unwieldy,TRUE
  "Nova Rifle, Red Star",Plasma,2,940,1d6 E & F,30 ft.,blind,20 charges,2,1,"line, unwieldy",TRUE
  "Plasma Fork, 12-Notch",Plasma,3,"1,290",1d8 E & F,60 ft.,knockdown,20 charges,1,1,boost 1d4,TRUE
  "Microfusion Rifle, Light",Plasma,4,"2,350",1d8 E & F,15 ft.,irradiate,40 charges,4,1,"blast, radioactive, unwieldy",TRUE
  "Plasma Bolter, Advanced",Plasma,5,"3,010",2d8 E & F,60 ft.,wound,40 charges,8,2,unwieldy,TRUE
  "Plasma Rifle, Red Star",Plasma,6,"4,600",1d10 E & F,40 ft.,burn 1d4,40 charges,4,2,"line, unwieldy",TRUE
  "Nova Rifle, Yellow Star",Plasma,7,"6,800",2d6 E & F,60 ft.,blind,40 charges,4,1,"line, unwieldy",TRUE
  "Plasma Fork, 15-Notch",Plasma,8,"8,850",1d10 E & F,80 ft.,knockdown,20 charges,1,1,boost 1d10,TRUE
  "Plasma Bolter, Elite",Plasma,9,"14,000",3d10 E & F,60 ft.,wound,40 charges,4,2,unwieldy,TRUE
  "Plasma Rifle, Yellow Star",Plasma,10,"16,800",2d10 E & F,40 ft.,burn 1d8,40 charges,4,2,"line, unwieldy",TRUE
  "Nova Rifle, White Star",Plasma,11,"25,300",3d6 E & F,80 ft.,blind,40 charges,4,1,"line, unwieldy",TRUE
  "Microfusion Rifle, Medium",Plasma,12,"40,800",3d8 E & F,30 ft.,irradiate,40 charges,4,1,"blast, radioactive, unwieldy",TRUE
  "Plasma Caster, White Star",Plasma,13,"49,100",3d10 E & F,80 ft.,burn 1d10,100 charges,5,2,boost 1d10,TRUE
  "Plasma Fork, 19-Notch",Plasma,14,"64,800",3d10 E & F,80 ft.,knockdown,40 charges,2,1,boost 2d10,TRUE
  "Plasma Rifle, White Star",Plasma,15,"126,600",4d10 E & F,60 ft.,burn 2d8,40 charges,4,2,"line, unwieldy",TRUE
  "Plasma Bolter, Paragon",Plasma,16,"170,000",9d8 E & F,60 ft.,wound,80 charges,4,2,unwieldy,TRUE
  "Plasma Caster, Blue Star",Plasma,17,"275,000",5d10 E & F,80 ft.,burn 2d10,200 charges,10,2,boost 2d10,TRUE
  "Microfusion Rifle, Heavy",Plasma,18,"410,000",5d8 E & F,40 ft.,irradiate,40 charges,4,1,"blast, radioactive, unwieldy",TRUE
  "Plasma Fork, 22-Notch",Plasma,19,"750,000",6d10 E & F,100 ft.,knockdown,40 charges,2,1,boost 3d10,TRUE
  "Plasma Rifle, Blue Star",Plasma,20,"935,000",8d10 E & F,100 ft.,burn 4d8,100 charges,10,2,"line, unwieldy",TRUE
  "Hunting Rifle",Projectile,1,240,1d8 P,90 ft.,"--",6 rounds,1,1,analog,TRUE
  "Scattergun, Utility",Projectile,1,235,1d4 P,15 ft.,"--",4 shells,1,1,"analog, blast",TRUE
  "Autotarget Rifle",Projectile,2,755,1d6 P,60 ft.,"--",10 rounds,1,2,"analog, automatic",TRUE
  "Acid Dart Rifle, Tactical",Projectile,2,485,1d8 A & P,80 ft.,corrode 1d4,10 darts,1,1,analog,TRUE
  "Cinder Rifle, Truth-Sequence",Projectile,2,700,1d8 P,60 ft.,burn 1d6,10 rounds,1,2,"--",TRUE
  "Crossbolter, Tactical",Projectile,2,475,1d10 P,70 ft.,"--",1 arrow,1,2,"Analog, unwieldy",TRUE
  "Shield Rifle, Tactical",Projectile,2,900,1d8 E & P,80 ft.,Arc 1d4 ,12 rounds,1,2,Buttressing ,TRUE
  "Huchket Rifle",Projectile,3,"1,400",1d10 P,80 ft.,wound,6 rounds,1,1,analog,TRUE
  "Aeon Guard, Assault Rifle",Projectile,3,"1,400",1d8 P,80 ft.,"--",12 rounds,1,1,automatic,FALSE
  "Kalo Shredder, Slipstream-Class",Projectile,3,"1,610",1d6 S,30 ft.,bleed 1d4,8 flechettes,1,1,"analog, automatic, underwater",TRUE
  "Rail Gun, Tactical",Projectile,3,"1,150",1d8 P,60 ft.,"--",12 rounds,1,1,automatic,TRUE
  "Breaching Gun, Utility",Projectile,4,"2,350",1d10 P,20 ft.,knockdown,4 shells,1,1,"analog, breach, penetrating",TRUE
  "Vivara Rifle, Low-Flux",Projectile,4,"2,100",1d8 P,50 ft.,"--",6,1,1,Breakdown,TRUE
  "Rocket Rifle",Projectile,5,"3,010",1d12 B,80 ft.,"--",5 mini-rockets,1,1,"analog, unwieldy",TRUE
  "Rail Gun, Advanced",Projectile,6,"3,770",1d10 P,60 ft.,"--",15 rounds,1,1,automatic,TRUE
  "Acid Dart Rifle, Dual",Projectile,7,"6,900",2d8 A & P,90 ft.,corrode 2d4,24 darts,2,1,analog,TRUE
  "Aeon Guard, Accelerator Rifle",Projectile,7,"7,500",3d4 P,60 ft.,"--",16 rounds,1,2,automatic,FALSE
  "Breaching Gun, Snub",Projectile,7,"6,800",2d10 P,20 ft.,knockdown,8 shells,2,1,"analog, breach, penetrating",TRUE
  "Cinder Rifle, Salvation-Sequence",Projectile,7,"6,000",2d8 P,60 ft.,burn 1d6,14 rounds,1,2,"--",TRUE
  "Kalo Shredder, Cascade-Class",Projectile,7,"6,630",2d6 S,40 ft.,bleed 1d6,16 flechettes,1,1,"analog, automatic, underwater",TRUE
  "Seeker Rifle, Tactical",Projectile,7,"6,030",2d8 P,100 ft.,"--",8 rounds,1,1,analog,TRUE
  "Shield Rifle, Advanced",Projectile,7,"6,820",2d8 E & P,80 ft.,Arc 2d4 ,12 rounds,1,2,Buttressing ,TRUE
  "Crossbolter, Dual",Projectile,8,"8,250",2d10 P,70 ft.,"--",4 arrows,2,2,"Analog, unwieldy",TRUE
  "Scattergun, Snub",Projectile,8,"8,300",1d12 P,15 ft.,"--",8 shells,1,1,"analog, blast",TRUE
  "Vivara Rifle, Mid-Flux",Projectile,8,"7,500",2d8 P,60 ft.,"--",6,1,1,Breakdown,TRUE
  "Magnetar Rifle, Tactical",Projectile,9,"11,800",2d8 P,60 ft.,"--",18 rounds,1,2,"analog, automatic",TRUE
  "Combat Rifle",Projectile,10,"16,500",3d8 P,90 ft.,"--",12 rounds,1,1,analog,TRUE
  "Aeon Guard, RPPR",Projectile,10,"21,000",2d12 B,100 ft.,knockdown,12 mini-rockets,1,2,"--",FALSE
  "Breaching Gun, Impact",Projectile,11,"25,300",3d10 P,30 ft.,knockdown,12 shells,2,1,"analog, breach, penetrating",TRUE
  "Cinder Rifle, Valor-Sequence",Projectile,11,"23,700",3d8 P,80 ft.,burn 2d6,20 rounds,1,2,"--",TRUE
  "Kalo Shredder, Torrent-Class",Projectile,11,"26,700",4d6 S,40 ft.,bleed 3d4,24 flechettes,1,1,"analog, automatic, underwater",TRUE
  "Acid Dart Rifle, Complex",Projectile,12,"39,200",4d8 A & P,90 ft.,corrode 4d4,48 darts,4,2,analog,TRUE
  "Scattergun, Impact",Projectile,12,"30,400",2d12 P,15 ft.,"--",12 shells,1,2,"analog, blast",TRUE
  "Shield Rifle, Elite",Projectile,12,"37,000",4d8 E & P,80 ft.,Arc 4d4 ,15 rounds,1,2,Buttressing ,TRUE
  "Vivara Rifle, High-Flux",Projectile,12,"27,600",4d8 P,70 ft.,"--",6,1,1,Breakdown,FALSE
  "Gyrojet Rifle, Tactical",Projectile,13,"54,000",3d12 B,100 ft.,knockdown,12 mini-rockets,1,2,analog,TRUE
  "Magnetar Rifle, Advanced",Projectile,13,"53,700",4d8 P,60 ft.,"--",24 rounds,1,2,"analog, automatic",TRUE
  "Kalo Shredder, Deluge-Class",Projectile,14,"74,300",6d6 S,60 ft.,bleed 4d4,36 flechettes,1,1,"analog, automatic, underwater",TRUE
  "Seeker Rifle, Advanced",Projectile,14,"72,300",6d8 P,100 ft.,"--",18 rounds,1,1,analog,TRUE
  "Breaching Gun, Vortex",Projectile,15,"119,000",6d10 P,30 ft.,knockdown,16 shells,2,1,"analog, breach, penetrating",TRUE
  "Cinder Rifle, Glory-Sequence",Projectile,15,"102,200",6d8 P,80 ft.,burn 2d6,24 rounds,1,2,"--",TRUE
  "Gyrojet Rifle, Advanced",Projectile,15,"122,800",5d12 B,120 ft.,knockdown,12 mini-rockets,1,2,analog,TRUE
  "Scattergun, Vortex",Projectile,15,"91,900",3d12 P,30 ft.,"--",12 shells,1,2,"analog, blast",TRUE
  "Magnetar Rifle, Elite",Projectile,16,"185,100",6d8 P,120 ft.,"--",36 rounds,1,2,"analog, automatic",TRUE
  "Gyrojet Rifle, Elite",Projectile,17,"245,600",6d12 B,120 ft.,knockdown,12 mini-rockets,1,2,analog,TRUE
  "Kalo Shredder, Monsoon-Class",Projectile,17,"784,000",12d6 S,60 ft.,bleed 4d6,48 flechettes,1,1,"analog, automatic, underwater",TRUE
  "Seeker Rifle, Elite",Projectile,17,"242,500",9d8 P,100 ft.,"--",18 rounds,1,1,analog,TRUE
  "Shield Rifle, Paragon",Projectile,17,"264,000",8d8 E & P,80 ft.,Arc 4d8 ,18 rounds,1,2,Buttressing ,TRUE
  "Scattergun, Grapeshot",Projectile,18,"331,000",4d12 P,30 ft.,"--",12 shells,1,2,"analog, blast",TRUE
  "Breaching Gun, Grapeshot",Projectile,19,"509,000",10d10 P,30 ft.,knockdown,20 shells,2,1,"analog, breach, penetrating",TRUE
  "Magnetar Rifle, Paragon",Projectile,19,"612,600",8d8 P,120 ft.,"--",48 rounds,1,2,"analog, automatic",TRUE
  "Gyrojet Rifle, Paragon",Projectile,20,"723,500",8d12 B,120 ft.,knockdown,12 mini-rockets,1,2,analog,TRUE
  "Seeker Rifle, Paragon",Projectile,20,"809,200",12d8 P,100 ft.,"--",24 rounds,1,1,analog,TRUE
  "Pulsecaster Rifle",Shock,1,100,1d6 E,50 ft.,"--",20 charges,1,1,nonlethal,TRUE
  "Arc Emitter, Tactical",Shock,2,750,1d4 E,15 ft.,"--",20 charges,4,1,"blast, stun, unwieldy",TRUE
  "Storm Coil, Live",Shock,3,"1,480",1d6 E,40 ft.,"--",20 charges,5,2,"line, unwieldy",TRUE
  "Polarity Rifle, Static",Shock,4,"2,400",1d8 E,60 ft.,"--",40 charges,2,1,polarize 1d4,TRUE
  "Surgecaster, Standard",Shock,5,"3,300",1d10 E,40 ft.,arc 1d10,20 charges,2,1,"boost 1d6, living",TRUE
  "Arc Rifle, Static",Shock,6,"4,200",1d12 E,70 ft.,arc 1d6,40 charges,1,2,stun,TRUE
  "Storm Coil, Jolt",Shock,7,"6,900",2d6 E,60 ft.,"--",40 charges,8,2,"line, unwieldy",TRUE
  "Charge Emitter, Impulse",Shock,8,"10,900",3d4 E,20 ft.,staggered,20 charges,2,1,"integrated (1 slot), stun",TRUE
  "Arc Emitter, Advanced",Shock,9,"13,200",2d4 E,30 ft.,"--",40 charges,10,1,"blast, stun, unwieldy",TRUE
  "Polarity Rifle, Aurora",Shock,10,"21,000",2d8 E,80 ft.,"--",40 charges,2,1,polarize 1d10,TRUE
  "Arc Rifle, Aurora",Shock,11,"24,500",2d12 E,70 ft.,arc 2d6,40 charges,1,2,stun,TRUE
  "Storm Coil, Impulse",Shock,12,"35,200",4d6 E,80 ft.,"--",80 charges,10,2,"line, unwieldy",TRUE
  "Charge Emitter, Jolt",Shock,13,"57,000",3d10 E,30 ft.,staggered,20 charges,2,1,"integrated (1 slot), stun",TRUE
  "Surgecaster, Advanced",Shock,14,"83,000",3d10 E,60 ft.,arc 2d10,40 charges,2,1,"boost 1d10, living",TRUE
  "Polarity Rifle, Storm",Shock,15,"137,000",4d8 E,80 ft.,"--",40 charges,2,1,polarize 2d8,TRUE
  "Arc Rifle, Storm",Shock,16,"190,300",4d12 E,80 ft.,arc 4d6,80 charges,2,2,stun,TRUE
  "Storm Coil, Surge",Shock,17,"261,000",7d6 E,120 ft.,"--",100 charges,10,2,"line, unwieldy",TRUE
  "Charge Emitter, Surge",Shock,18,"435,000",5d10 E,40 ft.,staggered,80 charges,5,1,"integrated (1 slot), stun",TRUE
  "Arc Rifle, Tempest",Shock,19,"622,000",6d12 E,80 ft.,arc 6d6,100 charges,2,2,stun,TRUE
  "Polarity Rifle, Tempest",Shock,20,"1,000,000",8d8 E,80 ft.,"--",80 charges,2,1,polarize 3d8,TRUE
  "Scrambler Rifle, Termite",Shock,3,"1,520",1d6 E,90 ft.,Confuse,20 charges,2,1,Scramble ,TRUE
  "Trenarii Singing Coil, Solo",Shock,4,"2,200",1d4 E,60 ft.,"--",20 charges,5,2,"Line, unwieldy, Professional (Musician)",TRUE
  "Scrambler Rifle, Cockroach",Shock,8,"9,850",2d6 E,90 ft.,Confuse,20 charges,2,1,Scramble ,TRUE
  "Trenarii Singing Coil, Duet",Shock,8,"9,700",2d4 E,90 ft.,"--",40 charges,8,2,"Line, unwieldy, Professional (Musician)",TRUE
  "Scrambler Rifle, Dragonfly",Shock,11,"24,900",3d6 E,90 ft.,Confuse,20 charges,2,1,Scramble ,TRUE
  "Trenarii Singing Coil, Quartet",Shock,13,"50,000",4d4 E,120 ft.,Deafen ,80 charges,10,2,"Line, unwieldy, Professional (Musician)",TRUE
  "Scrambler Rifle, Locust",Shock,14,"82,600",4d6 E,90 ft.,Confuse,20 charges,2,1,Scramble ,TRUE
  "Trenarii Singing Coil, Orchestra",Shock,18,"380,000",7d4 E,200 ft.,Deafen ,100 charges,10,2,"Line, unwieldy, Professional (Musician)",TRUE
  "Shout Rifle",Sonic,1,450,1d4 So,30 ft.,demoralize,20 charges,4,1,"blast, nonlethal, unwieldy",TRUE
  "Boomer Rifle, Tremor",Sonic,2,520,1d8 So,40 ft.,deafen,12 shells,3,1,analog,TRUE
  "Chordpocalypse, Thunderstrike",Sonic,2,765,1d6 So,30 ft.,Deafen ,20 charges,1,1,"Boost (1d4), polarize (1d4), professional (musician) ",TRUE
  "Blindmark Rifle, Thunderstrike",Sonic,3,"1,400",2d4 So,60 ft.,"--",20 charges,2,1,"echo, stun",TRUE
  "Vortex Rifle, Pulse",Sonic,3,"1,400",2d4 So,60 ft.,Nauseate ,20 charges,1,1,"Breach, underwater ",TRUE
  "Staccato Rifle, Pulse",Sonic,4,"2,000",1d10 So,40 ft.,deafen,40 charges,1,2,automatic,TRUE
  "Sonic Rifle, Thunderstrike",Sonic,5,"3,400",1d10 So,50 ft.,deafen,40 charges,2,1,"--",TRUE
  "Boomer Rifle, Rumbler",Sonic,6,"4,100",2d6 So,40 ft.,deafen,12 shells,4,1,analog,TRUE
  "Chordpocalypse, Shattering",Sonic,6,"4,280",1d8 So,30 ft.,Deafen ,20 charges,1,1,"Boost (1d6), polarize (1d6), professional (musician) ",TRUE
  "Vortex Rifle, Surge",Sonic,6,"4,150",2d6 So,60 ft.,Nauseate ,20 charges,1,1,"Breach, underwater ",TRUE
  "Streetsweeper, Thunderstrike",Sonic,7,"7,150",1d10 So,50 ft.,knockdown,40 charges,5,2,boost 1d6,TRUE
  "Blindmark Rifle, LFD",Sonic,8,"9,800",2d8 So,80 ft.,"--",40 charges,5,1,"echo, stun",TRUE
  "Staccato Rifle, Surge",Sonic,9,"13,000",2d10 So,60 ft.,deafen,40 charges,2,2,automatic,TRUE
  "Chordpocalypse, Psychedelic",Sonic,10,"18,400",2d8 So,30 ft.,Deafen ,40 charges,2,1,"Boost (1d8), polarize (1d8), professional (musician) ",TRUE
  "Sonic Rifle, LFD",Sonic,10,"17,000",2d10 So,50 ft.,deafen,40 charges,2,2,"--",TRUE
  "Boomer Rifle, Concussive",Sonic,11,"24,000",4d6 So,40 ft.,knockdown,15 shells,5,1,analog,TRUE
  "Streetsweeper, LFD",Sonic,12,"39,300",3d10 So,50 ft.,knockdown,40 charges,5,2,boost 1d8,TRUE
  "Vortex Rifle, Drum",Sonic,12,"38,000",4d6 So,60 ft.,Nauseate ,20 charges,1,1,"Breach, underwater ",TRUE
  "Blindmark Rifle, HFD",Sonic,13,"51,000",4d8 So,100 ft.,sicken,40 charges,8,1,"echo, stun",TRUE
  "Chordpocalypse, Banshee",Sonic,14,"72,000",4d8 So,30 ft.,Deafen ,40 charges,2,1,"Boost (2d6), polarize (2d6), professional (musician) ",TRUE
  "Sonic Rifle, HFD",Sonic,14,"80,200",4d10 So,50 ft.,deafen,80 charges,4,2,"--",TRUE
  "Staccato Rifle, Drum",Sonic,15,"107,000",4d10 So,60 ft.,deafen,40 charges,2,2,automatic,TRUE
  "Streetsweeper, HFD",Sonic,16,"195,000",5d10 So,50 ft.,knockdown,40 charges,4,2,boost 1d10,TRUE
  "Boomer Rifle, Shockwave",Sonic,17,"230,000",8d6 So,40 ft.,knockdown,20 shells,5,1,analog,TRUE
  "Vortex Rifle, Hammer",Sonic,17,"250,000",8d6 So,60 ft.,Nauseate ,40 charges,2,1,"Breach, underwater ",TRUE
  "Chordpocalypse, Transcendent",Sonic,18,"372,000",7d8 So,40 ft.,Deafen ,80 charges,2,1,"Boost (2d8), polarize (2d8), professional (musician) ",TRUE
  "Sonic Rifle, Banshee",Sonic,18,"364,500",6d10 So,50 ft.,deafen,100 charges,5,2,"--",TRUE
  "Blindmark Rifle, Banshee",Sonic,19,"585,000",8d8 So,120 ft.,sicken,80 charges,10,1,"echo, stun",TRUE
  "Staccato Rifle, Hammer",Sonic,20,"810,000",8d10 So,80 ft.,deafen,80 charges,4,2,automatic,TRUE
}

const longarmWeaponsCopy = {
  // Name, Category, Level, Price, Damage, Range, Critical, Capacity, Usage, Bulk, Special, SFS Legal
  // Name: [Category, Level, Price, Damage, Range, Critical, Capacity, Usage, Bulk, Special, SFS Legal]
  "Needler Rifle",["--",1,110,1d6 P,60 ft.,injection DC +2,12 darts,1,1,"analog, injection",TRUE]
  "Caustolance, Liquidator",["--",1,400,1d6 A,60 ft.,Injection DC +2,20 charges,1,1,Injection,TRUE]
  "Needler Rifle, Tactical",["--",1,200,1d6 P,70 ft.,Injection DC +2,14 darts,1,1,"Analog, injection",TRUE]
  "Rackarack, Pulse",["--",1,205,1d6 So,60 ft.,Nuisance,20 charges,2,1,"--",TRUE]
  "Dusk Rifle, Static",["--",2,900,1d4 C & E,60 ft.,"--",20,2,2,"Hybrid, line, unwieldy",FALSE]
  "Meduza Rifle, Stinger ",["--",2,720,1d8 A & S,40 ft.,Bind ,20 charges,2,1,"Analog, living ",TRUE]
  "Thasphalt Rifle, Light",["--",2,880,1d10 B,40 ft.,Push (5 ft.) ,80 thasphalt,1,2,"Analog, force ",FALSE]
  "Formian Venomcaster, Tactical",["--",3,"1,325",1d8 P,40 ft.,Injection DC +2,6 darts,1,1,"Analog, injection, unwieldy",TRUE]
  "Frost Maw, Growl-class",["--",3,"1,350",1d8 C,15 ft.,Bind 1d4 rounds,20,2,1,"Aurora, blast, living, unwieldy",FALSE]
  "Net Gun, Wireframe",["--",4,"1,750","--",30 ft.,"--",2 nets,1,1,Entangle ,TRUE]
  "Data Rifle, Giga",["--",5,"3,150",1d8 B or P or S,100 ft.,Knockdown ,20 charges,2,1,"Boost 1d4, codework (capacity 20, usage 2), force, modal",FALSE]
  "Needler Rifle, Advanced",["--",5,"3,000",1d8 P,70 ft.,Injection DC +2,14 darts,1,1,"Analog, injection",TRUE]
  "Caustolance, Decimator",["--",6,"4,500",2d6 A,60 ft.,Injection DC +2,20 charges,1,1,Injection,TRUE]
  "Electrosystem Rifle, Buzzing",["--",6,"4,500",2d10 E,60 ft.,Staggered,40 charges,4,1,"Blast, living, Swarm, unwieldy",FALSE]
  "Meduza Rifle, Blitz ",["--",6,"3,950",2d8 A & S,60 ft.,Bind ,20 charges,4,1,"Analog, living ",TRUE]
  "Rackarack, Surge",["--",6,"4,400",2d6 So,60 ft.,Nuisance,20 charges,2,1,Boost 1d4,TRUE]
  "Chimera Graft, Growl-class",["--",7,"6,250",1d12 F,40 ft.,Burn 1d6,20 petrol,1,1,"Automatic, integrated (1 slot), harrying, living, regrowth",TRUE]
  "Dusk Rifle, Aurora",["--",7,"6,500",2d4 C & E,60 ft.,"--",20,2,2,"Hybrid, line, unwieldy",FALSE]
  "EM Induction Rifle, Static",["--",7,"7,000",1d8 E,30 ft.,"--",40 charges,8,3,"Analog, boost 1d4, clockwork (capacity 40, usage 8), line, unwieldy",FALSE]
  "Net Gun, Bolt",["--",7,"5,250",3d4 E,30 ft.,Stunned ,2 nets,1,1,"Entangle, stun ",TRUE]
  "Recombinator Ray",["--",8,"9,500",2d10 A,60 ft.,Corrode 1d6,80,8,1,Antibiological,TRUE]
  "Culling Ray, Lesser",["--",8,"8,850",1d12 A & F,30 ft.,Irradiate,20 charges,1,2,"Blast, ignite 1d6",FALSE]
  "Digitizer Rifle, Silver ",["--",8,"8,000",2d8 So,80 ft.,digitize 1d8 ,40 charges,2,1,"Bright, professional (vidgamer), relic",FALSE]
  "Thasphalt Rifle, Tactical",["--",8,"8,500",2d10 B,60 ft.,Push (5 ft.) ,80 thasphalt,4,2,"Analog, force ",FALSE]
  "Formian Venomcaster, Advanced",["--",9,"12,750",3d8 P,60 ft.,Injection DC +2,12 darts,1,1,"Analog, injection, unwieldy",TRUE]
  "Frost Maw, Snarl-class",["--",9,"13,000",2d8 C,60 ft.,Bind 1d4 rounds,20,2,1,"Aurora, blast, living, unwieldy",FALSE]
  "Nanite Thrower, Tactical",["--",9,"13,300","--",60 ft.,wound,10 nanites,1,1,deconstruct 2d6,TRUE]
  "Reality Rifle",["--",10,"19,500",2d12 E,80 ft.,Confuse,40,8,2,"Mind-affecting, stun, subtle",TRUE]
  "Data Rifle, Tera",["--",10,"17,900",3d8 B or P or S,100 ft.,Knockdown ,20 charges,2,1,"Boost 1d8, codework (capacity 20, usage 2), force, modal",FALSE]
  "Frost Maw, Roar-class",["--",10,"19,000",4d8 C,80 ft.,Bind 1d4 rounds,20,2,1,"Aurora, blast, living, unwieldy",FALSE]
  "Meduza Rifle, Assault ",["--",10,"17,200",3d8 A & S,70 ft.,Bind ,40 charges,5,1,"Analog, living ",TRUE]
  "Needler Rifle, Elite",["--",10,"18,000",4d6 P,70 ft.,Injection DC +2,14 darts,1,1,"Analog, injection",TRUE]
  "Chimera Graft, Snarl-class",["--",11,"24,000",2d12 F,40 ft.,Burn 1d6,20 petrol,1,1,"Automatic, integrated (1 slot), harrying, living, regrowth",TRUE]
  "Caustolance, Executioner",["--",12,"38,000",5d6 A,60 ft.,Injection DC +2,20 charges,1,1,Injection,TRUE]
  "Culling Ray, Standard",["--",12,"34,500",2d12 A & F,30 ft.,Irradiate,20 charges,2,2,"Blast, ignite 3d6",FALSE]
  "Dusk Rifle, Storm",["--",12,"36,500",4d6 C & E,60 ft.,"--",40,4,2,"Hybrid, line, unwieldy",FALSE]
  "Electrosystem Rifle, Jolting",["--",12,"37,500",4d10 E,60 ft.,Staggered,40 charges,5,1,"Blast, living, Swarm, unwieldy",FALSE]
  "EM Induction Rifle, Aurora",["--",12,"36,400",3d8 E,60 ft.,"--",40 charges,8,3,"Analog, boost 1d8, clockwork (capacity 40, usage 8), line, unwieldy",FALSE]
  "Nanite Thrower, Advanced",["--",12,"35,400","--",60 ft.,wound,10 nanites,1,1,deconstruct 3d6,TRUE]
  "Thasphalt Rifle, Advanced",["--",12,"35,100",3d10 B,80 ft.,Push (10 ft.) ,80 thasphalt,8,2,"Analog, force ",FALSE]
  "Rackarack, Drum",["--",13,"46,100",5d6 So,60 ft.,Nuisance,20 charges,2,1,Boost 2d4,TRUE]
  "Digitizer Rifle, Gold ",["--",14,"65,000",5d8 So,80 ft.,digitize 2d8 ,80 charges,4,1,"Bright, professional (vidgamer), relic",FALSE]
  "Formian Venomcaster, Elite",["--",14,"70,600",7d8 P,80 ft.,Injection DC +2,12 darts,1,1,"Analog, entangle, injection, unwieldy",TRUE]
  "Data Rifle, Peta",["--",15,"113,300",5d8 B or P or S,120 ft.,Knockdown ,40 charges,4,1,"Boost 2d8, codework (capacity 40, usage 4), force, modal",FALSE]
  "Meduza Rifle, Commander ",["--",15,"100,000",7d8 A & S,80 ft.,Bind ,80 charges,5,1,"Analog, living ",TRUE]
  "Nanite Thrower, Elite",["--",15,"110,000","--",80 ft.,severe wound,10 nanites,2,1,deconstruct 4d6,TRUE]
  "Needler Rifle, Paragon",["--",15,"110,000",8d6 P,70 ft.,Injection DC +2,14 darts,1,1,"Analog, injection",TRUE]
  "Thasphalt Rifle, Elite",["--",16,"175,000",4d10 B,100 ft.,Push (10 ft.) ,80 thasphalt,10,2,"Analog, force ",FALSE]
  "Chimera Graft, Roar-class",["--",17,"218,000",4d12 F,40 ft.,Burn 1d6,20 petrol,1,1,"Automatic, integrated (1 slot), harrying, living, regrowth",TRUE]
  "Dusk Rifle, Tempest",["--",17,"260,000",8d6 C & E,60 ft.,"--",40,4,2,"Hybrid, line, unwieldy",FALSE]
  "EM Induction Rifle, Storm",["--",17,"255,000",6d8 E,90 ft.,"--",80 charges,16,3,"Analog, boost 3d8, clockwork (capacity 80, usage 16), line, unwieldy",FALSE]
  "Caustolance, Eradicator",["--",18,"400,000",12d6 A,60 ft.,Injection DC +2,20 charges,1,1,Injection,TRUE]
  "Culling Ray, Greater",["--",18,"350,000",4d12 A & F,30 ft.,Irradiate,40 charges,4,2,"Blast, ignite 5d6",FALSE]
  "Electrosystem Rifle, Convulsion",["--",18,"400,000",8d10 E,60 ft.,Stunned,40 charges,8,1,"Blast, living, Swarm, unwieldy",FALSE]
  "Formian Venomcaster, Paragon",["--",18,"398,000",10d10 P,80 ft.,Injection DC +2,24 darts,1,1,"Analog, entangle, injection, unwieldy",TRUE]
  "Rackarack, Hammer",["--",18,"371,000",6d10 So,60 ft.,Nuisance,40 charges,2,1,Boost 4d4,TRUE]
  "Meduza Rifle, Gorgon ",["--",19,"500,000",11d8 A & S,100 ft.,Bind ,80 charges,8,1,"Analog, living ",TRUE]
  "Data Rifle, Exa",["--",20,"875,000",11d8 B or P or S,120 ft.,Knockdown ,80 charges,8,1,"Boost 5d8, codework (capacity 40, usage 4), force, modal",FALSE]
  "Digitizer Rifle, Holofoil ",["--",20,"900,000",10d8 So,160 ft.,digitize 4d8 ,100 charges,5,1,"Bright, professional (vidgamer), relic",FALSE]
  "Nanite Thrower, Paragon",["--",20,"830,000","--",80 ft.,severe wound,10 nanites,2,1,deconstruct 5d6,TRUE]
  "Needler Rifle, Supreme",["--",20,"850,000",16d6 P,70 ft.,Injection DC +2,14 darts,1,1,"Analog, injection",TRUE]
  "Numbing Beam, Tactical",[Cryo,1,370,1d6 C,50 ft.,staggered,20 charges,1,1,nonlethal,TRUE]
  "Ice Carbine, Subzero",[Cryo,2,510,1d8 C & P,60 ft.,"--",20 charges,2,2,automatic,TRUE]
  "Void Rifle, Grave-Class",[Cryo,2,"1,020",1d6 C,60 ft.,suffocate,20 charges,1,1,antibiological,TRUE]
  "Frailty Rifle, Atrophy-Class",Cryo,3,"1,650",1d6 C,60 ft.,"--",20 charges,2,1,necrotic,TRUE
  "Freeze Ray, Hiemal",Cryo,3,"1,420",1d4 C,30 ft.,staggered,20 charges,4,2,"line, unwieldy",TRUE
  "Zero Rifle, Frostbite-Class",Cryo,4,"2,330",1d8 C,60 ft.,staggered,40 charges,2,1,"--",TRUE
  "Numbing Beam, Advanced",Cryo,5,"3,050",1d8 C,50 ft.,staggered,20 charges,1,1,nonlethal,TRUE
  "Frost Projector, Frostbite-Class",Cryo,6,"5,100",1d10 C,30 ft.,staggered,40 charges,2,1,integrated (2 slots),TRUE
  "Void Rifle, Crypt-Class",Cryo,6,"4,400",1d8 C,60 ft.,suffocate,20 charges,1,1,antibiological,TRUE
  "Frailty Rifle, Rot-Class",Cryo,7,"7,700",2d6 C,60 ft.,"--",20 charges,2,2,necrotic,TRUE
  "Freeze Ray, Algid",Cryo,7,"6,300",2d4 C,30 ft.,staggered,20 charges,4,2,"line, unwieldy",TRUE
  "Zero Rifle, Hailstorm-Class",Cryo,8,"10,100",2d8 C,60 ft.,staggered,40 charges,2,2,"--",TRUE
  "Ice Carbine, Gelid",Cryo,9,"12,400",3d8 C & P,60 ft.,"--",40 charges,2,2,automatic,TRUE
  "Numbing Beam, Elite",Cryo,10,"18,000",3d6 C,80 ft.,staggered,20 charges,1,1,nonlethal,TRUE
  "Freeze Ray, Glacial",Cryo,11,"24,800",5d4 C,40 ft.,staggered,20 charges,4,2,"line, unwieldy",TRUE
  "Void Rifle, Tomb-Class",Cryo,11,"26,300",2d10 C,80 ft.,suffocate,40 charges,2,1,antibiological,TRUE
  "Frost Projector, Hailstorm-Class",Cryo,12,"42,000",2d10 C,30 ft.,staggered,40 charges,2,1,integrated (2 slots),TRUE
  "Frailty Rifle, Blight-Class",Cryo,13,"57,200",4d6 C,60 ft.,"--",40 charges,4,2,necrotic,TRUE
  "Ice Carbine, Ultracold",Cryo,13,"47,100",6d6 C & P,80 ft.,"--",40 charges,2,2,automatic,TRUE
  "Zero Rifle, Blizzard-Class",Cryo,14,"79,800",4d8 C,60 ft.,staggered,80 charges,4,2,"--",TRUE
  "Numbing Beam, Paragon",Cryo,15,"112,000",6d6 C,80 ft.,staggered,20 charges,1,1,nonlethal,TRUE
  "Freeze Ray, Isothermal",Cryo,16,"165,000",5d8 C,40 ft.,staggered,20 charges,4,2,"line, unwieldy",TRUE
  "Void Rifle, Ossuary-Class",Cryo,16,"182,000",4d10 C,100 ft.,suffocate,40 charges,1,1,antibiological,TRUE
  "Frailty Rifle, Epidemic-Class",Cryo,17,"297,000",7d6 C,60 ft.,"--",50 charges,5,2,necrotic,TRUE
  "Ice Carbine, Absolute-Zero",Cryo,17,"218,000",11d6 C & P,80 ft.,"--",40 charges,2,2,automatic,TRUE
  "Zero Rifle, Avalanche-Class",Cryo,18,"410,200",7d8 C,60 ft.,staggered,100 charges,5,2,"--",TRUE
  "Frost Projector, Blizzard-Class",Cryo,19,"680,000",5d10 C,30 ft.,staggered,40 charges,2,1,integrated (2 slots),TRUE
  "Void Rifle, Barrow-Class",Cryo,19,"606,000",6d10 C,100 ft.,suffocate,80 charges,2,1,antibiological,TRUE
  "Freeze Ray, Hypothermic",Cryo,20,"818,000",5d12 C,50 ft.,staggered,20 charges,4,2,"line, unwieldy",TRUE
  "Degenerator Rifle, Military",Degenerator,17,"242,000",7d8 A & So,50 ft.,Degeneration 4d6,40 charges,5,2,Hybrid,TRUE
  "Degenerator Rifle, Dominion",Degenerator,20,"810,000",10d8 A & So,50 ft.,Degeneration 5d6,80 charges,5,2,Hybrid,TRUE
  "Disruption Rifle, Minor",Dimensional Disruption,9,"15,000",3d8 So,50 ft.,staggered,40 charges,5,2,"boost 1d8, relic",TRUE
  "Disruption Rifle, Major",Dimensional Disruption,14,"80,000",6d8 So,40 ft.,staggered,40 charges,5,2,"boost 2d8, relic",TRUE
  "Dross Gun, Scrapper",Disintegrator,2,720,1d6 A,15 ft.,"--",20 charges,1,1,penetrating,TRUE
  "Dross Gun, Scoring",Disintegrator,5,"3,300",1d8 A,20 ft.,wound,20 charges,2,1,penetrating,TRUE
  "Disintegrator Rifle, Liquidator",Disintegrator,6,"4,750",1d20 A,30 ft.,corrode 1d6,40 charges,4,2,"--",TRUE
  "Dross Gun, Flux",Disintegrator,10,"19,200",2d12 A,20 ft.,severe wound,20 charges,4,1,penetrating,TRUE
  "Disintegrator Rifle, Decimator",Disintegrator,11,"29,000",3d10 A,30 ft.,corrode 2d6,40 charges,4,2,"--",TRUE
  "Disintegrator Rifle, Executioner",Disintegrator,16,"210,000",5d10 A,30 ft.,corrode 3d6,80 charges,8,2,"--",TRUE
  "Disintegrator Rifle, Eradicator",Disintegrator,20,"745,000",5d20 A,30 ft.,corrode 4d6,80 charges,8,2,"--",TRUE
  "Gulchgun",Flame,1,90,1d8 F,20 ft.,burn 1d6,4 shells,1,1,analog,TRUE
  "Flame Rifle",Flame,2,490,1d6 F,25 ft.,burn 1d6,20 petrol,5,1,"line, unwieldy",TRUE
  "Flare Rifle, Dazzler",Flame,3,445,2d4 F,60 ft.,burn 1d6,8 flares,1,1,"analog, bright, harrying",TRUE
  "Blaze Rifle, Ifrit-Class",Flame,4,"1,900",1d10 F,40 ft.,burn 1d6,40 petrol,2,1,"analog, unwieldy",TRUE
  "Petrol Converter, Light",Flame,4,"2,150",1d8 F or A,40 ft.,"--",40 petrol,2,1,"analog, modal (disintegrator)",TRUE
  "Dragon Rifle, Wyrmling",Flame,5,"3,020",1d8 F,6 ft.,burn 1d4,20 petrol,1,1,automatic,TRUE
  "Flare Rifle, Vivifier",Flame,6,"3,600",1d10 F,80 ft.,burn 2d4,8 flares,1,1,"analog, bright, harrying",TRUE
  "Blaze Rifle, Salamander-Class",Flame,7,"5,800",2d8 F,60 ft.,burn 2d6,40 petrol,2,1,"analog, unwieldy",TRUE
  "Petrol Converter, Tactical",Flame,7,"6,750",2d6 F or A,80 ft.,"--",40 petrol,4,1,"analog, modal (disintegrator)",TRUE
  "Igniter, Ember",Flame,8,"9,900","--",80 ft.,burn 2d6,40 charges,4,1,ignite 2d6,TRUE
  "Dragon Rifle, Drake",Flame,9,"13,400",3d6 F,60 ft.,burn 2d4,20 petrol,1,1,automatic,TRUE
  "Flare Rifle, Coruscator",Flame,10,"15,700",5d4 F,80 ft.,burn 2d6,12 flares,2,1,"analog, bright, harrying",TRUE
  "Petrol Converter, Advanced",Flame,10,"18,500",3d6 F or A,80 ft.,"--",40 petrol,1,1,"analog, modal (disintegrator)",TRUE
  "Blaze Rifle, Hellhound-Class",Flame,11,"23,200",3d10 F,60 ft.,burn 3d6,40 petrol,2,1,"analog, unwieldy",TRUE
  "Igniter, Blaze",Flame,12,"34,200","--",80 ft.,burn 3d6,40 charges,4,1,ignite 3d6,TRUE
  "Flare Rifle, Scorcher",Flame,13,"43,800",7d4 F,80 ft.,burn 3d6,12 flares,3,1,"analog, bright, harrying",TRUE
  "Dragon Rifle, Wyvern",Flame,14,"72,200",6d6 F,80 ft.,burn 3d4,20 petrol,1,1,automatic,TRUE
  "Petrol Converter, Elite",Flame,14,"76,500",5d6 F or A,80 ft.,"--",40 petrol,2,1,"analog, modal (disintegrator)",TRUE
  "Igniter, Inferno",Flame,15,"108,000","--",80 ft.,burn 4d6,40 charges,4,1,ignite 4d6,TRUE
  "Blaze Rifle, Firedrake-Class",Flame,16,"153,000",5d10 F,60 ft.,burn 4d6,40 petrol,2,1,"analog, unwieldy",TRUE
  "Flare Rifle, Nova",Flame,17,"201,000",12d4 F,100 ft.,burn 4d6,12 flares,4,1,"analog, bright, harrying",TRUE
  "Igniter, Solar Flare",Flame,18,"360,000","--",80 ft.,burn 5d6,40 charges,4,1,ignite 5d6,TRUE
  "Petrol Converter, Paragon",Flame,18,"385,000",9d6 F or A,80 ft.,"--",40 petrol,2,1,"analog, modal (disintegrator)",TRUE
  "Dragon Rifle, True ",Flame,19,"559,000",11d6 F,100 ft.,burn 4d4,20 petrol,1,1,automatic,TRUE
  "Blaze Rifle, Pheonix-Class",Flame,20,"765,000",9d10 F,80 ft.,burn 5d6,40 petrol,2,1,"analog, unwieldy",TRUE
  "Laser Rifle, Azimuth",Laser,1,425,1d8 F,120 ft.,burn 1d6,20 charges,1,1,"--",TRUE
  "Serpent Laser, Azimuth",Laser,2,500,2d4 F,100 ft.,burn 1d4,20 charges,10,1,"--",TRUE
  "Infinity Rifle, Tactical",Laser,3,"1,300",1d6 F,40 ft.,"--",20 charges,1,1,boost 1d6,TRUE
  "Excavation Laser, Light",Laser,4,"2,050",1d10 F,60 ft.,"--",40 charges,2,2,"penetrating, professional (mining)",TRUE
  "Serpent Laser, Corona",Laser,5,"2,700",2d6 F,100 ft.,burn 2d4,40 charges,20,1,"--",TRUE
  "Laser Rifle, Corona",Laser,6,"4,650",2d6 F,120 ft.,burn 1d6,40 charges,1,1,"--",TRUE
  "Infinity Rifle, Advanced",Laser,7,"6,100",2d4 F,60 ft.,"--",20 charges,1,1,boost 2d4,TRUE
  "Serpent Laser, Aphelion",Laser,8,"8,800",2d8 F,120 ft.,burn 3d4,40 charges,20,1,"--",TRUE
  "Laser Rifle, Aphelion",Laser,9,"14,300",3d6 F,120 ft.,burn 1d6,40 charges,1,1,"--",TRUE
  "Infinity Rifle, Elite",Laser,10,"17,100",2d6 F,80 ft.,"--",20 charges,1,1,boost 2d6,TRUE
  "Autobeam Rifle, Tactical",Laser,11,"26,900",5d4 F,60 ft.,burn 2d4,40 charges,4,2,automatic,TRUE
  "Excavation Laser, Medium",Laser,12,"36,000",3d10 F,60 ft.,"--",40 charges,2,2,"penetrating, professional (mining)",TRUE
  "Laser Rifle, Perihelion",Laser,13,"53,800",5d6 F,130 ft.,burn 2d6,100 charges,2,1,"--",TRUE
  "Serpent Laser, Perihelion",Laser,14,"66,000",3d12 F,120 ft.,burn 4d4,40 charges,20,1,"--",TRUE
  "Autobeam Rifle, Advanced",Laser,15,"95,500",7d4 F,60 ft.,burn 3d4,100 charges,10,2,automatic,TRUE
  "Infinity Rifle, Paragon",Laser,16,"155,000",4d6 F,100 ft.,"--",20 charges,1,1,boost 4d6,TRUE
  "Laser Rifle, Parallax",Laser,17,"248,000",8d6 F,150 ft.,burn 4d6,100 charges,2,1,"--",TRUE
  "Excavation Laser, Heavy",Laser,18,"380,000",6d10 F,60 ft.,"--",80 charges,4,2,"penetrating, professional (mining)",TRUE
  "Autobeam Rifle, Elite",Laser,19,"548,100",12d4 F,60 ft.,burn 5d4,100 charges,5,2,automatic,TRUE
  "Laser Rifle, Zenith",Laser,20,"722,000",11d6 F,150 ft.,burn 5d6,100 charges,2,1,"--",TRUE
  "Plasma Bolter, Tactical",Plasma,1,260,1d10 E & F,40 ft.,"--",20 charges,4,2,unwieldy,TRUE
  "Nova Rifle, Red Star",Plasma,2,940,1d6 E & F,30 ft.,blind,20 charges,2,1,"line, unwieldy",TRUE
  "Plasma Fork, 12-Notch",Plasma,3,"1,290",1d8 E & F,60 ft.,knockdown,20 charges,1,1,boost 1d4,TRUE
  "Microfusion Rifle, Light",Plasma,4,"2,350",1d8 E & F,15 ft.,irradiate,40 charges,4,1,"blast, radioactive, unwieldy",TRUE
  "Plasma Bolter, Advanced",Plasma,5,"3,010",2d8 E & F,60 ft.,wound,40 charges,8,2,unwieldy,TRUE
  "Plasma Rifle, Red Star",Plasma,6,"4,600",1d10 E & F,40 ft.,burn 1d4,40 charges,4,2,"line, unwieldy",TRUE
  "Nova Rifle, Yellow Star",Plasma,7,"6,800",2d6 E & F,60 ft.,blind,40 charges,4,1,"line, unwieldy",TRUE
  "Plasma Fork, 15-Notch",Plasma,8,"8,850",1d10 E & F,80 ft.,knockdown,20 charges,1,1,boost 1d10,TRUE
  "Plasma Bolter, Elite",Plasma,9,"14,000",3d10 E & F,60 ft.,wound,40 charges,4,2,unwieldy,TRUE
  "Plasma Rifle, Yellow Star",Plasma,10,"16,800",2d10 E & F,40 ft.,burn 1d8,40 charges,4,2,"line, unwieldy",TRUE
  "Nova Rifle, White Star",Plasma,11,"25,300",3d6 E & F,80 ft.,blind,40 charges,4,1,"line, unwieldy",TRUE
  "Microfusion Rifle, Medium",Plasma,12,"40,800",3d8 E & F,30 ft.,irradiate,40 charges,4,1,"blast, radioactive, unwieldy",TRUE
  "Plasma Caster, White Star",Plasma,13,"49,100",3d10 E & F,80 ft.,burn 1d10,100 charges,5,2,boost 1d10,TRUE
  "Plasma Fork, 19-Notch",Plasma,14,"64,800",3d10 E & F,80 ft.,knockdown,40 charges,2,1,boost 2d10,TRUE
  "Plasma Rifle, White Star",Plasma,15,"126,600",4d10 E & F,60 ft.,burn 2d8,40 charges,4,2,"line, unwieldy",TRUE
  "Plasma Bolter, Paragon",Plasma,16,"170,000",9d8 E & F,60 ft.,wound,80 charges,4,2,unwieldy,TRUE
  "Plasma Caster, Blue Star",Plasma,17,"275,000",5d10 E & F,80 ft.,burn 2d10,200 charges,10,2,boost 2d10,TRUE
  "Microfusion Rifle, Heavy",Plasma,18,"410,000",5d8 E & F,40 ft.,irradiate,40 charges,4,1,"blast, radioactive, unwieldy",TRUE
  "Plasma Fork, 22-Notch",Plasma,19,"750,000",6d10 E & F,100 ft.,knockdown,40 charges,2,1,boost 3d10,TRUE
  "Plasma Rifle, Blue Star",Plasma,20,"935,000",8d10 E & F,100 ft.,burn 4d8,100 charges,10,2,"line, unwieldy",TRUE
  "Hunting Rifle",Projectile,1,240,1d8 P,90 ft.,"--",6 rounds,1,1,analog,TRUE
  "Scattergun, Utility",Projectile,1,235,1d4 P,15 ft.,"--",4 shells,1,1,"analog, blast",TRUE
  "Autotarget Rifle",Projectile,2,755,1d6 P,60 ft.,"--",10 rounds,1,2,"analog, automatic",TRUE
  "Acid Dart Rifle, Tactical",Projectile,2,485,1d8 A & P,80 ft.,corrode 1d4,10 darts,1,1,analog,TRUE
  "Cinder Rifle, Truth-Sequence",Projectile,2,700,1d8 P,60 ft.,burn 1d6,10 rounds,1,2,"--",TRUE
  "Crossbolter, Tactical",Projectile,2,475,1d10 P,70 ft.,"--",1 arrow,1,2,"Analog, unwieldy",TRUE
  "Shield Rifle, Tactical",Projectile,2,900,1d8 E & P,80 ft.,Arc 1d4 ,12 rounds,1,2,Buttressing ,TRUE
  "Huchket Rifle",Projectile,3,"1,400",1d10 P,80 ft.,wound,6 rounds,1,1,analog,TRUE
  "Aeon Guard, Assault Rifle",Projectile,3,"1,400",1d8 P,80 ft.,"--",12 rounds,1,1,automatic,FALSE
  "Kalo Shredder, Slipstream-Class",Projectile,3,"1,610",1d6 S,30 ft.,bleed 1d4,8 flechettes,1,1,"analog, automatic, underwater",TRUE
  "Rail Gun, Tactical",Projectile,3,"1,150",1d8 P,60 ft.,"--",12 rounds,1,1,automatic,TRUE
  "Breaching Gun, Utility",Projectile,4,"2,350",1d10 P,20 ft.,knockdown,4 shells,1,1,"analog, breach, penetrating",TRUE
  "Vivara Rifle, Low-Flux",Projectile,4,"2,100",1d8 P,50 ft.,"--",6,1,1,Breakdown,TRUE
  "Rocket Rifle",Projectile,5,"3,010",1d12 B,80 ft.,"--",5 mini-rockets,1,1,"analog, unwieldy",TRUE
  "Rail Gun, Advanced",Projectile,6,"3,770",1d10 P,60 ft.,"--",15 rounds,1,1,automatic,TRUE
  "Acid Dart Rifle, Dual",Projectile,7,"6,900",2d8 A & P,90 ft.,corrode 2d4,24 darts,2,1,analog,TRUE
  "Aeon Guard, Accelerator Rifle",Projectile,7,"7,500",3d4 P,60 ft.,"--",16 rounds,1,2,automatic,FALSE
  "Breaching Gun, Snub",Projectile,7,"6,800",2d10 P,20 ft.,knockdown,8 shells,2,1,"analog, breach, penetrating",TRUE
  "Cinder Rifle, Salvation-Sequence",Projectile,7,"6,000",2d8 P,60 ft.,burn 1d6,14 rounds,1,2,"--",TRUE
  "Kalo Shredder, Cascade-Class",Projectile,7,"6,630",2d6 S,40 ft.,bleed 1d6,16 flechettes,1,1,"analog, automatic, underwater",TRUE
  "Seeker Rifle, Tactical",Projectile,7,"6,030",2d8 P,100 ft.,"--",8 rounds,1,1,analog,TRUE
  "Shield Rifle, Advanced",Projectile,7,"6,820",2d8 E & P,80 ft.,Arc 2d4 ,12 rounds,1,2,Buttressing ,TRUE
  "Crossbolter, Dual",Projectile,8,"8,250",2d10 P,70 ft.,"--",4 arrows,2,2,"Analog, unwieldy",TRUE
  "Scattergun, Snub",Projectile,8,"8,300",1d12 P,15 ft.,"--",8 shells,1,1,"analog, blast",TRUE
  "Vivara Rifle, Mid-Flux",Projectile,8,"7,500",2d8 P,60 ft.,"--",6,1,1,Breakdown,TRUE
  "Magnetar Rifle, Tactical",Projectile,9,"11,800",2d8 P,60 ft.,"--",18 rounds,1,2,"analog, automatic",TRUE
  "Combat Rifle",Projectile,10,"16,500",3d8 P,90 ft.,"--",12 rounds,1,1,analog,TRUE
  "Aeon Guard, RPPR",Projectile,10,"21,000",2d12 B,100 ft.,knockdown,12 mini-rockets,1,2,"--",FALSE
  "Breaching Gun, Impact",Projectile,11,"25,300",3d10 P,30 ft.,knockdown,12 shells,2,1,"analog, breach, penetrating",TRUE
  "Cinder Rifle, Valor-Sequence",Projectile,11,"23,700",3d8 P,80 ft.,burn 2d6,20 rounds,1,2,"--",TRUE
  "Kalo Shredder, Torrent-Class",Projectile,11,"26,700",4d6 S,40 ft.,bleed 3d4,24 flechettes,1,1,"analog, automatic, underwater",TRUE
  "Acid Dart Rifle, Complex",Projectile,12,"39,200",4d8 A & P,90 ft.,corrode 4d4,48 darts,4,2,analog,TRUE
  "Scattergun, Impact",Projectile,12,"30,400",2d12 P,15 ft.,"--",12 shells,1,2,"analog, blast",TRUE
  "Shield Rifle, Elite",Projectile,12,"37,000",4d8 E & P,80 ft.,Arc 4d4 ,15 rounds,1,2,Buttressing ,TRUE
  "Vivara Rifle, High-Flux",Projectile,12,"27,600",4d8 P,70 ft.,"--",6,1,1,Breakdown,FALSE
  "Gyrojet Rifle, Tactical",Projectile,13,"54,000",3d12 B,100 ft.,knockdown,12 mini-rockets,1,2,analog,TRUE
  "Magnetar Rifle, Advanced",Projectile,13,"53,700",4d8 P,60 ft.,"--",24 rounds,1,2,"analog, automatic",TRUE
  "Kalo Shredder, Deluge-Class",Projectile,14,"74,300",6d6 S,60 ft.,bleed 4d4,36 flechettes,1,1,"analog, automatic, underwater",TRUE
  "Seeker Rifle, Advanced",Projectile,14,"72,300",6d8 P,100 ft.,"--",18 rounds,1,1,analog,TRUE
  "Breaching Gun, Vortex",Projectile,15,"119,000",6d10 P,30 ft.,knockdown,16 shells,2,1,"analog, breach, penetrating",TRUE
  "Cinder Rifle, Glory-Sequence",Projectile,15,"102,200",6d8 P,80 ft.,burn 2d6,24 rounds,1,2,"--",TRUE
  "Gyrojet Rifle, Advanced",Projectile,15,"122,800",5d12 B,120 ft.,knockdown,12 mini-rockets,1,2,analog,TRUE
  "Scattergun, Vortex",Projectile,15,"91,900",3d12 P,30 ft.,"--",12 shells,1,2,"analog, blast",TRUE
  "Magnetar Rifle, Elite",Projectile,16,"185,100",6d8 P,120 ft.,"--",36 rounds,1,2,"analog, automatic",TRUE
  "Gyrojet Rifle, Elite",Projectile,17,"245,600",6d12 B,120 ft.,knockdown,12 mini-rockets,1,2,analog,TRUE
  "Kalo Shredder, Monsoon-Class",Projectile,17,"784,000",12d6 S,60 ft.,bleed 4d6,48 flechettes,1,1,"analog, automatic, underwater",TRUE
  "Seeker Rifle, Elite",Projectile,17,"242,500",9d8 P,100 ft.,"--",18 rounds,1,1,analog,TRUE
  "Shield Rifle, Paragon",Projectile,17,"264,000",8d8 E & P,80 ft.,Arc 4d8 ,18 rounds,1,2,Buttressing ,TRUE
  "Scattergun, Grapeshot",Projectile,18,"331,000",4d12 P,30 ft.,"--",12 shells,1,2,"analog, blast",TRUE
  "Breaching Gun, Grapeshot",Projectile,19,"509,000",10d10 P,30 ft.,knockdown,20 shells,2,1,"analog, breach, penetrating",TRUE
  "Magnetar Rifle, Paragon",Projectile,19,"612,600",8d8 P,120 ft.,"--",48 rounds,1,2,"analog, automatic",TRUE
  "Gyrojet Rifle, Paragon",Projectile,20,"723,500",8d12 B,120 ft.,knockdown,12 mini-rockets,1,2,analog,TRUE
  "Seeker Rifle, Paragon",Projectile,20,"809,200",12d8 P,100 ft.,"--",24 rounds,1,1,analog,TRUE
  "Pulsecaster Rifle",Shock,1,100,1d6 E,50 ft.,"--",20 charges,1,1,nonlethal,TRUE
  "Arc Emitter, Tactical",Shock,2,750,1d4 E,15 ft.,"--",20 charges,4,1,"blast, stun, unwieldy",TRUE
  "Storm Coil, Live",Shock,3,"1,480",1d6 E,40 ft.,"--",20 charges,5,2,"line, unwieldy",TRUE
  "Polarity Rifle, Static",Shock,4,"2,400",1d8 E,60 ft.,"--",40 charges,2,1,polarize 1d4,TRUE
  "Surgecaster, Standard",Shock,5,"3,300",1d10 E,40 ft.,arc 1d10,20 charges,2,1,"boost 1d6, living",TRUE
  "Arc Rifle, Static",Shock,6,"4,200",1d12 E,70 ft.,arc 1d6,40 charges,1,2,stun,TRUE
  "Storm Coil, Jolt",Shock,7,"6,900",2d6 E,60 ft.,"--",40 charges,8,2,"line, unwieldy",TRUE
  "Charge Emitter, Impulse",Shock,8,"10,900",3d4 E,20 ft.,staggered,20 charges,2,1,"integrated (1 slot), stun",TRUE
  "Arc Emitter, Advanced",Shock,9,"13,200",2d4 E,30 ft.,"--",40 charges,10,1,"blast, stun, unwieldy",TRUE
  "Polarity Rifle, Aurora",Shock,10,"21,000",2d8 E,80 ft.,"--",40 charges,2,1,polarize 1d10,TRUE
  "Arc Rifle, Aurora",Shock,11,"24,500",2d12 E,70 ft.,arc 2d6,40 charges,1,2,stun,TRUE
  "Storm Coil, Impulse",Shock,12,"35,200",4d6 E,80 ft.,"--",80 charges,10,2,"line, unwieldy",TRUE
  "Charge Emitter, Jolt",Shock,13,"57,000",3d10 E,30 ft.,staggered,20 charges,2,1,"integrated (1 slot), stun",TRUE
  "Surgecaster, Advanced",Shock,14,"83,000",3d10 E,60 ft.,arc 2d10,40 charges,2,1,"boost 1d10, living",TRUE
  "Polarity Rifle, Storm",Shock,15,"137,000",4d8 E,80 ft.,"--",40 charges,2,1,polarize 2d8,TRUE
  "Arc Rifle, Storm",Shock,16,"190,300",4d12 E,80 ft.,arc 4d6,80 charges,2,2,stun,TRUE
  "Storm Coil, Surge",Shock,17,"261,000",7d6 E,120 ft.,"--",100 charges,10,2,"line, unwieldy",TRUE
  "Charge Emitter, Surge",Shock,18,"435,000",5d10 E,40 ft.,staggered,80 charges,5,1,"integrated (1 slot), stun",TRUE
  "Arc Rifle, Tempest",Shock,19,"622,000",6d12 E,80 ft.,arc 6d6,100 charges,2,2,stun,TRUE
  "Polarity Rifle, Tempest",Shock,20,"1,000,000",8d8 E,80 ft.,"--",80 charges,2,1,polarize 3d8,TRUE
  "Scrambler Rifle, Termite",Shock,3,"1,520",1d6 E,90 ft.,Confuse,20 charges,2,1,Scramble ,TRUE
  "Trenarii Singing Coil, Solo",Shock,4,"2,200",1d4 E,60 ft.,"--",20 charges,5,2,"Line, unwieldy, Professional (Musician)",TRUE
  "Scrambler Rifle, Cockroach",Shock,8,"9,850",2d6 E,90 ft.,Confuse,20 charges,2,1,Scramble ,TRUE
  "Trenarii Singing Coil, Duet",Shock,8,"9,700",2d4 E,90 ft.,"--",40 charges,8,2,"Line, unwieldy, Professional (Musician)",TRUE
  "Scrambler Rifle, Dragonfly",Shock,11,"24,900",3d6 E,90 ft.,Confuse,20 charges,2,1,Scramble ,TRUE
  "Trenarii Singing Coil, Quartet",Shock,13,"50,000",4d4 E,120 ft.,Deafen ,80 charges,10,2,"Line, unwieldy, Professional (Musician)",TRUE
  "Scrambler Rifle, Locust",Shock,14,"82,600",4d6 E,90 ft.,Confuse,20 charges,2,1,Scramble ,TRUE
  "Trenarii Singing Coil, Orchestra",Shock,18,"380,000",7d4 E,200 ft.,Deafen ,100 charges,10,2,"Line, unwieldy, Professional (Musician)",TRUE
  "Shout Rifle",Sonic,1,450,1d4 So,30 ft.,demoralize,20 charges,4,1,"blast, nonlethal, unwieldy",TRUE
  "Boomer Rifle, Tremor",Sonic,2,520,1d8 So,40 ft.,deafen,12 shells,3,1,analog,TRUE
  "Chordpocalypse, Thunderstrike",Sonic,2,765,1d6 So,30 ft.,Deafen ,20 charges,1,1,"Boost (1d4), polarize (1d4), professional (musician) ",TRUE
  "Blindmark Rifle, Thunderstrike",Sonic,3,"1,400",2d4 So,60 ft.,"--",20 charges,2,1,"echo, stun",TRUE
  "Vortex Rifle, Pulse",Sonic,3,"1,400",2d4 So,60 ft.,Nauseate ,20 charges,1,1,"Breach, underwater ",TRUE
  "Staccato Rifle, Pulse",Sonic,4,"2,000",1d10 So,40 ft.,deafen,40 charges,1,2,automatic,TRUE
  "Sonic Rifle, Thunderstrike",Sonic,5,"3,400",1d10 So,50 ft.,deafen,40 charges,2,1,"--",TRUE
  "Boomer Rifle, Rumbler",Sonic,6,"4,100",2d6 So,40 ft.,deafen,12 shells,4,1,analog,TRUE
  "Chordpocalypse, Shattering",Sonic,6,"4,280",1d8 So,30 ft.,Deafen ,20 charges,1,1,"Boost (1d6), polarize (1d6), professional (musician) ",TRUE
  "Vortex Rifle, Surge",Sonic,6,"4,150",2d6 So,60 ft.,Nauseate ,20 charges,1,1,"Breach, underwater ",TRUE
  "Streetsweeper, Thunderstrike",Sonic,7,"7,150",1d10 So,50 ft.,knockdown,40 charges,5,2,boost 1d6,TRUE
  "Blindmark Rifle, LFD",Sonic,8,"9,800",2d8 So,80 ft.,"--",40 charges,5,1,"echo, stun",TRUE
  "Staccato Rifle, Surge",Sonic,9,"13,000",2d10 So,60 ft.,deafen,40 charges,2,2,automatic,TRUE
  "Chordpocalypse, Psychedelic",Sonic,10,"18,400",2d8 So,30 ft.,Deafen ,40 charges,2,1,"Boost (1d8), polarize (1d8), professional (musician) ",TRUE
  "Sonic Rifle, LFD",Sonic,10,"17,000",2d10 So,50 ft.,deafen,40 charges,2,2,"--",TRUE
  "Boomer Rifle, Concussive",Sonic,11,"24,000",4d6 So,40 ft.,knockdown,15 shells,5,1,analog,TRUE
  "Streetsweeper, LFD",Sonic,12,"39,300",3d10 So,50 ft.,knockdown,40 charges,5,2,boost 1d8,TRUE
  "Vortex Rifle, Drum",Sonic,12,"38,000",4d6 So,60 ft.,Nauseate ,20 charges,1,1,"Breach, underwater ",TRUE
  "Blindmark Rifle, HFD",Sonic,13,"51,000",4d8 So,100 ft.,sicken,40 charges,8,1,"echo, stun",TRUE
  "Chordpocalypse, Banshee",Sonic,14,"72,000",4d8 So,30 ft.,Deafen ,40 charges,2,1,"Boost (2d6), polarize (2d6), professional (musician) ",TRUE
  "Sonic Rifle, HFD",Sonic,14,"80,200",4d10 So,50 ft.,deafen,80 charges,4,2,"--",TRUE
  "Staccato Rifle, Drum",Sonic,15,"107,000",4d10 So,60 ft.,deafen,40 charges,2,2,automatic,TRUE
  "Streetsweeper, HFD",Sonic,16,"195,000",5d10 So,50 ft.,knockdown,40 charges,4,2,boost 1d10,TRUE
  "Boomer Rifle, Shockwave",Sonic,17,"230,000",8d6 So,40 ft.,knockdown,20 shells,5,1,analog,TRUE
  "Vortex Rifle, Hammer",Sonic,17,"250,000",8d6 So,60 ft.,Nauseate ,40 charges,2,1,"Breach, underwater ",TRUE
  "Chordpocalypse, Transcendent",Sonic,18,"372,000",7d8 So,40 ft.,Deafen ,80 charges,2,1,"Boost (2d8), polarize (2d8), professional (musician) ",TRUE
  "Sonic Rifle, Banshee",Sonic,18,"364,500",6d10 So,50 ft.,deafen,100 charges,5,2,"--",TRUE
  "Blindmark Rifle, Banshee",Sonic,19,"585,000",8d8 So,120 ft.,sicken,80 charges,10,1,"echo, stun",TRUE
  "Staccato Rifle, Hammer",Sonic,20,"810,000",8d10 So,80 ft.,deafen,80 charges,4,2,automatic,TRUE
}