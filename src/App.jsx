import { useState } from 'react';
import { BrowserRouter, Route, Navigate } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './Provider/authProvider.jsx';
import AppRoutes from "./Routes/appRoutes.jsx";

function App() {

  return (
      <BrowserRouter
          future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
          }}
      >
          <AuthProvider>
              <AppRoutes />
          </AuthProvider>
      </BrowserRouter>
  );
}

export default App;