import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { getAllMembers } from './features/member/memberApi'
import { updateArrMembers } from './features/member/memberSlice';
import { useDispatch } from 'react-redux';
import AllUsers from './features/member/AllMembers';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import UserDetails from './features/member/MemberDetails';
import AddMember from './features/member/AddMember';
import UpdateMember from './features/member/UpdateMember';
import AllMembers from './features/member/AllMembers';
import MemberDetails from './features/member/MemberDetails';
import Bonus from './features/member/Bonus';
function App() {

  let dispatch = useDispatch()
  useEffect(() => {
    getAllMembers().then(res => {
      dispatch(updateArrMembers(res.data))
      console.log('הצליח להביא מהשרת')
    }).catch(err => {
      alert("לא הצליח להביא מהשרת")
    })
  }, [])
  return (
    <BrowserRouter>
    <Routes>
    <Route path="*" element={<AllMembers />} >
          <Route path="seeMember/:id" element={<MemberDetails/>} />
          <Route path="updateMember/:id" element={<UpdateMember/>} />
    </Route>
    <Route path="/addMember" element={<AddMember/>} />
    <Route path="/numSicks" element={<Bonus/>} />

    </Routes>
    </BrowserRouter>
  );
}

export default App;