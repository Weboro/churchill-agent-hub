"use client";
import { useEffect, useState } from "react";
import AgentDetailCard from "@/components/cards/AgentDetailCard";
import { AgentHubData } from "@/constDatas/AgentHubData";
import { fetchAgentLinks } from "@/query/apiQueries";

const AgentDataSection = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    fetchAgentLinks()
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      {!isLoading && (
        <div className="container-blog mx-auto px-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {data?.map((item, index) => (
              <AgentDetailCard
                key={index}
                icon={`${item?.icon}`}
                subTitle={item?.subTitle}
                title={item?.title}
                url={item?.link}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default AgentDataSection;
