import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    ButtonGroup,
    Button,

} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
const Unauthorized = () => {

    const navigate = useNavigate()

    return (
        <div className="flex justify-center items-center w-[100vw] h-[100vh]">
            <Card className="mt-6 w-96 shadow-red-100">
                <CardBody>
                    <Typography variant="h1" color="red" className="mb-2 text-center">
                        401
                    </Typography>
                    <Typography className="text-center text-red-300">
                        You are not authorized to access this page
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0 flex justify-center">
                    <ButtonGroup variant="text" color="red" className="w-full justify-center">
                        <Button onClick={() => navigate("/")}>Home</Button>
                        <Button onClick={() => navigate("/auth/login")}>Sign in</Button>
                        <Button onClick={() => navigate("/auth/signup")}>Sign up</Button>
                    </ButtonGroup>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Unauthorized