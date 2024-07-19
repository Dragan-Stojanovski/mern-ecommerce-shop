import { Link, NavLink, useNavigate } from "react-router-dom";
import { IRootState } from "../../../../domain/usecases/store/rootState";
import { useDispatch, useSelector } from "react-redux";
import styles from './NavigationLinks.module.css';
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { FaCartShopping } from "react-icons/fa6";
import { FaUserAlt } from "react-icons/fa";
import { fetchUserDirectly } from "../../../../domain/store/actions/getUserOwn";
import { getCategories } from "../../../../data/content/categories/getCategories";

export interface INavItemsParams {
    path: string;
    label: string;
  }
const navItems: INavItemsParams[] = [
    { path: "/login", label: "LOGIN" },
    { path: "/register",label: "REGISTER" },
];

const NavigationLinks = ():JSX.Element => {
  const username = useSelector((state: IRootState) => state.user?.username);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isDropdownVisible, setIsDropdownVisible] = useState(isMobile ? false : true); 
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);
  const [productCategories, setProductCategories] = useState([]);
  const toggleDropdown = () => setIsDropdownVisible(!isDropdownVisible);
  const toggleProfileDropdown = () => setIsProfileDropdownVisible(!isProfileDropdownVisible);
const navigate = useNavigate();
const dispatch = useDispatch();
  function logoutUser () {
    localStorage.removeItem('jwt');
    isMobile ? setIsDropdownVisible(false) : setIsDropdownVisible(true)
    fetchUserDirectly(dispatch);
    navigate('/login');
  }

  async function getCategoriesFn () {
    try{
      const result = await getCategories();
      setProductCategories(result.data);
    }catch(error) {

    }
  }

  useEffect(() => {
    getCategoriesFn()
  }, []);


  useEffect(() => {
    const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
        window.removeEventListener("resize", handleResize);
    };
}, []);
  
return(
<div className={styles.navigation_links__wrapper}>
<ul>
<div className={styles.navigation_links__box_logo}>
  <li><NavLink to="/" className={({ isActive }) => (isActive ? styles.active_link : "")} >LOGO</NavLink></li>
  {isMobile && <li><button onClick={toggleDropdown} className={styles.hamburger_icon} > {  isDropdownVisible ?<IoMdClose /> :<RxHamburgerMenu />}  </button></li>}
  </div>
  {isDropdownVisible && (
    <>
<div className={styles.navigation_links__box}>
{productCategories.map((item:INavItemsProps) => (
      <li><NavLink className={({ isActive }) => (isActive ? styles.active_link : "")}  to={item.path} >{item.label}</NavLink></li>
))}
</div>
  <div className={`${styles.navigation_links__box} ${styles.navigation_links__authenticated}`}>
     {!username ? navItems.map((item:INavItemsProps) => (
      <li><NavLink className={({ isActive }) => (isActive ? styles.active_link : "")}  to={item.path} >{item.label}</NavLink></li>
)): <>

<li className={styles.wrapper_for_authenticated_options}> 
  
  
  <button><Link to="/cart"><FaCartShopping /></Link></button></li> 
  
  <li> <button onClick={() => toggleProfileDropdown()}>{username && <><span>{username}</span> <FaUserAlt /></>}</button>

  {isProfileDropdownVisible && (
<ul className={styles.profile_dropdown}>
<li><NavLink to="/profile">Profile</NavLink></li>
<li className={styles.logout_button} onClick={logoutUser}> Log Out </li>
</ul>
)}
</li></>}
</div>
</>)}
</ul>
</div>
)
}

export default NavigationLinks;