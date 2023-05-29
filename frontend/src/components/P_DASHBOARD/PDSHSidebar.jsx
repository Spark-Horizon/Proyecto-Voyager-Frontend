import { useRef } from 'react';
import { useState } from 'react'

import '../../styles/professor_dashboard/sidebar.css'

export const PDSHSidebar = ({ changeComponent }) => {
    const [options, setOptions] = useState(['Entregas', 'Revisión de avances']);
    const [selected, setSelected] = useState({ e: null, i: 0 });

    const firstOptionDiv = useRef(null);


    const handleOnClick = (e, index) => {
        const targetDiv = e.target;
        
        if (index !== selected['i']) {
            if (firstOptionDiv.current !== null) {
                // Change selected component
                changeComponent(index);
                
                firstOptionDiv.current.classList.remove('p-dash-sidebar-item-selected');
                firstOptionDiv.current = null;
                
                targetDiv.classList.add('p-dash-sidebar-item-selected')
                setSelected({ e: targetDiv, i: index });
            } else {
                // Change selected component
                changeComponent(index);

                selected['e'].classList.remove('p-dash-sidebar-item-selected');
                
                targetDiv.classList.add('p-dash-sidebar-item-selected')
                setSelected({ e: targetDiv, i: index });
            }
        }
    }

    return (
        <div className="p-dash-sidebar">
            {
                options.map((opt, i) => {
                    return (
                        i !== selected['i'] 
                        ? <div className='p-dash-sidebar-item' onClick={ (e) => handleOnClick(e, i) } key={i}>{opt}</div>
                        : <div ref={firstOptionDiv} className='p-dash-sidebar-item p-dash-sidebar-item-selected' onClick={ (e) => handleOnClick(e, i) } key={i}>{opt}</div>
                    )
                })
            }
        </div>
    )
}
