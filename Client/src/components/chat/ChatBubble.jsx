
const ChatBubble = ({ currentUser=true }) => {
  return (
    <div className={`w-fit ${currentUser ? "bg-[--primary] self-end" : "bg-white "} rounded-md flex flex-col p-2 min-w-[200px] max-w-[300px] mt-2  drop-shadow-xl`}>
        <span className={`${currentUser ? "text-white" : "text-black"} `}>text text text text text text text text text text text text text text  </span>
        <span className={`${currentUser ? "text-gray-200" : "text-gray-900"}  text-[12px] self-end`}>05:30</span>
    </div>
  )
}

export default ChatBubble