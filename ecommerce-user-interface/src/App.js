import { Container } from 'react-bootstrap';
import AppHeader from './components/header/AppHeader';
import AppFooter from './components/footer/AppFooter';
import UIRoutes from './routes/Routes';

const App = () => {
  return (
    <>
      <AppHeader />

      <main className="py-3">
        <Container>
          <UIRoutes />
        </Container>
      </main>

      <AppFooter />
    </>
  );
};

export default App;
