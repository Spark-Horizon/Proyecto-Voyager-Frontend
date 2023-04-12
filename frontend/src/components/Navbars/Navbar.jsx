import { CustomButton } from '../buttons/indexCustomButtons'

export const Navbar = () => {
    const testFunc = () => {
        alert('presionado');
    }

    return (
        <nav className='navbar bg-body-tertiary'>
            <div className='container-fluid'>
                <CustomButton text={"refresh"} func={testFunc} />
            </div>
        </nav>
    )
}
