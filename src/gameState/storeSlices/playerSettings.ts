import {createAction, createSlice} from "@reduxjs/toolkit";
import {Tabs} from "../../App";

export type PlayerSettingsProps = {
    navTab: Tabs;
};
export type PlayerSettingsActionProps = {
    payload: PlayerSettingsPayloadProps;
    type: string;
};

export type PlayerSettingsPayloadProps = {
    key: keyof PlayerSettingsProps;
    value: boolean | Tabs;
};
const resetAction = createAction("RESET_STATES");
export const changeSetting = createAction<PlayerSettingsPayloadProps>("CHANGE_SETTING");

const initialState: PlayerSettingsProps = {
    navTab: "Main",
};

const playerSettingsSlice = createSlice({
    initialState,
    name: "playerSettings",
    reducers: {
        // enableSettings: (state, action: PlayerSettingsActionProps) => {
        //     action.payload.forEach((key) => (state[key] = true));
        // },
        // disableSettings: (state, action: PlayerSettingsActionProps) => {
        //     action.payload.forEach((key) => (state[key] = false));
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(resetAction, () => initialState)
            .addCase(changeSetting, (state, action: PlayerSettingsActionProps) => {
                switch (action.payload.key) {
                    case "navTab":
                        state[action.payload.key] = action.payload.value as Tabs;
                }
            });
    },
});

// export const {enableSetting, disableSettings} = playerSettingsSlice.actions;
export default playerSettingsSlice.reducer;
