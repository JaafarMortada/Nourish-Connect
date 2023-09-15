import ContactsContainer from './ContactsContainer'
import ChatRoom from './ChatRoom'
import { db } from '../../firebase/firebaseConfig'

import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
  or,
  and,

} from "firebase/firestore";

import { useEffect, useState } from 'react';
import { useStoreData } from '../../global/store';


const Messenger = () => {
  const [receiverId, setReceiverId] = useState(0)
  const [headerData, setHeaderData] = useState({})
  const [messages, setMessages] = useState([]);

  const { store } = useStoreData()
  const messagesRef = collection(db, "messages");
  const handleContactClick = (id, data) => {
    setReceiverId(id)
    setHeaderData(data)

  }
  useEffect(() => {

    const queryMessages = query(
      messagesRef,

      or(where("sender_id", "==", receiverId),
      where("receiver_id", "in", [store.user_id, receiverId]),),
      orderBy("created_at")

    );
    const unSubscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages.filter((message) => (
        (message.receiver_id === store.user_id && message.sender_id === receiverId) ||
        (message.receiver_id === receiverId && message.sender_id === store.user_id)
    )));
    });

    return () => unSubscribe();
  }, [receiverId]);

  return (
    <div className='w-full h-screen flex overflow-hidden'>
      <ContactsContainer setReceiverData={handleContactClick} />
      <ChatRoom messages={messages} receiverId={receiverId} receiverData={headerData}/>
    </div>
  )
}

export default Messenger