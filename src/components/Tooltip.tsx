import React from "react";
import {ItemProps, colorsByItemTier} from "../data/itemsData";

type TooltipProps = {
    itemData: ItemProps;
    getFloatingProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
    setFloating: (node: HTMLElement | null) => void;
    floatingStyles: React.CSSProperties;
};

function Tooltip({itemData, floatingStyles, setFloating, getFloatingProps}: TooltipProps) {
    const {name, equipment, tier, description} = itemData;
    return (
        <div
            ref={setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="p-1 bg-zinc-700 rounded-md border border-slate-800 flex gap-1 flex-col cursor-default select-none">
            <span className="text-lg">{name}</span>
            <span className="text-md" style={{color: colorsByItemTier[tier]}}>
                {tier} {equipment ? equipment.type : null}
            </span>
            {description ? <span>{description}</span> : null}
            {equipment ? (
                <>
                    <ul className="flex flex-col text-sm">
                        {equipment.stats.map((stat) => (
                            <li key={stat.type}>{stat.description}</li>
                        ))}
                    </ul>
                    <span className="flex gap-1 ms-auto items-center text-xs">
                        Equip
                        <img src="./other/rightClick.png" alt={`right click to equip`} height={16} width={16}></img>
                    </span>
                </>
            ) : null}
        </div>
    );
}

export default Tooltip;
