import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteMember } from './memberApi'
import { useDispatch } from 'react-redux';
import { deleteFromMembers } from './memberSlice'
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
const MemberDetails = () => {
    let navigate = useNavigate()
    let members = useSelector((state) => state.member.arrMembers)
    let { id } = useParams()
    let member = members.find(v => v.id == id);
    let dispatch = useDispatch()
    function deleteMemberFromArr() {
        deleteMember(member.id).then(res => {
            dispatch(deleteFromMembers(member))
            navigate('/')
            // alert('משתמש נמחק מהמערכת')
        }).catch(err => {
            console.log(Error)
        })
    }
    return (
        <>
            {member && <div>
                <Card dir="rtl" sx={{ width: '40%', marginLeft: '30%', marginTop: '5%', border: '1px solid black' }}>
                    <CardContent sx={{ marginRight: '4%' }}>
                        <p style={{ textAlign: 'center' }}><b>פרטי חבר</b></p>
                        <p sx={{ fontSize: 14 }}> שם פרטי : {member.firstName} |  שם משפחה:  {member.lastName}</p>
                        <p variant="body2">  ת.ז:  {member.id}</p>
                        <p sx={{ fontSize: 14 }}> עיר:   {member.fullAddress.city}  |   רחוב:   {member.fullAddress.street} |   מספר בית:   {member.fullAddress.numHouse} </p>
                        <p variant="body2"> תאריך לידה:  {new Date(member.birthDate).toLocaleDateString() }  </p>
                        <p variant="body2">
                            {member.phone && <> טלפון:  {member.phone}</>}
                            {member.phone && member.mobilePhone && <b>|</b>}
                            {member.mobilePhone && <> נייד:  {member.mobilePhone}</>}
                        </p><br></br>
                        <p variant="body2"><b>חיסוני Covid19 </b> </p>
                        {!member.CoronaVaccines[0] && <p variant="body2">לא התחסן</p>}
                        {member.CoronaVaccines[0] &&
                            member.CoronaVaccines.map((vaccine, index) => (
                                <div key={index}>
                                    <p variant="body2" ><b>חיסון מספר {index + 1}</b></p>
                                    <p variant="body2">תאריך קבלת חיסון: {new Date(vaccine.date).toLocaleDateString()}  </p>
                                    <p variant="body2">יצרן: {vaccine.manufacturer}  </p>
                                </div>
                            ))
                        }<br></br>
                        <p variant="body2"> <b>עבר מחלת הקורונה </b></p>
                        {!member.sickDate && <p variant="body2">לא חלה</p>}
                        {member.sickDate && <p variant="body2">מועד חולי: {new Date(member.sickDate).toLocaleDateString()}  </p>}
                        {member.recoveryDate && <p variant="body2">מועד החלמה: {new Date(member.recoveryDate).toLocaleDateString()}  </p>}
                    </CardContent>
                    <CardActions sx={{ marginTop: 'auto', justifyContent: 'flex-end', paddingRight: '1px' }}>
                        <Button size="small" variant="contained" color="primary" sx={{ bgcolor: 'orange' }} onClick={deleteMemberFromArr}>מחיקה</Button>
                        <Link to={"/updateMember/" + member.id} style={{ textDecoration: 'none' }}>
                            <Button size="small" variant="contained" sx={{ marginRight: '8px', bgcolor: 'orange' }}>עריכה</Button>
                        </Link>
                    </CardActions>
                </Card>
            </div>}
        </>
    );}
export default MemberDetails;