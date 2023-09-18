import { DonationsStatsCard, Sidebar, TopItems, WeeksRevenue } from "../../components"
import { styles } from "../../constants"
const Dashboard = () => {
  return (
    <>
      <div className="flex ">
        <div className="w-[290px]">
          <Sidebar />
        </div>

        <div className={styles.pageContainer}>
          <div className={styles.pageHeaderText}>
            Dashboard
          </div>
          <section className="h-full w-full flex flex-col items-center gap-5 ">
          <div className="flex md:flex-row flex-col px-8 md:gap-0 gap-5 md:justify-between items-center md:h-[40%] h-fit md:w-full w-[500px]">
            <DonationsStatsCard />
            {/* <HelpedCharities /> */}
          </div>
            <div className="flex md:flex-row flex-col md:gap-0 gap-5 w-full md:justify-between items-center px-8 ">
              <WeeksRevenue />
              <TopItems />
              {/* <WeeksRevenue /> */}
            </div>
            
            
          </section>

        </div>
      </div>
    </>

  )
}

export default Dashboard