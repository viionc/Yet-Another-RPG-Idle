import React from "react";
import {ItemProps} from "../../data/itemsData";
import {SpellProps} from "../../data/spellsData";
import ItemToolTipInfo from "./ItemToolTipInfo";
import SpellTooltipInfo from "./SpellTooltipInfo";

type TooltipProps = {
    data: TooltipDataProps;
    getFloatingProps: (userProps?: React.HTMLProps<HTMLElement> | undefined) => Record<string, unknown>;
    setFloating: (node: HTMLElement | null) => void;
    floatingStyles: React.CSSProperties;
};

type TooltipDataProps = ItemData | SpellData;
type ItemData = {
    type: "item";
    item: ItemProps;
};
type SpellData = {
    type: "spell";
    spell: SpellProps;
};

function Tooltip({data, floatingStyles, setFloating, getFloatingProps}: TooltipProps) {
    return (
        <div
            ref={setFloating}
            style={floatingStyles}
            {...getFloatingProps()}
            className="p-1 bg-zinc-700 rounded-md border border-slate-800 flex gap-1 flex-col cursor-default select-none">
            {data.type === "item" ? <ItemToolTipInfo item={data.item} /> : null}
            {data.type === "spell" ? <SpellTooltipInfo spell={data.spell} /> : null}
        </div>
    );
}

export default Tooltip;
