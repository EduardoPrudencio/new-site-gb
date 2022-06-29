import { apiDefault } from ".";

export const SignUpCall = async (values) => {
    
    try {    
        
        const {status} = await apiDefault .post('v2/customers',{
            customer: {
                nickname: values.name, 
                email: values.email, 
                password: values.password, 
                mkt: values.receiveAboutProductsAndServices ? '1' : '0' 
            },
            voucher: values.voucher,
        });

        return status;
   
    } catch (error) {}
};