import {createAction, createSlice} from "@reduxjs/toolkit";
import {addSkillPoint} from "./playerSkills";
import SPELLS_DATA, {SpellNames} from "../../data/spellsData";
import {ALL_SKILLS, StatEffectProps} from "../../data/skillTreesData";
import {castSpell, reduceCooldowns} from "./battleState";

export type SpellAction = {
    payload: SpellNames;
    type: string;
};
export type PlayerSpellsProps = {
    spellsUnlocked: Partial<Record<SpellNames, boolean>>;
    spellsQuickBar: Array<QuickBarSpell | null>;
};
export type QuickBarSpell = {
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
        unlockSpell: (state, action: SpellAction) => {
            state.spellsUnlocked[action.payload] = true;
        },
        addToQuickBar: (state, action: SpellAction) => {
            const freeSlotIndex = state.spellsQuickBar.findIndex((slot) => slot === null);
            const {effect, cooldown} = SPELLS_DATA[action.payload];
            state.spellsQuickBar[freeSlotIndex] = {name: action.payload, cooldown, currentCooldown: 0};
            if (effect.type === "Support Stat Buff") {
                (state.spellsQuickBar[freeSlotIndex] as QuickBarSpell).duration = effect.duration;
                (state.spellsQuickBar[freeSlotIndex] as QuickBarSpell).currentDuration = 0;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addSkillPoint, (state, action) => {
                const skill = ALL_SKILLS.find((skill) => skill.name === action.payload);
                if (skill?.spellName) {
                    state.spellsUnlocked[skill.spellName] = true;
                    playerSpellsSlice.caseReducers.addToQuickBar(state, {type: "playerSpells/addToQuickBar", payload: skill.spellName});
                }
                if (skill && skill.statEffect && skill.statEffect.id === "cooldownReduction") {
                    const temp = [...state.spellsQuickBar];
                    temp.forEach((spell) => {
                        if (!spell || spell.cooldown <= 10) return;
                        spell.cooldown -= (skill.statEffect as StatEffectProps).value;
                    });
                    state.spellsQuickBar = [...temp];
                }
                return state;
            })
            .addCase(resetAction, () => initialState)
            .addCase(reduceCooldowns, (state) => {
                state.spellsQuickBar.forEach((spell) => {
                    if (!spell) return;
                    spell.currentCooldown = Math.max(0, (spell.currentCooldown -= 1));
                    if (spell.currentDuration) spell.currentDuration--;
                });
            })
            .addCase(castSpell, (state, action) => {
                const index = state.spellsQuickBar.findIndex((spell) => spell?.name == action.payload);
                if (index === -1 || !state.spellsQuickBar[index]) return;
                const spell = state.spellsQuickBar[index] as QuickBarSpell;
                spell.currentCooldown = spell.cooldown;
                if (spell.duration) {
                    spell.currentDuration = spell.duration;
                }
            });
    },
});

export default playerSpellsSlice.reducer;
