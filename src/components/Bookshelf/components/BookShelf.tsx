import { useEffect, useState, type JSX } from "react";
import { BookshelfDefault } from "../utils/Designs/BookshelfDesign";
import * as Themes from "../utils/BookshelfThemes";

import "../styles/index.css";

export const themes_db: any = {
    "beige": Themes.beigeMomTheme,
    "shades of purple" : Themes.shadesOfPurpleTheme,
    "night owl" : Themes.nightOwlTheme,
    "gruvbox" : Themes.gruvboxTheme,
    "vue": Themes.vueTheme,
    "barbie" : Themes.barbieTheme,
};

interface Props{
    children: JSX.Element[] | JSX.Element;
    theme?: Themes.ThemeInterface | string | undefined;
}

const BookShelf = ({children, theme}: Props) => {
    const [colorSelection, setColorSelection] = useState<Themes.ThemeInterface>(Themes.defaultTheme);

    useEffect(() => {
        if(typeof theme === "string"){
            theme ? setColorSelection(themes_db[theme]) : setColorSelection(Themes.defaultTheme);
        } else if(typeof theme === "object"){
            setColorSelection(theme);
        }
    }, [theme]);



    return(<>
        <BookshelfDefault className="classic-bookshelf bookshelf__wrapper" $shelf={theme ? `${colorSelection.bookshelf}` : ""}>
            {children}
        </BookshelfDefault>
    </>);
}

export default BookShelf;
