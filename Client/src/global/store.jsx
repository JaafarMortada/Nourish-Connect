import { createContext, useState, useContext } from 'react';

const storeData = createContext();

export const StoreDataProvider = ({ children }) => {
    const [store, setStoreData] = useState({
        token: '',
        
    });

    return (
        <storeData.Provider value={{ store, setStoreData }}>
            {children}
        </storeData.Provider>
    );
};

export const useStoreData = () => {
    return useContext(storeData);
};