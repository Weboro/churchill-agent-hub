"use client";
import { AccordionComponent, Loading } from "@/components";
import { fetchRecordedWebinar } from "@/query/apiQueries";
import { useEffect, useState } from "react";
import { RecordedWebinarData } from "@/constDatas/RecordedWebinarData";
import { DataNotFound } from "@/components";

const RecordedWebinarSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    fetchRecordedWebinar()
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {!data.length > 0 ? (
            <DataNotFound />
          ) : (
            <AccordionComponent data={data} />
          )}
        </>
      )}
    </>
  );
};

export default RecordedWebinarSection;
