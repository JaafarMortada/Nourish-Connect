import { ProfileCard, Sidebar } from "../components"
import { styles } from "../constants"
const Profile = () => {
  return (
    <>
      <div className="flex ">
        <div className="w-[290px]">
          <Sidebar />
        </div>

        <div className={styles.pageContainer}>
          <div className={styles.pageHeaderText}>
            Profile Overview
          </div>
          <ProfileCard />
        </div>
      </div>
    </>

  )
}

export default Profile