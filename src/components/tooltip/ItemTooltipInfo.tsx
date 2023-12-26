import {ItemProps, colorsByItemTier} from "../../data/itemsData";
type ItemTooltipInfoProps = {
    item: ItemProps;
};

function ItemTooltipInfo({item}: ItemTooltipInfoProps) {
    const {name, tier, extra, description} = item;
    const getText = () => {
        if (extra?.type === "equipment") return "Equip";
        if (extra?.type === "stat") return "Use";
    };
    return (
        <>
            <span className="text-lg">{name}</span>
            <span className="text-md" style={{color: colorsByItemTier[tier]}}>
                {tier} {extra?.type === "equipment" ? extra.slot : null}
            </span>
            {description ? <span>{description}</span> : null}
            {extra?.type === "equipment" ? (
                <>
                    <ul className="flex flex-col text-sm">
                        {extra.stats.map((stat) => (
                            <li key={stat.type}>{stat.description}</li>
                        ))}
                    </ul>
                </>
            ) : null}
            {extra ? (
                <span className="flex gap-1 ms-auto items-center text-xs">
                    {getText()}
                    <img src="./other/rightClick.png" alt={`right click to equip`} height={16} width={16}></img>
                </span>
            ) : null}
        </>
    );
}

export default ItemTooltipInfo;
