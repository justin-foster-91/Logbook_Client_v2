
let templates = [
  {
    "ablativeArmorId": null,
    "ablativeArmorByPosition": {
      "forward": 0,
      "aft": 0,
      "port": 0,
      "starboard": 0
    },
    "antiHackingSystemsId": null,
    "antiPersonnelWeaponId": null,
    "armorId": "Mk 4",
    "armorMaterialId": null,
    "computerCountermeasures": {
      "alarm": false,
      "fakeShell": false,
      "feedback": false,
      "firewall": false,
      "lockout": false,
      "shockGridId": null,
      "wipe": false
    },
    "computerId": "Mk 1 Duonode",
    "crewQuartersId": "Common",
    "crewSkills": {
      "captain": {
        "countOfficers": 0,
        "hasRole": false,
        "skills": {
          "bluff": {
            "modifier": 0,
            "ranks": 0
          },
          "computers": {
            "modifier": 0,
            "ranks": 0
          },
          "diplomacy": {
            "modifier": 0,
            "ranks": 0
          },
          "engineering": {
            "modifier": 0,
            "ranks": 0
          },
          "gunnery": {
            "modifier": 0
          },
          "intimidate": {
            "modifier": 0,
            "ranks": 0
          },
          "piloting": {
            "modifier": 0,
            "ranks": 0
          },
          "perception": {
            "modifier": 0,
            "ranks": 0
          }
        }
      },
      "engineer": {
        "countOfficers": 1,
        "countOfficerCrew": 0,
        "hasRole": false,
        "skills": {
          "engineering": {
            "modifier": 0,
            "ranks": 0
          },
          "computers": {
            "modifier": 0,
            "ranks": 0
          }
        }
      },
      "gunner": {
        "countOfficers": 1,
        "countOfficerCrew": 0,
        "hasRole": true,
        "skills": {
          "computers": {
            "modifier": "3",
            "ranks": "2"
          },
          "engineering": {
            "modifier": "5",
            "ranks": "2"
          },
          "gunnery": {
            "modifier": "6"
          }
        }
      },
      "pilot": {
        "countOfficers": 1,
        "countOfficerCrew": 0,
        "hasRole": true,
        "skills": {
          "computers": {
            "modifier": 0,
            "ranks": 0
          },
          "diplomacy": {
            "modifier": 0,
            "ranks": 0
          },
          "engineering": {
            "modifier": 0,
            "ranks": 0
          },
          "gunnery": {
            "modifier": "6"
          },
          "intimidate": {
            "modifier": 0,
            "ranks": "0"
          },
          "piloting": {
            "modifier": "10",
            "ranks": "2"
          }
        }
      },
      "scienceOfficer": {
        "countOfficers": 1,
        "countOfficerCrew": 0,
        "hasRole": false,
        "skills": {
          "computers": {
            "modifier": 0,
            "ranks": 0
          },
          "life-science": {
            "modifier": 0,
            "ranks": 0
          },
          "physical-science": {
            "modifier": 0,
            "ranks": 0
          }
        }
      },
      "chiefMate": {
        "countOfficers": 1,
        "countOfficerCrew": 0,
        "hasRole": false,
        "skills": {
          "acrobatics": {
            "modifier": 0,
            "ranks": 0
          },
          "athletics": {
            "modifier": 0,
            "ranks": 0
          }
        }
      },
      "magicOfficer": {
        "countOfficers": 1,
        "countOfficerCrew": 0,
        "hasRole": false,
        "skills": {
          "mysticism": {
            "modifier": 0,
            "ranks": 0
          }
        }
      }
    },
    "ctTim": 0,
    "ctTimAll": 0,
    "customFrameBaseId": "Light Freighter",
    "customComponents": [],
    "dedicatedComputerId": "Basic Computer",
    "defensiveCountermeasuresId": "Mk 3",
    "defensiveCountermeasuresMaterialId": null,
    "deflectorShieldId": null,
    "driftEngineId": "Signal Basic",
    "expansionBayIds": [
      null
    ],
    "fortifiedHullId": null,
    "frameId": "Fighter",
    "hasAlgalShielding": 0,
    "hasAutoDestruct": 0,
    "hasBiometricLocks": true,
    "hasColonyShipFramework": 0,
    "hasConsciousnessUplink": 0,
    "hasCrew": 1,
    "hasDataNet": 0,
    "hasEmergencyAccelerator": 0,
    "hasHiveJoining": 0,
    "hasHolographicMantle": 0,
    "hasPowersap": 0,
    "hasReconfigurationSystem": 0,
    "hasRootSystem": 0,
    "hasSelfDestructSystem": 0,
    "hasSpaceStationFramework": 0,
    "isSetDefaultCrewSkillValues": 0,
    "isUseStrictRules": false,
    "powerCoreIds": [
      "Pulse Brown"
    ],
    "powerCoreSpecialMaterials": [
      null
    ],
    "reinforcedBulkheadId": null,
    "roboticAppendageId": null,
    "secondaryComputerId": "Basic Computer",
    "sensorsId": "Basic Medium Range",
    "sensorsMaterialId": null,
    "shieldType": "shields",
    "shieldsByPosition": {
      "forward": 10,
      "aft": 10,
      "port": 10,
      "starboard": 10
    },
    "shieldsId": "Basic 40",
    "shipConcept": "From escorting corporate mining expeditions to providing an orbital guard for fledgling colonies operating outside Steward protection, variations of the Dyad have defended against space pirates and raiders for generations.",
    "shipName": "AAC Dyad",
    "sources": {
      "pw": true,
      "som": true
    },
    "thrustersId": "T10",
    "thrustersMaterialId": null,
    "thrustersBoosterId": null,
    "thrustersBoosterMaterialId": null,
    "tierId": "2",
    "version": "1.0.1",
    "viId": null,
    "viHoloProjectorId": null,
    "viSkillExpanderId": null,
    "weaponMounts": {
      "forward": [
        {
          "weaponId": "light-buster-cannon",
          "weight": "light",
          "templateWeight": "light",
          "isFromTemplate": true,
          "canBeLinked": false,
          "isLinked": false,
          "specialMaterial": null,
          "hasOrbitalDiscount": false
        },
        {
          "weaponId": "light-plasma-torpedo-launcher",
          "weight": "light",
          "templateWeight": "light",
          "isFromTemplate": true,
          "canBeLinked": false,
          "isLinked": false,
          "specialMaterial": null,
          "hasOrbitalDiscount": false
        }
      ],
      "aft": [
        {
          "weaponId": "flak-thrower",
          "weight": "light",
          "templateWeight": "light",
          "isFromTemplate": true,
          "canBeLinked": false,
          "isLinked": false,
          "specialMaterial": null,
          "hasOrbitalDiscount": false
        }
      ],
      "port": [],
      "starboard": [],
      "turret": []
    },
    "ctNetworkNodes": 0
  },
  {
    "ablativeArmorId": null,
    "ablativeArmorByPosition": {
      "forward": 0,
      "aft": 0,
      "port": 0,
      "starboard": 0
    },
    "antiHackingSystemsId": null,
    "antiPersonnelWeaponId": null,
    "armorId": "Mk 5",
    "armorMaterialId": null,
    "computerCountermeasures": {
      "alarm": false,
      "fakeShell": false,
      "feedback": false,
      "firewall": false,
      "lockout": false,
      "shockGridId": null,
      "wipe": false
    },
    "computerId": "Mk 3 Trinode",
    "crewQuartersId": "Common",
    "crewSkills": {
      "captain": {
        "countOfficers": 0,
        "hasRole": true,
        "skills": {
          "bluff": {
            "modifier": "11",
            "ranks": "14"
          },
          "computers": {
            "modifier": 0,
            "ranks": 0
          },
          "diplomacy": {
            "modifier": "11",
            "ranks": "14"
          },
          "engineering": {
            "modifier": 0,
            "ranks": 0
          },
          "gunnery": {
            "modifier": 0
          },
          "intimidate": {
            "modifier": "16",
            "ranks": "14"
          },
          "perception": {
            "modifier": 0,
            "ranks": 0
          },
          "piloting": {
            "modifier": "11",
            "ranks": "14"
          }
        }
      },
      "engineer": {
        "countOfficers": "3",
        "countOfficerCrew": "10",
        "hasRole": true,
        "skills": {
          "computers": {
            "modifier": 0,
            "ranks": 0
          },
          "engineering": {
            "modifier": "16",
            "ranks": "14"
          }
        }
      },
      "gunner": {
        "countOfficers": "3",
        "countOfficerCrew": "10",
        "hasRole": true,
        "skills": {
          "computers": {
            "modifier": 0,
            "ranks": 0
          },
          "engineering": {
            "modifier": 0,
            "ranks": 0
          },
          "gunnery": {
            "modifier": "20"
          }
        }
      },
      "pilot": {
        "countOfficers": "2",
        "countOfficerCrew": "10",
        "hasRole": true,
        "skills": {
          "computers": {
            "modifier": 0,
            "ranks": 0
          },
          "diplomacy": {
            "modifier": 0,
            "ranks": 0
          },
          "engineering": {
            "modifier": 0,
            "ranks": 0
          },
          "gunnery": {
            "modifier": 0
          },
          "intimidate": {
            "modifier": 0,
            "ranks": 0
          },
          "piloting": {
            "modifier": "11",
            "ranks": "14"
          }
        }
      },
      "scienceOfficer": {
        "countOfficers": "2",
        "countOfficerCrew": "10",
        "hasRole": true,
        "skills": {
          "computers": {
            "modifier": "9",
            "ranks": "14"
          },
          "life-science": {
            "modifier": 0,
            "ranks": 0
          },
          "physical-science": {
            "modifier": 0,
            "ranks": 0
          }
        }
      },
      "chiefMate": {
        "countOfficers": 1,
        "countOfficerCrew": 0,
        "hasRole": false,
        "skills": {
          "acrobatics": {
            "modifier": 0,
            "ranks": 0
          },
          "athletics": {
            "modifier": 0,
            "ranks": 0
          }
        }
      },
      "magicOfficer": {
        "countOfficers": 1,
        "countOfficerCrew": 0,
        "hasRole": false,
        "skills": {
          "mysticism": {
            "modifier": 0,
            "ranks": 0
          }
        }
      }
    },
    "ctTim": 0,
    "ctTimAll": 0,
    "customFrameBaseId": "Light Freighter",
    "customComponents": [],
    "dedicatedComputerId": "Basic Computer",
    "defensiveCountermeasuresId": "Mk 5",
    "defensiveCountermeasuresMaterialId": null,
    "deflectorShieldId": null,
    "driftEngineId": "Signal Basic",
    "expansionBayIds": [
      "Combat Training Facility Elite",
      "Cargo Hold",
      "Hangar Bay",
      "Hangar Bay",
      "Tech Workshop"
    ],
    "fortifiedHullId": null,
    "frameId": "Carrier",
    "hasAlgalShielding": 0,
    "hasAutoDestruct": 0,
    "hasBiometricLocks": 0,
    "hasColonyShipFramework": 0,
    "hasConsciousnessUplink": 0,
    "hasCrew": 1,
    "hasDataNet": 0,
    "hasEmergencyAccelerator": 0,
    "hasHiveJoining": 0,
    "hasHolographicMantle": 0,
    "hasPowersap": 0,
    "hasReconfigurationSystem": 0,
    "hasRootSystem": 0,
    "hasSelfDestructSystem": 0,
    "hasSpaceStationFramework": 0,
    "isSetDefaultCrewSkillValues": 0,
    "isUseStrictRules": 1,
    "powerCoreIds": [
      "Gateway Ultra",
      null,
      null
    ],
    "powerCoreSpecialMaterials": [
      null,
      null,
      null
    ],
    "reinforcedBulkheadId": null,
    "roboticAppendageId": null,
    "secondaryComputerId": "Basic Computer",
    "sensorsId": "Basic Long Range",
    "sensorsMaterialId": null,
    "shieldType": "shields",
    "shieldsByPosition": {
      "forward": 120,
      "aft": 120,
      "port": 120,
      "starboard": 120
    },
    "shieldsId": "Heavy 480",
    "shipConcept": "A product of the Allied Arms Corporation (AAC) of Triaxus, the Hoardmaster is the flagship of the Skyfire Legion’s mercenary fleet. The aptly named carrier can launch over a dozen smaller craft into battle. Designed to operate in tandem with AAC Dyads, this specialized carrier has experienced a surge in popularity during the past 50 years.",
    "shipName": "AAC Hoardmaster",
    "sources": {
      "pw": true,
      "som": true
    },
    "thrustersId": "G4",
    "thrustersMaterialId": null,
    "thrustersBoosterId": null,
    "thrustersBoosterMaterialId": null,
    "tierId": "14",
    "version": "1.0.1",
    "viId": null,
    "viHoloProjectorId": null,
    "viSkillExpanderId": null,
    "weaponMounts": {
      "forward": [
        {
          "weaponId": "mega-teleportation-beam",
          "weight": "capital",
          "templateWeight": "capital",
          "isFromTemplate": true,
          "canBeLinked": false,
          "isLinked": false,
          "canHaveOrbitalDiscount": false,
          "hasOrbitalDiscount": false,
          "specialMaterial": null
        }
      ],
      "aft": [],
      "port": [
        {
          "weaponId": "twin-laser",
          "weight": "heavy",
          "templateWeight": "heavy",
          "isFromTemplate": true,
          "canBeLinked": false,
          "isLinked": false,
          "canHaveOrbitalDiscount": false,
          "hasOrbitalDiscount": false,
          "specialMaterial": null
        },
        {
          "weaponId": null,
          "weight": "heavy",
          "templateWeight": "heavy",
          "isFromTemplate": true,
          "canBeLinked": false,
          "isLinked": false,
          "canHaveOrbitalDiscount": false,
          "hasOrbitalDiscount": false,
          "specialMaterial": null
        },
        {
          "weaponId": null,
          "weight": "heavy",
          "templateWeight": "heavy",
          "isFromTemplate": true,
          "canBeLinked": false,
          "isLinked": false,
          "canHaveOrbitalDiscount": false,
          "hasOrbitalDiscount": false,
          "specialMaterial": null
        }
      ],
      "starboard": [
        {
          "weaponId": "twin-laser",
          "weight": "heavy",
          "templateWeight": "heavy",
          "isFromTemplate": true,
          "canBeLinked": false,
          "isLinked": false,
          "canHaveOrbitalDiscount": false,
          "hasOrbitalDiscount": false,
          "specialMaterial": null
        },
        {
          "weaponId": null,
          "weight": "heavy",
          "templateWeight": "heavy",
          "isFromTemplate": true,
          "canBeLinked": false,
          "isLinked": false,
          "canHaveOrbitalDiscount": false,
          "hasOrbitalDiscount": false,
          "specialMaterial": null
        },
        {
          "weaponId": null,
          "weight": "heavy",
          "templateWeight": "heavy",
          "isFromTemplate": true,
          "canBeLinked": false,
          "isLinked": false,
          "canHaveOrbitalDiscount": false,
          "hasOrbitalDiscount": false,
          "specialMaterial": null
        }
      ],
      "turret": [
        {
          "weaponId": "laser-net",
          "weight": "light",
          "templateWeight": "light",
          "isFromTemplate": true,
          "canBeLinked": false,
          "isLinked": false,
          "canHaveOrbitalDiscount": false,
          "hasOrbitalDiscount": false,
          "specialMaterial": null
        },
        {
          "weaponId": null,
          "weight": "light",
          "templateWeight": "light",
          "isFromTemplate": true,
          "canBeLinked": false,
          "isLinked": false,
          "canHaveOrbitalDiscount": false,
          "hasOrbitalDiscount": false,
          "specialMaterial": null
        }
      ]
    },
    "ctNetworkNodes": 0
  },
  {
    "version": "1.0.1",
    "hasCrew": true,
    "isSetDefaultCrewSkillValues": 0,
    "isUseStrictRules": true,
    "shipName": "Atech Immortal",
    "shipConcept": "Severe and pugnacious, the Immortal is the workhorse capital ship of military fleets like those of the Stewards and the Knights of Golarion. Thickly armored and loaded with weapons, this cruiser rarely needs to fire a shot in most conflicts, as its mere appearance in-system can stop a conflict cold and send all but the most militant threats running for the safety of the Drift.",
    "tierId": "10",
    "frameId": "Cruiser",
    "powerCoreIds": [
      "Nova Ultra",
      null
    ],
    "thrustersId": "H8",
    "armorId": "Mk 4",
    "computerId": "Mk 3 Duonode",
    "crewQuartersId": "Good",
    "defensiveCountermeasuresId": "Mk 4",
    "driftEngineId": "Signal Basic",
    "expansionBayIds": [
      "Cargo Hold",
      "Cargo Hold",
      "Cargo Hold",
      "Life Boats",
      "Medical Bay",
      "Shuttle Bay"
    ],
    "expansionBaysCountUsed": 0,
    "antiHackingSystemsId": null,
    "antiPersonnelWeaponId": null,
    "hasBiometricLocks": 0,
    "computerCountermeasures": {
      "alarm": false,
      "fakeShell": false,
      "feedback": false,
      "firewall": false,
      "lockout": false,
      "shockGridId": null,
      "wipe": false
    },
    "hasSelfDestructSystem": 0,
    "hasDataNet": 0,
    "hasHiveJoining": 0,
    "sensorsId": "Basic Long Range",
    "shieldsId": "Medium 200",
    "weaponMounts": {
      "forward": [
        {
          "weaponId": "particle-beam-cannon",
          "weight": "capital",
          "templateWeight": "capital",
          "isFromTemplate": true,
          "canBeLinked": false,
          "isLinked": false,
          "specialMaterial": null,
          "hasOrbitalDiscount": false
        }
      ],
      "aft": [],
      "port": [
        {
          "weaponId": "light-plasma-cannon",
          "weight": "light",
          "templateWeight": "light",
          "isFromTemplate": true,
          "canBeLinked": false,
          "isLinked": false,
          "specialMaterial": null,
          "hasOrbitalDiscount": false
        }
      ],
      "starboard": [
        {
          "weaponId": "light-plasma-cannon",
          "weight": "light",
          "templateWeight": "light",
          "isFromTemplate": true,
          "canBeLinked": false,
          "isLinked": false,
          "specialMaterial": null,
          "hasOrbitalDiscount": false
        }
      ],
      "turret": [
        {
          "weaponId": "heavy-plasma-torpedo-launcher",
          "weight": "heavy",
          "templateWeight": "heavy",
          "isFromTemplate": true,
          "canBeLinked": false,
          "isLinked": false,
          "specialMaterial": null,
          "hasOrbitalDiscount": false
        }
      ]
    },
    "crewSkills": {
      "captain": {
        "count": 1,
        "countOfficers": 0,
        "hasRole": 1,
        "skills": {
          "bluff": {
            "modifier": 9,
            "ranks": 10
          },
          "computers": {
            "modifier": 9,
            "ranks": 10
          },
          "diplomacy": {
            "modifier": 9,
            "ranks": 10
          },
          "engineering": {
            "modifier": 9,
            "ranks": 10
          },
          "gunnery": {
            "modifier": 19
          },
          "intimidate": {
            "modifier": 9,
            "ranks": 10
          },
          "piloting": {
            "modifier": 0,
            "ranks": 0
          },
          "perception": {
            "modifier": 0,
            "ranks": 0
          }
        }
      },
      "engineer": {
        "hasRole": 1,
        "skills": {
          "engineering": {
            "modifier": 9,
            "ranks": 10
          },
          "computers": {
            "modifier": 0,
            "ranks": 0
          }
        },
        "countOfficers": 1,
        "countOfficerCrew": 20
      },
      "gunner": {
        "skills": {
          "gunnery": {
            "modifier": 24
          },
          "computers": {
            "modifier": 0,
            "ranks": 0
          },
          "engineering": {
            "modifier": 0,
            "ranks": 0
          }
        },
        "hasRole": 1,
        "countOfficers": 3,
        "countOfficerCrew": 10
      },
      "pilot": {
        "skills": {
          "computers": {
            "modifier": 0,
            "ranks": 0
          },
          "gunnery": {
            "modifier": 0
          },
          "piloting": {
            "modifier": 9,
            "ranks": 10
          },
          "diplomacy": {
            "modifier": 0,
            "ranks": 0
          },
          "engineering": {
            "modifier": 0,
            "ranks": 0
          },
          "intimidate": {
            "modifier": 0,
            "ranks": 0
          }
        },
        "hasRole": 1,
        "countOfficers": 1,
        "countOfficerCrew": 3
      },
      "scienceOfficer": {
        "skills": {
          "computers": {
            "modifier": 9,
            "ranks": 10
          },
          "life-science": {
            "modifier": 0,
            "ranks": 0
          },
          "physical-science": {
            "modifier": 0,
            "ranks": 0
          }
        },
        "hasRole": 1,
        "countOfficers": 1,
        "countOfficerCrew": 0
      },
      "chiefMate": {
        "countOfficers": 1,
        "countOfficerCrew": 0,
        "hasRole": false,
        "skills": {
          "acrobatics": {
            "modifier": 0,
            "ranks": 0
          },
          "athletics": {
            "modifier": 0,
            "ranks": 0
          }
        }
      },
      "magicOfficer": {
        "countOfficers": 1,
        "countOfficerCrew": 0,
        "hasRole": false,
        "skills": {
          "mysticism": {
            "modifier": 0,
            "ranks": 0
          }
        }
      }
    },
    "ablativeArmorId": null,
    "ablativeArmorByPosition": {
      "forward": 0,
      "aft": 0,
      "port": 0,
      "starboard": 0
    },
    "armorMaterialId": null,
    "ctTim": 0,
    "ctTimAll": 0,
    "customFrameBaseId": "Light Freighter",
    "customComponents": [],
    "dedicatedComputerId": "Basic Computer",
    "defensiveCountermeasuresMaterialId": null,
    "deflectorShieldId": null,
    "fortifiedHullId": null,
    "hasAlgalShielding": 0,
    "hasAutoDestruct": 0,
    "hasColonyShipFramework": 0,
    "hasConsciousnessUplink": 0,
    "hasEmergencyAccelerator": 0,
    "hasHolographicMantle": 0,
    "hasPowersap": 0,
    "hasReconfigurationSystem": 0,
    "hasRootSystem": 0,
    "hasSpaceStationFramework": 0,
    "powerCoreSpecialMaterials": [
      null,
      null
    ],
    "ctNetworkNodes": 0,
    "reinforcedBulkheadId": null,
    "roboticAppendageId": null,
    "secondaryComputerId": "Basic Computer",
    "sensorsMaterialId": null,
    "shieldType": "shields",
    "shieldsByPosition": {
      "forward": 50,
      "aft": 50,
      "port": 50,
      "starboard": 50
    },
    "sources": {
      "pw": true,
      "som": true
    },
    "thrustersMaterialId": null,
    "thrustersBoosterId": null,
    "thrustersBoosterMaterialId": null,
    "viId": null,
    "viHoloProjectorId": null,
    "viSkillExpanderId": null
  },
  {
    "ablativeArmorId": null,
    "ablativeArmorByPosition": {
      "forward": 0,
      "aft": 0,
      "port": 0,
      "starboard": 0
    },
    "antiHackingSystemsId": null,
    "antiPersonnelWeaponId": null,
    "armorId": "Mk 4",
    "armorMaterialId": null,
    "computerCountermeasures": {
      "alarm": false,
      "fakeShell": false,
      "feedback": false,
      "firewall": false,
      "lockout": false,
      "shockGridId": null,
      "wipe": false
    },
    "computerId": "Mk 2 Duonode",
    "crewQuartersId": "Common",
    "crewSkills": {
      "captain": {
        "countOfficers": 0,
        "hasRole": true,
        "skills": {
          "bluff": {
            "modifier": "8",
            "ranks": "8"
          },
          "computers": {
            "modifier": 0,
            "ranks": 0
          },
          "diplomacy": {
            "modifier": "8",
            "ranks": "8"
          },
          "engineering": {
            "modifier": 0,
            "ranks": 0
          },
          "gunnery": {
            "modifier": "14"
          },
          "intimidate": {
            "modifier": "8",
            "ranks": "8"
          },
          "perception": {
            "modifier": 0,
            "ranks": 0
          },
          "piloting": {
            "modifier": "8",
            "ranks": "8"
          }
        }
      },
      "engineer": {
        "countOfficers": 1,
        "countOfficerCrew": "6",
        "hasRole": true,
        "skills": {
          "computers": {
            "modifier": 0,
            "ranks": 0
          },
          "engineering": {
            "modifier": "13",
            "ranks": "8"
          }
        }
      },
      "gunner": {
        "countOfficers": "2",
        "countOfficerCrew": "2",
        "hasRole": true,
        "skills": {
          "computers": {
            "modifier": 0,
            "ranks": 0
          },
          "engineering": {
            "modifier": 0,
            "ranks": 0
          },
          "gunnery": {
            "modifier": "14"
          }
        }
      },
      "pilot": {
        "countOfficers": 1,
        "countOfficerCrew": "3",
        "hasRole": true,
        "skills": {
          "computers": {
            "modifier": 0,
            "ranks": 0
          },
          "diplomacy": {
            "modifier": 0,
            "ranks": 0
          },
          "engineering": {
            "modifier": 0,
            "ranks": 0
          },
          "gunnery": {
            "modifier": 0
          },
          "intimidate": {
            "modifier": 0,
            "ranks": 0
          },
          "piloting": {
            "modifier": "8",
            "ranks": "8"
          }
        }
      },
      "scienceOfficer": {
        "countOfficers": 1,
        "countOfficerCrew": 0,
        "hasRole": true,
        "skills": {
          "computers": {
            "modifier": "6",
            "ranks": "8"
          },
          "life-science": {
            "modifier": 0,
            "ranks": 0
          },
          "physical-science": {
            "modifier": 0,
            "ranks": 0
          }
        }
      },
      "chiefMate": {
        "countOfficers": 1,
        "countOfficerCrew": 0,
        "hasRole": false,
        "skills": {
          "acrobatics": {
            "modifier": 0,
            "ranks": 0
          },
          "athletics": {
            "modifier": 0,
            "ranks": 0
          }
        }
      },
      "magicOfficer": {
        "countOfficers": 1,
        "countOfficerCrew": 0,
        "hasRole": false,
        "skills": {
          "mysticism": {
            "modifier": 0,
            "ranks": 0
          }
        }
      }
    },
    "ctTim": 0,
    "ctTimAll": 0,
    "customFrameBaseId": "Light Freighter",
    "customComponents": [],
    "dedicatedComputerId": "Basic Computer",
    "defensiveCountermeasuresId": "Mk 4",
    "defensiveCountermeasuresMaterialId": null,
    "deflectorShieldId": null,
    "driftEngineId": "Signal Basic",
    "expansionBayIds": [
      "Cargo Hold",
      "Cargo Hold",
      "Cargo Hold",
      "Cargo Hold",
      "Cargo Hold",
      "Cargo Hold",
      "Escape Pods",
      "Medical Bay"
    ],
    "fortifiedHullId": "Steel Composite",
    "frameId": "Heavy Freighter",
    "hasAlgalShielding": 0,
    "hasAutoDestruct": 0,
    "hasBiometricLocks": 0,
    "hasColonyShipFramework": 0,
    "hasConsciousnessUplink": 0,
    "hasCrew": 1,
    "hasDataNet": 0,
    "hasEmergencyAccelerator": 0,
    "hasHiveJoining": 0,
    "hasHolographicMantle": 0,
    "hasPowersap": 0,
    "hasReconfigurationSystem": 0,
    "hasRootSystem": 0,
    "hasSelfDestructSystem": 0,
    "hasSpaceStationFramework": 0,
    "isSetDefaultCrewSkillValues": 0,
    "isUseStrictRules": false,
    "powerCoreIds": [
      "Pulse Orange"
    ],
    "powerCoreSpecialMaterials": [
      null
    ],
    "reinforcedBulkheadId": null,
    "roboticAppendageId": null,
    "secondaryComputerId": "Basic Computer",
    "sensorsId": "Basic Medium Range",
    "sensorsMaterialId": null,
    "shieldType": "shields",
    "shieldsByPosition": {
      "forward": 30,
      "aft": 30,
      "port": 30,
      "starboard": 30
    },
    "shieldsId": "Medium 120",
    "shipConcept": "The ATech Resolute is a simple, sturdy ship with a bold personality and a beloved subculture. AbadarCorp first commissioned the Resolute over a century ago to meet its growing need for a deep space freighter that didn’t need an escort. An especially troubling surge in piracy had made the conglomerate’s colonial ambitions far too costly not to take more direct action. The answer came in the form of this blocky, golden hulk that, no matter how hard it was battered, wouldn’t give up the fight. NOTE: Discrepancy in CT between tool and SOM. I think they forgot to add the fortified hull bonus.",
    "shipName": "Atech Resolute",
    "sources": {
      "pw": true,
      "som": true
    },
    "thrustersId": "L8",
    "thrustersMaterialId": null,
    "thrustersBoosterId": null,
    "thrustersBoosterMaterialId": null,
    "tierId": "8",
    "version": "1.0.1",
    "viId": null,
    "viHoloProjectorId": null,
    "viSkillExpanderId": null,
    "weaponMounts": {
      "forward": [
        {
          "weaponId": "heavy-laser-cannon",
          "weight": "heavy",
          "templateWeight": "heavy",
          "isFromTemplate": true,
          "canBeLinked": false,
          "isLinked": false,
          "specialMaterial": null,
          "hasOrbitalDiscount": false
        },
        {
          "weaponId": null,
          "weight": "light",
          "templateWeight": "light",
          "isFromTemplate": true,
          "canBeLinked": false,
          "isLinked": false,
          "specialMaterial": null,
          "hasOrbitalDiscount": false
        },
        {
          "weaponId": null,
          "weight": "light",
          "templateWeight": "light",
          "isFromTemplate": true,
          "canBeLinked": false,
          "isLinked": false,
          "specialMaterial": null,
          "hasOrbitalDiscount": false
        }
      ],
      "aft": [
        {
          "weaponId": "flak-thrower",
          "weight": "light",
          "isFromTemplate": false,
          "canBeLinked": false,
          "isLinked": false,
          "canHaveOrbitalDiscount": false,
          "hasOrbitalDiscount": false,
          "specialMaterial": null
        }
      ],
      "port": [
        {
          "weaponId": "light-particle-beam",
          "weight": "heavy",
          "templateWeight": "heavy",
          "isFromTemplate": true,
          "canBeLinked": false,
          "isLinked": false,
          "specialMaterial": null,
          "hasOrbitalDiscount": false
        }
      ],
      "starboard": [
        {
          "weaponId": "light-particle-beam",
          "weight": "heavy",
          "templateWeight": "heavy",
          "isFromTemplate": true,
          "canBeLinked": false,
          "isLinked": false,
          "specialMaterial": null,
          "hasOrbitalDiscount": false
        }
      ],
      "turret": [
        {
          "weaponId": "light-plasma-torpedo-launcher",
          "weight": "light",
          "isFromTemplate": false,
          "canBeLinked": false,
          "isLinked": false,
          "canHaveOrbitalDiscount": false,
          "hasOrbitalDiscount": false,
          "specialMaterial": null
        }
      ]
    },
    "ctNetworkNodes": 0
  }
]

export default templates;