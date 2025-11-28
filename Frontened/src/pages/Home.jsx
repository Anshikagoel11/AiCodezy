
import Hero from "../components/hero"
import FeaturesSection from "../components/features"
import AlgorithmVisualizationGrid from "../components/dsaVisualize"
import Footer from "../components/footer"
import { useRef } from "react"

export default function Home(){
  const sectionRef =  useRef(null)
  return(
    <>
    <Hero sectionRef={sectionRef}/>
    <FeaturesSection/>
    <AlgorithmVisualizationGrid  sectionRef={sectionRef}/>
    <Footer/>
    </>   
  )
}