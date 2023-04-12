
export const CustomButton = ({text, func}) => {
    return (
        <button
            className="btn btn-primary"
            onClick={ func }
        >{text}</button>
    )
}
