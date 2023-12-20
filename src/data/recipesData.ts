export type CraftingRecipeProps = {
    itemId: number;
    name: string;
    unlockRequirement: null;
    itemsNeeded: RecipeCost[];
    createsAmount: number;
};

export type RecipeCost = {
    id: number;
    amount: number;
};

const RECIPES_DATA: Record<number, CraftingRecipeProps> = {
    0: {
        itemId: 6,
        name: "Turtle Shell Helmet",
        unlockRequirement: null,
        itemsNeeded: [{id: 3, amount: 10}],
        createsAmount: 1,
    },
    1: {
        itemId: 7,
        name: "Turtle Shell Chest",
        unlockRequirement: null,
        itemsNeeded: [{id: 3, amount: 25}],
        createsAmount: 1,
    },
    2: {
        itemId: 8,
        name: "Turtle Shell Legs",
        unlockRequirement: null,
        itemsNeeded: [{id: 3, amount: 20}],
        createsAmount: 1,
    },
    3: {
        itemId: 9,
        name: "Turtle Shell Boots",
        unlockRequirement: null,
        itemsNeeded: [{id: 3, amount: 10}],
        createsAmount: 1,
    },
    4: {
        itemId: 10,
        name: "Turtle Shell Gloves",
        unlockRequirement: null,
        itemsNeeded: [{id: 3, amount: 10}],
        createsAmount: 1,
    },
};

export default RECIPES_DATA;
