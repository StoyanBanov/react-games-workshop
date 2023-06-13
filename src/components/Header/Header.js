import { Link, useNavigate } from 'react-router-dom'

export const Header = ({ user, setUser }) => {
    const navigate = useNavigate()

    function logoutHandler(e) {
        e.preventDefault()
        setUser(null)
        navigate('/')
    }
    return (
        <header>
            {/* Navigation */}
            <h1>
                <Link className="home" to="/">
                    GamesPlay
                </Link>
            </h1>
            <nav>
                <Link to="/catalog">All games</Link>
                {user
                    ? <div id="user">
                        <Link to="/create">Create Game</Link>
                        <a onClick={logoutHandler} href="/logout">Logout</a>
                    </div>
                    : <div id="guest">
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </div>
                }
            </nav>
        </header>
    )
}