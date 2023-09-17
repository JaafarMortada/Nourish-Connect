import {
    Card,
    CardHeader,
    Typography,
    CardBody,

} from "@material-tailwind/react";
import PrimaryButton from "../../ui/Button";
import { useEffect, useState } from "react";
import { sendRequest } from "../../../config/request";
import DonationSuggestionCard from "../miniCards/DonationSuggestionCard";

const DonationsSuggestions = () => {

    const [suggestionsData, setSuggestionsData] = useState([])

    const getDonationSuggestions = async () => {
        try {
            const response = await sendRequest({
                method: "GET",
                route: "/api/manager/get_donations_suggestions",
            });
            if (response.message === "success") {
                setSuggestionsData(response.donation_suggestions);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getDonationSuggestions()
    }, [])

    return (
        <>
            <Card className="flex min-h-[350px] w-[95%] ">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className=" flex items-center justify-between">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Donation Suggestions
                            </Typography>
                        </div>
                        <PrimaryButton classNames="flex items-center bg-[--primary]" size="sm" label='Generate New' />
                    </div>
                </CardHeader>
                {suggestionsData.length === 0
                    ?
                    <div className="flex flex-1 h-full justify-center items-center">
                        <Typography color="gray" className="mt-1 font-normal text-center">
                            No suggestions found.<br />Click on the button to generate new suggestions.
                        </Typography>
                    </div>
                    :
                    <CardBody className=" px-5 flex  flex-1 ">
                        <div className="w-full h-full flex gap-5 overflow-scroll rounded-sm">
                            {
                                suggestionsData.map((suggestion, index) => (
                                    <DonationSuggestionCard
                                        key={index}
                                        data={suggestion}
                                    />
                                ))
                            }

                        </div>
                    </CardBody>
                }
            </Card>
        </>
    );
}

export default DonationsSuggestions