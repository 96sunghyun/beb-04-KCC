export default function WrapperBody({ children }) {
    return (
        <div className="flex flex-col justify-center items-center rounded-2xl m-auto w-3/5 bg-[#755139] text-[#F2EDD7]">
            { children }
        </div>
    )
}