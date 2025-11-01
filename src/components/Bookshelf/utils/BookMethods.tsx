export function appliedStyle(input: string | undefined){
    if(input?.charAt(0) === "#"){
        return input;
    }

    const map: any = {
        "green": "#00B600",
        "blue": "#0C347D",
        "umber": "#54290C",
        "springer": "#F2E323",
        "maroon": "#800000",
        "pink": "#CE84F7",
        "cyan": "#025D57",
        "purple": "#5F184E",
    };

    return input ? map[input] : "#00B600";
}