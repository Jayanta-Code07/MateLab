
import Hero from "../assets/HomeAssets/Hero.webm"
import "../HomeStyle/LeftHero.css"

export default function TopLeftCompo() {
    return (
        <video
            src={Hero}
            autoPlay
            muted
            loop
            playsInline
            className="Hero-video"
        />
    )
}