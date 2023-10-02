import { createContext, useState, useContext, useEffect } from 'react';
import { sendRequest } from '../config/request';

const storeData = createContext();

export const StoreDataProvider = ({ children }) => {
    const [store, setStoreData] = useState({
        token: '',
        usertype: '',
        usertype_id: '',
        email: '',
        user_id: '',
        username: '',
        company_name: '',
        pic_url: null,
        receiver_id: null,
        inventory_id: null,

    });

    useEffect(() => {
        const refreshStoreData = async () => {
            try {
                const response = await sendRequest({
                    method: "POST",
                    route: "/api/auth/login/refresh",
                    includeHeaders: true,
                });
                if (response.message === "logged in successfully") {
                    localStorage.setItem('token', response.user.token);
                    setStoreData({
                        ...store,
                        token: response.user.token,
                        usertype: response.user.usertype_id === 1 ? "manager" : response.user.usertype_id === 2 ? "cashier" : response.user.usertype_id === 3 ? "charity" : "",
                        usertype_id: response.user.usertype_id,
                        email: response.user.email,
                        user_id: response.user.id,
                        username: response.user.username,
                        company_name: response.user.company_name,
                        pic_url: response.user.pic_url,
                        inventory_id: response.user.inventory_id,
                        
                      });
    
                } else {

                }
            } catch (error) {

            }
    
        }

        if (localStorage.getItem("token") && !store.token) refreshStoreData()

      }, []);
    return (
        <storeData.Provider value={{ store, setStoreData }}>
            {children}
        </storeData.Provider>
    );
};

export const useStoreData = () => {
    return useContext(storeData);
};