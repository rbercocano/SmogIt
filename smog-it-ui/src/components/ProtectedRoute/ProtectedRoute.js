import React, { useContext, useEffect } from 'react';
import { UserContext } from '../../contexts/UserContext';
import ContentWrapper from '../ContentWrapper/ContentWrapper';
import MenuItem from '../MenuItem/MenuItem';
import Header from '../Header/Header';
import Menu from '../Menu/Menu';
import { Outlet, useNavigate } from 'react-router-dom';
import { faHouse, faUsers, faCalendar, faCog, faUserCircle, faDisplay } from '@fortawesome/free-solid-svg-icons';

const ProtectedRoute = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = user.isAuthenticated();
    if (!isAuthenticated) {
      navigate(`/login`);
    }
  }, []);
  return (
    <>
      <Header />
      <Menu >
        <MenuItem text={'Home'} icon={faHouse} />
        <MenuItem text={'Customers'} icon={faUsers} link={'/customers'} />
        <MenuItem text={'Appointments'} icon={faCalendar} link={'/appointments'} />
        <MenuItem text={'Services'} icon={faCog} link={'/services'} />
        <MenuItem text={'Users'} icon={faUserCircle} link={'/users'} />
        <MenuItem text={'Appointment Queue'} icon={faDisplay} link={'/queue'} />
      </Menu>
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </>
  );
};

export default ProtectedRoute;
