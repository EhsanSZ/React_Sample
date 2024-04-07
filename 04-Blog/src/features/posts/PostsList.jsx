import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import PostAuthor from "./PostAuthor"
import PostReactions from "./PostReactions"
import { fetchPosts, selectPostById, selectPostIds } from "./postsSlice"
import TimeAgo from "./TimeAgo"


function PostExcerpt({ postId }) {
    const post = useSelector(state => selectPostById(state, postId))
    return (
        <article className="post-excerpt">
            <h3>{post.title}</h3>
            <div>
                <PostAuthor userId={post.user} />
                <TimeAgo date={post.date} />
            </div>
            <p className="post-content">{post.content.substring(0, 70)}</p>
            <PostReactions reactions={post.reactions} postId={post.id} />
            <Link className="button muted-button" to={`/posts/${post.id}`} dideo-checked="true">View Post</Link>
        </article>
    )
}

function PostsList() {
    const dispatch = useDispatch()
    const postIds = useSelector(selectPostIds)
    const status = useSelector(state => state.posts.status)
    const error = useSelector(state => state.posts.error)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchPosts())
        }
    }, [dispatch, status])


    let content
    if ('loading' === status) {
        content = <div className="loader">loading ...</div>
    } else if ('success' === status) {
        content = postIds.map(id => <PostExcerpt postId={id} key={id} />)
    } else if ('error' === status) {
        content = <div className="error">{error}</div>
    }

    return (
        <section className="posts-list">
            <h2>Posts</h2>
            {content}
        </section>
    )
}

export default PostsList
