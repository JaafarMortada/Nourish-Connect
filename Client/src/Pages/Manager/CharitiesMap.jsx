import { CharitiesMapList, Map, Sidebar } from "../../components"
import { styles } from "../../constants"
const CharitiesMap = () => {
  return (
    <>
      <div className="flex ">
        <div className="w-[290px]">
          <Sidebar />
        </div>

        <div className={`${styles.pageContainer} relative`}>
          <Map />
          <CharitiesMapList />
        </div>
      </div>
    </>

  )
}

export default CharitiesMap