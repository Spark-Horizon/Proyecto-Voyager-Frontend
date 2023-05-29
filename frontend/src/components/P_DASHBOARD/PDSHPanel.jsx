import '../../styles/professor_dashboard/mainPanel.css';
import { Groups } from './Groups';

export const PDSHPanel = ({ index, professorId }) => {
    const components = {
        0: <Groups professorId={professorId} />,
        1: <div>XD</div>
    }

    return (
        <div className="p-dash-panel">
            <div className='p-dash-panel-main'>
                { components[index] }
            </div>
        </div>
    )
}
