import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { selectAllUsers } from "./usersSlice"

function UsersList() {
    const users = useSelector(selectAllUsers)

    const usersList = users.map(user => (
        <li>
            <Link key={user.id} to={`/users/${user.id}`} dideo-checked="true">{user.firstName}</Link>
        </li>
    ))
    return (
        <section>
            <h2>Users</h2>
            <ul>
                {usersList}
            </ul>
        </section>
    )
}

export default UsersList
