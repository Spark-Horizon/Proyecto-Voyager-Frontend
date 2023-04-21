
export const CustomButton = ({text, func, type, customClass, disabled}) => {
    return (
        <button
            className={`${customClass} btn btn-primary`}
            className={ type }
            onClick={ func }
            disabled={ disabled}
            >{text}</button>
    )
}
