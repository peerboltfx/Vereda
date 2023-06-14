import React from "react";
import Container from 'react-bootstrap/Container';
import { Head, Link,usePage } from "@inertiajs/inertia-react";
import "../../css/style.css";
import "../index.css";
import Header from "@/Components/layout/header";
import Footer from "@/Components/layout/footer";
import PageHeader from "@/Components/layout/pageheader"

import '@/assets/css/icofont.min.css';
import '@/assets/css/animate.css';
import '@/assets/css/style.min.css';


export default function termsAndCondition(props){

    /**
     * Normalize working with data collections from the server,
     *  to read the content of each object you console.log
     */
    const {programs}=usePage().props;

    return(
        <>
          
          <Head title="Terms and Conditions">
                <meta name="description" content="Terms associated to our site." />
            </Head>
            <Header />
            <PageHeader title={'Terms and Conditions'} curPage={'Terms and Condition'} />
        
           <section>
            <Container className="mt-5 mb-5 pb-5">
            <h4 className=" fw-bold mt-5 p-4 pb-4">Usage of this site is bounded by these Terms.</h4>
                <p  className="mt-5 mb-5">
                    Vereda.co.in maintains this website, any courses and other linked and related sites (the "Site") for the use of it`s customers,
                    vendors, students, and other sites users (*Users*) upoh agreement to the following terms. Please read the terms carefully before 
                    using the Site. Use of this website indicates acceptance of these "Terms and Use" and forms a binding agreement between you and 
                    Vereda.co.in. If you do not agree to these terms, do not use this Site. <br/><br/>
                    In addition to these terms, all the purchases made on this site are governed by our refund policy found <Link href={route("RefundPolicy")}>here</Link> {' '}
                    and all activity is governed by our privacy policy <Link href={route("PrivacyPolicy")}>Here</Link> <br/><br/>
                    Minors or people below 16 years old are not allowed to use this website.
                </p>
            <h4><b className="text-color-dark-blue fw-bold mt-4">1.Use of Site</b></h4>
                <p className="mt-5 mb-5">Vereda.co.in provides various materials, information, quizzes, tests, questions, articles,
                    news and other information on this and related sites and in courses offered through this
                    site (the “Materials”). Vereda.co.in authorizes each User to view and download one copy
                    of the Materials. Materials may be downloaded and a maximum of one copy of the
                    Materials may be printed provided that Users make no modifications to the Materials
                    and you retain all copyright and other proprietary notices contained in the original
                    Materials on any copies of the Materials. Users may not modify the Materials at this Site
                    in any way or reproduce, share or distribute them. Users will keep all Materials
                    confidential, and will not sell, auction, loan, rent, give away, describe, summarize, or
                    otherwise reveal the Materials or their contents, to any other person or entity. Any
                    breach of these Terms of Use automatically terminates your authorized use of the Site
                </p>
               
                <h4><b className="text-color-dark-blue fw-bold mt-4">2.Geographic location</b></h4>
                <p className="mt-5 mb-5">
                If you, as a User, purchase Materials from this Site or Vereda.co.in while outside of
                India, you may not use or access the materials while inside India.
                </p>
              
                <h4><b className="text-color-dark-blue fw-bold mt-4">3. User Warranty</b></h4>
                <p className="mt-5 mb-4">
                As a User, you warrant that you are not an agent or employee of any other test
                preparation company and the Site and Materials solely for your own personal career
                advancement or personal use.
                </p>
                <h4><b className="text-color-dark-blue fw-bold mb-4 mt-4">4. Trademark and Copyright</b></h4>
                <p className="mt-5 mb-5">
                Vereda.co.in, and certain other brands, trademarks, and service marks are marks of
                Vereda.co.in and its affiliates. The Materials on this Site are copyrighted, and any
                unauthorized use of any Materials on this Site may violate copyright, trademark, and
                other laws</p>
                <h4><b className="text-color-dark-blue fw-bold mt-4 mb-4"> 5. Hyperlinks</b></h4>
                <p className="mt-5 mb-5">
                Links to external websites are provided solely as a convenience to you. Vereda.co.in
                has not reviewed all of these external websites, does not control and is not responsible
                for any of these sites or their content. If you decide to access any of the external
                websites linked to this Site, you do so entirely at your own risk.
            </p>
            <h4><b className="text-color-dark-blue fw-bold mt-5">6. No Warranty</b></h4>
            <p className="mt-5 mb-5">
            The Materials provided at this site are provided “as is” without any warranties of any
            kind including warranties of merchantability, fitness for a particular purpose, or
            non-infringement of intellectual property. Vereda.co.in further does not warrant the
            accuracy and completeness of the Materials at this Site. Vereda.co.in may make changes
            to the Materials at this Site, or to the services and prices described in them, at any time
            without notice. The Materials at this Site may be out of date and makes no commitment
            to update the Materials at this Site.</p>
            <h4><b className="text-color-dark-blue fw-bold mt-5 mb-2">7. Limitation of Liability</b></h4>
            <p className="mt-5 mb-5">In no event will Vereda.co.in, its suppliers or other third parties mentioned at this Site be
            liable for any damages whatsoever (including, without limitation, those resulting from
            lower test scores, interruption of services or inaccurate information) arising out of the
            use, inability to use, or the results of the use of this Site, any websites liked to this Site,
            or the Materials or information contained at any or all such sites, whether based on
            warranty, contract, tort or any other legal theory and whether or not advised of the
            possibility of such damages. If your use of the Materials or information from this Site
            results in the need for servicing, repair or correction of equipment or data, you assume
            all costs thereof.</p>
            <h4><b className="text-color-dark-blue fw-bold mt-5 mb-2">8. Account Termination</b></h4>
            <p className="mt-5 mb-5">Any and all accounts may be terminated for any reason(s), at any time, at the sole
                discretion of the administrators of this website.</p>
                <h4><b className="text-color-dark-blue fw-bold mt-5 mb-2">9. Applicable Law</b></h4>
            <p className="mt-5 mb-5">The Terms of Use are governed by the laws of India. Failure to enforce strict
performance of the Terms of Use of Use shall not be construed as a waiver of any
provision or right. Vereda.co.in may assign its rights and duties under the Terms of Use
without notice to any party at any time.</p>
<h4><b className="text-color-dark-blue fw-bold mt-5 mb-2">10. Effective Date and Updates</b></h4>
            <p className="mt-5 mb-5">The Terms are effective as of November 11th, 2022 and are subject to change without
notice by Vereda.co.in at any time. Please check for changes regularly. Your use of this
Site after such changes constitutes your agreement to such changes.</p>
          
            </Container>
           </section>
           <Footer />
        </>
    )
}