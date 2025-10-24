import { appliedStyle } from "../utils/BookMethods";
import BookText from "./BookText";
import { BookStackSplitBands, BookStackDefault, 
    BookStackColoredSpine, BookStackDualTopBands } from "../utils/Designs/BookStackDesigns";

interface BookStackElementProps{
    title?: string;
    subtitle?: string;
    color?: string;
    design?: string;
}

const BookStackElement = ({title, subtitle, color, design}: BookStackElementProps) => {
    function appliedDesign(input: string | undefined){
        switch(input){
            case "split bands":
                return(
                    <BookStackSplitBands className="bookshelf__book-wrapper" $color={appliedStyle(color)}>
                        <BookText title={title} subtitle={subtitle}/>
                    </BookStackSplitBands>);
            case "dual top bands":
                return(
                    <BookStackDualTopBands className="bookshelf__book-wrapper" $color={appliedStyle(color)}>
                        <BookText title={title} subtitle={subtitle}/>
                    </BookStackDualTopBands>);
            case "colored spine":
                return(
                    <BookStackColoredSpine className="bookshelf__book-wrapper" $color={appliedStyle(color)}>
                        <BookText title={title} subtitle={subtitle}/>
                    </BookStackColoredSpine>);
            default:
                return(
                    <BookStackDefault className="bookshelf__book-wrapper" $color={appliedStyle(color)}>
                        <BookText title={title} subtitle={subtitle}/>
                    </BookStackDefault>);
        }
    }

    return(<>
        {appliedDesign(design)}
    </>);
}

export default BookStackElement;