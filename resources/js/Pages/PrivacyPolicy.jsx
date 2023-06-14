import React from "react";
import Container from 'react-bootstrap/Container';
import { Head,usePage, Link } from "@inertiajs/inertia-react";
import "../../css/style.css";
import Header from "@/Components/layout/header";
import Footer from "@/Components/layout/footer";
import PageHeader from "@/Components/layout/pageheader"
import '@/assets/css/icofont.min.css';
import '@/assets/css/animate.css';
import '@/assets/css/style.min.css';

export default function PrivacyPolicy(props){
    const {programs}=usePage().props;
    return(
        <>
           <Header />
           <PageHeader title={'Privacy Policy'} curPage={'Privacy'} />
            <Head title="Privacy Policy" >
           
                <meta name="description" content="welcome to Vereda.co.in, one of the leading digital learning in India." />
                
                    {/* <!-- OG Meta Tags to improve the way the post looks when you share the page on LinkedIn, Facebook, Google+ --> */}
                    <meta property="og:Vereda.co.in" content="https://vereda.co.in" />{/**<!-- website link --> */}
                    <meta property="og:title" content="Vereda Privacy Policy"/>{/** <!-- title shown in the actual shared post --> */}
                    <meta property="og:description" content="Here is everything you need to know about how we use your personal data." />{/** <!-- description shown in the actual shared post -->*/}
                    <meta property="og:image" content="../Images/banner.jpg"/>{/** <!-- image link, make sure it's jpg -->*/}
                    <meta property="og:url" content="https://vereda.co.in/pages/privacy-policy" />{/** <!-- where do you want your post to link to -->*/}
                    <meta property="og:type" content="article" />
                    <meta name="robots" content="index,follow" />
	                <meta name="google" content="sitelinkssearchbox" />
                    <meta property="url" content="https://vereda.co.in" />
            </Head>
           
           <section>
            <Container className="mb-5 pb-5">
            <h4 className="fw-bold p-4 mb-5 pb-4">Here is everything you need to know about how we use your personal data.</h4>

            <h4><b className="text-color-dark-blue fw-bold mt-4">1. What Information do we collect and what do we do with it?</b></h4>
                <p className="mt-5">When you enrol as a student or subscriber (“learner”) on our site or related courses, as
                part of the enrolling process, we collect the personal information you give us such as
                your name and email address.
                </p>
                <p className="mt-5">
                Email marketing: we may send you emails about our site and related course(s),
                registration, course content, your course progress or other updates. We may also use
                your email to inform you about changes to the course, survey you about your usage, or
                collect your opinion.
                </p>
                <h4><b className="text-color-dark-blue fw-bold mt-4">2. How do you get my consent?</b></h4>
                <p className="mt-5">
                When you provide us with personal information to become a learner on our site, make a
                purchase, or participate in the course, you imply that you consent to our collecting it and
                using it for that specific reason only. <br/><br/>
                If we ask for your personal information for a secondary reason, like marketing, we will
                either ask you directly for your expressed consent or provide you with an opportunity to
                say no.
                </p>
                <p className="mt-2"><b>How do I withdraw my consent?</b>
                If after you opt-in, you change your mind, you may withdraw your consent for us to
                contact you, for the continued collection, use or disclosure of your information, at any
                time, by contacting us at{" "} <a href="mailto:>support@vereda.co.in">support@vereda.co.in</a>
                </p>
                <h4><b className="text-color-dark-blue fw-bold mt-4">3. Disclosure</b></h4>
                <p className="mt-5 mb-4">
                We may disclose your personal information if we are required by law to do so or if you
                violate our Terms of Service.
                </p>
                <h4><b className="text-color-dark-blue fw-bold mt-4">4. Payment</b></h4>
                <p className="mt-5">
                If you make a purchase on our site, we use a third-party payment processor such as
                RAZORPAY or PayU. Payments are encrypted through the Payment Card Industry Data
                Security Standard (PCI-DSS). Your purchase transaction data is stored only as long as
                is necessary to complete your purchase transaction.</p>
                <p className="mt-2 mb-5">All direct payment gateways adhere to the standards set by PCI-DSS as managed by
                the PCI Security Standards Council, which is a joint effort of brands like Visa,
                MasterCard, American Express and Discover.
                PCI-DSS requirements help ensure the secure handling of credit card information by
                our site and related courses and its service providers.
                </p>
                <h4><b className="text-color-dark-blue fw-bold mt-4 mb-4"> 5. Third-Party Services</b></h4>
                <p className="mt-5">
                In general, the third-party providers used by us will only collect, use and disclose your
                information to the extent necessary to allow them to perform the services they provide
                to us.<br/><br/>
                
                However, certain third-party service providers, such as payment gateways and other
                payment transaction processors, have their own privacy policies with respect to the
                information we are required to provide to them for your purchase-related transactions.
                For these providers, we recommend that you read their privacy policies so you can
                understand the manner in which your personal information will be handled by these
                providers.<br/><br/>
                Certain providers may be located in or have facilities that are located in a different
                jurisdiction than either you or us. If you elect to proceed with a transaction that involves
                the services of a third-party service provider, then your information may become subject
                to the laws of the jurisdiction(s) in which that service provider or its facilities are locate
                </p>
              
            <p className="mt-2 mb-5"> As an example, if you are located in Canada and your transaction is processed by a
            payment gateway located in India, then your personal information used in completing
            that transaction may be subject to disclosure under INDIA legislation, including the
            Patriot Act.<br/><br/>
            Once you leave our course website or are redirected to a third-party website or
            application, you are no longer governed by this Privacy Policy or our website’s Terms of
            Service.
            <br/> <br/> <b> Links : </b>
            When you click on links on our course site, they may direct you away from our site. We
            are not responsible for the privacy practices of other sites and encourage you to read
            their privacy statements.
            </p>
            <h4><b className="text-color-dark-blue fw-bold mt-5">6. Security</b></h4>
            <p className="mt-5 mb-5">
            To protect your personal information, we take reasonable precautions and follow
            industry best practices to make sure it is not inappropriately lost, misused, accessed,
            disclosed, altered or destroyed.<br/><br/>
            If you provide us with your credit card information, the information is encrypted using
            secure socket layer technology (SSL) and stored with a AES-256 encryption. Although
            no method of transmission over the Internet or electronic storage is 100% secure, we
            follow all PCI-DSS requirements and implement additional generally accepted industry
            standards.<br/><br/>
            <b>Cookies</b><br/><br/>
            We collect cookies or similar tracking technologies. This means information that our
            website’s server transfers to your computer. This information can be used to track your
            session on our website. Cookies may also be used to customize our website content for
            you as an individual. If you are using one of the common Internet web browsers, you
            can set up your browser to either let you know when you receive a cookie or to deny
            cookie access to your computer. We use cookies to recognize your device and provide you with a personalized
            experience.<br/><br/>
            We also use cookies to attribute visits to our websites to third-party sources and to
            serve targeted ads from Google, Facebook, Instagram and other third-party vendors.
            Our third-party advertisers use cookies to track your prior visits to our websites and
            elsewhere on the Internet in order to serve you targeted ads. For more information
            about targeted or behavioural advertising, please {' '}<a href="https://www.networkadvertising.org/understanding-online-advertising">click here</a>  
            .
            <br/><br/>
            <b>Opting out:</b> You can opt-out of targeted ads served via specific third-party vendors by
            visiting the Digital Advertising Alliance’s Opt-Out page.
            We may also use automated tracking methods on our websites, in communications with
            you, and in our products and services, to measure performance and engagement.
            Please note that because there is no consistent industry understanding of how to
            respond to “Do Not Track” signals, we do not alter our data collection and usage
            practices when we detect such a signal from your browser. Web Analysis Tools
            We may use web analysis tools that are built into the Vereda.co.in website to measure
            and collect anonymous session information.
            </p>
            <h4><b className="text-color-dark-blue fw-bold mt-5 mb-2"> 7. Age of Consent</b></h4>
            <p className="mt-5 mb-5">By using this site, you represent that you are at least the age of majority in your state or
            province of residence, or that you are the age of majority in your state or province of
            residence.</p>
            <h4><b className="text-color-dark-blue fw-bold mt-5 mb-2"> 8. Changes to this Privacy Policy</b></h4>
            <p className="mt-5 mb-5">We reserve the right to modify this privacy policy at any time, so please review it
frequently. Changes and clarifications will take effect immediately upon their posting on
the website. If we make material changes to this policy, we will notify you here that it has
been updated, so that you are aware of what information we collect, how we use it, and
under what circumstances, if any, we use and/or disclose it.<br/><br/>

If our site or course is acquired or merged with another company, your information may
be transferred to the new owners so that we may continue to sell products to you</p>
<h4 className=" text-center"><b className="text-color-dark-blue fw-bold mt-5 mb-2">QUESTIONS AND CONTACT INFORMATION</b></h4>
            <p className="mt-5 mb-5">If you would like to: access, correct, amend or delete any personal information we have
about you, register a complaint, or simply want more information contact our Privacy
Compliance Officer at <a href="mailto: support@vereda.co.in"> support@vereda.co.in</a></p>
            </Container>
           </section>
           <Footer />
        </>
    )
}