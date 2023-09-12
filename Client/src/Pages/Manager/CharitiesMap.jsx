import { CharitiesMapList, Map, Sidebar } from "../../components"
import { styles } from "../../constants"
import { sendRequest } from "../../config/request"
import { useStoreData } from "../../global/store"
import { useState, useEffect } from "react"

const CharitiesMap = () => {

  const [data, setData] = useState([])
  const {store} = useStoreData()

    useEffect(()=>{
        const getCharities = async () => {
            try {
              const response = await sendRequest({
                  method: "GET",
                  route: "/api/manager/get_charities",
                  token: store.token,
              });
              if(response.message === "success"){
                  setData(response.charities);
              } 
          } catch (error) {
              console.log(error);
          }
          }
          getCharities()
    }, [])

  return (
    <>
      <div className="flex ">
        <div className="w-[290px]">
          <Sidebar />
        </div>

        <div className={`${styles.pageContainer} relative`}>
          <Map showMarkers={data}/>
          <CharitiesMapList data={data}/>
        </div>
      </div>
    </>

  )
}

export default CharitiesMap