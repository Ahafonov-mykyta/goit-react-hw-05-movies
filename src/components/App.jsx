import { Route, Routes, Navigate } from 'react-router-dom';
// import HomeView from 'views/HomeView';
// import MoviesView from 'views/MoviesView';
// import MovieDetailsView from 'views/MovieDetailsView';
// import Layout from './Layout/Layout';
import { lazy, Suspense } from 'react';

const HomeView = lazy(() => import('../views/HomeView'));
const Layout = lazy(() => import('./Layout/Layout'));
const MovieDetailsView = lazy(() => import('../views/MovieDetailsView'));
const MoviesView = lazy(() => import('../views/MoviesView'));

export const App = () => {
  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomeView />} />
            <Route path="movies" element={<MoviesView />} />
            <Route path="movies/:filmId/*" element={<MovieDetailsView />} />
            <Route path="*" element={<Navigate to="/" replace={true} />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
};
