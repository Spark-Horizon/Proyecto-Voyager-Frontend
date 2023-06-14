import { useState } from "react"
import '../../styles/Path/temaCard.css'

export const TemaCard = (props) => {

    const [hidden, setHidden] = useState(false);

    return (
        <div
        className={`mb-3 tema-main-container ${!hidden ? 'tema-main-container-hidden' : 'tema-main-container-show'}`}
        >
            <div className="tema-card mb-2"
            onClick={() => setHidden(!hidden)}>
                <h3>{props.title}</h3>
            </div>
            <div className="mt-3 tema-subtemas-container">
                {props.children}
            </div>
            
        </div>
    )
}
