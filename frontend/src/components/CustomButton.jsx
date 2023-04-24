
export const CustomButton = ({text, func, type, disabled}) => {
    return (
        <button
            className={ type }
            onClick={ func }
            disabled={ disabled }
            >{text}</button>
    )
}
