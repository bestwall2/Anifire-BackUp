import { NavBarStyled } from './styles/Navigation.style.js';
import React from 'react'

const Navigation = () => {
  return (
    <NavBarStyled>
      <hr className="border-gray-700 rounded-b-md mb-3 "></hr>
      <h1 className="title font-extrabold text-white font-mono">Ani<strong className="text-3xl font-mono font-bold text-blue-600">Fire</strong></h1>
      <p className="text-gray-100  mb-2 ">This site does not store any files on our server, we are linked to the media which is hosted on 3rd party services.</p>
      <hr className="border-gray-700 rounded-b-md m-2 "></hr>
      <ul className="  list grid text-sm md:text-2xl mb-3 mt-3 md:text-center font-medium grid-cols-2 md:grid-cols-3 gap-1">
        <li><a href="#">DMCA</a></li>
        <li><a href="#">Privacy Policy</a></li>
        <li><a href="#">Terms of Service</a></li>
      </ul>
      <p className="font-medium text-blue-200 text-center text-3xl">© {new Date().getFullYear()} AniFire | Made by Ahmed Dikha</p>
      <div className="MediaLayout mb-2 mt-2 flex gap-2 justify-center text-center content-center">
        <a href="https://github.com/bestwall2">
          <img className="transform transition-transform duration-200 ease-out hover:scale-125 h-7 w-7 p-0 object-contain  border-none rounded-full hover:shadow-blue" src="https://www.svgrepo.com/show/475654/github-color.svg" alt="Github"></img>
        </a>
        <a href="https://www.facebook.com/Ahmed26DIA">
          <img className="transform transition-transform duration-200 ease-out hover:scale-125 h-7 w-7 p-0 object-fill  rounded-full hover:shadow-blue" src="https://www.svgrepo.com/show/452196/facebook-1.svg" alt="Facebook"></img>
        </a>
        <a href="https://www.instagram.com/_a_h_m_e_d__d_i_a_">
          <img className="transform transition-transform duration-200 ease-out hover:scale-125 h-7 w-7 p-0 object-contain rounded-full hover:shadow-blue" src="https://www.svgrepo.com/show/111199/instagram.svg" alt="Instagram"></img>
        </a>
      </div>
    </NavBarStyled>
  )
}

export default Navigation