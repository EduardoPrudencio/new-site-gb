import React, { useEffect, useState } from "react";

import AppLayout from "@component/layout/AppLayout";
import { onlyAuth } from "@utils/onlyAuth";
import { GetServerSideProps } from "next";
import { GetAllPresences } from "services/api/student";

import { Presences as listOfPresence } from "../../types";

function Presences() {
  const [presences, setPresences] = useState<listOfPresence[]>();

  useEffect(() => {
    const GetPresences = async () => {
      const list = await GetAllPresences();
      setPresences(list.data);
    };
    GetPresences();
  }, []);

  return (
    <>
      <h1>Presences</h1>

      {presences &&
        presences.map((p) => (
          <>
            <h1>{p.date}</h1>
            {p.presences?.map((pr) => (
              <>
                <h3>{pr.id}</h3>
                <h3>{pr.studentName}</h3>
              </>
            ))}
          </>
        ))}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = onlyAuth(async () => {
  return {
    props: {},
  };
});

Presences.layout = AppLayout;
export default Presences;
