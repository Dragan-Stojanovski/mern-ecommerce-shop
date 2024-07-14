import { useState } from 'react';
import BaseButton from '../../../../../components/base-ui/base-button';
import styles from './Partners.module.css';
import PartnersForm from './components/partners-form';
import PartnersTable from './components/partners-table';
import style from './Partners.module.css';
const PartnersPage = ():JSX.Element => {
    const [addPartnerFormIsVissible, setAddPartnerFormIsVissible] = useState(false);

return(
   <section className={styles.partners_section__wraper}>

     <BaseButton type="button" content="Add Partner" onClick={() => setAddPartnerFormIsVissible(true)} />
    {addPartnerFormIsVissible && <PartnersForm setIsModeVisible={setAddPartnerFormIsVissible} />}
    <div className={style.partner_table_wrapper}>   <PartnersTable /></div>
    </section>
)
}

export default PartnersPage;