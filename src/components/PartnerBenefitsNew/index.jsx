import Image from 'next/image';
import parse from 'html-react-parser';


const PartnerBenefitsNew = (props) => {
  const { title, subTitle, partners } = props;
  return (
    <section>
      <h4 className="text-[22px] leading-[30px] pt-6 md:text-[26px] font-[600] text-[#000]">{title}</h4>
      <p className="text-[16px] leading-[24px] pb-2 md:text-[18px] font-[400] md:pb-[46px]">{parse(subTitle)}</p>
      <div className="grid md:grid-cols-2">
        {partners.map((partner, index) => {
          return (
            <div className="p-4" key={index}>
              <Image
                className="h-6 mb-4"
                src={partner.image}
                width={partner.width}
                height={partner.height}
                alt={partner.alt}
              />
              <p className="w-[65%] rounded-[4px] bg-[#eaf4ff] py-[6px] px-2 text-[#007aff] text-[14px] font-[400] mb-4">{partner.benefitText}</p>
              <ul>
                {partner.benefits.map((benefit, index) => {
                  return (
                    <li className="flex gap-[6px] pb-[9px] items-center" key={index}>
                      <Image
                        src="https://assets.vakilsearch.com/live-images/blue-white-tick-b2b.svg"
                        width={14}
                        height={14}
                        alt="tick"
                      />
                      <p className="text-[#231f20] text-[14px] font-[400]">{benefit}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PartnerBenefitsNew;
