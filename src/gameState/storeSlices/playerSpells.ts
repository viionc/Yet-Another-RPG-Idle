import {createAction, createSlice} from "@reduxjs/toolkit";
import {addSkillPoint} from "./playerSkills";
import SPELLS_DATA, {SpellNames} from "../../data/spellsData";
import {ALL_SKILLS} from "../../data/skillTreesData";
import {reduceCooldowns} from "./battleState";

export type SpellActionProps = {
    payload: SpellPayloadProps;
    type: string;
};

export type SpellPayloadProps = {
    name: SpellNames;
    cooldown: number;
    duration?: number;
};

export type ActiveSpellProps = {
    name: SpellNames;
    currentDuration: number;
};

export type PlayerSpellsProps = {
    spellsUnlocked: Partial<Record<SpellNames, boolean>>;
    spellsQuickBar: Array<QuickBarSpellProps | null>;
    activeSpells: ActiveSpellProps[];
};

export type QuickBarSpellProps = {
    name: SpellNames;
    cooldown: number;
    currentCooldown: number;
    duration?: number;
};

const resetAction = createAction("RESET_STATES");
const initialState: PlayerSpellsProps = {
    spellsUnlocked: {},
    spellsQuickBar: new Array(10).fill(null),
    activeSpells: [],
};

const playerSpellsSlice = createSlice({
    initialState,
    name: "playerSpells",
    reducers: {
        unlockSpell: (state, action: SpellActionProps) => {
            // unlocked spells flag
            state.spellsUnlocked[action.payload.name] = true;
        },
        addToQuickBar: (state, action: SpellActionProps) => {
            // adds newly unlocked (or later player chosen) spell to quickbar
            // for now it just looks for an empty slot in spell quickbar
            const freeSlotIndex = state.spellsQuickBar.findIndex((slot) => slot === null);
            const {name, cooldown, duration} = action.payload;
            const spell: QuickBarSpellProps = {name, currentCooldown: 0, cooldown};
            if (duration) spell.duration = duration;
            state.spellsQuickBar[freeSlotIndex] = spell;
        },
        castSpell: (state, action: SpellActionProps) => {
            const {cooldown, duration, name} = action.payload;
            const index = state.spellsQuickBar.findIndex((spell) => spell?.name == name);
            const spell = state.spellsQuickBar[index];
            if (index === -1 || !spell) return;

            spell.currentCooldown = cooldown;

            // if there was a duration property in payload that means it was a buff spell
            // add it to active spells (buffs)
            if (duration) {
                state.activeSpells.push({name, currentDuration: duration});
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addSkillPoint, (state, action) => {
                // check if added skill point unlocks a spell
                const skill = ALL_SKILLS.find((skill) => skill.name === action.payload.name);
                if (!skill?.spellName || state.spellsUnlocked[skill.spellName]) return;
                // add unlocked spell flag
                // get spell information and add it to quick bar
                state.spellsUnlocked[skill.spellName] = true;
                const spellData = SPELLS_DATA[skill.spellName];
                playerSpellsSlice.caseReducers.addToQuickBar(state, {
                    type: "playerSpells/addToQuickBar",
                    payload: {
                        name: skill.spellName,
                        cooldown: spellData.baseCooldown,
                        duration: spellData.effect?.type === "Support Stat Buff" ? spellData.effect.duration : undefined,
                    },
                });

                if (skill.statEffect === undefined) return;
                // check if skill point reduces spell cooldown
                const {id, value} = skill.statEffect;
                if (id === "cooldownReduction") {
                    state.spellsQuickBar.forEach((spell) => (spell ? (spell.cooldown -= value) : null));
                }
                // check if skill point increases spell duration
                if (id === "increasedSpellDuration") {
                    state.spellsQuickBar.forEach((spell) => (spell?.duration ? (spell.duration += value) : null));
                }
            })
            .addCase(resetAction, () => initialState)
            .addCase(reduceCooldowns, (state) => {
                // reduce cooldowns and durations
                state.spellsQuickBar.forEach((spell) => {
                    if (!spell) return;
                    if (spell.currentCooldown) spell.currentCooldown--;
                });
                state.activeSpells.forEach((spell) => {
                    spell.currentDuration--;
                });
                // filter out spells that duration reached 0
                state.activeSpells = state.activeSpells.filter((spell) => spell.currentDuration > 0);
            });
    },
});

export default playerSpellsSlice.reducer;
export const {castSpell} = playerSpellsSlice.actions;
