import { Link, Outlet } from "react-router-dom";

export interface IAdminNavBar {
    path:string;
    label:string;
}
const AdminHomePage = () => {
    const adminNavBar:IAdminNavBar[] = [
        {path:'/admin', label:'Admin Dashboard'},
        {path:'/admin/categories', label:'Admin Categories'},
        {path:'/admin/partners', label:'Admin Partners'},
        {path:'/admin/product', label:'Admin Products'}
    ]

    return(
        <>
        <ul>
            { adminNavBar.map((item:IAdminNavBar) => (
        <li><Link to={item.path} >{item.label}</Link></li>  
    ))}  </ul>
        <Outlet />
        </>
    )
}

export default AdminHomePage;