import { useEffect } from "react";
import { GroupsTableItem } from "./GroupsTableItem";
import { useDashboardData } from '../../../hooks/useDashboardData';

import '../../../styles/professor_dashboard/groupsTable.css';

export const GroupsTable = ({ url, headers, changeView, setComponentTitle }) => {
  const { data, axiosError, isLoading, getData } = useDashboardData();

  useEffect(() => {
    setComponentTitle('Grupos')
    getData(url);
  }, []);

  return (
    <>
      {isLoading && <div>Cargando...</div>}
      {axiosError === null ? (
        <table className='groups-table'>
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
                    changeView={changeView}
                    data={value}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>{axiosError}</div>
      )}
    </>
  );
};
