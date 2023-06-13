import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Catalog } from "./components/Catalog/Catalog";
import { useEffect, useState } from "react";
import { getAllGames } from "./data/services/gameService";

function App() {
    const [games, setGames] = useState([])
    useEffect(() => {
        getAllGames()
            .then((data) => setGames(data))
    }, [])

    return (
        <div className="App">
            <Header />

            {/* Main Content */}
            <main id="main-content">
                <Routes>
                    <Route path="/" element={<Home games={games.slice(0, 2)} />} />
                    <Route path="catalog" element={<Catalog games={games} />}>
                        <Route path=":id" element={<Home />} />
                        <Route path="edit" element={<Home />} />
                    </Route>
                    <Route path="/create" element={<Home />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;
