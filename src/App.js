import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { Home } from "./components/Home/Home";
import { Catalog } from "./components/Catalog/Catalog";
import { useEffect, useState } from "react";
import { getAllGames } from "./data/services/gameService";
import { GameDetails } from "./components/Catalog/GameDetails/GameDetails";
import { Register } from "./components/Auth/Register/Register";
import { Login } from "./components/Auth/Login/Login";
import { Create } from "./components/Create/Create";
import { tokenValue } from "./data/api";
import { GameEdit } from "./components/Catalog/GameEdit/GameEdit";
import { LoggedUserRouteGuard } from "./components/common/LoggedUserRouteGuard";
import { GuestUserRouteGuard } from "./components/common/GuestUserRoutGuard";

function App() {
    const [user, setUser] = useState(null)
    const [games, setGames] = useState([])
    useEffect(() => {
        getAllGames()
            .then((data) => setGames(data))
    }, [])

    function setUserHandler(user) {
        setUser(user ? ({ ...user }) : null)
        tokenValue.token = user?.accessToken || null
    }

    return (
        <div className="App">
            <Header user={user} setUser={setUserHandler} />

            <main id="main-content">
                <Routes>
                    <Route path="/" element={<Home games={games.slice(0, 3)} />} />

                    <Route element={<LoggedUserRouteGuard />}>
                        <Route path="catalog" >
                            <Route index={true} element={<Catalog games={games} />} />

                            <Route path=":gameId">
                                <Route index={true} element={<GameDetails user={user} setGames={setGames} />} />
                                <Route path="edit" element={<GameEdit user={user} setGames={setGames} />} />
                            </Route>
                        </Route>

                        <Route path="/create" element={<Create user={user} setGames={setGames} />} />
                    </Route>

                    <Route element={<GuestUserRouteGuard />}>
                        <Route path="/register" element={<Register user={user} setUser={setUserHandler} />} />
                        <Route path="/login" element={<Login user={user} setUser={setUserHandler} />} />
                    </Route>
                </Routes>
            </main>
        </div>
    );
}

export default App;
