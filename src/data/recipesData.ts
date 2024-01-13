import {ItemNames} from "./itemsData";

export type CraftingRecipeProps = {
    name: ItemNames;
    unlockRequirement: null;
    itemsNeeded: RecipeCost[];
    createsAmount: number;
};

export type RecipeCost = {
    name: ItemNames;
    amount: number;
};

const RECIPES_DATA: Partial<Record<ItemNames, CraftingRecipeProps>> = {
    "Makeshift Club": {
        name: "Makeshift Club",
        unlockRequirement: null,
        itemsNeeded: [{name: "Stick", amount: 10}],
        createsAmount: 1,
    },

    "Turtle Shell Chest": {
        name: "Turtle Shell Chest",
        unlockRequirement: null,
        itemsNeeded: [{name: "Turtle Shell", amount: 25}],
        createsAmount: 1,
    },
    "Turtle Shell Legs": {
        name: "Turtle Shell Legs",
        unlockRequirement: null,
        itemsNeeded: [{name: "Turtle Shell", amount: 20}],
        createsAmount: 1,
    },
    "Turtle Shell Boots": {
        name: "Turtle Shell Boots",
        unlockRequirement: null,
        itemsNeeded: [{name: "Turtle Shell", amount: 10}],
        createsAmount: 1,
    },
    "Turtle Shell Gloves": {
        name: "Turtle Shell Gloves",
        unlockRequirement: null,
        itemsNeeded: [{name: "Turtle Shell", amount: 10}],
        createsAmount: 1,
    },
    "Turtle Shell Helmet": {
        name: "Turtle Shell Helmet",
        unlockRequirement: null,
        itemsNeeded: [{name: "Turtle Shell", amount: 10}],
        createsAmount: 1,
    },
};

export default RECIPES_DATA;

// "Stone Arrow": {
//     name: "Stone Arrow",
//     unlockRequirement: null,
//     itemsNeeded: [
//         {name: "Stick", amount: 1},
//         {name: "Stone", amount: 1},
//         {name: "Feather", amount: 1},
//     ],
//     createsAmount: 1,
// },
