import { useState, useEffect } from 'react';

const Chat = ({socket}) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([])

  const handleSubmit = e => {
    e.preventDefault();
    socket.emit('message', message)
    const newMessage = {
      body: message,
      from: 'Me'
    }
    setMessages([...messages, newMessage])
    setMessage('')
  }

  useEffect(() => {
    socket.on("message", message => {
      setMessages([...messages, message])
    })
  }, [messages])

  return (
    <div className='w-full flex flex-col justify-evenly items-center md:w-1/3 md:h-screen h-80'>
      <div>
        <h3>Send your opponent a message</h3>
      </div>
      <div className='border border-zinc-400 w-2/3 rounded shadow min-h-[50%] '>
      {
        messages.map((newMessage, idx) => (
            <p key={idx}> {newMessage.from}: {newMessage.body}</p>
        ))
      }
      </div>
      <form>
        <input
          value={message}
          onChange={e => setMessage(e.target.value)} id="message"
          name="message"
          type="text"
          required
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
        <button
          type="submit"
          className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={handleSubmit}
        >
          Send Message
        </button>
      </form>
    </div>
  )
}

export default Chat