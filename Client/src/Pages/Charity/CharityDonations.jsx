import { DonationsOverviewTable, PrimaryButton, RequestDonation, Sidebar } from "../../components"
import { styles } from "../../constants"
import { useState } from "react";
const CharityDonations = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
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
        
            <RequestDonation open={open} handleOpen={handleOpen}/>
            <DonationsOverviewTable />
       

        </div>
      </div>
    </>

  )
}

export default CharityDonations