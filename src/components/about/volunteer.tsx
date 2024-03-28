import { MailPlus, MapPin, Phone } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const Volunteer = () => {
  return (
    <div className="md:mx-20 mx-5 my-20">
      <div className="text-center my-10">
        <p className="text-xl font-bold my-3">Our Volunteer</p>
        <h2 className="text-3xl lg:text-4xl font-bold ">
          Embrace kindness, spread love.
        </h2>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 md:gap-10 gap-10">
      <Card>
          <CardHeader>
            <CardTitle>AKM SYFUL ALOM</CardTitle>
            <CardDescription>Web Developer</CardDescription>
            <img
              className="rounded-md"
              src="data:image/jpeg;base64,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"
            />
          </CardHeader>
          <CardContent>
            <div className="flex justify-start items-center gap-1">
              <MailPlus size={20} />
              <span>emal@email.com</span>
            </div>
            <div className="flex justify-start items-center gap-1">
              <Phone size={20} />
              <span>01751760872</span>
            </div>
            <div className="flex justify-start items-center gap-1">
              <MapPin size={20} />
              <span>Sylhet, BD</span>
            </div>
          </CardContent>
        </Card>
        
        
      </div>
    </div>
  );
};

export default Volunteer;
