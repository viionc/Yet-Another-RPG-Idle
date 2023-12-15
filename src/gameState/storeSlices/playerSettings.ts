import {createAction, createSlice} from "@reduxjs/toolkit";

export type PlayerSettingsProps = {
    autoWaveProgression: boolean;
};
export type PlayerSettingsActionProps = {
    payload: keyof PlayerSettingsProps;
    type: string;
};
const resetAction = createAction("RESET_STATES");
export const enableSetting = createAction<keyof PlayerSettingsProps>("ENABLE_SETTING");
export const disableSetting = createAction<keyof PlayerSettingsProps>("DISABLE_SETTING");
const initialState: Record<keyof PlayerSettingsProps, boolean> = {autoWaveProgression: false};

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
            .addCase(enableSetting, (state, action: PlayerSettingsActionProps) => {
                state[action.payload] = true;
            })
            .addCase(disableSetting, (state, action: PlayerSettingsActionProps) => {
                state[action.payload] = false;
            });
    },
});

// export const {enableSetting, disableSettings} = playerSettingsSlice.actions;
export default playerSettingsSlice.reducer;
