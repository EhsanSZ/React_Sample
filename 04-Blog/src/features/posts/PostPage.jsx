import { useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"

import PostAuthor from "./PostAuthor"
import PostReactions from "./PostReactions"
import { selectPostById } from "./postsSlice"
import TimeAgo from "./TimeAgo"

function PostPage() {
    const { postId } = useParams()
    const post = useSelector(state => selectPostById(state, postId))
    return (
        <section>
            <article class="post">

                <h2>{post.title}</h2>
                <div>
                    <PostAuthor userId={post.user} />
                    <TimeAgo date={post.date} />
                </div>
                <p className="post-content">{post.content}</p>
                <PostReactions reactions={post.reactions} postId={post.id} />

                <Link class="button"
                    href="/editPost/Sq0OZJyMWGrjkJAX7BzU-" dideo-checked="true">Edit Post</Link>
            </article>
        </section>
    )
}

export default PostPage
