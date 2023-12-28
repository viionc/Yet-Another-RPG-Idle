import {Dispatch, UnknownAction} from "@reduxjs/toolkit";
import {EnemyProps} from "../data/enemiesData";
import SPELLS_DATA, {SpellMagicEffectProps, SpellNames} from "../data/spellsData";
import {gameState} from "../gameState/store";
import {BattleStateEnemyProps, updateEnemyHp} from "../gameState/storeSlices/battleState";
import {InventoryItem} from "../gameState/storeSlices/playerInventory";
import {PlayerStatsProps} from "../gameState/storeSlices/playerStats";
import {DamageDoneProps, handleEndBattle} from "../tickHandler/battleInterval";

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

export const calculateDamageDone = (double?: boolean): DamageDoneProps => {
    const {playerStats} = gameState.getState();
    const {attackPower} = playerStats;

    let damage = attackPower;
    // for double attack spell
    double ? (damage *= 2) : null;

    const crit = calculateCritDamage(damage);

    return crit;
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

export const spellHit = (spellName: SpellNames): DamageDoneProps => {
    // makeshift solution for now, rework later
    let damageDone = {damage: 0, wasCrit: false};
    switch (spellName) {
        case "Double Attack":
            damageDone = calculateDamageDone(true);
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
    const hit = spellHit(spellName);
    if (!enemy) return;
    const hpAfterDamage = Math.max(0, enemy.currentHp - hit.damage);
    dispatch(updateEnemyHp({hpAfterDamage, damageForHitSplat: `${hit.damage}${hit.wasCrit ? "!" : ""}`}));
    if (hpAfterDamage <= 0) {
        handleEndBattle(dispatch);
    }
};

export const getSpellCooldown = (spellCooldown: number, cooldownReduction: number) => spellCooldown - (spellCooldown > 10 ? cooldownReduction : 0);
