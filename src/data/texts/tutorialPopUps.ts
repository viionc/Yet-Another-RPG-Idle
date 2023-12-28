import {UnlockKey} from "../../gameState/storeSlices/playerUnlockedContent";

export type PopUpTextProps = {
    title: string;
    text: string;
};

const craftingTutorialText = {
    title: "Crafting unlocked!",
    text: `
You have unlocked crafting, a vital part of progression of this game. Use materials to craft new items in Crafting tab. \n
Recipes unlock on certain stages of the game or they can be found in various ways.
    `,
};

const townsTutorialText = {
    title: "Towns unlocked!",
    text: `
You have found your first town. Towns are main way to find npcs, quests, guilds and other activites. \n
Towns are unlocked after reaching certain waves in zones. Once unlocked you can visit them at will from Towns tab.
    `,
};

const shopsTutorialText = {
    title: "Shops",
    text: `
This is a shop, you can spend coins on various items. Shops have their own stock of items, but some items require some kind of progression to show up. \n
Items with cyan border will increase in stock after timer reaches 0. Items with purple border will not refresh and you can't buy more than there is in stock.   
    `,
};

const zonesMapTutorialText = {
    title: "Zones map unlocked!",
    text: `
This map allows you to travel between unlocked zones. \n
You can open the map by pressing Map button in bottom right corner of battle display.
    `,
};

const tutorialTextData: Record<UnlockKey, PopUpTextProps> = {
    "crafting": craftingTutorialText,
    "towns": townsTutorialText,
    "shops": shopsTutorialText,
    "zonesMap": zonesMapTutorialText,
};

export default tutorialTextData;