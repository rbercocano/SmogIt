import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { faHouse, faUsers, faCalendar, faCog, faUser, faUserCircle, faDisplay } from '@fortawesome/free-solid-svg-icons';
import Customers from './pages/Customers/Customers';
import Customer from './pages/Customer/Customer';
import ContentWrapper from './components/ContentWrapper/ContentWrapper';
import MenuItem from './components/MenuItem/MenuItem';
import AppContext from './contexts/AppContext';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import { Toaster } from 'react-hot-toast';
import Appointments from './pages/Appointments/Appointments';
import Services from './pages/Services/Services';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Users from './pages/Users/Users';
import Queue from './pages/Queue/Queue';
 
let theme = createTheme({});

theme = createTheme(theme, {
  palette: {
    gray: theme.palette.augmentColor({
      color: {
        main: '#6c757d',
      },
      name: 'gray',
    }),
  },
});
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <AppContext>
            <Toaster />
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
              <Routes>
                <Route path='/customer' element={<Customer />} />
                <Route path='/customer/:id' element={<Customer />} />
                <Route path='/customers' element={<Customers />} />
                <Route path='/appointments' element={<Appointments />} />
                <Route path='/services' element={<Services />} />
                <Route path='/users' element={<Users />} />
                <Route path='/queue' element={<Queue />} />
              </Routes>
            </ContentWrapper>
          </AppContext>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
