import { useSelector } from 'react-redux'
import { selectUserById } from "../users/usersSlice"

function PostAuthor({ userId }) {
    const author = useSelector(state => selectUserById(state, userId))

    return (
        <span>By {author ? author.lastName : 'Unknown Author'}</span>
    )
}

export default PostAuthor
