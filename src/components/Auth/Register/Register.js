import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { register } from "../../../data/services/userService"

export const Register = ({ user, setUser }) => {
    const navigate = useNavigate()

    useEffect(() => {
        if (user)
            navigate('/')
    }, [navigate, user])

    const [values, setValues] = useState({
        email: '',
        password: '',
        'confirm-password': ''
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
        const newUser = await register({ email: values.email, password: values.password })
        setUser(newUser)
        navigate('/')
    }

    return (
        <section id="register-page" className="content auth">
            <form onSubmit={submitHandler} id="register">
                <div className="container">
                    <div className="brand-logo" />
                    <h1>Register</h1>
                    <label htmlFor="email">Email:</label>
                    <input value={values.email} onChange={changeHandler} type="email" id="email" name="email" placeholder="maria@email.com" />
                    <label htmlFor="pass">Password:</label>
                    <input value={values.password} onChange={changeHandler} type="password" name="password" id="register-password" />
                    <label htmlFor="con-pass">Confirm Password:</label>
                    <input value={values['confirm-password']} onChange={changeHandler} type="password" name="confirm-password" id="confirm-password" />
                    <input className="btn submit" type="submit" defaultValue="Register" />
                    <p className="field">
                        <span>
                            If you already have profile click <Link href="/login">here</Link>
                        </span>
                    </p>
                </div>
            </form>
        </section>
    )
}