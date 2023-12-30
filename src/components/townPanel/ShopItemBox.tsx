import {useState} from "react";
import ITEM_DATA from "../../data/itemsData";
import {ShopItemProps} from "../../data/shopsData";
import {short} from "../../utils/misc";
import Tooltip from "../tooltip/Tooltip";
import useTooltip from "../../hooks/useTooltip";
import {useDispatch, useSelector} from "react-redux";
import {buyItems} from "../../gameState/storeSlices/shops";
import {RootState} from "../../gameState/store";

type ShopItemBoxProps = {
    amountMultiplier: number | "max";
    item: ShopItemProps;
    shopId: number;
};

function ShopItemBox({amountMultiplier, item, shopId}: ShopItemBoxProps) {
    const [show, setShow] = useState(false);
    const {refs, floatingStyles, getFloatingProps, getReferenceProps} = useTooltip({show, setShow});
    const itemData = ITEM_DATA[item.name];
    const dispatch = useDispatch();
    const {goldCoins} = useSelector((state: RootState) => state.playerStats);

    const buyItem = () => {
        // change that later
        const amount = calculateAmount();
        if (!amount) return;
        dispatch(buyItems({amount, name: item.name, shopId}));
    };

    const calculateAmount = (): number => {
        const multi = amountMultiplier === "max" ? item.currentStock : amountMultiplier;
        const totalPrice = multi * item.price;
        const amount = totalPrice > goldCoins ? Math.floor(goldCoins / item.price) : multi;

        return Math.min(item.currentStock, amount);
    };

    return (
        <div
            className={`h-12 bg-zinc-800 bg-opacity-80 hover:bg-zinc-700 hover:bg-opacity-100 cursor-pointer border rounded-md flex items-center gap-2 px-2 justify-between relative
        ${item.refreshable ? "border-cyan-600" : "border-purple-600"}
        `}
            ref={refs.setReference}
            {...getReferenceProps()}
            onClick={buyItem}>
            <img src={itemData.url} className="h-8" />
            <span className="text-md text-yellow-500">{short(item.price)}</span>
            <span>
                {item.currentStock}/{item.maxStock}
            </span>
            {show ? (
                <Tooltip
                    data={{type: "item", item: itemData}}
                    setFloating={refs.setFloating}
                    floatingStyles={floatingStyles}
                    getFloatingProps={getFloatingProps}
                />
            ) : null}
        </div>
    );
}

export default ShopItemBox;
