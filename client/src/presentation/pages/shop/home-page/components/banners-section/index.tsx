import BaseButton from '../../../../../components/base-ui/base-button';
import style from './BannersSection.module.css';

const BannersSection = ():JSX.Element => {
return(<div className={style.banners_section__wrapper}>

<div className={style.banners_section__box}>
<h4>Unique pieces</h4>
<h2>Be<br></br>
always<br></br>
on<br></br>
trend</h2>
<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.</p>
<BaseButton content="Shop Now" type="button"/>
</div>


<div className={style.banners_section_images__box}>
<img src="https://websitedemos.net/blingg-jewelry-store-04/wp-content/uploads/sites/1119/2022/08/bg-02.jpg" />
</div>


</div>)
}

export default BannersSection;