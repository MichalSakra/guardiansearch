import React, { useContext } from 'react'
import classes from "./Posts.module.sass"
import Context from "../../store/context"


const Post = ({ post }) => {

    return (
        <li className={classes.SinglePost}>
            <h6 className={classes.SectionName}>{post.sectionName}</h6>
            <a href={post.webUrl} target="blank">
                <h4 className={classes.Title}> {post.webTitle}</h4>
            </a>
            <h6 className={classes.Date}>{post.webPublicationDate.slice(0, 10)}</h6>
        </li >
    )
}
const Posts = () => {

    const context = useContext(Context);
    return (
        <div className={classes.PostsWrapper}>
            <ul className={classes.PostsList}>
                {context.posts.map(post => {
                    return <Post key={post.id} post={post} />
                })}
            </ul>
        </div>)
}

export default React.memo(Posts)