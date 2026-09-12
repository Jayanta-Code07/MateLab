
import Sidebar from "./Sidebar"
import Box from "@mui/material/Box"
import Body from "./Body"

export default function HomePage(){
    return (
        <>
            <Box sx={{ display: 'flex' }}  >
                <Sidebar />
                <Body />
            </Box>
        </>
    )
}