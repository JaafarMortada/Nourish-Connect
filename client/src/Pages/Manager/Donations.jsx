import { DonationsSuggestions, ManagersDonationsOverview, Sidebar } from "../../components"
import { styles } from "../../constants"
const Donations = () => {
  return (
    <>
      <div className="flex ">
        <div className="w-[290px]">
          <Sidebar />
        </div>

        <div className={styles.pageContainer}>
          <div className={styles.pageHeaderText}>
            Donations
          </div>
          <div className="w-full flex-1 h-full flex flex-col gap-5 items-center mb-5">
            <DonationsSuggestions />
            <ManagersDonationsOverview />
          </div>

        </div>
      </div>
    </>

  )
}

export default Donations