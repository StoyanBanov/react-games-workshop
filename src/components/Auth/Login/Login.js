import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { login } from "../../../data/services/userService"

export const Login = ({ user, setUser }) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (user)
            navigate('/')
    }, [navigate, user])

    const [values, setValues] = useState({
        email: '',
        password: ''
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
        const user = await login(values)
        setUser(user)
        navigate('/')
    }
    return (
        <section id="login-page" className="auth">
            <form onSubmit={submitHandler} id="login">
                <div className="container">
                    <div className="brand-logo" />
                    <h1>Login</h1>
                    <label htmlFor="email">Email:</label>
                    <input value={values.email} onChange={changeHandler} type="email" id="email" name="email" placeholder="Sokka@gmail.com" />
                    <label htmlFor="login-pass">Password:</label>
                    <input value={values.password} onChange={changeHandler} type="password" id="login-password" name="password" />
                    <input type="submit" className="btn submit" defaultValue="Login" />
                    <p className="field">
                        <span>
                            If you don't have profile click <Link to="/login">here</Link>
                        </span>
                    </p>
                </div>
            </form>
        </section>
    )
}