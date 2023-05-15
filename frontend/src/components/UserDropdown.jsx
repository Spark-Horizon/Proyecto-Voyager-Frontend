import { Link } from 'react-router-dom';

export const UserDropdown = (props) => {
  return (
    <section className='dropdown'>
      <button className="btn btnPrimary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        {props.title}
      </button>
      <ul className="dropdown-menu">
        <li><a class="dropdown-item" href="/">Action</a></li>
        <li><a class="dropdown-item" href="/">Another action</a></li>
        <li><a class="dropdown-item" href="/">Something else here</a></li>
      </ul>
    </section>
  )
}
