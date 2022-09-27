import React, {useState} from "react";
import Navbar from "@component/navbar/Navbar";
import { H5 } from "@component/Typography";
import AppLayout from "@component/layout/AppLayout";
import { GetAll } from "services/api/student"
import { useEffect } from "react";
import { User } from "types";

const Users: React.FC = () => {
    const [students, setStudents] = useState<User[]>();

    useEffect( () => {
      const GetAllStudents = async () => {
        const list = await GetAll();
        setStudents(list.data.data);
        console.log("QQQQQQQQQQQQ2 ", students);
      };

      GetAllStudents();
    }, []);

    return ( 
      <>
        <Navbar />
        <H5>{students.length}</H5>

        {/* {
            students.map((item) => <H5>{item?.name}</H5>)
        } */}

      </>
    )
}

Users.layout = AppLayout;

export default Users;