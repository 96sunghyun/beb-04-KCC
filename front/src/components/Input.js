export default function Input({ inputName = "null", onChange, value }) {
    return (
        <div className="flex space-x-4">
            <div>{inputName}</div>
            <input onChange={(e) => onChange(e.target.value)} value={value} type="text" className="text-[#755139]" />
        </div>
    )
}