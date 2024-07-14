import { useEffect, useState } from 'react';
import styles from './PartnersSlider.module.css';
import { getPartners } from '../../../../../../data/content/partners/getPartners';
import { IGetPartnerResponse } from '../../../../../../domain/usecases/content/partner';

const PartnersSlider = (): JSX.Element => {
  const [partnersData, setPartnersData] = useState<IGetPartnerResponse[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [elementsPerPage, setElementsPerPage] = useState(4);
  async function getPartnersFn() {
    try {
      const result = await getPartners();
      setPartnersData(result.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPartnersFn();

    const handleResize = () => {
      if (window.innerWidth < 678) {
        setElementsPerPage(2);
      } else {
        setElementsPerPage(4);
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleDotClick = (index: number) => {
    setActiveIndex(index);
    console.log("Index",index)
  };

  const renderVisiblePartners = () => {
    const startIndex = activeIndex + elementsPerPage;
    const endIndex = startIndex + elementsPerPage;
    return partnersData.slice(startIndex, endIndex).map((partner: IGetPartnerResponse, idx: number) => (
      <img
        key={idx}
        src={partner.imageUrl}
        alt={partner.imageAltText}
        className={styles.partnerImage}
      />
    ));
  };
  const numberOfDots = Math.ceil(partnersData.length / elementsPerPage);

  return (
    <section>
      <div className={styles.img_slider__wraper} 
      >
        {renderVisiblePartners()}
        <div className={styles.dot_elements_wraper}>
          {Array.from({ length: numberOfDots }).map((_, index) => (
            <span
              key={index}
              className={`${styles.dot_element} ${index === Math.floor(activeIndex ) ? styles.active_dot : ''}`}
              onClick={() => handleDotClick(index)}
            ></span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSlider;