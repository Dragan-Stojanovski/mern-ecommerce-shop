import BaseButton from '../../../../../components/base-ui/base-button';
import style from './ProceedToCheckout.module.css';

export interface IProceedToCheckoutProps {
    totalPrice:number;
}

const ProceedToCheckout = ({totalPrice}:IProceedToCheckoutProps):JSX.Element => {
    return <div className={style.proceed_to_checkout__wrapper}>
        
        <h3>Cart Totals</h3>
        <h4>Total : ${totalPrice}</h4>
        <BaseButton type={'button'} content={'Proceed To Checkout'} />
        
        </div>
}

export default ProceedToCheckout;