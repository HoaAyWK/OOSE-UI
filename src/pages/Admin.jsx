import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startSetAllUser } from '../slices/users/userCreator';
import Dashboard from '../components/Dashboard/Dashboard';
const Admin = () => {
    const dispatch = useDispatch();
    const { users } = useSelector(state => state);
    useEffect(() => {
        dispatch(startSetAllUser());
    }, []);
    return (
        <>
        <Dashboard />
        </>
    )
}

export default Admin;