import Box from "./Box"

type PageSessionProps = {
    backgroundColor?: string;
    height: string;
}

export const PageSession: React.FC<PageSessionProps> = ({children, height, backgroundColor = "#FFFF"}) => {
    return (
    <Box
        display="flex"
        bg={backgroundColor}
        height={height}
        mt="-60px"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        width="100%"
        paddingBottom="2rem"
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-arround"
          width="1050px"
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
           {children}
          </Box>
        </Box>
      </Box>
    )
}