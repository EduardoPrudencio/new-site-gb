import api from "@services/api/client";
import { authCookieKeys } from "@utils/constants";
import { getCookie } from "cookies-next";
import {gyns} from "../GymManager";

export const Add = async (values) => {
  const gym = gyns.find(x => x.isDefault);

  try {
    const url = `/user/Activity/${gym.activityId}/Gym/${gym.id}`
    const token = getCookie(authCookieKeys.token);
 
    const response = await api.post(url, 
          {
            name: values.name,
            lastName: values.lastname,
            userName: values.username,
            phoneNumber: values.phonenumber,
            birthDate: values.birthdate,
            email: values.email,
            password: values.password,
            address: {
              endereco:values.endereco,
              numero:values.numero,  
              complemento:values.complemento,
              cidade:values.cidade,
              bairro:values.bairro, 
              uf:values.uf,    
              cep:values.cep        
          }
        }
        ,{
          headers: {
            Authorization: `Bearer ${token}`
         },
       }  
    );
    return response;  
  } catch (error) {
    //console.log("########### error ############ ",error );
  }
};