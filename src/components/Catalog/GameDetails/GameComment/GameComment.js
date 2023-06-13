export const GameComment = ({ commentObj: { comment } }) => {
    return (
        <li className="comment">
            <p>Content: {comment}</p>
        </li>
    )
}