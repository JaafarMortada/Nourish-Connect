import { Input } from "@material-tailwind/react"
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import ContactCard from "./ContactCard"
import { useStoreData } from "../../global/store"
import { useEffect, useState } from "react"
import { sendRequest } from "../../config/request"
const ContactsContainer = ({setReceiverData}) => {
    const { store, setStoreData } = useStoreData()

    const [contacts, setContacts] = useState([])
    const [searchTerm, setSearchTerm] = useState('');

    const useDebounce = (value, delay) => {
        const [debouncedValue, setDebouncedValue] = useState(value);

        useEffect(() => {
            const timer = setTimeout(() => {
                setDebouncedValue(value);
            }, [delay]);

            return () => {
                clearTimeout(timer);
            };
        }, [value, delay]);

        return debouncedValue;
    };

    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    useEffect(() => {
        const getContactsHandler = async () => {
            if (store.token !== '')
            try {
                const response = await sendRequest({
                    method: "GET",
                    route: `/api/manager_charity/chat/search_users/${store.receiver_id ? store.receiver_id : debouncedSearchTerm}`,
                    token: store.token,
                });
                if (response.message === "success") {
                    if (store.receiver_id) setReceiverData(store.receiver_id, response.contactFromMap)
                    setContacts(response.contacts);
                    setStoreData({...store, receiver_id: null})
                }
            } catch (error) {
                // console.log(error);
            }
        }
        getContactsHandler()
    }, [debouncedSearchTerm, store.token])



    return (
        <div className='min-w-[20rem] h-full bg-[--background-black] mb-2 p-4 border-l-4 border-black flex flex-col gap-4'>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                <Input
                    placeholder={`Search ${store.usertype === "manager" ? "charities" : "supermarkets"}`}
                    className="!border-0 !bg-gray-600 text-white placeholder:text-gray-100 !rounded-full "
                    labelProps={{
                        className: "hidden",
                    }}
                    containerProps={{ className: "min-w-[100px] " }}

                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}

                    icon={<MagnifyingGlassIcon className="h-5 w-5 text-white " />}
                />
            </div>
            <hr className="my-2 border-[--text-gray]" />
            <div className="flex flex-col gap-2 max-h-full overflow-scroll justify-start">
                {contacts.length > 0 ?
                    contacts.map((contact) => (
                        <ContactCard data={contact} key={contact.id} handleContactClick={setReceiverData}/>

                    )) :
                    <span className="text-[--text-gray] text-center">You have no chats, search users and start a new chat </span>}

            </div>
        </div>
    )
}

export default ContactsContainer