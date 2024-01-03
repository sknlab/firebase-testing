import React, { Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Login from '@/modules/Auth/Login';
import PrivateRoute from '@/modules/Auth/PrivateRoute';
import Layout from '@/modules/Layout/Layout';

const Dashboard = React.lazy(() => import('@/modules/Dashboard/Dashboard'));
const Article = React.lazy(() => import('@/modules/StandUps/Article'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Layout>{null}</Layout>}>
        <Routes>
          <Route path="/" element={<PrivateRoute component={Dashboard} />} />
          <Route path="/article/:id" element={<PrivateRoute component={Article} />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
