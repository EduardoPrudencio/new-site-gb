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
              endereco:values.address,
              numero:values.number,  
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
    // console.log("########### error ############ ",error );
    return error.response
  }
};

export const Update = async (values) => {
  const gym = gyns.find(x => x.isDefault);

  try {
    const url = `/user/Gym/${gym.id}`
    const token = getCookie(authCookieKeys.token);
 
    const response = await api.put(url, 
          {
            id: values.id,
            name: values.name,
            lastName: values.lastname,
            userName: values.username,
            phoneNumber: values.phonenumber,
            birthDate: values.birthdate,
            email: values.email,
            password: "******",
            address: {
              endereco:values.address,
              numero:values.number,  
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
    // console.log("########### error ############ ",error );
    return error.response
  }
};

export const GetAll = async () => {
  const gym = gyns.find(x => x.isDefault);

  try {
    const url = `/Gym/${gym.id}/Activity/${gym.activityId}/users`;
    const token = getCookie(authCookieKeys.token);

    const response = await api.get(url,{
      headers: {
        Authorization: `Bearer ${token}`
     },
   });

   // console.log("$$$$$$$$$$$$$$ ", response.data);
   return response;
 
    
  } catch (error) {
    // console.log("########### error ############ ",error );
    return error.response;
  }
};

export const GetById = async (userId) => {
  const gym = gyns.find(x => x.isDefault);

  try {
    const url = `/user/${userId}/activity/${gym.activityId}/gym/${gym.id}
    `;
    const token = getCookie(authCookieKeys.token);

    const { data } = await api.get(url,{
      headers: {
        Authorization: `Bearer ${token}`
     },
   });

   return data.data;
    
  } catch (error) {
    // console.log("########### error ############ ",error );
    return error.response;
  }
};