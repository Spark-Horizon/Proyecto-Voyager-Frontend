import React from 'react'
import { Link } from 'react-router-dom';

export const ProvitionalTab = (user) => {
  return (
    <div className="container-cc startSection">
      <span>
        <h2><Link to='/compiler' className='gradient'>Resuelve</Link> tu primer ejercicio</h2>
        <p>{user.role}</p>
      </span>
    </div>
  )
}
