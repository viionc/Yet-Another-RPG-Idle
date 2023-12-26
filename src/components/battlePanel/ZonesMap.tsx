import {useState} from "react";
import CloseButton from "../CloseButton";
import ZONES_DATA from "../../data/zonesData";
import {useDispatch} from "react-redux";
import {changeZone} from "../../gameState/storeSlices/battleState";

function ZonesMap() {
    const [isOpen, setIsOpen] = useState(false);
    const zones = Object.values(ZONES_DATA);
    const dispatch = useDispatch();
    const _changeZone = (id: number) => {
        dispatch(changeZone({zoneId: id, wave: 1}));
        setIsOpen(false);
    };

    return (
        <>
            {isOpen ? (
                <article className="p-2 absolute top-0 left-0 right-0 bottom-0 bg-zinc-800 z-[300]">
                    <CloseButton position="top-right" callback={() => setIsOpen(false)} />
                    <h1 className="text-red-500 text-xl mb-2">this is a temporary setup so you don't get soft locked in a zone</h1>
                    <div className="flex gap-2">
                        {zones.map((zone) => {
                            return (
                                <button
                                    onClick={() => _changeZone(zone.zoneId)}
                                    className="text-xl px-2 py-1 select-none border bg-zinc-800 bg-opacity-80 text-yellow-500 flex items-center justify-center cursor-pointer hover:bg-yellow-500 hover:text-black rounded-md">
                                    {zone.name}
                                </button>
                            );
                        })}
                    </div>
                </article>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="absolute bottom-1 right-1 text-xl px-2 py-1 select-none border bg-zinc-800 bg-opacity-80 text-yellow-500 flex items-center justify-center cursor-pointer hover:bg-yellow-500 hover:text-black rounded-md">
                    Map
                </button>
            )}
        </>
    );
}

export default ZonesMap;
