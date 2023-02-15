import api from "./client";

export const GetAddressByCpf = async (cep) => {
  const cepEdited = cep.replace("-", "");

  try {
    const url = `https://cep.awesomeapi.com.br/json/${cepEdited}`;
    const response = await api.get(url);
    //console.log("$$$$$$$$$$$$$$ ", response);
    return response;
  } catch (error) {
    //console.log("########### error ############ ",error );
    return error.response;
  }
};
