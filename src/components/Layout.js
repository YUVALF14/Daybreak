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

// This file is a duplicate of Layout.tsx and can be deleted if Layout.tsx is used.
