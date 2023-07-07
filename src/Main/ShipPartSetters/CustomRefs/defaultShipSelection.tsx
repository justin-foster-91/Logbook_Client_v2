import { ShipParts } from "./customInterface";

let defaultSelections: ShipParts = {
	"ablativeArmorId": null,
	"ablativeArmorByPosition": {
		"forward": 0,
		"aft": 0,
		"port": 0,
		"starboard": 0
	},
	"antiHackingSystemsId": null,
	"antiPersonnelWeaponId": null,
	"armorId": null,
	"armorMaterialId": null,
	"cloakingId": null,
	"computerCountermeasures": {
		"alarm": false,
		"fakeShell": false,
		"feedback": false,
		"firewall": false,
		"lockout": false,
		"shockGridId": null,
		"wipe": false
	},
	"computerId": "Basic Computer",
	"crewQuartersId": "Common",
	"crewSkills": {
		"captain": {
			"countOfficers": 0,
			"hasRole": true,
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
				"perception": {
					"modifier": 0,
					"ranks": 0
				},
				"piloting": {
					"modifier": 0,
					"ranks": 0
				}
			}
		},
		"engineer": {
			"countOfficers": 1,
			"countOfficerCrew": 0,
			"hasRole": true,
			"skills": {
				"computers": {
					"modifier": 0,
					"ranks": 0
				},
				"engineering": {
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
					"modifier": 0,
					"ranks": 0
				},
				"engineering": {
					"modifier": 0,
					"ranks": 0
				},
				"gunnery": {
					"modifier": 0
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
					"modifier": 0
				},
				"intimidate": {
					"modifier": 0,
					"ranks": 0
				},
				"piloting": {
					"modifier": 0,
					"ranks": 0
				}
			}
		},
		"scienceOfficer": {
			"countOfficers": 1,
			"countOfficerCrew": 0,
			"hasRole": true,
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
	"ctNetworkNodes": 0,
	"ctTim": 0,
	"ctTimAll": 0,
	"customFrameBaseId": "Light Freighter",
	"customComponents": [],
	"dedicatedComputerId": "Basic Computer",
	"defensiveCountermeasuresId": null,
	"defensiveCountermeasuresMaterialId": null,
	"deflectorShieldId": null,
	"driftEngineId": null,
	"expansionBayIds": ["Cargo Hold", "Cargo Hold", "Cargo Hold"],
	"fortifiedHullId": null,
	"frameId": "Light Freighter",
	"hasAlgalShielding": false,
	"hasAutoDestruct": false,
	"hasBiometricLocks": false,
	"hasColonyShipFramework": false,
	"hasConsciousnessUplink": false,
	"hasCrew": false,
	"hasDataNet": false,
	"hasEmergencyAccelerator": false,
	"hasHiveJoining": false,
	"hasHolographicMantle": false,
	"hasPowersap": false,
	"hasReconfigurationSystem": false,
	"hasRootSystem": false,
	"hasSelfDestructSystem": false,
	"hasSpaceStationFramework": false,
	"isSetDefaultCrewSkillValues": false,
	"isUseStrictRules": false,
	"powerCoreIds": [],
	"powerCoreSpecialMaterials": [],
	"reinforcedBulkheadId": null,
	"roboticAppendageId": null,
	"secondaryComputerId": "Basic Computer",
	"sensorsId": null,
	"sensorsMaterialId": null,
	"shieldType": "shields",
	"shieldsByPosition": {
		"forward": 0,
		"aft": 0,
		"port": 0,
		"starboard": 0
	},
	"shieldsId": null,
	"shipConcept": "",
	"shipName": "",
	"sources": {
		"pw": true,
		"som": true
	},
	"thrustersId": null,
	"thrustersMaterialId": null,
	"thrustersBoosterId": null,
	"thrustersBoosterMaterialId": null,
	"tierId": "1",
	"version": "1.0.1",
	"viId": null,
	"viHoloProjectorId": null,
	"viSkillExpanderId": null,
	"weaponMounts": {
		"forward": [{
			"weaponId": null,
			"weight": "light",
			"templateWeight": "light",
			"isFromTemplate": true,
			"canBeLinked": false,
			"isLinked": false,
			"canHaveOrbitalDiscount": false,
			"hasOrbitalDiscount": false,
			"specialMaterial": null
		}, {
			"weaponId": null,
			"weight": "light",
			"templateWeight": "light",
			"isFromTemplate": true,
			"canBeLinked": false,
			"isLinked": false,
			"canHaveOrbitalDiscount": false,
			"hasOrbitalDiscount": false,
			"specialMaterial": null
		}],
		"aft": [],
		"port": [{
			"weaponId": null,
			"weight": "light",
			"templateWeight": "light",
			"isFromTemplate": true,
			"canBeLinked": false,
			"isLinked": false,
			"canHaveOrbitalDiscount": false,
			"hasOrbitalDiscount": false,
			"specialMaterial": null
		}],
		"starboard": [{
			"weaponId": null,
			"weight": "light",
			"templateWeight": "light",
			"isFromTemplate": true,
			"canBeLinked": false,
			"isLinked": false,
			"canHaveOrbitalDiscount": false,
			"hasOrbitalDiscount": false,
			"specialMaterial": null
		}],
		"turret": []
	}
}

export default defaultSelections;


