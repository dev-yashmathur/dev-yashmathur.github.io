import { colors_db } from "./storage_DB"
export interface ThemeInterface{
    bookshelf: string,
    colors: Array<string>
}

export const defaultTheme: ThemeInterface = {
    bookshelf: "#A87328",
    colors: colors_db
}

export const beigeMomTheme: ThemeInterface = {
    bookshelf: "#E9E1D4",
    colors: ["#E2C9B3", "#CAB19D","#C49F82", "#95765A", "#523D32"]
}
export const shadesOfPurpleTheme: ThemeInterface = {
    bookshelf: "#2D2A55",
    colors: ["#db9a63", "#be90cb", "#5f184e", "#e1b25f", "#d89b51"]
}
export const nightOwlTheme: ThemeInterface = {
    bookshelf: "#011627",
    colors: ["#bea4dc", "#1b4084", "#8fcdd1", "#e7bcab", "#7f1017"]
}

export const gruvboxTheme: ThemeInterface = {
    bookshelf: "#F9F6D7",
    colors: ["#EFB482", "#9DC3C8", "#912B2F", "#BDB589"]
}

export const vueTheme: ThemeInterface = {
    bookshelf: "#012933",
    colors: ["#93294D", "#82c7D2", "#1587D0", "#AD4365"]
}

export const barbieTheme: ThemeInterface = {
    bookshelf: "#F7CAD0",
    colors: ["#FF0A54", "#FF5C8A", "#FF85A1", "#FBB1BD"]
}