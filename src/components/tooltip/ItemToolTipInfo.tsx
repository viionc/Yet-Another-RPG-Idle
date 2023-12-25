import {ItemProps, colorsByItemTier} from "../../data/itemsData";
type ItemToolTipInfoProps = {
    item: ItemProps;
};

function ItemToolTipInfo({item}: ItemToolTipInfoProps) {
    const {name, tier, equipment, description, usable} = item;
    const getText = () => {
        if (equipment) return "Equip";
        if (usable) return "Use";
    };
    return (
        <>
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
                </>
            ) : null}
            {equipment || usable ? (
                <span className="flex gap-1 ms-auto items-center text-xs">
                    {getText()}
                    <img src="./other/rightClick.png" alt={`right click to equip`} height={16} width={16}></img>
                </span>
            ) : null}
        </>
    );
}

export default ItemToolTipInfo;
