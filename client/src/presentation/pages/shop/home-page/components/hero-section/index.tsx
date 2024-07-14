import { Link } from 'react-router-dom';
import styles from './HeroSection.module.css';

const HeroSection = ():JSX.Element => {
return (
<section>
<div className={styles.hero_section__wraper}>
        <div className={styles.hero_section__content}>
<h4>New Collection</h4>
<h2>The New Ring <br></br>Sensation</h2>
<p>
          Discover the latest trends in our exquisite ring collection. 
          <br /> Unmatched elegance, crafted for perfection.
        </p>
   <Link to="/shop">SHOP NOW</Link> 
    </div>
    </div>
    </section>
)
}

export default HeroSection;