'use client'
import React, {FC, useState} from "react";
import Heading from "./utils/Heading";
import Header from "./components/Header";
import Hero from "./components/Route/Hero";
import Footer from './components/Footer';

interface Props {}

const Page: FC<Props> = (props) => {
  const [open,setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const [route,setRoute] = useState("Login")

  return (
    <div suppressHydrationWarning>
      <Heading title="E-Learning" description="E-Learning is a platform for students" keywords="Programming, MERN, Redux, Machine Learning" />
      <Header
        open={open} 
        setOpen={setOpen} 
        activeItem={activeItem} 
        setRoute={setRoute} 
        route={route}
      />
      <Hero/>
      <Footer />
    </div>
  )
};

export default Page;