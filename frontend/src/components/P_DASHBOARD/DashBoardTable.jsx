
export const DashBoardTable = () => {
    return (
        <table className='groups-table'>
            <thead>
                <tr className='groups-table-headers'>
                    <th>Código</th>
                    <th>Materia</th>
                    <th>Nombre del curso</th>
                </tr>
            </thead>
            <tbody>
                {
                    groupsData.map((data, dataIndex) => {
                        let groupItems = [];

                        let index = 0;
                        for (let key in data) {
                            if (index === 0)
                                groupItems.push(<GroupsItem key={data['codigo'] + index} type={'normal'} classType={'groups-td-first'} data={data[key]} />)
                            else if (index === Object.values(data).length - 1)
                                groupItems.push(<GroupsItem key={data['codigo'] + index} changeView={changeView} classType={'groups-td-last'} data={data[key]} />)
                            else if (index !== Object.values(data).length - 1)
                                groupItems.push(<GroupsItem key={data['codigo'] + index} type={'normal'} classType={'groups-td-middle'} data={data[key]} />)
                            index++;
                        }

                        return <tr key={data['codigo']} className="groups-table-row">{groupItems}</tr>;
                    })
                }
            </tbody>
        </table>
    )
}
