import React from 'react';

export const GroupsTableItem = ({data, classType, isLast, changeView}) => {
    return (
        isLast
            ? <td className={classType}>
                <div className="groups-td-last-container">
                    <p className="groups-td-data">{data}</p>
                    <div className="groups-td-buttons">
                        <button onClick={() => changeView(1)}>Vista general</button>
                        <button onClick={() => changeView(2)} >Vista por estudiante</button>
                    </div>
                </div>
              </td>
            : <td className={classType}>{data}</td>
    )
}