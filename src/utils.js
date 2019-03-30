
export function parsePostPath(props) {
    let postId = "README";
    let items = [];

    if (props.match && props.match.params.postId) {
        postId = props.match.params.postId;
        items = postId.split("/")
    }
    return {postId, items}
}
