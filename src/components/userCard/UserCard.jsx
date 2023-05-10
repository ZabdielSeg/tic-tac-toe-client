import React from 'react'

const UserCard = ({person}) => {
    return (
        <div className="flex items-center gap-x-6">
            <img className="h-16 w-16 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
            <div>
                <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.username}</h3>
                <p className="text-sm font-semibold leading-6 text-indigo-600">Leading with {person.winsCounter} wins</p>
            </div>
        </div>
    )
}

export default UserCard