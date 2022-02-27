import AppHeader from './components/header/AppHeader';
import AppFooter from './components/footer/AppFooter';
import UIRoutes from './routes/Routes';

const App = () => {
  return (
    <>
      <AppHeader />

      <main className="py-3">
        <UIRoutes />
      </main>

      <AppFooter />
    </>
  );
};

export default App;
