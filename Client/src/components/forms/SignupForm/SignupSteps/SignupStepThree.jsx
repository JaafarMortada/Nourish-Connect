import InputField from "../../../ui/Input"

const SignupStepThree = ( {data, role, handleDataChange} ) => {
  return (
    <div className="ss:w-[500px] w-[300px] flex flex-col gap-5 " >
            <InputField 
                label={`Enter your ${role === 'manager' ? "supermarket" : "charity/shelter"} name`}
                value={data.company_name}
                onChange={handleDataChange}
                name={'company_name'}
                />
            <InputField 
                label={'Enter your company\'s latitude'} 
                value={data.latitude}
                onChange={handleDataChange}
                name={'latitude'}
            />
            <InputField 
                label={'Enter your company\'s longitude'} 
                value={data.longitude}
                onChange={handleDataChange}
                name={'longitude'}
            />
        </div>
  )
}

export default SignupStepThree