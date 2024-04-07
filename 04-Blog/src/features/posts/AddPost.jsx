import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectAllUsers } from '../users/usersSlice'
import { addNewPost } from './postsSlice'
function AddPost() {
    const [title, setTitle] = useState('')
    const [userId, setUserId] = useState()
    const [content, setContent] = useState()
    const [status, setStatus] = useState('idle')

    const dispatch = useDispatch()
    const users = useSelector(selectAllUsers)

    const onChangeTitle = e => setTitle(e.target.value)
    const onChangeAuthor = e => setUserId(e.target.value)
    const onChangeContent = e => setContent(e.target.value)


    const canSave = () => {
        return [title, userId, content].every(Boolean) && status === 'idle'
    }

    const onSave = async () => {
        setStatus('pending')
        const response = await dispatch(addNewPost({ title, content, user: userId }))

        setStatus('idle')
        setTitle('')
        setContent('')
        setUserId()
    }

    const userOptions = users.map(user => <option key={user.id} value={user.id}>{user.lastName}</option>)
    return (
        <section>
            <h2>Add a New Post</h2>
            <form>
                <label htmlFor="postTitle">Post Title:</label>
                <input value={title} onChange={onChangeTitle} type="text" id="postTitle" name="postTitle" placeholder="What's on your mind?" />
                <label htmlFor="postAuthor">Author:</label>
                <select id="postAuthor" value={userId} onChange={onChangeAuthor}>
                    <option value=""></option>
                    {userOptions}
                </select>
                <label htmlFor="postContent">Content:</label>
                <textarea value={content} onChange={onChangeContent} id="postContent" name="postContent"></textarea>
                <button type="button" onClick={onSave} disabled={!canSave()}>
                    Save Post
                </button>
            </form>
        </section>
    )
}

export default AddPost
