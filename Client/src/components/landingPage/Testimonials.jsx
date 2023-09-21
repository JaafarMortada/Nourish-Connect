import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { testimonials } from "../../constants";
import RevealOnScroll from "../ui/RevealOnScroll";

export function TestimonialCard({ name, title, image, company, content, index }) {
  return (
    <Card color="transparent" className="w-full h-full shadow-md p-10 max-w-[26rem]">
      <CardHeader
        color="transparent"
        floated={false}
        shadow={false}
        className="mx-0 flex items-center gap-4 pt-0 pb-8"
      >
        <Avatar
          size="xl"
          variant="square"
          withBorder={true}
          src={image}
          alt={name}
          className="border-[--primary]"
        />
        <div className="flex w-full flex-col gap-0.5">
          <div className="flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              {name}
            </Typography>
          </div>
          <Typography color="blue-gray">{title} <br/> @ {company}</Typography>
        </div>
      </CardHeader>
      <CardBody className="mb-6 p-0">
        <p className='font-normal text-dimWhite text-[18px] text-black'>
          &quot;{content}&quot;
        </p>
      </CardBody>
    </Card>
  );
}

const Testimonials = () => {
  return (
    <section id="testimonials" className="flex flex-col md:gap-0 gap-10 sm:pb-24 pb-6  relative min-h-max">
      <h1 className="font-semibold ss:text-[62px] text-[52px] text-[--primary] ss:leading-[100px] leading-[75px] w-full">
        Testimonials
      </h1>
      <RevealOnScroll index={0}>
        <div className="flex gap-10 w-full items-center justify-around translate-x-[200px]">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} index={index} />
          ))}
        </div>
      </RevealOnScroll>


    </section>)
}

export default Testimonials