import { Link } from "react-router-dom";

export default function PostPreview({ title, creator, postId }) {
    return (
        <Link to={`/post/${postId}`} className="flex justify-between w-full p-2 border-y border-dashed hover:bg-[#F2EDD7] hover:text-[#755139] hover:cursor-pointer">
            <div>{title}</div>
            <div>{creator}</div>
        </Link>
    )
}