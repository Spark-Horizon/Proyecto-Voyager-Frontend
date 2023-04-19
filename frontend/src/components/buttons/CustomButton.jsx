
export const CustomButton = ({text, func, type}) => {
    return(
        <button
            className={type}
            onClick={ func }
            >{text}</button>
    )
}
