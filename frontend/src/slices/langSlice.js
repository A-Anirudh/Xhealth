import { createSlice } from "@reduxjs/toolkit";
import { multiLangSupport } from "../dump/multiLanguageSupport";

const initialState = { lang: multiLangSupport.en };

const languageSlice = createSlice({
	name: "language",
	initialState,
	reducers: {
		setLang: (state, action) => {
			state.lang = multiLangSupport[action.payload];
		},
	},
});

export const { setLang } = languageSlice.actions;
export default languageSlice.reducer;
