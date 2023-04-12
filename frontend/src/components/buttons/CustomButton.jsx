
export const CustomButton = ({text, func, color}) => {
    return (
        <button 
            className="btn btn-primary"
            onClick={ func }
        >{text}</button>
    )
}
