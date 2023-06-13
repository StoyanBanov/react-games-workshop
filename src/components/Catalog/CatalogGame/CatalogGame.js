import { Link } from "react-router-dom"

export const CatalogGame = ({ game }) => {
    return (
        <div className="allGames">
            <div className="allGames-info">
                <img src={game.imageUrl} alt={game.title} />
                <h6>{game.category}</h6>
                <h2>{game.title}</h2>
                <Link to={`/catalog/${game._id}`} className="details-button">
                    Details
                </Link>
            </div>
        </div>
    )
}