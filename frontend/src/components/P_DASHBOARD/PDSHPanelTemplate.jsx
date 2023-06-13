import { ReactComponent as AngleLeft } from '../../assets/svg/icons/angle-left-solid.svg';

import '../../styles/professor_dashboard/mainPanel.css';

export const PDSHPanelTemplate = ({ title, canReturn, changeParentView, previousComponentIndex, optionalItems }) => {
    const handleOnReturnClick = () => {
        changeParentView(previousComponentIndex)
    }

    return (
        <div className='p-dash-top-container'>
            { canReturn && <AngleLeft className='angle-left-solid' onClick={handleOnReturnClick} />}
            <h1 className='gradient'>{title}</h1>
            {
                optionalItems && 
                <div className="optional-items">
                    {optionalItems.map((item, index) => <div key={index}>{item}</div>)}
                </div>
            }
        </div>
    )
}
