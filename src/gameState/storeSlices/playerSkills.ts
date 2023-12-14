import {createSlice} from "@reduxjs/toolkit";
import {SimpleActionProps} from "../store";

export type PlayerSkillsProps = Record<number, number>;

const initialState: PlayerSkillsProps = {};

const playerSkillsSlice = createSlice({
    initialState,
    name: "playerSkills",
    reducers: {
        addSkillPoint: (state, action: SimpleActionProps) => {
            state[action.payload] ? state[action.payload]++ : (state[action.payload] = 1);
        },
    },
});

export default playerSkillsSlice.reducer;
export const {addSkillPoint} = playerSkillsSlice.actions;
