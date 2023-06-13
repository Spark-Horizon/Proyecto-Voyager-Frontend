import React from 'react';
import { PDSHPanelTemplate } from '../PDSHPanelTemplate';

export const GroupsTableItem = ({data, classType, isLast, changeParentView}) => {
    return (
        <>
            {
                isLast 
                ? <td className={classType}>
                    <div className="groups-td-last-container">
                        <p className="groups-td-data">{data}</p>
                        <div className="groups-td-buttons">
                            <button onClick={() => changeParentView(1)}>Vista general</button>
                            <button onClick={() => changeParentView(2)} >Vista por estudiante</button>
                        </div>
                    </div>
                </td>
                : <td className={classType}>{data}</td>
            }
        </>
    )
}