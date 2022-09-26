import Box from "./Box";
import Button from "./buttons/Button";

export interface Props {
    Message: string;
    Exec: (value: boolean) => void;
    ValueToExec: boolean;
}

const Alert: React.FC<Props> = ({Message, Exec, ValueToExec=true}) => {
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
            width="55px"
            height="60px"
            marginLeft="-20px"
            marginRight="10px"
            backgroundColor="#00FF00"
          />
          <Box
            width="80%"
            height="60px"
          >
            <h3>{Message}</h3>
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