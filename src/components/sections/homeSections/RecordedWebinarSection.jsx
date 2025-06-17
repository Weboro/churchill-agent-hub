import { AccordionComponent } from "@/components";

import { RecordedWebinarData } from "@/constDatas/RecordedWebinarData";

const RecordedWebinarSection = () => {
  return (
    <>
      <AccordionComponent data={RecordedWebinarData} />
    </>
  );
};

export default RecordedWebinarSection;
