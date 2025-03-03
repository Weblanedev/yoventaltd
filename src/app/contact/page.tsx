import React from 'react';
import { Metadata } from 'next';
import Wrapper from '@/layout/wrapper';
// import HeaderTwo from '@/layout/header/header-two';
import BreadcrumbOne from '@/components/breadcrumb/breadcrumb-one';
import ContactArea from '@/components/contact/contact-area';
import FooterThree from '@/layout/footer/footer-three';
import shape from '@/assets/images/shape/shape_33.svg';
// import NewsletterBanner from '@/components/newsletter/newsletter-banner';
import HeaderThree from '@/layout/header/header-three';
import { brand_data } from '@/data/brand-data';

export const metadata: Metadata = {
  title: `Contact - ${brand_data.name}`,
};

const ContactPage = () => {
  return (
    <Wrapper>
      <div className="main-page-wrapper">
        {/* header start */}
        <HeaderThree />
        {/* header end */}
        <main>
          {/* breadcrumb start */}
          <BreadcrumbOne
            title="Contact us for inquiries"
            subtitle="Get our all info and also can message us directly from here"
            page="Contact"
            shape={shape}
          />
          {/* breadcrumb end */}

          {/* contact area start */}
          <ContactArea />
          {/* contact area end */}

          {/* news letter start */}
          {/* <NewsletterBanner /> */}
          {/* news letter end */}
        </main>

        {/* footer start */}
        <FooterThree style_2={true} />
        {/* footer end */}
      </div>
    </Wrapper>
  );
};

export default ContactPage;
