
export const Console = ({stdOut}) => {
    console.log(stdOut);
    return (
        <div className="compiler-console">
            {stdOut}
        </div>
    )
}
