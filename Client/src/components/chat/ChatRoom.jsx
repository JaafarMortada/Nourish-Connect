import ContactCard from "./ContactCard"
import { Input, Spinner } from "@material-tailwind/react"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
import { useRef, useEffect } from "react";
import ChatBubble from "./ChatBubble"
import { useState } from "react";
import { useStoreData } from "../../global/store";
import { sendRequest } from "../../config/request";

const ChatRoom = ({ messages, receiverId, receiverData }) => {
    const { store } = useStoreData()

    const chatContainerRef = useRef(null);
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };

    const [sending, setSending] = useState(false)

    const [newMessageData, setNewMessageData] = useState({
        text: '',

    })

    const handleDataChange = (e) => {
        setNewMessageData({ ...newMessageData, [e.target.name]: e.target.value })
    }

    const HandleSendMessage = async () => {
        setSending(true)
        try {
            const formData = new FormData();

            formData.append("text", newMessageData.text);
            formData.append("receiver_id", receiverId);

            const response = await sendRequest({
                method: "POST",
                route: "/api/manager_charity/chat/new_message",
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.message === "success") {
                setSending(false)
                setNewMessageData({
                    text: ''
                })


            } else {
                setSending(false)

            }
        } catch (error) {
            setSending(false)

        }
    }

    useEffect(() => {
        scrollToBottom();
    }, []);

    return (

        <div className="w-full min-h-screen flex flex-col justify-between">
            <div className="flex items-center  bg-[--background-black] w-full text-white min-h-[83px] border-l-4 border-black pl-3 shadow-xl ">
                {
                    receiverId !== 0 && <ContactCard headerCard={true} data={receiverData} />
                    
                }
            </div>
            <div className="flex flex-col max-h-[90%] flex-1 justify-end w-full">


                <div className="  overflow-y-auto pb-4 transition-all flex flex-col scroll-transition px-5" ref={chatContainerRef}>

                    {messages.length > 0 ?
                        messages.map((message) => (

                            (message.receiver_id === store.user_id && message.sender_id === receiverId) ||
                                (message.receiver_id === receiverId && message.sender_id === store.user_id) ? (
                                <ChatBubble data={message} currentUser={store.user_id === message.sender_id} key={message.id} />
                            ) : null
                        )) :
                        <span className="text-[--text-gray] text-center">You have no chats, search users and start a new chat </span>}
                </div>
                <div className="px-5 mb-5">
                    {receiverId !== 0 && <Input
                        placeholder="New message"
                        className="!border-1 !border-[--primary] !bg-white text-black placeholder:text-black !rounded-lg "
                        labelProps={{
                            className: "hidden",
                        }}
                        containerProps={{ className: "min-w-[100px] " }}
                        name={'text'}
                        value={newMessageData.text}
                        onChange={handleDataChange}
                        disabled={sending}
                        icon={
                            sending ? <Spinner className="h-5 w-5 text-[--primary] cursor-pointer"/>
                            : <PaperAirplaneIcon className="h-5 w-5 text-[--primary] cursor-pointer" onClick={HandleSendMessage} />
                        }
                    />}
                </div>
            </div>




        </div>



    )
}

export default ChatRoom