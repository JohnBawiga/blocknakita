import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import AdminSideBarData from './AdminSideBarData';
import { IconContext } from 'react-icons';
import './AdminNavbar.css';

function AdminNavbar() {
  const [adminsidebar, setAdminSideBar] = useState(false);
  // const { adminID } = useParams(); // Extract adminID from the route parameters

  const showSidebar = () => setAdminSideBar(!adminsidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="navbar">
          <Link to="#" className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <h1>CIT-U NSTP ADMIN</h1>
        </div>
        <nav className={adminsidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to="#" className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {AdminSideBarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={`${item.path}`}>   
                  {/* <Link to={`${item.path}/${adminID}`}> */}
                    {item.icon}
                    <span>
                      {item.title}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default AdminNavbar;
