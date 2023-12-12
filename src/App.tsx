import BattlePanel from "./components/BattlePanel";
import Header from "./components/Header";
import StatsPanel from "./components/StatsPanel";

function App() {
    return (
        <>
            <Header></Header>
            <main className="container grid grid-cols-4 gap-2 text-white">
                <StatsPanel></StatsPanel>
                <BattlePanel></BattlePanel>
            </main>
        </>
    );
}

export default App;
