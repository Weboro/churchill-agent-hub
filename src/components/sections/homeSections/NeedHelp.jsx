
const NeedHelp = () => {
  const cardsData = [
    {
      title: "Accounts",
      icon: "fi fi-tr-computer",
      email: "finance@churchill.nsw.edu.au",
      phone: "02 8856 2997 Ext: 700",
      phoneLink: "tel:0288562997,703",
    },
    {
      title: "Admissions",
      icon: "fi fi-tr-hr-person",
      email: "admissions@churchill.nsw.edu.au",
      phone: "02 8856 2997 Ext: 701",
      phoneLink: "tel:0288562997,701",
    },
    {
      title: "Marketing",
      icon: "fi fi-tr-id-card-clip-alt",
      email: "marketing@churchill.nsw.edu.au",
      phone: "02 8856 2997 Ext: 702",
      phoneLink: "tel:+0288562997,702",
    },
  ];
  return (
    <div className="container-blog mx-auto px-5">
      <h2 className="text-2xl font-bold mb-5">Need Help?</h2>
      <div className="w-full mt-[32px] xl:mt-0  mb-[32px] xl:mb-0">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            {cardsData.map((item, index) => (
              <div
                key={index}
                className="bg-neutral-50 p-1 rounded-md flex items-center gap-2 overflow-hidden"
              >
                <div className=" aspect-square ml-2 rounded-full bg-primary-orange/25 grid place-items-center ">
                  <i
                    className={`${item.icon} w-[50px] h-[50px] grid place-items-center m-0 text-3xl`}
                  ></i>
                </div>

                <div className="pl-2 py-2">
                  <h2 className="font-bold text-xl capitalize text-left mb-1">
                    {item.title}
                  </h2>

                  {item.email && (
                    <a href={`mailto:${item.email}`} className="block">
                      <p className="font-semibold break-words text-wrap text-sm">
                        {item.email}
                      </p>
                    </a>
                  )}

                  {item.phone && (
                    <a href={`tel:${item.phone}`} className="block w-fit">
                      <span className="font-semibold text-sm">{item.phone}</span>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  );
};

export default NeedHelp;
