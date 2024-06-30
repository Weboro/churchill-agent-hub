import { UpcomingWebinarData } from "@/constDatas/UpcomingWebinarData";
import Image from "next/image";

const UpcomingWebinarSection = () => {
  return (
    <div className="grid lg:grid-cols-3  gap-8">
      {UpcomingWebinarData.map((item, index) => (
        <div
          className="bg-neutral-50 p-7 border border-primary-orange/50 rounded-md flex flex-col gap-8"
          key={index}
        >
          <div>
            <p className="text-2xl mb-4 block font-bold">{item.title}</p>
            <p className="line-clamp-4">{item.description}</p>
          </div>
          <div className="grid grid-cols-2 items-center">
            <div className="flex flex-col gap-2 ">
              <Image
                width={300}
                height={300}
                src={item.person.photo}
                alt={item.title}
                className="w-20 h-20 object-cover rounded-full"
              />
              <div>
                <p className="text-lg font-bold">{item.person.name}</p>
                <p>{item.person.post}</p>
              </div>
            </div>

            <div className="text-center">
              <p className="text-lg font-bold">{item.time}</p>
              <p className="">Duration: {item.duration}</p>
              <a
                href={item.link}
                target="_blank"
                className="mx-auto block mt-3"
              >
                <button className="bg-primary-orange rounded-lg px-8 py-3 font-bold">
                  Register Now
                </button>
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UpcomingWebinarSection;
