export default function PostPreview({ title, creator }) {
    return (
        <div className="flex justify-between w-full p-2">
            <div>{title}</div>
            <div>{creator}</div>
        </div>
    )
}