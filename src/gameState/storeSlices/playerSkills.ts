import {createAction, createSlice} from "@reduxjs/toolkit";
import {SkillNames} from "../../data/skillTreesData";

export type PlayerSkillsProps = Partial<Record<SkillNames, number>>;
export type AddSkillPointsAction = {
    payload: SkillNames;
    type: string;
};
const resetAction = createAction("RESET_STATES");
const initialState: PlayerSkillsProps = {};

const playerSkillsSlice = createSlice({
    initialState,
    name: "playerSkills",
    reducers: {
        addSkillPoint: (state, action: AddSkillPointsAction) => {
            if (state[action.payload]) {
                (state[action.payload] as number) += 1;
            } else {
                state[action.payload] = 1;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetAction, () => initialState);
    },
});

export const {addSkillPoint} = playerSkillsSlice.actions;
export default playerSkillsSlice.reducer;
