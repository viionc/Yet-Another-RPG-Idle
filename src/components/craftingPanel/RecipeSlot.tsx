import {useState} from "react";
import {usePopper} from "react-popper";
import {ItemProps} from "../../data/itemsData";

function RecipeSlot({item, setRecipe}: {item: ItemProps; setRecipe: () => void}) {
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null);
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null);
    const {styles, attributes} = usePopper(referenceElement, popperElement);
    const [show, setShow] = useState(false);

    const handleLeftClick = () => {
        setRecipe();
    };

    return (
        <div
            className="border flex justify-center items-center rounded-md  border-zinc-600 bg-zinc-800 flex-col hover:bg-zinc-700 hover:bg-opacity-50 cursor-pointer w-12 h-12"
            ref={setReferenceElement}
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            onClick={handleLeftClick}>
            <img src={`./items/${item.url}`} className="h-7" alt={`${name} item`}></img>
            {show ? (
                <div
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}
                    className="p-1 bg-zinc-700 rounded-md border border-slate-800 flex gap-1 flex-col cursor-default select-none">
                    <span>{item.name}</span>
                </div>
            ) : null}
        </div>
    );
}

export default RecipeSlot;
