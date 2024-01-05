import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { Suspense } from 'react';

import Layout from '@/modules/Layout/Layout';
import Login from '@/modules/Auth/Login';
import PrivateRoute from '@/modules/Auth/PrivateRoute';

const Dashboard = React.lazy(() => import('@/modules/Dashboard/Dashboard'));
const StandUp = React.lazy(() => import('@/modules/StandUps/StandUp'));
const Admin = React.lazy(() => import('@/modules/Admin/Admin'));

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Layout>{null}</Layout>}>
        <Routes>
          <Route path="/" element={<PrivateRoute component={Dashboard} />} />
          <Route path="/standUp/:id" element={<PrivateRoute component={StandUp} />} />
          <Route path="/admin" element={<PrivateRoute component={Admin} />} />

          <Route path="/login" element={<Login />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
