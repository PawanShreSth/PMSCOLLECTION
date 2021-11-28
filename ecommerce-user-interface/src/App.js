import { Container } from 'react-bootstrap';
import AppHeader from './components/header/AppHeader';
import AppFooter from './components/footer/AppFooter';

const App = () => {
  return (
    <>
      <AppHeader />

      <main className="py-3">
        <Container>
          <h1>Welcome to pmscollection</h1>
        </Container>
      </main>

      <AppFooter />
    </>
  );
};

export default App;
