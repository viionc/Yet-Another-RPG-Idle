import React from "react";

function BattlePanel() {
    return (
        <section className="border rounded-md col-span-2 p-2 border-slate-800 bg-neutral-800 h-[20rem]">
            <h1 className="h-[2rem]">Plains - Slime lv. 1</h1>
            <div className="w-full h-[16.9rem]">
                <img src="./assets/backgrounds/plains.png" className="rounded-lg w-full object-cover max-h-full object-bottom "></img>
            </div>
        </section>
    );
}

export default BattlePanel;
