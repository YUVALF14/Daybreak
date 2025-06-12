import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => (
  <div>
    {/* ...header, nav, etc... */}
    <Outlet />
    {/* ...footer... */}
  </div>
);

export default Layout;
