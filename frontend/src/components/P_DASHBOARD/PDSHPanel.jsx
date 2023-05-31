import '../../styles/professor_dashboard/mainPanel.css';
import { Groups } from './Groups';
import { useDashboardView } from '../../hooks/useDashboardView';
import { PDSHPanelTemplate } from './PDSHPanelTemplate';
import { useState } from 'react';
import { useEffect } from 'react';


export const PDSHPanel = ({ index, professorId }) => {
    const { canReturn, changeViewFunction, setters, currentComponent } = useDashboardView();
    const { setCurrentView, setCanReturn, setChangeViewFunction, setComponentViews } = setters;
    const [componentTitle, setComponentTitle] = useState('Grupos');

    const components = {
        0: <Groups professorId={professorId} setComponentViews={setComponentViews} setCurrentView={setCurrentView} setCanReturn={setCanReturn} setChangeViewFunction={setChangeViewFunction} currentComponent={currentComponent} />,
        1: <div>XD</div>
    }


    return (
        <div className="p-dash-panel">
            <div className='p-dash-panel-main'>
                <PDSHPanelTemplate title={componentTitle} canReturn={canReturn} changeFunction={changeViewFunction} />       
                { components[index] }
            </div>
        </div>
    )
}
