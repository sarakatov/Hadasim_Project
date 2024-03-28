import { useSelector, useDispatch } from 'react-redux'
import { Outlet, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Link } from 'react-router-dom';
import OneMember from "./OneMember";
  const AllMembers = () => {
    let members = useSelector((state) => state.member.arrMembers)
    const location = useLocation();
    const navigate = useNavigate()
    const isBaseRoute = location.pathname === '/'
    return (
        <>
            {isBaseRoute && <div>
                <Button variant="contained" disableElevation sx={{ bgcolor: 'orange',marginTop:'2%' ,marginLeft:'2%'}} onClick={() => { navigate("/numSicks") }}>
                 הצג מספר חולים ביום
                    </Button>
                {/* <input type='button' value='הצג מספר חולים ביום' /> */}
                <p style={{ textAlign: 'center' }}>כל החברים</p>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Button variant="contained" disableElevation sx={{ bgcolor: 'orange' }} onClick={() => { navigate("/addMember") }}>
                        הוספת חבר
                    </Button>

                </Box>
                {members.map(item => <div key={item.id} style={{ marginBottom: '20px' }}><OneMember one={item} /> </div>)}

            </div>}
            <Outlet />
        </>);
}

export default AllMembers;