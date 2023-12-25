import {useState} from "react";
import {TownBuildingProps} from "../../data/townsData";
import CloseButton from "../CloseButton";
import ShopItemBox from "./ShopItemBox";
import AmountMultiplierList from "./AmountMultiplierList";
import SHOPS_DATA from "../../data/shopsData";
import {useSelector} from "react-redux";
import {RootState} from "../../gameState/store";

export type ShopBuildingProps = {
    closeShop: () => void;
    tab: TownBuildingProps;
    id: number;
};

function Shop({tab, closeShop, id}: ShopBuildingProps) {
    const [amountMultiplier, setAmountMultiplier] = useState<number | "max">(1);
    const shops = useSelector((state: RootState) => state.shops);
    // const stock = useMemo(, [id, shops]);

    const getStock = () => {
        const stock = shops[id];
        if (!stock) return SHOPS_DATA[id].items;
        const reduxLength = stock.length;
        const dataLength = SHOPS_DATA[id].items.length;
        if (reduxLength < dataLength) {
            stock.push(...SHOPS_DATA[id].items.slice(reduxLength, dataLength));
        }
        return stock.filter((item) => item.currentStock > 0 || item.refreshable);
    };

    const stock = getStock();

    return (
        <div
            className="bg-no-repeat bg-center bg-cover bg-opacity-25 w-full h-full rounded-md relative "
            style={{backgroundImage: `url(${tab.url})`}}>
            <div className="w-full h-full bg-black bg-opacity-60 rounded-md p-4">
                <CloseButton position="top-right" callback={closeShop} />
                <AmountMultiplierList amountMultiplier={amountMultiplier} setAmountMultiplier={setAmountMultiplier} />
                <div className="grid grid-cols-3 grid-rows-4 w-3/4 h-full ">
                    {stock.map((item) => (
                        <ShopItemBox key={item.itemId} item={item} amountMultiplier={amountMultiplier} shopId={id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Shop;
