import {Dispatch, UnknownAction} from "@reduxjs/toolkit";
import ENEMIES_DATA, {ElementsNames, EnemyProps} from "../data/enemiesData";
import SPELLS_DATA, {SpellMagicEffectProps, SpellNames} from "../data/spellsData";
import {gameState} from "../gameState/store";
import {BattleStateEnemyProps, updateEnemyHp} from "../gameState/storeSlices/battleState";
import {InventoryItem, removeItemsFromInventory} from "../gameState/storeSlices/playerInventory";
import {PlayerStatsProps} from "../gameState/storeSlices/playerStats";
import {DamageDoneProps, handleEndBattle} from "../tickHandler/battleInterval";
import ITEM_DATA, {EquipmentProps, EquipmentStat, ItemNames, ItemProps} from "../data/itemsData";
import {PlayerEquipment, removeArrow} from "../gameState/storeSlices/playerEquipment";

export const calculateEnemyDrops = (enemy: EnemyProps) => {
    const itemsToUpdate: InventoryItem[] = [];
    for (const drop of enemy.drops) {
        const roll = Math.ceil(Math.random() * drop.chance);
        if (roll === drop.chance) {
            const amount = Math.floor(Math.random() * (drop.maxAmount - drop.minAmount + 1) + drop.minAmount);
            itemsToUpdate.push({name: drop.name, amount});
        }
    }
    return itemsToUpdate;
};

export type CalculateDamageProps = {
    enemyWeakness: ElementsNames;
    arrowNameEquipped?: ItemNames;
    isBow?: true;
    isDoubleAttack?: true;
};

export const weaknessesMap: Record<ElementsNames, keyof PlayerStatsProps> = {
    "Fire": "extraFireDamage",
    "Air": "extraAirDamage",
    "Dark": "extraDarkDamage",
    "Light": "extraLightDamage",
    "Physical": "extraPhysicalDamage",
    "Earth": "extraEarthDamage",
    "Water": "extraWaterDamage",
};

export const calculateDamageDone = ({isBow, arrowNameEquipped, isDoubleAttack, enemyWeakness}: CalculateDamageProps): DamageDoneProps => {
    const {playerStats, playerSkills} = gameState.getState();
    const {attackPower} = playerStats;

    let damage = attackPower;
    if (!isBow && arrowNameEquipped) {
        const equipment = (ITEM_DATA[arrowNameEquipped] as ItemProps).extra as EquipmentProps;
        const atkBonus = equipment.stats.find((stat) => stat.key === "attackPower") as EquipmentStat;
        damage -= atkBonus.value;
    }

    // for double attack spell
    isDoubleAttack ? (damage *= 2) : null;
    const elementKey = weaknessesMap[enemyWeakness];
    const extraElementalDamage = playerStats[elementKey];
    if (playerSkills["Weaknesses"]) {
        damage *= extraElementalDamage;
    }
    const crit = calculateCritDamage(damage);

    return crit;
};

export type HandleBowDamageProps = {
    dispatch: Dispatch<UnknownAction>;
    arrowNameEquipped: ItemNames | false;
    playerInventory: (InventoryItem | null)[];
    playerStats: PlayerStatsProps;
    enemyWeakness: ElementsNames;
};

export const handleBowDamage = ({dispatch, arrowNameEquipped, playerInventory, enemyWeakness}: HandleBowDamageProps): DamageDoneProps | false => {
    if (!arrowNameEquipped) return false;
    const arrowsInInventory = playerInventory.find((item) => item && item.name === arrowNameEquipped);
    if (!arrowsInInventory) {
        dispatch(removeArrow());
    } else {
        dispatch(removeItemsFromInventory([{name: arrowNameEquipped, amount: 1}]));
    }
    const damageDone = calculateDamageDone({isBow: true, arrowNameEquipped, enemyWeakness});
    return damageDone;
};

export const checkIfWeaponIsBow = (playerEquipment: PlayerEquipment): boolean => {
    if (!playerEquipment.weapon) return false;
    const item = ITEM_DATA[playerEquipment.weapon] as ItemProps;
    if (item.extra?.type === "equipment" && item.extra.bow) return true;
    return false;
};

export const checkIfOffhandIsArrow = (playerEquipment: PlayerEquipment): ItemNames | false => {
    if (!playerEquipment.offhand) return false;
    const item = ITEM_DATA[playerEquipment.offhand] as ItemProps;
    if (item.extra?.type === "equipment" && item.extra.arrow) return playerEquipment.offhand;
    return false;
};

export const calculateXpGain = (playerStats: PlayerStatsProps, zoneId: number, currentWave: number, enemyExperience: number) => {
    const xp = Math.floor((enemyExperience + zoneId + 1) * currentWave + Math.pow(zoneId, 3));
    const xpMulti = playerStats.xpMultiplier;
    return Math.ceil(xp * xpMulti);
};

export const calculateGoldGain = (playerStats: PlayerStatsProps, zoneId: number, currentWave: number) => {
    const gold = Math.floor(Math.pow(zoneId, 2) + currentWave);
    const goldMulti = playerStats.goldCoinsMultiplier;
    return Math.ceil(gold * goldMulti);
};

export const spellHit = (spellName: SpellNames, enemyWeakness: ElementsNames): DamageDoneProps => {
    // makeshift solution for now, rework later
    let damageDone = {damage: 0, wasCrit: false};
    switch (spellName) {
        case "Double Attack":
            damageDone = calculateDamageDone({isDoubleAttack: true, enemyWeakness}) as DamageDoneProps;
            break;
        case "Fire Strike":
            damageDone = calculateSpellDamageDone(spellName);
            break;
    }
    return damageDone;
};

export const calculateCritDamage = (baseDamage: number): DamageDoneProps => {
    const {playerStats} = gameState.getState();
    const {critChance, critMulti} = playerStats;
    let wasCrit = false;
    let damage = baseDamage;
    if (critChance) {
        const critRoll = Math.floor(Math.random() * 100) + 1; // 1 - 100
        // crit chance 2, 1 or 2 will pass
        if (critChance >= critRoll) {
            damage = Math.ceil(damage * critMulti);
            wasCrit = true;
        }
    }
    return {damage, wasCrit};
};

export const calculateSpellDamageDone = (spellName: SpellNames): DamageDoneProps => {
    const {playerStats, playerSkills} = gameState.getState();
    const spellData = SPELLS_DATA[spellName];
    const baseDamage = (spellData.effect as SpellMagicEffectProps).baseDamage + playerStats.magicDamage;
    let hit: DamageDoneProps = {damage: baseDamage, wasCrit: false};
    if (playerSkills["Spell Crit"]) {
        hit = calculateCritDamage(baseDamage);
    }
    return hit;
};

export const doSpellDamage = (dispatch: Dispatch<UnknownAction>, spellName: SpellNames, enemy: BattleStateEnemyProps | null) => {
    if (!enemy) return;
    const weakness = ENEMIES_DATA[enemy.id].weakness;
    const hit = spellHit(spellName, weakness);
    const hpAfterDamage = Math.max(0, enemy.currentHp - hit.damage);
    dispatch(updateEnemyHp({hpAfterDamage, damageForHitSplat: `${hit.damage}${hit.wasCrit ? "!" : ""}`}));
    if (hpAfterDamage <= 0) {
        handleEndBattle(dispatch);
    }
};

export const getSpellCooldown = (spellCooldown: number, cooldownReduction: number) => spellCooldown - (spellCooldown > 10 ? cooldownReduction : 0);

export const getSpellDuration = (spellDuration: number, increasedSpellDuration: number) => (spellDuration += increasedSpellDuration);
