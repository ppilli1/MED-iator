import md from "../assets/md.jpeg"
import or from "../assets/or.jpeg"
import bg1 from "../assets/bg-1.jpg"
import bg2 from "../assets/bg-2.jpg"

export const navigation = [
    {
      id: "0",
      title: "Dashboard",
      url: "dashboard"
    },
    {
      id: "1",
      title: "Medications/Diagnosis",
      url: "MD",
    },
    {
      id: "2",
      title: "Operation Room",
      url: "OR",
    },
  ];

  export const NAVIGATION_LINKS = [
    { label: "Dashboard", href: "" },
    { label: "Medications/Diagnosis", href: "MD" },
    { label: "Operation Room", href: "OR" },
  ];

  export const NAVIGATION_LINK = [
    { label: "Patient Game", href: "PG"}
  ]

  export const PROJECT1 = [
    {
      id: 1,
      name: "Medications/Diagnosis",
      description:
        "An AI-generative tool that listens to doctor-patient conversations to review medications, give feedback for patient-condition diagnosis, and even asks the doctor some clarifying questions to confirm the symptoms and decisions made during the converstion.",
      image: bg1,
      imageClassName: "h-[600px] w-[400px] object-cover transition-transform duration-300 group-hover:scale-110 overflow-hidden hover:shadow-2xl",
      githubLink: "http://localhost:5175/#MD",
      buttonClassName: "relative flex items-center justify-center px-0 rounded-full 2xl:h-[60px] 2xl:w-[216px] xl:h-[40px] xl:w-[144px] lg:h-[50px] lg:w-[180px] md:h-[40px] md:w-[144px] sm:h-[50px] sm:w-[180px] xs:h-[45px] xs:w-[162px] h-[40px] w-[144px] bg-white border border-blue-400 text-blue-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-blue-400 hover:before:w-2/4 hover:before:bg-blue-400 hover:after:w-2/4 hover:after:bg-blue-400 overflow-hidden"
    },
  ]

  export const PROJECT2 = [
    {
      id: 1,
      name: "Operation Room",
      description:
        "An AI-generative tool that listens onto surgeons' conversations during an operation in the OR, where a mediator can communicate with a chatbot that actively displays key decisions made during the operation and highlights actionable errors that warrant reconsideration.",
      image: bg2,
      imageClassName: "h-[600px] w-[400px] object-cover transition-transform duration-300 group-hover:scale-110",
      githubLink: "http://localhost:5175/#OR",
      buttonClassName: "relative flex items-center justify-center px-0 rounded-full 2xl:h-[60px] 2xl:w-[216px] xl:h-[40px] xl:w-[144px] lg:h-[50px] lg:w-[180px] md:h-[40px] md:w-[144px] sm:h-[50px] sm:w-[180px] xs:h-[45px] xs:w-[162px] h-[40px] w-[144px] bg-white border border-rose-400 text-rose-400 shadow-2xl transition-all before:absolute before:left-0 before:top-0 before:h-full before:w-0 before:duration-500 after:absolute after:right-0 after:top-0 after:h-full after:w-0 after:duration-500 hover:text-white hover:shadow-rose-400 hover:before:w-2/4 hover:before:bg-rose-400 hover:after:w-2/4 hover:after:bg-rose-400 overflow-hidden",
    },
  ]