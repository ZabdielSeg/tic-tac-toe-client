import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ getTheUser, addUser, socket }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(false)
    const [signup, setSignup] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();

        if (!username || !password) {
            setErrorMessage('Please prove a username and password');
            return;
        }

        const action = signup ? 'signup' : 'login';

        axios
            .post(`${process.env.REACT_APP_API_URL}/${action}`, { username, password })
            .then(response => {
                const { data: { userData } } = response;

                socket.emit('join-lobby', userData.username);
                getTheUser(userData);
                addUser(userData);
                navigate('/lobby');
            })
            .catch(err => setErrorMessage(err.response.data.errorMessage))
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://res.cloudinary.com/ds3hh2gv2/image/upload/v1683141969/tic-tac-toe-esbozado-aislado-juego-vintage-estilo-dibujado-mano-cruz-grabada-cero-disenado-impresion-carteles-ilustracion-libros-logotipo-icono-tatuaje-ilustracion-vectorial-vintage_186802-4488_xckqei.avif"
                    alt="Tic tac toe "
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Welcome to tic-tac-toe 
                </h2>
                <h4 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
                {
                    signup ? 
                    <><span className='text-cyan-600'>Sign up </span>to start playing!</> :
                    <><span className='text-cyan-600'>Login </span>to start playing!</> 
                }
                </h4>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                            Username:
                        </label>
                        <div className="mt-2">
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={e => setUsername(e.target.value)}
                            />

                        </div>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                            Password:
                        </label>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        {
                            errorMessage && <p className="mt-2 peer-invalid:visible text-pink-600 text-sm">
                                {errorMessage}
                            </p>
                        }
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleSubmit}
                        >
                        {
                            signup ?
                                'Sign up' :
                                'Log in'
                        }
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                    {
                        signup ?
                            'Already a member? ' :
                            'Not a member? '
                    }
                    <button onClick={() => setSignup(!signup)} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    {
                        signup ?
                            'Click here to login' :
                            'Click here to register'
                    }
                    </button>
                </p>
            </div>
        </div>
    )
}

export default Login