import { ReactComponent as AngleLeft } from '../../assets/svg/icons/angle-left-solid.svg';

export const PDSHPanelTemplate = ({ title, canReturn, changeFunction }) => {
    return (
        <div className='p-dash-top-container'>
            { canReturn && <AngleLeft className='angle-left-solid' onClick={changeFunction} />}
            <h1>{title}</h1>
            {/* SEARCH BAR IMPLEMENTATION
            <form className="p-dash-top-container-search-bar">
                <input type="text" name="" id="" className='search-bar-input' />
                <span className='search-bar-placeholder'>Search</span>
                <MagnifyingGlassIcon className='magnifying-glass'/>
            </form> */}
        </div>
    )
}
