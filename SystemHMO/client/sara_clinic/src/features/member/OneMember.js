import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const OneMember = ({ one }) => {
    const navigate = useNavigate()
    return (<div>
        <Card dir="rtl" sx={{ width: '50%', maxHeight: 80,  margin: 'auto' }}  >
            <CardContent sx={{ display: 'flex', alignItems: 'center',justifyContent: 'space-between'  }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Avatar sx={{ bgcolor:'orange', width: 50, height: 50, fontSize: '1.5rem', marginRight: '1%' }}>{one.firstName[0]}</Avatar>

                <Typography sx={{ fontSize: 16, whiteSpace: 'nowrap',marginRight:'3%' }}>
                    {one.firstName} {one.lastName}
                </Typography>
                </div>
                <Link to={"/seeMember/" + one.id} >
                     <Button variant="contained" disableElevation sx={{bgcolor:'orange'}}>
                    ראה פרטים
                </Button>
                </Link>
            </CardContent>
        </Card>
    </div>);
}

export default OneMember;
