import ContactCard from "./ContactCard"
import { Input, Spinner } from "@material-tailwind/react"
import { PaperAirplaneIcon } from "@heroicons/react/24/solid"
import { useRef, useEffect } from "react";
import ChatBubble from "./ChatBubble"
import { useState } from "react";
const ChatRoom = () => {

    const chatContainerRef = useRef(null);
    const [messages, setMessages] = useState([]);
    const scrollToBottom = () => {
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    };
    useEffect(() => {
        scrollToBottom();
    }, []);
    return (

        <div className="w-full min-h-screen flex flex-col justify-between">
            <div className="flex items-center  bg-[--background-black] w-full text-white min-h-[83px] border-l-4 border-black pl-3 shadow-xl ">
                <ContactCard headerCard={true} />
            </div>
            <div className="flex flex-col max-h-[90%] flex-1 justify-end w-full">
                <div className="  overflow-y-auto pb-4 transition-all flex flex-col scroll-transition px-5" ref={chatContainerRef}>

                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble currentUser={false} />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble currentUser={false} />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble />
                    <ChatBubble currentUser={false} />
                    <ChatBubble currentUser={false} />
                    <ChatBubble />
                    <ChatBubble currentUser={false} />
                    <ChatBubble />
                </div>
                <div className="px-5 mb-5">
                    <Input
                        placeholder="New message"
                        className="!border-1 !border-[--primary] !bg-white text-black placeholder:text-black !rounded-lg "
                        labelProps={{
                            className: "hidden",
                        }}
                        containerProps={{ className: "min-w-[100px] " }}

                        //   value={newMessage}
                        //   onChange={(e) => setNewMessage(e.target.value)}

                        icon={<PaperAirplaneIcon className="h-5 w-5 text-[--primary]" />}
                    />
                </div>
            </div>




        </div>



    )
}

export default ChatRoom