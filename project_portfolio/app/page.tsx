import { HeroSection, ProjectCollection, FooterSection } from "../app/home"

// Official database
const websiteProj = {
  "Pizza Walk Gaem Wesbite": {
    pics: [
      "https://i.imgur.com/uu6PbEr.png",
      "https://i.imgur.com/3GvY8be.png",
      "https://i.imgur.com/XBeb4Eh.png"
    ],
    vids: [
      "https://youtu.be/gMXNWUDh4zU"
    ],
    desc: "This is a website I made for my game in Roblox and yes GAEM is mispelled intentionally. It is a simple website that shows the real in game leader boards of my game. This website aims to promote my game and is successful garnering 5k+ visits into the game.",
    link: "https://denzelbathspa.github.io/WebDevFuture1/"
  },
  "Terrarialy Website": {
    pics: [
      "https://i.imgur.com/0epg0d9.png",
      "https://i.imgur.com/ZqjQnVC.png"
    ],
    vids: [ ],
    desc: "This website was made under a time pressure of 8hrs. It was a little challenge from Bathspa University. This is a website about terrariums. It shows how to care about terrariums or what terrariums is all about.",
    link: "https://denzelbathspa.github.io/Menioria---SA2/"
  },
  "Gaming Central Website": {
    pics: [
      "https://i.imgur.com/Af1mY1D.png",
      "https://i.imgur.com/Z2FT3uE.png",
      "https://i.imgur.com/8R9hBfi.png",
      "https://i.imgur.com/QtuBwDI.png",
      "https://i.imgur.com/dGfUxaA.png"
    ],
    vids: [ ],
    desc: "My first successful website was all about games. It is only a front-end working website where I first used  HTML, CSS, and Java in combination with each other. Background is interactable.",
    link: "https://denzelbathspa.github.io/GamingCentral/"
  },
}

const videoProj = {
  "Beautiful Video Creations": {
    pics: [ ],
    vids: [
      "https://www.youtube.com/watch?v=zUHCrEuyyac",
      "https://www.youtube.com/watch?v=7fJWNO9vjdk",
      "https://youtu.be/GLwAYQ6dz74",
      "https://www.youtube.com/watch?v=f5VEzTz0GIQ",
      "https://www.youtube.com/watch?v=rdegI9PPixc",
      "https://www.youtube.com/watch?v=OEfaP-GfEqg",
      "https://www.youtube.com/watch?v=wubuHSBhoS4",
      "https://www.youtube.com/watch?v=SmuZE8R-XCc"
    ],
    desc: "All Videos are edited using Davinci Resolve. I have a lot of experience editing videos and mostly do it for fun or for quick cash by free lancing.",
    link: "https://docs.google.com/document/d/1mchGwm-tkcQ_6hPrSgCRMSiemgQ4Vx4K5BAGPLRLmaw/edit?tab=t.0"
  },
}

const gamePoj = {
  "Light To Survive": {
    pics: [
      "https://img.itch.zone/aW1hZ2UvMzIzNDM1OS8xOTMzMTEyMS5wbmc=/347x500/hzXR9k.png",
      "https://img.itch.zone/aW1hZ2UvMzIzNDM1OS8xOTMzMTEyNC5wbmc=/347x500/4n%2F5wV.png",
      "https://img.itch.zone/aW1hZ2UvMzIzNDM1OS8xOTMzMTEyNy5wbmc=/347x500/BME%2Ft7.png"
    ],
    vids: [
      "https://youtu.be/f5VEzTz0GIQ"
    ],
    desc: "This is a 2d school project I worked on using Unity for my game development final project. It features shaders and an infinite leveling syem to level yourself up. Stamina is regenerated differently so you have to be careful!",
    link: "https://gin2q.itch.io/light-the-torches"
  },
  "pizza walk gaem": {
    pics: [
      "https://tr.rbxcdn.com/180DAY-f25f889e72a7f260b713fd34d1b90fdc/768/432/Image/Webp/noFilter"
    ],
    vids: [ ],
    desc: "This is the game I used to collect the leaderboards data for my website mentioned at the top. It is a simple AFK walking game that has had 5k visits.",
    link: "https://www.roblox.com/games/110035627916808/pizza-walk-gaem"
  },
}

export default function Home() {
  return (
    <main>
      {/* Place all components Here*/}
      <HeroSection />
      <ProjectCollection ProjectData={websiteProj} bg_color={"#1A1A1A"} h1Text="Website Projects" />
      <ProjectCollection ProjectData={videoProj} bg_color={"#122611"} h1Text="Video Projects" />
      <ProjectCollection ProjectData={gamePoj} bg_color={"#31511E"} h1Text="Game Projects" />
      <FooterSection />
    </main>
  );
}
