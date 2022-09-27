import Box from "./Box";
import Button from "./buttons/Button";
import styled from "styled-components";
import { BsCheckLg, BsExclamationLg } from "react-icons/bs";

const Text = styled.label`
    font-size: 14px;
`;

export interface Props {
    Message: string;
    Exec: (value: boolean) => void;
    ValueToExec: boolean;
    Error?: boolean;
}

const Alert: React.FC<Props> = ({Message, Exec, Error, ValueToExec=true}) => {
    return (
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="start"    
          width="300px"
          height="20px"
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            width="55px"
            height="60px"
            marginLeft="-20px"
            marginRight="10px"
            backgroundColor={!Error ? "#2CC11F" : "#CA2D0B"}
          >
            {!Error ? <BsCheckLg color="#ffffff" fontSize="19px" /> :<BsExclamationLg color="#ffffff" fontSize="19px" />} 
          </Box>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            width="80%"
            height="60px"
          >
            <Text>{Message}</Text>
          </Box>
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            marginRight="-25px"
            width="10%"
            height="60px"
          >
            <Button
              border="none"
              backgroundColor="none" 
              onClick={() => Exec(ValueToExec)}
            >X</Button>
          </Box>
        </Box>
    )
}

export default Alert;