# Yet Another RPG Idle

is an idle/incremental type of game. the current version playable at: https://yet-another-rpg-idle.vercel.app/<br>

Techstack:

-   React,
-   Redux Toolkit,
-   TypeScript,
-   Tailwind,
-   Vite

Additional libraries used so far:

-   [worker-timers](https://www.npmjs.com/package/worker-timers),
-   [Floating UI](https://floating-ui.com/),
-   [framer-motion](https://www.framer.com/motion/),
-   [redux-persist](https://www.npmjs.com/package/redux-persist),
-   [js-abbreviation-number](https://www.npmjs.com/package/js-abbreviation-number)

![image](https://github.com/viionc/Yet-Another-RPG-Idle/assets/6730164/a79745dc-044f-48d1-a9e3-e87d29a9fef4) ![image](https://github.com/viionc/Yet-Another-RPG-Idle/assets/6730164/e1a886c6-7f8e-42f4-adfc-836d3e911845) ![image](https://github.com/viionc/Yet-Another-RPG-Idle/assets/6730164/0958681b-ccbe-4f20-87bc-ad0dceabe746) ![image](https://github.com/viionc/Yet-Another-RPG-Idle/assets/6730164/2effa84f-463e-440d-ad96-843615b102d7) ![image](https://github.com/viionc/Yet-Another-RPG-Idle/assets/6730164/5a05019e-225b-40db-9901-8b97d779d2b8)

## Current features:

-   Idle combat system with various enemies and boss enemies
    -   4 zones,
    -   15 enemies,
-   Items with a tier system (normal, uncommon, rare, etc.)
-   Inventory system
-   Equipment system
    -   10 slots,
    -   equipable items have various stats
-   Player stats
-   Skill points and skill trees
    -   3 different skill trees,
    -   13 nodes with varying levels
-   Spells
    -   3 different spells
-   Crafting system
-   NPC dialogue system
    -   4 unique NPCs with dialogues
-   Quest system
    -   4 quests
-   Shop system
    -   refreshable stock and unique stock of items
-   Elemental damage system, 7 different elements that monsters can be weak to

## TODO:

-   Make the website responsive, it will require a lot of work and thought on how to place/show certain menus
-   Refactor quest system, it's a bit of a spaghetti code
-   Fix damage hit splat update (rework it)
-   Fix overkill damage
-   Figure out better formulas for enemy XP, HP, and gold gain
-   Improve drag and drop system in inventory, it's a bit buggy atm
-   There is a bug that sometimes doesn't reset stats after buff ends (couldn't catch it "live" yet so idk why it happens)
-   Fix bugs that show up after fixing other bugs

<br>

## More of current features:

-   Zones, more enemies
-   Skills and skill icons
-   Spells
-   Items to test the inventory system
-   Crafting recipes
-   Town features (trainer, shop, guild or something)
-   NPCs
-   quests

<br>

## Ideas:

-   A rare enemy that can spawn in every zone?
-   Animate enemies and spells? canvas? gifs bad
-   Random click events in zones? (ores/trees etc)
-   Alchemy system? lets players convert items into XP or gold
-   Astrology system? Discover stars and constellations for bonuses/stats
-   Trade system between towns? Supply chain kind of thing, not sure about this one
-   Equipment enhancement system? max +9, lower chance to hit the upgrade per enhancement, costs gold and items
