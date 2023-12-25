import {useState} from "react";
import {ItemProps} from "../../data/itemsData";
import useTooltip from "../../hooks/useTooltip";
import Tooltip from "../tooltip/Tooltip";

function RecipeSlot({item, setRecipe}: {item: ItemProps; setRecipe: () => void}) {
    const [show, setShow] = useState(false);
    const {refs, floatingStyles, getFloatingProps, getReferenceProps} = useTooltip({show, setShow});

    const handleLeftClick = () => {
        setRecipe();
    };

    return (
        <div
            className="border flex justify-center items-center rounded-md  border-zinc-600 bg-zinc-800 flex-col hover:bg-zinc-700 hover:bg-opacity-50 cursor-pointer w-12 h-12"
            ref={refs.setReference}
            {...getReferenceProps()}
            onClick={handleLeftClick}>
            <img src={item.url} className="h-7" alt={`${item.name} item`}></img>
            {show ? (
                <Tooltip
                    data={{type: "item", item}}
                    setFloating={refs.setFloating}
                    floatingStyles={floatingStyles}
                    getFloatingProps={getFloatingProps}
                />
            ) : null}
        </div>
    );
}

export default RecipeSlot;
