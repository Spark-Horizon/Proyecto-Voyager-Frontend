import { useState } from "react"
import '../../styles/Path/temaCard.css'

export const TemaCard = (props) => {

    const [hidden, setHidden] = useState(false);

    return (
        <div
        className={`mb-4 tema-main-container ${!hidden ? 'tema-main-container-hidden' : ''}`}
        >
            
            <h3 onClick={() => setHidden(!hidden)}>{props.title}</h3>
            <div className="tema-subtemas-container">
                {props.children}
            </div>
            
        </div>
    )
}
