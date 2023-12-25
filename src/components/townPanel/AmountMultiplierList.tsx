import React from "react";

const options: Array<number | "max"> = [1, 5, 10, 25, 100, "max"];

type AmountMultiplierListProps = {
    setAmountMultiplier: React.Dispatch<React.SetStateAction<number | "max">>;
    amountMultiplier: number | "max";
};

function AmountMultiplierList({amountMultiplier, setAmountMultiplier}: AmountMultiplierListProps) {
    return (
        <ul className="flex gap-2 mb-4">
            {options.map((option) => (
                <li
                    key={option}
                    className={`text-2xl border border-zinc-800 w-16  bg-opacity-75 rounded-md hover:bg-yellow-500 hover:text-black text-center cursor-pointer 
                    ${amountMultiplier === option ? "bg-yellow-500" : "bg-black"}
                    `}
                    onClick={() => setAmountMultiplier(option)}>
                    {option}
                </li>
            ))}
        </ul>
    );
}

export default AmountMultiplierList;
