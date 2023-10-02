import { DonationsOverviewTable, PrimaryButton, RequestDonation, Sidebar } from "../../components"
import { styles } from "../../constants"
import { useState, useEffect } from "react";
const CharityDonations = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const [newRequests, setNewRequest] = useState([])
  const handleAddedRequest = (newData) => {
    setNewRequest((prevRequests) => [
      {
        title: newData.title,
        category: newData.category,
        requested_quantity: newData.quantity,
        received_quantity: 0,
        donated_by: [],
        status: false,

      },
      ...prevRequests,
      
    ])
  }

  return (
    <>
      <div className="flex ">
        <div className="w-[290px]">
          <Sidebar />
        </div>

        <div className={styles.pageContainer}>
          <div className={`${styles.pageHeaderText}`}>
            Donations
            <PrimaryButton 
              label={'New Request'}
              classNames={"bg-[--primary]"}
              onClick={handleOpen}
              />

          </div>
        
            <RequestDonation open={open} handleOpen={handleOpen} handleNewRequest={handleAddedRequest}/>
            <DonationsOverviewTable newRequests={newRequests}/>
       

        </div>
      </div>
    </>

  )
}

export default CharityDonations