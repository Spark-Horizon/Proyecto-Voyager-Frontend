
export const GroupsItem = ({data, classType, type}) => {
    return (
        type === 'normal'
        ? <td className={classType}>{data}</td>
        : <td className={classType}>
            <div className="groups-td-last-container">
                <p className="groups-td-data">{data}</p>
                <div className="groups-td-buttons">
                    <button>Vista general</button>
                    <button>Vista por estudiante</button>
                </div>
            </div>
        </td>
    )
}