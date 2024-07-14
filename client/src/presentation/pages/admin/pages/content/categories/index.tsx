import styles from "./Categories.module.css";
import CategoriesTable from "./components/categories-table";
import CategoriesForm from "./components/categories-form";
import { useState } from "react";
import BaseButton from "../../../../../components/base-ui/base-button";
const CategoriesPage = ():JSX.Element =>{
    const [addCategoryFormIsVissible, setAddCategoryFormIsVissible] = useState(false);
      

    return (
        <div className={styles.categories_form__wrapper}>
    <h1>Categories Page</h1>
    <BaseButton type="button" content="Add Category" onClick={() => setAddCategoryFormIsVissible(true)} />
<CategoriesTable />
{addCategoryFormIsVissible && <CategoriesForm setIsModeVisible={setAddCategoryFormIsVissible} />}
    
   
        </div>
    )
}

export default CategoriesPage;