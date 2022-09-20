import api from "@services/api/client";

export const Add = async (values) => {
  try {
    const response = await api.post("/user/Activity/{activityId}/Gym/{gymId}", {
            name: values.name,
            lastName: values.lastName,
            userName: values.userName,
            phoneNumber: values.phoneNumber,
            birthDate: values.birthDate,
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
    });
    //console.log("*************** ", response)
    return response;  
  } catch (error) {
    //console.log("########### error ############ ",error );
  }
};