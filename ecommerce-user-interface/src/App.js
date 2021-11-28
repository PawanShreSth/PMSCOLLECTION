import { Container } from 'react-bootstrap';
import AppHeader from './components/header/AppHeader';
import AppFooter from './components/footer/AppFooter';
import HomeScreen from './screen/HomeScreen';

const App = () => {
  return (
    <>
      <AppHeader />

      <main className="py-3">
        <Container>
          <HomeScreen />
        </Container>
      </main>

      <AppFooter />
    </>
  );
};

export default App;
