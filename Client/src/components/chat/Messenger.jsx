import ContactsContainer from './ContactsContainer'
import ChatRoom from './ChatRoom'

const Messenger = () => {
  return (
    <div className='w-full h-screen flex overflow-hidden'>
      <ContactsContainer />
      <ChatRoom />
    </div>
  )
}

export default Messenger