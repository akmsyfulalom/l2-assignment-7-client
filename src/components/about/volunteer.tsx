/* eslint-disable @typescript-eslint/no-explicit-any */
import { MailPlus, MapPin, Phone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useGetVolunteerQuery } from "@/redux/features/volunteer/volunteer";
import { useAppSelector } from "@/redux/hooks";

const Volunteer = () => {
  const { data: valunteers } = useGetVolunteerQuery(undefined);
  const { darkMode } = useAppSelector((store) => store.theme);
  return (
    <div className="md:mx-20 mx-5 my-20">
      <div className="text-center my-10">
        <p className="text-xl font-bold my-3">Our Volunteer</p>
        <h2 className="text-3xl lg:text-4xl font-bold ">
          Embrace kindness, spread love.
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 md:gap-10 gap-10">
        {valunteers &&
          valunteers?.data?.map((valunteer: any, index: any) => (
            <Card
              key={index}
              className={`${
                darkMode ? "bg-[#18191A] border-gray-600 text-white" : ""
              }`}
            >
              <CardHeader>
                <CardTitle>{valunteer?.name}</CardTitle>
                <CardDescription>{valunteer?.passion}</CardDescription>
                <img className="rounded-md" src={valunteer?.image} />
              </CardHeader>
              <CardContent>
                <div className="flex justify-start items-center gap-1">
                  <MailPlus size={20} />
                  <span>{valunteer?.email}</span>
                </div>
                <div className="flex justify-start items-center gap-1">
                  <Phone size={20} />
                  <span>{valunteer?.mobile}</span>
                </div>
                <div className="flex justify-start items-center gap-1">
                  <MapPin size={20} />
                  <span>{valunteer?.location}</span>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default Volunteer;
