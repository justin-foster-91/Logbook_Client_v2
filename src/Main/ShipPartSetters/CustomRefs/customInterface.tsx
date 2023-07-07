import Ship from "../../References/ship"

export interface SetterProps {
  currentPart: {
    component: Function, 
    name: string
  }
}

export interface ShipParts { 
	"ablativeArmorId": string | null,
	"ablativeArmorByPosition": ArcValues,
	"antiHackingSystemsId": string | null,
	"antiPersonnelWeaponId": string | null,
	"armorId": string | null,
	"armorMaterialId": string | null,
	"cloakingId": string | null,
	"computerCountermeasures": ComputerCountermeasures,
	"computerId": string,
	"crewQuartersId": string | null,
	"crewSkills": CrewSkills,
	"ctNetworkNodes": number,
	"ctTim": number,
	"ctTimAll": number,
	"customFrameBaseId": string | null,
	"customComponents": Array<any>,
	"dedicatedComputerId": string,
	"defensiveCountermeasuresId": string | null,
	"defensiveCountermeasuresMaterialId": string | null,
	"deflectorShieldId": string | null,
	"driftEngineId": string | null,
	"expansionBayIds": Array<string>,
	"fortifiedHullId": string | null,
	"frameId": string,
	"hasAlgalShielding": boolean,
	"hasAutoDestruct": boolean,
	"hasBiometricLocks": boolean,
	"hasColonyShipFramework": boolean,
	"hasConsciousnessUplink": boolean,
	"hasCrew": boolean,
	"hasDataNet": boolean,
	"hasEmergencyAccelerator": boolean,
	"hasHiveJoining": boolean,
	"hasHolographicMantle": boolean,
	"hasPowersap": boolean,
	"hasReconfigurationSystem": boolean,
	"hasRootSystem": boolean,
	"hasSelfDestructSystem": boolean,
	"hasSpaceStationFramework": boolean,
	"isSetDefaultCrewSkillValues": boolean,
	"isUseStrictRules": boolean,
	"powerCoreIds": Array<string>,
	"powerCoreSpecialMaterials": Array<string | null>,
	"reinforcedBulkheadId": string | null,
	"roboticAppendageId": string | null,
	"secondaryComputerId": string,
	"sensorsId": string | null,
	"sensorsMaterialId": string | null,
	"shieldType": string,
	"shieldsByPosition": ArcValues,
	"shieldsId": string | null,
	"shipConcept": string,
	"shipName": string,
	"sources": {
		"pw": boolean,
		"som": boolean
	},
	"thrustersId": string | null,
	"thrustersMaterialId": string | null,
	"thrustersBoosterId": string | null,
	"thrustersBoosterMaterialId": string | null,
	"tierId": string,
	"version": string,
	"viId": string | null,
	"viHoloProjectorId": string | null,
	"viSkillExpanderId": string | null,
	"weaponMounts": WeaponMounts
}

interface ArcValues {
	"forward": number,
	"aft": number,
	"port": number,
	"starboard": number
}

interface ComputerCountermeasures {
	"alarm": boolean,
	"fakeShell": boolean,
	"feedback": boolean,
	"firewall": boolean,
	"lockout": boolean,
	"shockGridId": string |null,
	"wipe": boolean
}

interface CrewSkills {
	"captain": {
		"countOfficers": number,
		"hasRole": boolean,
		"skills": {
			"bluff": {
				"modifier": number,
				"ranks": number
			},
			"computers": {
				"modifier": number,
				"ranks": number
			},
			"diplomacy": {
				"modifier": number,
				"ranks": number
			},
			"engineering": {
				"modifier": number,
				"ranks": number
			},
			"gunnery": {
				"modifier": number
			},
			"intimidate": {
				"modifier": number,
				"ranks": number
			},
			"perception": {
				"modifier": number,
				"ranks": number
			},
			"piloting": {
				"modifier": number,
				"ranks": number
			}
		}
	},
	"engineer": {
		"countOfficers": number,
		"countOfficerCrew": number,
		"hasRole": boolean,
		"skills": {
			"computers": {
				"modifier": number,
				"ranks": number
			},
			"engineering": {
				"modifier": number,
				"ranks": number
			}
		}
	},
	"gunner": {
		"countOfficers": number,
		"countOfficerCrew": number,
		"hasRole": boolean,
		"skills": {
			"computers": {
				"modifier": number,
				"ranks": number
			},
			"engineering": {
				"modifier": number,
				"ranks": number
			},
			"gunnery": {
				"modifier": number
			}
		}
	},
	"pilot": {
		"countOfficers": number,
		"countOfficerCrew": number,
		"hasRole": boolean,
		"skills": {
			"computers": {
				"modifier": number,
				"ranks": number
			},
			"diplomacy": {
				"modifier": number,
				"ranks": number
			},
			"engineering": {
				"modifier": number,
				"ranks": number
			},
			"gunnery": {
				"modifier": number
			},
			"intimidate": {
				"modifier": number,
				"ranks": number
			},
			"piloting": {
				"modifier": number,
				"ranks": number
			}
		}
	},
	"scienceOfficer": {
		"countOfficers": number,
		"countOfficerCrew": number,
		"hasRole": boolean,
		"skills": {
			"computers": {
				"modifier": number,
				"ranks": number
			},
			"life-science": {
				"modifier": number,
				"ranks": number
			},
			"physical-science": {
				"modifier": number,
				"ranks": number
			}
		}
	},
	"chiefMate": {
		"countOfficers": number,
		"countOfficerCrew": number,
		"hasRole": boolean,
		"skills": {
			"acrobatics": {
				"modifier": number,
				"ranks": number
			},
			"athletics": {
				"modifier": number,
				"ranks": number
			}
		}
	},
	"magicOfficer": {
		"countOfficers": number,
		"countOfficerCrew": number,
		"hasRole": boolean,
		"skills": {
			"mysticism": {
				"modifier": number,
				"ranks": number
			}
		}
	}
}

interface WeaponMounts {
	"forward": Array<WeaponValues>,
	"aft": Array<WeaponValues>,
	"port": Array<WeaponValues>,
	"starboard": Array<WeaponValues>,
	"turret": Array<WeaponValues>
}

interface WeaponValues {
	"weaponId": string | null,
	"weight": string,
	"templateWeight": string,
	"isFromTemplate": boolean,
	"canBeLinked": boolean,
	"isLinked": boolean,
	"canHaveOrbitalDiscount": boolean,
	"hasOrbitalDiscount": boolean,
	"specialMaterial": string | null
}

export type ShipArcs =
  | "forward"
  | "port"
  | "starboard"
  | "aft";

type WeaponCoverage =
  | ShipArcs
  | "turret";

export type SecurityCounter = 
	| "alarm"
	| "fakeShell"
	| "feedback"
	| "firewall"
	| "lockout"
	| "shockGridId"
	| "wipe"

export type SecurityCheckboxes =
	| "hasBiometricLocks"
	| "hasSelfDestructSystem"
	| "hasEmergencyAccelerator"
	| "hasHolographicMantle"
	| "hasReconfigurationSystem"
	// | "shockGridId"
	| "antiHackingSystemsId"
	| "antiPersonnelWeaponId"
	| "cloakingId"

// export interface Security {
//   // reference: keyof ShipParts | keyof ComputerCountermeasures,
// 	reference: SecurityCheckboxes | SecurityCounter,
//   value: boolean,
//   parent: SecurityCheckboxes
// }

export interface Security {
	reference: string
	value: boolean
}

export interface CounterSecurity {
	reference: SecurityCounter,
  value: boolean,
  parent: "computerCountermeasures"
}

export function isCounterSecurity(obj: any): obj is CounterSecurity {
	return obj.parent !== undefined && obj.parent === "computerCountermeasures"
}

export type Material =
	| "powerCoreSpecialMaterials"
	| "thrustersMaterialId"
	| "armorMaterialId"
	| "defensiveCountermeasuresMaterialId"
	| "sensorsMaterialId"

// export type Security = 
// 	| SimpleSecurity
// 	| CounterSecurity


// export type ShipPartKeys = keyof ShipParts;