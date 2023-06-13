import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createGame } from "../../data/services/gameService"

export const Create = ({ user, setGames }) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (!user)
            navigate('/')
    }, [navigate, user])

    const [values, setValues] = useState({
        title: '',
        category: '',
        maxLevel: '',
        imageUrl: '',
        summary: ''
    })

    function changeHandler(e) {
        setValues(state => ({
            ...state,
            [e.target.name]: e.target.value
        }))
    }

    async function submitHandler(e) {
        e.preventDefault()
        if (Object.values(values).some(v => !v)) return
        const newGame = await createGame(values)
        setGames(state => [{ ...newGame }, ...state])
        navigate('/')
    }

    return (
        <section id="create-page" className="auth">
            <form onSubmit={submitHandler} id="create">
                <div className="container">
                    <h1>Create Game</h1>
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
                    <input className="btn submit" type="submit" defaultValue="Create Game" />
                </div>
            </form>
        </section>
    )
}