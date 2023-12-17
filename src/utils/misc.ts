import {abbreviateNumber} from "js-abbreviation-number";

export const short = (number: number) => {
    const symbols = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No"];
    return abbreviateNumber(number, 2, {symbols});
};
