import Sidebar from "../../components/ui/Sidebar"

const Dashboard = () => {
  return (
    <>
        <div className="flex ">
            <div className="w-[290px]">
                <Sidebar />
            </div>
            
            <div className="flex flex-col flex-1 h-[100vh] overflow-auto min-w-[500px]">
                
            </div>
        </div>
    </>
    
  )
}

export default Dashboard