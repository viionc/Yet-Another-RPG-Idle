import {useState} from "react";
import BattlePanel from "./components/battlePanel/BattlePanel";
import Header from "./components/Header";
import StatsPanel from "./components/StatsPanel";
import InventoryPanel from "./components/inventoryPanel/InventoryPanel";
import SkillTreePanel from "./components/skillTreePanel/SkillTreePanel";
import PlayerEquipmentPanel from "./components/equipmentPanel/PlayerEquipmentPanel";
import SpellsPanel from "./components/spellsPanel/SpellsPanel";
import CraftingPanel from "./components/craftingPanel/CraftingPanel";
import TownPanel from "./components/townPanel/TownPanel";

import GameLoopComponent from "./components/GameLoopComponent";
import DialogueModal from "./components/DialogueModal";
import {useSelector} from "react-redux";
import {RootState} from "./gameState/store";

export type Tabs = "Main" | "Skill Tree" | "Crafting" | "Town";

function App() {
    const [tabOpen, setTabOpen] = useState<Tabs>("Main");
    const dialogues = useSelector((state: RootState) => state.dialogues);
    return (
        <>
            {dialogues.currentNpcId !== null ? <DialogueModal id={dialogues.currentNpcId}></DialogueModal> : null}
            <GameLoopComponent></GameLoopComponent>
            <Header setTabOpen={setTabOpen}></Header>
            <main className="container grid grid-cols-4 gap-2 text-white" style={{gridTemplateRows: "20rem 5rem 20rem"}}>
                <StatsPanel></StatsPanel>
                {tabOpen === "Main" ? (
                    <>
                        <BattlePanel></BattlePanel>
                        <SpellsPanel></SpellsPanel>
                        <InventoryPanel></InventoryPanel>
                        <PlayerEquipmentPanel></PlayerEquipmentPanel>
                    </>
                ) : null}
                {tabOpen === "Skill Tree" ? <SkillTreePanel></SkillTreePanel> : null}
                {tabOpen === "Crafting" ? (
                    <>
                        {" "}
                        <CraftingPanel></CraftingPanel>
                        <InventoryPanel></InventoryPanel>
                        <PlayerEquipmentPanel></PlayerEquipmentPanel>
                    </>
                ) : null}
                {tabOpen === "Town" ? (
                    <>
                        <TownPanel></TownPanel>
                        <PlayerEquipmentPanel></PlayerEquipmentPanel>
                    </>
                ) : null}
            </main>
        </>
    );
}

export default App;
