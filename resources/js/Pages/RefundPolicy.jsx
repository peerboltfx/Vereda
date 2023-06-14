import React from "react";
import Container from 'react-bootstrap/Container';
import { Head, Link,usePage } from "@inertiajs/inertia-react";
import "../../css/style.css";
import "../index.css";
import Header from "@/Components/layout/header";
import Footer from "@/Components/layout/footer";
import PageHeader from "@/Components/layout/pageheader";

import '@/assets/css/icofont.min.css';
import '@/assets/css/animate.css';
import '@/assets/css/style.min.css';


export default function RefundPolicy(props){
    const {programs, auth}=usePage().props;

    return(
        <>

               <Header />
               <PageHeader title={'Our Refund Policy'} curPage={'Refund Policy.'} />
               <Head title="Our Refund Policy">
                    <meta property="og:Vereda.co.in" content="https://vereda.co.in" />{/**<!-- website link --> */}
                    <meta property="og:title" content="Refund Policy"/>{/** <!-- title shown in the actual shared post --> */}
                    <meta property="og:description" content="What you need to know when making purchases from us" />{/** <!-- description shown in the actual shared post -->*/}
                    <meta property="og:image" content="../Images/banner.jpg"/>{/** <!-- image link, make sure it's jpg -->*/}
                    <meta property="og:url" content="https://vereda.co.in/pages/refund-policy" />{/** <!-- where do you want your post to link to -->*/}
                    <meta property="og:type" content="article" />
                    <meta name="robots" content="index,follow" />
	                <meta name="google" content="sitelinkssearchbox" />
                    <meta property="url" content="https://vereda.co.in" />
                </Head>
           <section>
            <Container className="mt-5 mb-5 pb-5">
            <h4 className="fs-2 text-center fw-bold mt-5 p-4 pb-4">When You make Purchases on our site, you are bind by(and must accept) this refund policy.</h4>
                <p  className="mt-5 mb-5">
                  
                </p>
            <h4><b className="text-color-dark-blue text-center fs-2 fw-bold mt-4">All Sales Are Final</b></h4>
                    <p className="mt-5 mb-5">We do not offer refunds under any circumstances</p>
               
                <h4><b className="text-color-dark-blue fs-2 fw-bold mt-4">No Return or Exchanges.</b></h4>
                <p className="mt-5 mb-5">
                As we provide a digital service, returns and exchanges do not apply. We do not offer
                any kind of returns or exchanges.
                </p>
                        
            </Container>
           </section>
           <Footer />
        </>
    )
}