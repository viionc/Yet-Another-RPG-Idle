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
    url: string;
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
                npcIds: [],
                url: "./backgrounds/laHarparMarket.png",
            },
            {name: "Exploration Guild", npcIds: [], url: ""},
        ],
    },
];

export default TOWNS_DATA;
