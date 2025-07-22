import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import { useDrawerNavigation } from '../hooks/auth/useDrawerNavigation';

const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
    const drawerNavigation = useDrawerNavigation();
    
    return (
        <DrawerContext.Provider value={drawerNavigation}>
            {children}
        </DrawerContext.Provider>
    );
};

DrawerProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useDrawerContext = () => {
    const context = useContext(DrawerContext);
    if (!context) {
        throw new Error('useDrawerContext must be used within a DrawerProvider');
    }
    return context;
};
