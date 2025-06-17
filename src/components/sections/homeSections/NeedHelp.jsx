const NeedHelp = () => {
  const cardsData = [
    {
      title: "Accounts",
      icon: "fi fi-tr-computer",
      email: "finance@churchill.nsw.edu.au",
      phone: "02 8856 2997 Ext: 600",
      phoneLink: "tel:0288562997,600",
    },
    {
      title: "Admissions",
      icon: "fi fi-tr-hr-person",
      email: "admissions@churchill.nsw.edu.au",
      phone: "02 8856 2997 Ext: 601",
      phoneLink: "tel:0288562997,601",
    },
    {
      title: "Marketing",
      icon: "fi fi-tr-id-card-clip-alt",
      email: "marketing@churchill.nsw.edu.au",
      phone: "02 8856 2997 Ext: 602",
      phoneLink: "tel:+0288562997,602",
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
                <div className="pl-4 py-2">
                  <h2 className="font-bold text-xl capitalize text-left mb-1">
                    {item.title}
                  </h2>

                  {item.email && (
                    <a
                      href={`mailto:${item.email}`}
                      className="block border border-orange-400 rounded-md bg-orange-50 p-2 mb-2"
                    >
                      <p className="font-semibold break-words text-wrap text-sm flex align-middle gap-2">
                        <i className="fi fi-rr-phone-call flex align-middle items-center"></i>
                        {item.email}
                      </p>
                    </a>
                  )}

                  {item.phone && (
                    <a
                      href={`tel:${item.phone}`}
                      className="block border border-orange-400 rounded-md bg-orange-50 p-2 "
                    >
                      <p className="font-semibold break-words text-wrap text-sm flex align-middle gap-2">
                        <i className="fi fi-rr-envelope flex align-middle items-center"></i>
                        {item.phone}
                      </p>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeedHelp;
