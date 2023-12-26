import {RequirementProps} from "./questsData";

export type TownTabs = "Main" | "Tavern" | "Shop" | "Exploration Guild" | "Market";
export type TownNames = "La Harpar" | "North Lirold";
export type Regions = "Southback" | "Port Stocksmar" | "Greefic Hill" | "Saint Nestroud";

export type TownProps = {
    id: number;
    name: TownNames;
    region: Regions;
    url: string;
    buildings: TownBuildingProps[];
};

export type TownTabNpcProps = {
    id: number;
    position: string;
};

export type TownBuildingProps = {
    name: TownTabs;
    npcIds: TownTabNpcProps[];
    objectsIds?: TownBuildingObjectProps[];
    url: string;
};

export type TownBuildingObjectProps = EntraceObject;
type EntraceObject = {
    type: "zone";
    zoneId: number;
    requirement: RequirementProps;
    position: string;
    url: string;
    name: string;
};

const TOWNS_DATA: TownProps[] = [
    {
        id: 0,
        name: "La Harpar",
        region: "Port Stocksmar",
        url: "./backgrounds/laHarpar.png",
        buildings: [
            {
                name: "Tavern",
                npcIds: [
                    {id: 0, position: "top-1/2 -translate-y-1/2 right-5 "},
                    {id: 1, position: "top-1/2 -translate-y-3/4 left-5"},
                ],
                url: "./backgrounds/laHarparTavern.png",
            },
            {
                name: "Market",
                objectsIds: [
                    {
                        name: "Trader's Basement",
                        type: "zone",
                        zoneId: 2,
                        requirement: {
                            type: "quest",
                            id: 2,
                            step: 0,
                        },
                        position: "top-1/2 left-[19%] -translate-y-1/2",
                        url: "./objects/basementDoor.png",
                    },
                ],
                npcIds: [
                    {
                        id: 2,
                        position: "top-1/2 left-1/3 -translate-y-1/2",
                    },
                ],
                url: "./backgrounds/laHarparMarket.png",
            },
            {
                name: "Shop",
                npcIds: [
                    {
                        id: 2,
                        position: "",
                    },
                ],
                url: "./backgrounds/laHarparShop.png",
            },
            {name: "Exploration Guild", npcIds: [], url: ""},
        ],
    },
];

export default TOWNS_DATA;
