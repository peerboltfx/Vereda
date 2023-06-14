import { Component, Fragment } from "react";
import Footer from "../Components/layout/footer";
import Header from "../Components/layout/header";
import About from "../Components/section/about";
 import Achievement from "../Components/section/achievement";
import Banner from "../Components/section/banner";
// import Blog from "../Components/section/blog";
// import Category from "../Components/section/category";
import Course from "../Components/section/course";
import Instructor from "../Components/section/instructor";
import Sponsor from "../Components/section/sponsor";
// import Student from "../Components/section/student";
import Featured from "@/Components/Featured";
import { Mentor } from "@/Components/mentor";
import { Head, usePage } from "@inertiajs/inertia-react";
import '@/assets/css/icofont.min.css';
import '@/assets/css/animate.css';
import '@/assets/css/style.min.css';
import "../../css/style.css";


const Home = () => {
    const {flash, programs, flutter, fullstack}= usePage().props;

    if(flash.data){
        window.sessionStorage.setItem("name",flash.data.name);
        window.sessionStorage.setItem("referral",flash.data.referral);
    }
    return (
        <Fragment>
            <Head title="Welcome">
                <meta name="description" content="welcome to Vereda.co.in, one of the leading digital learning in India." />
                
                    {/* <!-- OG Meta Tags to improve the way the post looks when you share the page on LinkedIn, Facebook, Google+ --> */}
                    <meta property="og:Vereda.co.in" content="https://vereda.co.in" />{/**<!-- website link --> */}
                    <meta property="og:title" content="Vereda DIgital Technologies"/>{/** <!-- title shown in the actual shared post --> */}
                    <meta property="og:description" content="Kickstart your career in application development." />{/** <!-- description shown in the actual shared post -->*/}
                    <meta property="og:image" content="../Images/banner.jpg"/>{/** <!-- image link, make sure it's jpg -->*/}
                    <meta property="og:url" content="https://vereda.co.in" />{/** <!-- where do you want your post to link to -->*/}
                    <meta property="og:type" content="article" />
                    <meta name="robots" content="index,follow" />
	                <meta name="google" content="sitelinkssearchbox" />
                    <meta property="url" content="https://vereda.co.in" />
            </Head>
            <Header />
            <Banner />
            {/* <Category /> */}
            <Course />
            <About />
            <Featured />
            <Instructor />
            <Mentor />
            {/* <Blog /> */}
            <Achievement />
            <Footer />
        </Fragment>
    );
}
 
export default Home;