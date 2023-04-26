
export const Console = ({stdOut}) => {
    return (
        <div className="compiler-console">
            <p
                style={{
                    font: 'Consolas',
                    color: '#fff'
                }}
            >{stdOut}</p>
        </div>
    )
}
