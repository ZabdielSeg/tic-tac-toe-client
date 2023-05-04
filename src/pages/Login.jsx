import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ getTheUser, addUser, socket}) => {
    const [username, setUsername] = useState('');
    const [error, setError] = useState(false)
    const [dataSent, setDataSent] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        if (!username) {
            setError(true);
            return;
        }
        socket.emit('login', username);
    }

    useEffect(() => {
        socket.on('userInfo', data => {
            getTheUser(data.userData);
            addUser(data.userData)
            navigate('/lobby')
        })
    }, [dataSent]);

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    className="mx-auto h-10 w-auto"
                    src="https://res.cloudinary.com/ds3hh2gv2/image/upload/v1683141969/tic-tac-toe-esbozado-aislado-juego-vintage-estilo-dibujado-mano-cruz-grabada-cero-disenado-impresion-carteles-ilustracion-libros-logotipo-icono-tatuaje-ilustracion-vectorial-vintage_186802-4488_xckqei.avif"
                    alt="Tic tac toe "
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Welcome to the greatest tic-tac-toe game
                </h2>
                <h3 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Please enter your username
                </h3>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" action="#" method="POST">
                    <div>
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
                        {
                            error && <p className="mt-2 peer-invalid:visible text-pink-600 text-sm">
                            Please provide a username
                        </p>
                        }
                        
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            onClick={handleSubmit}
                        >
                            Sign in
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login