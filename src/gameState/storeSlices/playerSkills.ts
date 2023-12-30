import {createAction, createSlice} from "@reduxjs/toolkit";
import {SkillNames} from "../../data/skillTreesData";

export type PlayerSkillsProps = Partial<Record<SkillNames, number>>;
export type AddSkillPointsAction = {
    payload: AddSkillPointsPayloadProps;
    type: string;
};

export type AddSkillPointsPayloadProps = {
    name: SkillNames;
    amount: number;
};
const resetAction = createAction("RESET_STATES");
const initialState: PlayerSkillsProps = {};

const playerSkillsSlice = createSlice({
    initialState,
    name: "playerSkills",
    reducers: {
        addSkillPoint: (state, action: AddSkillPointsAction) => {
            const {name, amount} = action.payload;
            state[name] = (state[name] ?? 0) + amount;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(resetAction, () => initialState);
    },
});

export const {addSkillPoint} = playerSkillsSlice.actions;
export default playerSkillsSlice.reducer;
