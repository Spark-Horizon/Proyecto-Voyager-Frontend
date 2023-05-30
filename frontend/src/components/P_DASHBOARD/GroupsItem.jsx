
export const GroupsItem = ({data, classType, type, changeView}) => {
    const handleOnClick = (type) => {
        type === 'general'
        ? changeView('generalView')
        : changeView('studentView')
    }

    return (
        type === 'normal'
        ? <td className={classType}>{data}</td>
        : <td className={classType}>
            <div className="groups-td-last-container">
                <p className="groups-td-data">{data}</p>
                <div className="groups-td-buttons">
                    <button onClick={() => handleOnClick('general')}>Vista general</button>
                    <button onClick={() => handleOnClick('student')} >Vista por estudiante</button>
                </div>
            </div>
        </td>
    )
}