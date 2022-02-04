

let templates = [
  {
    "ablativeArmorId": "none",
    "ablativeArmorByPosition": {
      "forward": 0,
      "aft": 0,
      "port": 0,
      "starboard": 0
    },
    "antiHackingSystemsId": "none",
    "antiPersonnelWeaponId": "none",
    "armorId": "mk-4",
    "armorMaterialId": "none",
    "computerCountermeasures": {
      "alarm": false,
      "fakeShell": false,
      "feedback": false,
      "firewall": false,
      "lockout": false,
      "shockGridId": "none",
      "wipe": false
    },
    "computerId": "mk-1-duonode",
    "crewQuartersId": "common",
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
    "customFrameBaseId": "light-freighter",
    "customComponents": [],
    "dedicatedComputerId": "basic-computer",
    "defensiveCountermeasuresId": "mk-3",
    "defensiveCountermeasuresMaterialId": "none",
    "deflectorShieldId": "none",
    "driftEngineId": "signal-basic",
    "expansionBayIds": ["none"],
    "fortifiedHullId": "none",
    "frameId": "fighter",
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
    "powerCoreIds": ["pulse-brown"],
    "powerCoreSpecialMaterials": ["none"],
    "reinforcedBulkheadId": "none",
    "roboticAppendageId": "none",
    "secondaryComputerId": "basic-computer",
    "sensorsId": "basic-medium-range",
    "sensorsMaterialId": "none",
    "shieldType": "shields",
    "shieldsByPosition": {
      "forward": 10,
      "aft": 10,
      "port": 10,
      "starboard": 10
    },
    "shieldsId": "basic-40",
    "shipConcept": "From escorting corporate mining expeditions to providing an orbital guard for fledgling colonies operating outside Steward protection, variations of the Dyad have defended against space pirates and raiders for generations.",
    "shipName": "AAC Dyad",
    "sources": {
      "pw": true,
      "som": true
    },
    "thrustersId": "t10",
    "thrustersMaterialId": "none",
    "thrustersBoosterId": "none",
    "thrustersBoosterMaterialId": "none",
    "tierId": "2",
    "version": "1.0.1",
    "viId": "none",
    "viHoloProjectorId": "none",
    "viSkillExpanderId": "none",
    "weaponMounts": {
      "forward": [{
        "weaponId": "light-buster-cannon",
        "weight": "light",
        "templateWeight": "light",
        "isFromTemplate": true,
        "canBeLinked": false,
        "isLinked": false,
        "specialMaterial": "none",
        "hasOrbitalDiscount": false
      }, {
        "weaponId": "light-plasma-torpedo-launcher",
        "weight": "light",
        "templateWeight": "light",
        "isFromTemplate": true,
        "canBeLinked": false,
        "isLinked": false,
        "specialMaterial": "none",
        "hasOrbitalDiscount": false
      }],
      "aft": [{
        "weaponId": "flak-thrower",
        "weight": "light",
        "templateWeight": "light",
        "isFromTemplate": true,
        "canBeLinked": false,
        "isLinked": false,
        "specialMaterial": "none",
        "hasOrbitalDiscount": false
      }],
      "port": [],
      "starboard": [],
      "turret": []
    },
    "ctNetworkNodes": 0
  },
  {
    "ablativeArmorId": "none",
    "ablativeArmorByPosition": {
      "forward": 0,
      "aft": 0,
      "port": 0,
      "starboard": 0
    },
    "antiHackingSystemsId": "none",
    "antiPersonnelWeaponId": "none",
    "armorId": "mk-5",
    "armorMaterialId": "none",
    "computerCountermeasures": {
      "alarm": false,
      "fakeShell": false,
      "feedback": false,
      "firewall": false,
      "lockout": false,
      "shockGridId": "none",
      "wipe": false
    },
    "computerId": "mk-3-trinode",
    "crewQuartersId": "common",
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
    "customFrameBaseId": "light-freighter",
    "customComponents": [],
    "dedicatedComputerId": "basic-computer",
    "defensiveCountermeasuresId": "mk-5",
    "defensiveCountermeasuresMaterialId": "none",
    "deflectorShieldId": "none",
    "driftEngineId": "signal-basic",
    "expansionBayIds": ["combat-training-facility-elite", "cargo-hold", "hangar-bay", "hangar-bay", "tech-workshop"],
    "fortifiedHullId": "none",
    "frameId": "carrier",
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
    "powerCoreIds": ["gateway-ultra", "none", "none"],
    "powerCoreSpecialMaterials": ["none", "none", "none"],
    "reinforcedBulkheadId": "none",
    "roboticAppendageId": "none",
    "secondaryComputerId": "basic-computer",
    "sensorsId": "basic-long-range",
    "sensorsMaterialId": "none",
    "shieldType": "shields",
    "shieldsByPosition": {
      "forward": 120,
      "aft": 120,
      "port": 120,
      "starboard": 120
    },
    "shieldsId": "heavy-480",
    "shipConcept": "A product of the Allied Arms Corporation (AAC) of Triaxus, the Hoardmaster is the flagship of the Skyfire Legion’s mercenary fleet. The aptly named carrier can launch over a dozen smaller craft into battle. Designed to operate in tandem with AAC Dyads, this specialized carrier has experienced a surge in popularity during the past 50 years.",
    "shipName": "AAC Hoardmaster",
    "sources": {
      "pw": true,
      "som": true
    },
    "thrustersId": "g4",
    "thrustersMaterialId": "none",
    "thrustersBoosterId": "none",
    "thrustersBoosterMaterialId": "none",
    "tierId": "14",
    "version": "1.0.1",
    "viId": "none",
    "viHoloProjectorId": "none",
    "viSkillExpanderId": "none",
    "weaponMounts": {
      "forward": [{
        "weaponId": "mega-teleportation-beam",
        "weight": "capital",
        "templateWeight": "capital",
        "isFromTemplate": true,
        "canBeLinked": false,
        "isLinked": false,
        "canHaveOrbitalDiscount": false,
        "hasOrbitalDiscount": false,
        "specialMaterial": "none"
      }],
      "aft": [],
      "port": [{
        "weaponId": "twin-laser",
        "weight": "heavy",
        "templateWeight": "heavy",
        "isFromTemplate": true,
        "canBeLinked": false,
        "isLinked": false,
        "canHaveOrbitalDiscount": false,
        "hasOrbitalDiscount": false,
        "specialMaterial": "none"
      }, {
        "weaponId": "none",
        "weight": "heavy",
        "templateWeight": "heavy",
        "isFromTemplate": true,
        "canBeLinked": false,
        "isLinked": false,
        "canHaveOrbitalDiscount": false,
        "hasOrbitalDiscount": false,
        "specialMaterial": "none"
      }, {
        "weaponId": "none",
        "weight": "heavy",
        "templateWeight": "heavy",
        "isFromTemplate": true,
        "canBeLinked": false,
        "isLinked": false,
        "canHaveOrbitalDiscount": false,
        "hasOrbitalDiscount": false,
        "specialMaterial": "none"
      }],
      "starboard": [{
        "weaponId": "twin-laser",
        "weight": "heavy",
        "templateWeight": "heavy",
        "isFromTemplate": true,
        "canBeLinked": false,
        "isLinked": false,
        "canHaveOrbitalDiscount": false,
        "hasOrbitalDiscount": false,
        "specialMaterial": "none"
      }, {
        "weaponId": "none",
        "weight": "heavy",
        "templateWeight": "heavy",
        "isFromTemplate": true,
        "canBeLinked": false,
        "isLinked": false,
        "canHaveOrbitalDiscount": false,
        "hasOrbitalDiscount": false,
        "specialMaterial": "none"
      }, {
        "weaponId": "none",
        "weight": "heavy",
        "templateWeight": "heavy",
        "isFromTemplate": true,
        "canBeLinked": false,
        "isLinked": false,
        "canHaveOrbitalDiscount": false,
        "hasOrbitalDiscount": false,
        "specialMaterial": "none"
      }],
      "turret": [{
        "weaponId": "laser-net",
        "weight": "light",
        "templateWeight": "light",
        "isFromTemplate": true,
        "canBeLinked": false,
        "isLinked": false,
        "canHaveOrbitalDiscount": false,
        "hasOrbitalDiscount": false,
        "specialMaterial": "none"
      }, {
        "weaponId": "none",
        "weight": "light",
        "templateWeight": "light",
        "isFromTemplate": true,
        "canBeLinked": false,
        "isLinked": false,
        "canHaveOrbitalDiscount": false,
        "hasOrbitalDiscount": false,
        "specialMaterial": "none"
      }]
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
    "frameId": "cruiser",
    "powerCoreIds": ["nova-ultra", "none"],
    "thrustersId": "h8",
    "armorId": "mk-4",
    "computerId": "mk-3-duonode",
    "crewQuartersId": "good",
    "defensiveCountermeasuresId": "mk-4",
    "driftEngineId": "signal-basic",
    "expansionBayIds": ["cargo-hold", "cargo-hold", "cargo-hold", "life-boats", "medical-bay", "shuttle-bay"],
    "expansionBaysCountUsed": 0,
    "antiHackingSystemsId": "none",
    "antiPersonnelWeaponId": "none",
    "hasBiometricLocks": 0,
    "computerCountermeasures": {
      "alarm": false,
      "fakeShell": false,
      "feedback": false,
      "firewall": false,
      "lockout": false,
      "shockGridId": "none",
      "wipe": false
    },
    "hasSelfDestructSystem": 0,
    "hasDataNet": 0,
    "hasHiveJoining": 0,
    "sensorsId": "basic-long-range",
    "shieldsId": "medium-200",
    "weaponMounts": {
      "forward": [{
        "weaponId": "particle-beam-cannon",
        "weight": "capital",
        "templateWeight": "capital",
        "isFromTemplate": true,
        "canBeLinked": false,
        "isLinked": false,
        "specialMaterial": "none",
        "hasOrbitalDiscount": false
      }],
      "aft": [],
      "port": [{
        "weaponId": "light-plasma-cannon",
        "weight": "light",
        "templateWeight": "light",
        "isFromTemplate": true,
        "canBeLinked": false,
        "isLinked": false,
        "specialMaterial": "none",
        "hasOrbitalDiscount": false
      }],
      "starboard": [{
        "weaponId": "light-plasma-cannon",
        "weight": "light",
        "templateWeight": "light",
        "isFromTemplate": true,
        "canBeLinked": false,
        "isLinked": false,
        "specialMaterial": "none",
        "hasOrbitalDiscount": false
      }],
      "turret": [{
        "weaponId": "heavy-plasma-torpedo-launcher",
        "weight": "heavy",
        "templateWeight": "heavy",
        "isFromTemplate": true,
        "canBeLinked": false,
        "isLinked": false,
        "specialMaterial": "none",
        "hasOrbitalDiscount": false
      }]
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
    "ablativeArmorId": "none",
    "ablativeArmorByPosition": {
      "forward": 0,
      "aft": 0,
      "port": 0,
      "starboard": 0
    },
    "armorMaterialId": "none",
    "ctTim": 0,
    "ctTimAll": 0,
    "customFrameBaseId": "light-freighter",
    "customComponents": [],
    "dedicatedComputerId": "basic-computer",
    "defensiveCountermeasuresMaterialId": "none",
    "deflectorShieldId": "none",
    "fortifiedHullId": "none",
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
    "powerCoreSpecialMaterials": ["none", "none"],
    "ctNetworkNodes": 0,
    "reinforcedBulkheadId": "none",
    "roboticAppendageId": "none",
    "secondaryComputerId": "basic-computer",
    "sensorsMaterialId": "none",
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
    "thrustersMaterialId": "none",
    "thrustersBoosterId": "none",
    "thrustersBoosterMaterialId": "none",
    "viId": "none",
    "viHoloProjectorId": "none",
    "viSkillExpanderId": "none"
  },
  {
    "ablativeArmorId": "none",
    "ablativeArmorByPosition": {
      "forward": 0,
      "aft": 0,
      "port": 0,
      "starboard": 0
    },
    "antiHackingSystemsId": "none",
    "antiPersonnelWeaponId": "none",
    "armorId": "mk-4",
    "armorMaterialId": "none",
    "computerCountermeasures": {
      "alarm": false,
      "fakeShell": false,
      "feedback": false,
      "firewall": false,
      "lockout": false,
      "shockGridId": "none",
      "wipe": false
    },
    "computerId": "mk-2-duonode",
    "crewQuartersId": "common",
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
    "customFrameBaseId": "light-freighter",
    "customComponents": [],
    "dedicatedComputerId": "basic-computer",
    "defensiveCountermeasuresId": "mk-4",
    "defensiveCountermeasuresMaterialId": "none",
    "deflectorShieldId": "none",
    "driftEngineId": "signal-basic",
    "expansionBayIds": ["cargo-hold", "cargo-hold", "cargo-hold", "cargo-hold", "cargo-hold", "cargo-hold", "escape-pods", "medical-bay"],
    "fortifiedHullId": "steel-composite",
    "frameId": "heavy-freighter",
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
    "powerCoreIds": ["pulse-orange"],
    "powerCoreSpecialMaterials": ["none"],
    "reinforcedBulkheadId": "none",
    "roboticAppendageId": "none",
    "secondaryComputerId": "basic-computer",
    "sensorsId": "basic-medium-range",
    "sensorsMaterialId": "none",
    "shieldType": "shields",
    "shieldsByPosition": {
      "forward": 30,
      "aft": 30,
      "port": 30,
      "starboard": 30
    },
    "shieldsId": "medium-120",
    "shipConcept": "The ATech Resolute is a simple, sturdy ship with a bold personality and a beloved subculture. AbadarCorp first commissioned the Resolute over a century ago to meet its growing need for a deep space freighter that didn’t need an escort. An especially troubling surge in piracy had made the conglomerate’s colonial ambitions far too costly not to take more direct action. The answer came in the form of this blocky, golden hulk that, no matter how hard it was battered, wouldn’t give up the fight. NOTE: Discrepancy in CT between tool and SOM. I think they forgot to add the fortified hull bonus.",
    "shipName": "Atech Resolute",
    "sources": {
      "pw": true,
      "som": true
    },
    "thrustersId": "l8",
    "thrustersMaterialId": "none",
    "thrustersBoosterId": "none",
    "thrustersBoosterMaterialId": "none",
    "tierId": "8",
    "version": "1.0.1",
    "viId": "none",
    "viHoloProjectorId": "none",
    "viSkillExpanderId": "none",
    "weaponMounts": {
      "forward": [{
        "weaponId": "heavy-laser-cannon",
        "weight": "heavy",
        "templateWeight": "heavy",
        "isFromTemplate": true,
        "canBeLinked": false,
        "isLinked": false,
        "specialMaterial": "none",
        "hasOrbitalDiscount": false
      }, {
        "weaponId": "none",
        "weight": "light",
        "templateWeight": "light",
        "isFromTemplate": true,
        "canBeLinked": false,
        "isLinked": false,
        "specialMaterial": "none",
        "hasOrbitalDiscount": false
      }, {
        "weaponId": "none",
        "weight": "light",
        "templateWeight": "light",
        "isFromTemplate": true,
        "canBeLinked": false,
        "isLinked": false,
        "specialMaterial": "none",
        "hasOrbitalDiscount": false
      }],
      "aft": [{
        "weaponId": "flak-thrower",
        "weight": "light",
        "isFromTemplate": false,
        "canBeLinked": false,
        "isLinked": false,
        "canHaveOrbitalDiscount": false,
        "hasOrbitalDiscount": false,
        "specialMaterial": "none"
      }],
      "port": [{
        "weaponId": "light-particle-beam",
        "weight": "heavy",
        "templateWeight": "heavy",
        "isFromTemplate": true,
        "canBeLinked": false,
        "isLinked": false,
        "specialMaterial": "none",
        "hasOrbitalDiscount": false
      }],
      "starboard": [{
        "weaponId": "light-particle-beam",
        "weight": "heavy",
        "templateWeight": "heavy",
        "isFromTemplate": true,
        "canBeLinked": false,
        "isLinked": false,
        "specialMaterial": "none",
        "hasOrbitalDiscount": false
      }],
      "turret": [{
        "weaponId": "light-plasma-torpedo-launcher",
        "weight": "light",
        "isFromTemplate": false,
        "canBeLinked": false,
        "isLinked": false,
        "canHaveOrbitalDiscount": false,
        "hasOrbitalDiscount": false,
        "specialMaterial": "none"
      }]
    },
    "ctNetworkNodes": 0
  }
]

export default templates;