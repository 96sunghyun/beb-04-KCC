import { Link } from 'react-router-dom';

export default function Button({ name, urlPath }) {
    return (
        <Link to={`/${urlPath}`} className="px-3 py-1 border rounded-lg bg-[#755139] text-[#F2EDD7] select-none hover:brightness-150">
            {name}
        </Link>
    )
}