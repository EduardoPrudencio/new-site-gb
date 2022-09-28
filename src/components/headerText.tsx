import Box from "./Box";
import Typography from "./Typography";

interface Props {
    maxWidth?: number;
    color?: string;
    bold?: boolean;
    text: string;
}

const HeaderText: React.FC<Props> = ({maxWidth, color, bold, text}) => {
    
    return (
        <Box width={maxWidth}>
         <Typography
           color={color}
           fontWeight={bold ? "bold" : "normal"}
        >
          {text}
        </Typography>
        </Box>
    )
}

export default HeaderText;