import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { editGameById, getGameById } from "../../../data/services/gameService"

export const GameEdit = ({ user, setGames }) => {
    const navigate = useNavigate()

    const { gameId } = useParams()

    const [values, setValues] = useState({
        title: '',
        category: '',
        maxLevel: '',
        imageUrl: '',
        summary: ''
    })

    useEffect(() => {
        if (!user)
            navigate('/')
        getGameById(gameId)
            .then((data) => {
                setValues({
                    title: data.title,
                    category: data.category,
                    maxLevel: data.maxLevel,
                    imageUrl: data.imageUrl,
                    summary: data.summary
                })
            })
    }, [navigate, user, gameId])

    function changeHandler(e) {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    async function submitHandler(e) {
        e.preventDefault()
        if (Object.values(values).some(v => !v)) return
        const editedGame = await editGameById(gameId, values)
        setGames(state => {
            const edited = [...state]
            edited[edited.findIndex(g => g._id === gameId)] = { ...editedGame }
            return edited
        })
        navigate('/')
    }

    return (
        <section id="edit-page" className="auth">
            <form onSubmit={submitHandler} id="edit">
                <div className="container">
                    <h1>Edit Game</h1>
                    <label htmlFor="leg-title">Legendary title:</label>
                    <input value={values.title} onChange={changeHandler} type="text" id="title" name="title" placeholder="Enter game title..." />
                    <label htmlFor="category">Category:</label>
                    <input value={values.category} onChange={changeHandler} type="text" id="category" name="category" placeholder="Enter game category..." />
                    <label htmlFor="levels">MaxLevel:</label>
                    <input value={values.maxLevel} onChange={changeHandler} type="number" id="maxLevel" name="maxLevel" min={1} placeholder={1} />
                    <label htmlFor="game-img">Image:</label>
                    <input value={values.imageUrl} onChange={changeHandler} type="text" id="imageUrl" name="imageUrl" placeholder="Upload a photo..." />
                    <label htmlFor="summary">Summary:</label>
                    <textarea value={values.summary} onChange={changeHandler} name="summary" id="summary" />
                    <input className="btn submit" type="submit" defaultValue="Edit Game" />
                </div>
            </form>
        </section>
    )
}