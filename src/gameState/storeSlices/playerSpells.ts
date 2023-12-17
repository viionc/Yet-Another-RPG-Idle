import {createAction, createSlice} from "@reduxjs/toolkit";
import {addSkillPoint} from "./playerSkills";
import {SpellNames} from "../../data/spellsData";
import SKILL_TREES_DATA from "../../data/skillTreesData";

export type SpellAction = {
    payload: SpellNames;
    type: string;
};
export type PlayerSpellsProps = {
    spellsUnlocked: Partial<Record<SpellNames, boolean>>;
    spellsQuickBar: Array<SpellNames | null>;
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
            state.spellsQuickBar[freeSlotIndex] = action.payload;
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
            .addCase(resetAction, () => initialState);
    },
});

export default playerSpellsSlice.reducer;
