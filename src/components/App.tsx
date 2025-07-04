import { FC, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Notification from './Notification';
import Layout from './Layout';
import { PrivateRoute } from './PrivateRoute';

const HomePage = lazy(() => import('../pages/HomePage'));
const NanniesPage = lazy(() => import('../pages/NanniesPage'));
const FavoritesPage = lazy(() => import('../pages/FovoritesPage'));

export interface AppProps {}

const App: FC<AppProps> = () => {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/nannies" element={<NanniesPage />} />
          <Route
            path="/favorites"
            element={
              <PrivateRoute
                redirectTo="/nannies"
                component={<FavoritesPage />}
              />
            }
          />
        </Routes>
      </Layout>
      <Notification />
    </>
  );
};

export default App;
