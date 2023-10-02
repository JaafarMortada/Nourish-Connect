import InputField from "../../../ui/Input"
import Map from "../../../map/Map"
import { Typography } from "@material-tailwind/react"
const SignupStepThree = ({ data, role, handleDataChange, error, handleLocation }) => {


    return (
        <div className="ss:w-[500px] w-[300px] flex flex-col gap-5 " >
            <InputField
                error={error}
                label={`Enter your ${role === 'manager' ? "supermarket" : "charity/shelter"} name`}
                value={data.company_name}
                onChange={handleDataChange}
                name={'company_name'}
            />
            <div className="border-b-4 border-[--primary] rounded-t-lg">
                <Typography className="mt-1 font-thin text-gray-600 mb-2 text-[14px]">
                    Enter your location
                </Typography>
                <Map
                    styles={"w-full !min-h-[250px] rounded-t-lg"}
                    draggable={true}
                    locateUser={true}
                    handleLocation={handleLocation}
                />

            </div>
            <Typography
                variant="small"
                color="gray"
                className="mt-[-5px] flex gap-1 font-normal justify-center w-full"
            >
                Click on the map to give access to your location.<br />
                Drag the marker if the location was not accurate.
            </Typography>

        </div>
    )
}

export default SignupStepThree