// ProtectedRoute.js
// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Route, Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ element: Element, adminRequired, ...rest }) => {
//   const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
//   const userRole = useSelector(state => state.auth.role);

//   if (!isAuthenticated) {
//     return <Navigate to="/api/login" />;
//   }

//   if (adminRequired && userRole !== 'admin') {
//     return <Navigate to="*" />;
//   }

//   return <Route {...rest} element={<Element />} />;
// };

// export default ProtectedRoute;
