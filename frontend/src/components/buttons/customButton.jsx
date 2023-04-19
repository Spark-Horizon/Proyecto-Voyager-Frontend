
export const CustomButton = ({text, func, customClass}) => {
    return (
        <button
            className={`${customClass} btn btn-primary`}
            onClick={ func }
        >{text}</button>
    )
}
