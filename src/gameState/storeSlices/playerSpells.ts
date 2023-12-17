import {createAction, createSlice} from "@reduxjs/toolkit";
import {addSkillPoint} from "./playerSkills";
import SPELLS_DATA, {SpellNames} from "../../data/spellsData";
import SKILL_TREES_DATA from "../../data/skillTreesData";
import {SimpleActionProps} from "../store";
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
            const spell = SPELLS_DATA[action.payload];
            state.spellsQuickBar[freeSlotIndex] = {name: action.payload, cooldown: spell.cooldown, currentCooldown: 0};
            console.log(state.spellsQuickBar[freeSlotIndex]);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(addSkillPoint, (state, action) => {
                for (const tree of SKILL_TREES_DATA) {
                    for (const skill of tree.skills) {
                        if (skill.spellName === action.payload) {
                            state.spellsUnlocked[skill.spellName] = true;
                            playerSpellsSlice.caseReducers.addToQuickBar(state, {type: "playerSpells/addToQuickBar", payload: skill.spellName});
                        }
                    }
                }
            })
            .addCase(resetAction, () => initialState)
            .addCase(reduceCooldowns, (state) => {
                state.spellsQuickBar.forEach((spell) => {
                    if (!spell) return;
                    spell.currentCooldown = Math.max(0, (spell.currentCooldown -= 1));
                });
            })
            .addCase(castSpell, (state, action) => {
                const index = state.spellsQuickBar.findIndex((spell) => spell?.name == action.payload);
                if (index === -1 || !state.spellsQuickBar[index]) return;
                (state.spellsQuickBar[index] as QuickBarSpell).currentCooldown = (state.spellsQuickBar[index] as QuickBarSpell).cooldown;
            });
    },
});

export default playerSpellsSlice.reducer;
