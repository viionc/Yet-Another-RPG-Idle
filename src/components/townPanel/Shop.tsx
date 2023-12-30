import {useEffect, useState} from "react";
import {TownBuildingProps} from "../../data/townsData";
import CloseButton from "../CloseButton";
import ShopItemBox from "./ShopItemBox";
import AmountMultiplierList from "./AmountMultiplierList";
import SHOPS_DATA from "../../data/shopsData";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../gameState/store";
import {updateStock} from "../../gameState/storeSlices/shops";

export type ShopBuildingProps = {
    closeShop: () => void;
    tab: TownBuildingProps;
    id: number;
};

function Shop({tab, closeShop, id}: ShopBuildingProps) {
    const [amountMultiplier, setAmountMultiplier] = useState<number | "max">(1);
    const shops = useSelector((state: RootState) => state.shops);
    const {currentShopRefreshCooldown} = useSelector((state: RootState) => state.playerStats);
    const dispatch = useDispatch();
    // const stock = useMemo(, [id, shops]);

    useEffect(() => {
        const stock = shops[id];
        const reduxLength = stock ? stock.length : 0;
        const dataLength = SHOPS_DATA[id].items.length;
        if (reduxLength < dataLength) {
            dispatch(updateStock({shopId: id, newItems: [...SHOPS_DATA[id].items.slice(reduxLength, dataLength)]}));
        }
    }, [dispatch, shops, id]);

    return (
        <div
            className="bg-no-repeat bg-center bg-cover bg-opacity-25 w-full h-full rounded-md relative "
            style={{backgroundImage: `url(${tab.url})`}}>
            <div className="w-full h-full bg-black bg-opacity-60 rounded-md p-4">
                <CloseButton position="top-right" callback={closeShop} />
                <AmountMultiplierList amountMultiplier={amountMultiplier} setAmountMultiplier={setAmountMultiplier} />
                <h2 className="text-yellow-500 mb-4">Next refresh in: {currentShopRefreshCooldown}s</h2>
                <div className="grid gap-4 grid-cols-4 grid-rows-4 w-full">
                    {shops[id] &&
                        shops[id]
                            .filter((item) => item.refreshable || (!item.refreshable && item.currentStock > 0))
                            .map((item) => <ShopItemBox key={item.name} item={item} amountMultiplier={amountMultiplier} shopId={id} />)}
                </div>
            </div>
        </div>
    );
}

export default Shop;
