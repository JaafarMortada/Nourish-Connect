import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";

const SignupStepOne = ( {role, setRole} ) => {
    return (
        <div className="flex flex-col justify-center items-center">
            <Card 
                className="sm:w-96 w-80 hover:scale-105 border-black drop-shadow transition-all cursor-pointer "
                variant={`${role === "charity" ? "gradient" : "filled"}`}
                color={`${role === "charity" ? "blue-gray" : "white"}`}
                onClick={() => setRole("charity")}
            >
                <CardBody>
                    <Typography variant="h6" color={`${role === "charity" ? "white" : "blue-gray"}`} >
                        I’m a charity/shelter coordinator
                    </Typography>
                </CardBody>
            </Card>
            <Card 
                className="sm:w-96 w-80 mt-5 hover:scale-105 border-black drop-shadow duration-300 transition-all cursor-pointer "
                variant={`${role === "manager" ? "gradient" : "filled"}`}
                color={`${role === "manager" ? "blue-gray" : "white"}`}
                onClick={() => setRole("manager")}
            >
                <CardBody>
                    <Typography variant="h6" color={`${role === "manager" ? "white" : "blue-gray"}`} >
                        I’m a supermarket manager
                    </Typography>
                </CardBody>
            </Card>
        </div>
    )
}

export default SignupStepOne