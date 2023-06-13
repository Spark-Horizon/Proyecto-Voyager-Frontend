import { useEffect } from "react";

import { GroupsTableItem } from "./GroupsTableItem";
import { PDSHPanelTemplate } from "../PDSHPanelTemplate";

import { useDashboardData } from "../../../hooks/useDashboardData";

import '../../../styles/professor_dashboard/groupsTable.css';

const backendUrl = process.env.REACT_APP_BACKEND_URL;
const port = process.env.REACT_APP_BACKEND_PORT;

export const GroupsTable = ({ professorId, changeParentView }) => {
  const { data, axiosError, isLoading, getData } = useDashboardData();

  const headers = ['ID', 'Código', 'Materia', 'Nombre del curso'];

  useEffect(() => {
    getData(`http://${backendUrl}:${port}/dashboard/profesor/entregas?id=${professorId}`)
  }, [])

  return (
    <>
      <PDSHPanelTemplate
        title={'Grupos'}
        canReturn={false}
      />
      {
        isLoading && axiosError === null
        ? <div className='loading'></div>
        : axiosError !== null
        ? <div>{axiosError}</div>
        : <table className='groups-table'>
          <thead>
            <tr className='groups-table-headers'>
              {headers !== null &&
                headers.map((title) => (
                  <th key={title}>{title}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.codigo} className="groups-table-row">
                {Object.entries(row).map(([key, value], index, arr) => (
                  <GroupsTableItem
                    key={row.codigo + key}
                    classType={`groups-td-${index === 0 ? 'first' : index === arr.length - 1 ? 'last' : 'middle'}`}
                    isLast={index === arr.length - 1}
                    changeParentView={changeParentView}
                    data={value}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      }
    </>
  );
};
