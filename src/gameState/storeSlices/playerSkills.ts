import {createSlice} from "@reduxjs/toolkit";
import {SkillNames} from "../../data/skillTreesData";
import {resetAction} from "../store";

export type PlayerSkillsProps = Partial<Record<SkillNames, number>>;
export type AddSkillPointsAction = {
    payload: SkillNames;
    type: string;
};

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

export default playerSkillsSlice.reducer;
export const {addSkillPoint} = playerSkillsSlice.actions;
