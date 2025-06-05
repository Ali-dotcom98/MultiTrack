import React, { useContext } from 'react';
import { UserContext } from '../../ContextApi/User';
import SideBar from './SideBar';
import { NavBar } from './NavBar';

const DashboardLayout = ({ children, activeMenu }) => {
  const { User } = useContext(UserContext);

  return (
    <>
      <div>
        <NavBar />
        {User && (
          <>
            <div className="fixed top-0 left-0 w-64 h-screen z-20">
              <SideBar activeMenu={activeMenu} />
            </div>

            <div className="ml-64 px-5 pt-4">{children}</div>
          </>
        )}
      </div>
    </>
  );
};

export default DashboardLayout;
