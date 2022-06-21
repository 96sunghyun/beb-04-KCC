import PostPreview from "../components/PostPreview"

const dummy = [
    {
        title: "Hello new post here",
        creator: "KCC",
        postId: "1"
    },
    {
        title: "This is second post",
        creator: "KCC",
        postId: "2"
    },
    {
        title: "3rd post herehrher",
        creator: "KCC",
        postId: "3"
    }
]

export default function Details() {

    return (
        <div className="flex flex-col gap-3 py-6 px-4 w-full">
            {
                dummy.map(d =>
                    <PostPreview
                        title={d.title}
                        creator={d.creator}
                        postId={d.postId}
                        key={[d.title, d.creator, d.postId].join("|")}
                    />)
            }
        </div>
    )
}