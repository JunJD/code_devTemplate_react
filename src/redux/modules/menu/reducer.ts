import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { MenuProps } from "rc-menu";
/* MenuState */
export interface MenuState {
	isCollapse: boolean;
	menuList: MenuProps[];
}

const menuState: MenuState = {
	isCollapse: false,
	menuList: []
};

const menuSlice = createSlice({
	name: "menu",
	initialState: menuState,
	reducers: {
		updateCollapse(state: MenuState, { payload }: PayloadAction<boolean>) {
			state.isCollapse = payload;
		},
		setMenuList(state: MenuState, { payload }: PayloadAction<MenuProps[]>) {
			state.menuList = payload;
		}
	}
});

export default menuSlice.reducer;
export const { updateCollapse, setMenuList } = menuSlice.actions;