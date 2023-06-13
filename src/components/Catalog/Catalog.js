import { CatalogGame } from "./CatalogGame/CatalogGame"

export const Catalog = ({ games }) => {
    return (
        <section id="catalog-page">
            <h1>All Games</h1>
            {/* Display div: with information about every game (if any) */}
            {games.map(g => <CatalogGame key={g._id} game={g} />)}

            {/* Display paragraph: If there is no games */}
            <h3 className="no-articles">No articles yet</h3>
        </section>
    )
}