import BattlePanel from "./components/battlePanel/BattlePanel";
import Header from "./components/Header";
import StatsPanel from "./components/statsPanel/StatsPanel";
import InventoryPanel from "./components/inventoryPanel/InventoryPanel";
import SkillTreePanel from "./components/skillTreePanel/SkillTreePanel";
import PlayerEquipmentPanel from "./components/equipmentPanel/PlayerEquipmentPanel";
import SpellsPanel from "./components/spellsPanel/SpellsPanel";
import CraftingPanel from "./components/craftingPanel/CraftingPanel";

import GameLoopComponent from "./components/GameLoopComponent";
import DialogueModal from "./components/modals/DialogueModal";
import {useSelector} from "react-redux";
import {RootState} from "./gameState/store";
import TownsPanel from "./components/townPanel/TownsPanel";
import QuestsPanel from "./components/questsPanel/QuestsPanel";
import QuestRewardModal from "./components/modals/QuestRewardModal";
import TutorialPopUp from "./components/TutorialPopUp";

export type Tabs = "Main" | "Skill Trees" | "Crafting" | "Towns";

function App() {
    const dialogues = useSelector((state: RootState) => state.dialogues);
    const {navTab} = useSelector((state: RootState) => state.playerSettings);
    const {currentTutorialId} = useSelector((state: RootState) => state.playerUnlockedContent);

    return (
        <>
            {dialogues.currentNpcId !== null ? <DialogueModal id={dialogues.currentNpcId} /> : null}
            {dialogues.questCompletedIdForModal !== null ? <QuestRewardModal id={dialogues.questCompletedIdForModal} /> : null}
            {currentTutorialId !== null ? <TutorialPopUp tutorialId={currentTutorialId} /> : null}
            <GameLoopComponent />
            <Header />
            <main className="container grid grid-cols-4 gap-2 text-white" style={{gridTemplateRows: "20rem 5rem 20rem"}}>
                <StatsPanel />
                {navTab === "Main" ? (
                    <>
                        <BattlePanel />
                        <SpellsPanel />
                        <InventoryPanel />
                        <PlayerEquipmentPanel />
                        <QuestsPanel />
                    </>
                ) : null}
                {navTab === "Skill Trees" ? <SkillTreePanel /> : null}
                {navTab === "Crafting" ? (
                    <>
                        <CraftingPanel />
                        <InventoryPanel />
                        <PlayerEquipmentPanel />
                    </>
                ) : null}
                {navTab === "Towns" ? (
                    <>
                        <TownsPanel />
                        <PlayerEquipmentPanel />
                        <InventoryPanel />
                        <QuestsPanel />
                    </>
                ) : null}
            </main>
        </>
    );
}

export default App;
