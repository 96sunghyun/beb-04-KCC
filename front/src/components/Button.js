import { Link } from 'react-router-dom';

const style = {
    buttonDefault: `flex justify-center items-center px-3 py-1 border rounded-lg bg-[#755139] text-[#F2EDD7] select-none`
}

export default function Button({ name, urlPath, isSubmit = false, onSubmit, disabled = false }) {
    
    // For submitting
    if (isSubmit) {
        return (
            <button onClick={onSubmit} className={style.buttonDefault + ` w-1/2` + `${disabled ? `` : ` hover:brightness-150`}`} disabled={disabled}>
                {name}
            </button>
        )
    }

    // Just for links
    return (
        <Link to={`/${urlPath}`} className={style.buttonDefault + ` hover:brightness-150`}>
            {name}
        </Link>
    )
}