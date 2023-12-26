import {createAction, createSlice} from "@reduxjs/toolkit";
import {addSkillPoint} from "./playerSkills";
import SPELLS_DATA, {SpellNames} from "../../data/spellsData";
import {ALL_SKILLS} from "../../data/skillTreesData";
import {castSpell, reduceCooldowns} from "./battleState";

export type SpellActionProps = {
    payload: SpellPayloadProps;
    type: string;
};

export type SpellPayloadProps = {
    name: SpellNames;
    cooldown: number;
    duration?: number;
};

export type PlayerSpellsProps = {
    spellsUnlocked: Partial<Record<SpellNames, boolean>>;
    spellsQuickBar: Array<QuickBarSpellProps | null>;
};

export type QuickBarSpellProps = {
    name: SpellNames;
    cooldown: number;
    currentCooldown: number;
    duration?: number;
    currentDuration?: number;
};

const resetAction = createAction("RESET_STATES");
const initialState: PlayerSpellsProps = {
    spellsUnlocked: {},
    spellsQuickBar: new Array(10).fill(null),
};

const playerSpellsSlice = createSlice({
    initialState,
    name: "playerSpells",
    reducers: {
        unlockSpell: (state, action: SpellActionProps) => {
            state.spellsUnlocked[action.payload.name] = true;
        },
        addToQuickBar: (state, action: SpellActionProps) => {
            const freeSlotIndex = state.spellsQuickBar.findIndex((slot) => slot === null);
            const {effect} = SPELLS_DATA[action.payload.name];
            const {name, cooldown, duration} = action.payload;
            const spell: QuickBarSpellProps = {name, currentCooldown: 0, cooldown};
            if (effect.type === "Support Stat Buff") {
                spell.currentDuration = 0;
                spell.duration = duration;
            }
            state.spellsQuickBar[freeSlotIndex] = spell;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addSkillPoint, (state, action) => {
                const skill = ALL_SKILLS.find((skill) => skill.name === action.payload.name);
                if (!skill?.spellName || state.spellsUnlocked[skill.spellName]) return;
                state.spellsUnlocked[skill.spellName] = true;
                const spellData = SPELLS_DATA[skill.spellName];
                playerSpellsSlice.caseReducers.addToQuickBar(state, {
                    type: "playerSpells/addToQuickBar",
                    payload: {
                        name: skill.spellName,
                        cooldown: spellData.cooldown,
                        duration: spellData.effect?.type === "Support Stat Buff" ? spellData.effect.duration : undefined,
                    },
                });

                if (skill.statEffect === undefined) return;
                const {id, value} = skill.statEffect;
                if (id === "cooldownReduction") {
                    state.spellsQuickBar.forEach((spell) => (spell ? (spell.cooldown -= value) : null));
                }
            })
            .addCase(resetAction, () => initialState)
            .addCase(reduceCooldowns, (state) => {
                state.spellsQuickBar.forEach((spell) => {
                    if (!spell) return;
                    if (spell.currentCooldown) spell.currentCooldown--;
                    if (spell.currentDuration) spell.currentDuration--;
                });
            })
            .addCase(castSpell, (state, action) => {
                const index = state.spellsQuickBar.findIndex((spell) => spell?.name == action.payload.name);
                const spell = state.spellsQuickBar[index];
                if (index === -1 || !spell) return;

                const {cooldown, duration} = action.payload;
                spell.currentCooldown = cooldown;
                if (duration) {
                    spell.currentDuration = duration;
                }
            });
    },
});

export default playerSpellsSlice.reducer;
