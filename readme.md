# Yet Another RPG Idle

is an idle/incremental type of game. current version at: https://yet-another-rpg-idle.vercel.app/

![image](https://github.com/viionc/Yet-Another-RPG-Idle/assets/6730164/ac33f7b5-ba03-45dc-9737-8c3033872ac6)

## Current features:

-   idle combat system with various enemies and boss enemies
-   item with tier system (normal, uncommon, rare, etc.)
-   inventory
-   equipment
-   player stats
-   skill points and skill trees
-   spells

## TODO:

<s>- figure out how to fix battleInterval delay when players attack speed changes: </s>

<s>basically what happens is that whenever the attack speed changes, use effect that calls that interval gets updated, destroys the current interval, and creates a new one with an updated value which creates a delay equal to remaining time of previous interval </s> <br><br> <s>possibly found a fix by using setTimeout instead of setInterval, but idk yet if it will create any issues</s><br><br> nvm, now it breaks when game goes out of focus

-   fix damage hit splat update
-   fix overkill damage
-   requirements system
-   rework enemy xp, hp, and gold gain systems
-   fix bugs that show up after fixing other bugs

<br>

## more of current features

-   more zones, more enemies
-   more skills and skill icons
-   more spells
-   more items to test the inventory system

<br>

## ideas

-   react window for infinite inventory??
-   rare enemy that can spawn in every zone?
-   animate enemies? canvas? gifs bad
-   quests?
-   crafting?
-   shop?
-   town or something idk?
