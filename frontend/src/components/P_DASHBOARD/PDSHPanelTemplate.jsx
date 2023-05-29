import { ReactComponent as MagnifyingGlassIcon } from '../../assets/svg/icons/magnifying-glass-solid.svg';

export const PDSHPanelTemplate = ({ title, queryFunction }) => {
    return (
        <div className='p-dash-top-container'>
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
