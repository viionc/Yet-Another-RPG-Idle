import {EquipmentSlotNames} from "../gameState/storeSlices/playerEquipment";
import {PlayerStatsProps} from "../gameState/storeSlices/playerStats";
import {RequirementProps} from "./questsData";

export type Tiers = "Trash" | "Normal" | "Uncommon" | "Rare" | "Epic" | "Legendary";
export type ItemProps = {
    tier: Tiers;
    value: number;
    name: string;
    url: string;
    extra?: EquipmentProps | UseItemProps;
    description?: string;
    requirement?: RequirementProps;
    unique?: true;
    enhancementLevel?: number;
};

export type UseItemProps = UseItemStatProps;

export type UseItemStatProps = {
    type: "stat";
    key: keyof PlayerStatsProps;
    amount: 1;
};

export type EquipmentStat = {
    key: keyof PlayerStatsProps;
    value: number;
    description: string;
};
export type EquipmentProps = {
    type: "equipment";
    stats: EquipmentStat[];
    slot: EquipmentSlotNames;
    bow?: true;
    arrow?: true;
};

export const colorsByItemTier: Record<Tiers, string> = {
    "Trash": "rgb(180, 180, 180, 0.6)",
    "Normal": "rgb(255, 255, 255, 0.6)",
    "Uncommon": "rgb(60, 179, 113, 0.6)",
    "Rare": "rgb(0, 118, 255, 0.6)",
    "Epic": "rgb(179, 64, 255, 0.6)",
    "Legendary": "rgb(255, 152, 25, 0.6)",
};

export const ITEM_TIER_VALUE: Record<Tiers, number> = {
    "Trash": 0,
    "Normal": 1,
    "Uncommon": 2,
    "Rare": 3,
    "Epic": 4,
    "Legendary": 5,
};

export type ItemNames = keyof typeof ITEM_DATA;
export type ItemDataProps = {
    [name: string]: ItemProps;
};

export function createTypedArrayForKeys<T extends ItemDataProps>(input: T) {
    return input;
}

const ITEM_DATA = createTypedArrayForKeys({
    "Slime Residue": {
        tier: "Normal",
        name: "Slime Residue",
        url: "./items/slimeResidue.png",
        value: 1,
    },
    "Crab Meat": {
        tier: "Normal",
        name: "Crab Meat",
        url: "./items/crabMeat.png",
        value: 1,
    },
    "Feather": {
        tier: "Normal",
        name: "Feather",
        url: "./items/feather.png",
        value: 1,
    },
    "Turtle Shell": {
        tier: "Normal",
        name: "Turtle Shell",
        url: "./items/turtleShell.png",
        value: 1,
    },
    "Slime Golden Crown": {
        tier: "Uncommon",
        name: "Slime Golden Crown",
        url: "./items/slimeGoldenCrown.png",
        value: 250,
        extra: {
            type: "equipment",
            stats: [
                {key: "goldCoinsMultiplier", value: 0.5, description: "+50% more gold from enemies"},
                {key: "attackPower", value: 1, description: "+1 attack power"},
            ],
            slot: "helmet",
        },
    },
    "Knife": {
        tier: "Uncommon",
        name: "Knife",
        url: "./items/knife.png",
        value: 150,
        extra: {
            type: "equipment",
            stats: [{key: "attackPower", value: 3, description: "+3 attack power"}],
            slot: "weapon",
        },
    },
    "Turtle Shell Helmet": {
        tier: "Uncommon",
        name: "Turtle Shell Helmet",
        url: "./items/turtleShellHelmet.png",
        value: 20,
        extra: {
            type: "equipment",
            stats: [{key: "attackPower", value: 1, description: "+1 attack power"}],
            slot: "helmet",
        },
    },
    "Turtle Shell Chest": {
        tier: "Uncommon",
        name: "Turtle Shell Chest",
        url: "./items/turtleShellChest.png",
        value: 50,
        extra: {
            type: "equipment",
            stats: [{key: "attackPower", value: 1, description: "+1 attack power"}],
            slot: "chest",
        },
    },
    "Turtle Shell Legs": {
        tier: "Uncommon",
        name: "Turtle Shell Legs",
        url: "./items/turtleShellLegs.png",
        value: 40,
        extra: {
            type: "equipment",
            stats: [{key: "attackPower", value: 1, description: "+1 attack power"}],
            slot: "legs",
        },
    },
    "Turtle Shell Boots": {
        tier: "Uncommon",
        name: "Turtle Shell Boots",
        url: "./items/turtleShellBoots.png",
        value: 20,
        extra: {
            type: "equipment",
            stats: [{key: "attackPower", value: 1, description: "+1 attack power"}],
            slot: "boots",
        },
    },
    "Turtle Shell Gloves": {
        tier: "Uncommon",
        name: "Turtle Shell Gloves",
        url: "./items/turtleShellGloves.png",
        value: 20,
        extra: {
            type: "equipment",
            stats: [{key: "attackPower", value: 1, description: "+1 attack power"}],
            slot: "gloves",
        },
    },
    "Stick": {
        tier: "Normal",
        name: "Stick",
        url: "./items/stick.png",
        value: 1,
    },
    "Makeshift Club": {
        tier: "Normal",
        name: "Makeshift Club",
        url: "./items/makeshiftClub.png",
        value: 10,
        extra: {
            type: "equipment",
            stats: [{key: "attackPower", value: 1, description: "+1 attack power"}],
            slot: "weapon",
        },
    },
    "Josh's Heirloom": {
        tier: "Uncommon",
        name: "Josh's Heirloom",
        url: "./items/joshsHeirloom.png",
        value: -1,
        extra: {
            type: "equipment",
            stats: [
                {key: "attackPower", value: 1, description: "+1 attack power"},
                {key: "attackSpeed", value: 0.1, description: "+0.1 attack speed"},
                {key: "xpMultiplier", value: 0.1, description: "+10% xp Multiplier"},
            ],
            slot: "ring",
        },
    },
    "Rat Tail": {
        tier: "Normal",
        name: "Rat Tail",
        url: "./items/ratTail.png",
        value: 5,
    },
    "Skill Point Book": {
        tier: "Legendary",
        name: "Skill Point Book",
        url: "./items/skillPointBook.png",
        value: -1,
        description: "Gives 1 Skill Point upon reading.",
        extra: {
            type: "stat",
            amount: 1,
            key: "unspentSkillPoints",
        },
    },
    "Apple": {
        tier: "Normal",
        name: "Apple",
        url: "./items/apple.png",
        value: 1,
    },
    "Fish Meat": {
        tier: "Normal",
        name: "Fish Meat",
        url: "./items/fishMeat.png",
        value: 1,
    },
    "Captain's letter": {
        tier: "Normal",
        name: "Captain's letter",
        url: "./items/letter.png",
        value: -1,
    },
    "Cheese": {
        tier: "Normal",
        name: "Cheese",
        url: "./items/cheese.png",
        value: 1,
    },
    "Deer Pelt": {
        tier: "Normal",
        name: "Deer Pelt",
        url: "./items/deerPelt.png",
        value: 1,
    },
    "Wolf Fangs": {
        tier: "Normal",
        name: "Wolf Fangs",
        url: "./items/wolfFangs.png",
        value: 1,
    },
    "Vial of Water": {
        tier: "Normal",
        name: "Vial of Water",
        url: "./items/vialOfWater.png",
        value: 1,
    },
    "Rat Catcher": {
        tier: "Uncommon",
        name: "Rat Catcher",
        url: "./items/ratCatcher.png",
        value: 1000,
        extra: {
            type: "equipment",
            stats: [
                {key: "attackPower", value: 2, description: "+2 attack power"},
                {key: "critChance", value: 2, description: "+2% crit chance"},
                {key: "goldCoinsMultiplier", value: 0.25, description: "+25% Gold Multiplier"},
            ],
            slot: "belt",
        },
    },
    "Wooden Bow": {
        tier: "Uncommon",
        name: "Wooden Bow",
        url: "./items/woodenBow.png",
        value: 500,
        extra: {
            type: "equipment",
            stats: [
                {key: "attackPower", value: 3, description: "+3 attack power"},
                {key: "critChance", value: 4, description: "+4% crit chance"},
            ],
            slot: "weapon",
            bow: true,
        },
    },
    "Stone Arrow": {
        tier: "Normal",
        name: "Stone Arrow",
        url: "./items/stoneArrow.png",
        value: 4,
        extra: {
            type: "equipment",
            stats: [{key: "attackPower", value: 2, description: "+2 attack power"}],
            slot: "offhand",
            arrow: true,
        },
    },
    "Trophy Necklace": {
        tier: "Uncommon",
        name: "Trophy Necklace",
        url: "./items/trophyNecklace.png",
        value: 1500,
        extra: {
            type: "equipment",
            stats: [
                {key: "goldCoinsMultiplier", value: 0.5, description: `+50% gold multiplier`},
                {key: "xpMultiplier", value: 0.25, description: `+25% xp multiplier`},
            ],
            slot: "amulet",
        },
    },
    "Machete": {
        tier: "Uncommon",
        name: "Machete",
        url: "./items/machete.png",
        value: 1000,
        extra: {
            type: "equipment",
            stats: [
                {key: "attackPower", value: 5, description: "+5 attack power"},
                {key: "critChance", value: 4, description: "+4% crit chance"},
                {key: "critMulti", value: 0.25, description: "+25% crit multiplier"},
            ],
            slot: "weapon",
        },
    },
    "Stone": {
        tier: "Normal",
        name: "Stone",
        url: "./items/stone.png",
        value: 1,
    },
});

export default ITEM_DATA;
