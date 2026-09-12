
import Box from "@mui/material/Box"
import LeftHero from "./LeftHero"
import RightHero from "./RightHero"
import "../HomeStyle/Body.css"
import TopLeftCompo from "./TopLeftCompo"
import TopRightCompo from "./TopRightCompo"
import LessonRightCompo from "./LessonRightCompo"
import LearnIconStatic from "../assets/HomeAssets/learnIcon.png"
import BotIcon from "../assets/HomeAssets/Bot_Hero.jpg"
import LessonImg from "../assets/HomeAssets/Lesson_Hero.webp"
import BotBtn from "../assets/HomeAssets/Bot_Icon.png"
import PuzzelHero from "../assets/HomeAssets/Puzzel_Hero.png"
import PuzzelBtn from "../assets/HomeAssets/StPuzzel.png"
import Typography from "@mui/material/Typography"
import StartButton from "./StartButton";
import Footer from "./Footer"

export default function Body(){

    const HeroText=[
        "Your moves. Your strategy.",
        "Your victory!",
        "Master every move and be-",
        "come the player you were meant to be."
    ]

    const LessonText=[
        "Learn Chess,",
        "One Move at a Time",
        "Master the fundamentals, sharpen your strategy, and be-",
        "come a stronger player with guided lessons."
    ]

    const BotText=[
        "Play Against the Bots",
        "",
        "Challenge intelligent chess bots, sharpen your strategy,",
        "and test your skills against opponents of every level."
    ]

    const PuzzelText=[
        "Sharpen Your Chess Skills",
        "with Challenging Tactical Puzzles",
        "Solve carefully crafted puzzles, discover brilliant moves,",
        "and improve your game one challenge at a time."
    ]

    return (
        <Box className="home-page-body">

            <Box className="hero-section" >
                <LeftHero Compo={<TopLeftCompo/>} />
                <RightHero Compo={<TopRightCompo Text={HeroText} other={false} btnName={"Get Started"} stIcon={null} />} />
            </Box>
            <Box className="hero-section" >
                <LeftHero Compo={<TopRightCompo Text={LessonText} other={true} btnName={"Start Lesson"} stIcon={LearnIconStatic} />} />
                <RightHero Compo={<LessonRightCompo imeg={LessonImg} />} />
            </Box>
            <Box className="hero-section" >
                <LeftHero Compo={<LessonRightCompo imeg={BotIcon} />} />
                <RightHero Compo={<TopRightCompo Text={BotText} other={true} btnName={"Challenge our Ai"} stIcon={BotBtn} />} />
            </Box>
            <Box className="hero-section" >
                <LeftHero Compo={<TopRightCompo Text={PuzzelText} other={true} btnName={"Solve Puzzels"} stIcon={PuzzelBtn} />} />
                <RightHero Compo={<LessonRightCompo imeg={PuzzelHero} />} />
            </Box>

            <Box sx={{ display:"flex", justifyContent:"center" }} >
            <Box className="Hero-Footer" >
                <Typography className="Hero-Text-Primary" >Learn, Play, and Have Fun!</Typography>
                <StartButton />
            </Box>
            </Box>
            <Footer />
        </Box>
    )
}