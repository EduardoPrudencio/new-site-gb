import React, {useState} from "react";
import Navbar from "@component/navbar/Navbar";
import { H5 } from "@component/Typography";
import AppLayout from "@component/layout/AppLayout";
import { GetAll } from "services/api/student"
import { useEffect } from "react";
import { User } from "types";

function Users(){
    const [students, setStudents] = useState<User[]>();


    useEffect( () => {
      const GetAllStudents = async () => {
        const list = await GetAll();
        setStudents(list.data.data);
        console.log("QQQQQQQQQQQQ2 ", list.data.data);
      };
      GetAllStudents();
    }, []);

    return ( 
      <>
        <div>
          {
            students?.map((student) => {
              return(
                <H5>{student.name}</H5>
              );
            })}
        </div>
      </>
    )
}

Users.layout = AppLayout;

export default Users;