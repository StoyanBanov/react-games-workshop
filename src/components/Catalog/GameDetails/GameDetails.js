import { useEffect, useState } from "react"
import { createComment, deleteGameById, getCommentsByGameId, getGameById } from "../../../data/services/gameService"
import { Link, useNavigate, useParams } from "react-router-dom"
import { GameComment } from "./GameComment/GameComment"

export const GameDetails = ({ user, setGames }) => {
    const navigate = useNavigate()

    const { gameId } = useParams()
    const [game, setGame] = useState({})
    const [comments, setComments] = useState([])

    const [commentValue, setCommentValue] = useState('')

    useEffect(() => {
        Promise.all([
            getGameById(gameId)
                .then(data => setGame(data)),
            getCommentsByGameId(gameId)
                .then((data) => setComments(data))
        ])
    }, [gameId])

    async function deleteHandler(e) {
        e.preventDefault()
        await deleteGameById(gameId)
        setGames(state => state.filter(g => g._id !== gameId))
        navigate('/')
    }

    function changeCommentHandler(e) {
        setCommentValue(e.target.value)
    }

    async function submitCommentHandler(e) {
        e.preventDefault()
        const newComment = await createComment(gameId, commentValue)
        setComments(state => [{ ...newComment }, ...state])
    }

    return (
        <section id="game-details">
            <h1>Game Details</h1>
            <div className="info-section">
                <div className="game-header">
                    <img className="game-img" src={game.imageUrl} alt={game.title} />
                    <h1>{game.title}</h1>
                    <span className="levels">MaxLevel: {game.maxLevel}</span>
                    <p className="type">{game.category}</p>
                </div>
                <p className="text">{game.summary}</p>
                {/* Bonus ( for Guests and Users ) */}
                <div className="details-comments">
                    <h2>Comments:</h2>
                    {comments.length > 0
                        ? <ul>
                            {/* list all comments for current game (If any) */}
                            {comments.map(c => <GameComment key={c._id} commentObj={c} />)}
                        </ul>
                        : <p className="no-comment">No comments.</p>
                    }
                </div>
                {/* Edit/Delete buttons ( Only for creator of this game ) */}
                {user?._id === game._ownerId &&
                    <div className="buttons">
                        <Link to={`edit`} className="button">
                            Edit
                        </Link>
                        <a onClick={deleteHandler} href="/delete" className="button">
                            Delete
                        </a>
                    </div>
                }
            </div>
            {/* Bonus */}
            {/* Add Comment ( Only for logged-in users, who are not creators of the current game ) */}
            {user && user._id !== game._ownerId &&
                <article className="create-comment">
                    <label>Add new comment:</label>
                    <form onSubmit={submitCommentHandler} className="form">
                        <textarea value={commentValue} onChange={changeCommentHandler} name="comment" placeholder="Comment......" />
                        <input className="btn submit" type="submit" defaultValue="Add Comment" />
                    </form>
                </article>
            }
        </section>
    )
}