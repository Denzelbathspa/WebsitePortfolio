"use client"; // Dumb thingy where it needs to be client side to work

import { useState, useEffect } from "react";
import Header from "./header";
import styles from "./style.module.css";
import Link from "next/link";

// ================ Hero Section ================ //
const imageUrl = [
  "https://images.pexels.com/photos/4487522/pexels-photo-4487522.jpeg",
  "https://images.pexels.com/photos/18724703/pexels-photo-18724703/free-photo-of-cloud-in-deep-green-forest.jpeg",
  "https://freerangestock.com/sample/132318/sunset-behind-green-tree-branches.jpg"
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);

      // Change image halfway through animation
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % imageUrl.length);
      }, 500);

      // End animation
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
      
    }, 5000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div 
      className={`${styles.SectionHero} ${isAnimating ? styles.darken : ''}`}
      style={{ 
        backgroundImage: `
          linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
          url(${imageUrl[currentIndex]})
        `,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      {/* Overlay div that handles the darkening effect */}
      <div className={`${styles.overlay} ${isAnimating ? styles.darkenOverlay : ''}`} />
      
      <Header />
      
      <div className={styles.HeroTextParent}>
        <h1 className={styles.heroH1}>IDEAS PROTOTYPED. PRODUCTS SHIPPED.</h1>
      </div>
    </div>
  );
}

// ================ About Me Section ================ //
// ================ Top Works ================ //
const placeHolder = "https://static.vecteezy.com/system/resources/thumbnails/048/910/778/small/default-image-missing-placeholder-free-vector.jpg";
const placeHolder2 = "https://thumbs.dreamstime.com/b/placeholder-chalk-white-icon-black-background-image-gallery-photo-thumbnail-available-album-digital-media-multimedia-file-187147243.jpg";
const placeHolder3 = "https://thumbs.dreamstime.com/b/creative-illustration-default-avatar-profile-placeholder-isolated-background-art-design-grey-photo-blank-template-mockup-144857620.jpg";

export function BestWorks()
{
    return(
      <div className={styles.BestWorksParent}>
        <h1>Works that may interest you!</h1>
        <div className={styles.ProjectHolders}>
            <Link href="#"><img src={placeHolder} alt="1"></img></Link>
            <Link href="#"><img src={placeHolder} alt="2"></img></Link>
            <Link href="#"><img src={placeHolder} alt="3"></img></Link>
            <Link href="#"><img src={placeHolder} alt="4"></img></Link>
            <Link href="#"><img src={placeHolder} alt="5"></img></Link>
            <Link href="#"><img src={placeHolder} alt="6"></img></Link>
        </div>
      </div>
    )
}

// ================ Projects Collection ================ //
// Test Variables:
const test_proj = {
  "Weather App": {
    pics: [
      placeHolder,
      placeHolder2,
      placeHolder3
    ],
    desc: "Lorem Ipsum  iuewqgiuy fwgfiy eqgwif gweyifg iywvf huidv  uiybwediuhy",
    link: "https://docs.google.com/document/d/1mchGwm-tkcQ_6hPrSgCRMSiemgQ4Vx4K5BAGPLRLmaw/edit?tab=t.0"
  },
  "Roblox App": {
    pics: [
      placeHolder,
      placeHolder2,
      placeHolder3
    ],
    desc: "IDK I FEEL LIKE ROBLOX",
    link: "https://docs.google.com/document/d/1mchGwm-tkcQ_6hPrSgCRMSiemgQ4Vx4K5BAGPLRLmaw/edit?tab=t.0"
  },
  "MINECRAFT APP": {
    pics: [
      placeHolder,
      placeHolder2,
      placeHolder3
    ],
    desc: "Minecraft is a very fun childhood game",
    link: "https://docs.google.com/document/d/1mchGwm-tkcQ_6hPrSgCRMSiemgQ4Vx4K5BAGPLRLmaw/edit?tab=t.0"
  },
}

export function ProjectCollection({ ProjectData, SectionNum }) {
  return (
    <div className={styles.ProjectCollectionParent}>
      {Object.entries(test_proj).map(([projectName, projectData]) => (
        <div key={projectName} className={styles.projectCard}>
          {/* Project Text Description */}
          <div className={styles.projectText}>
            <h1 className={styles.projectTitle}>{projectName}</h1>
            <p className={styles.projectDesc}>{projectData.desc}</p>
            <a href={projectData.link} className={styles.projectLink}>View Project</a>
          </div>
          
          {/* Project Gallery */}
          <div className={styles.PictureGallery}>
            {projectData.pics.map((picUrl, index) => (
              <img 
                id={`${projectName}_${index + 1}`}
                key={index}
                src={picUrl}
                alt={`${projectName} screenshot ${index + 1}`}
                className={styles.projectImage}
              />
            ))}
          </div>
          {/* Picture Gallery Nav */}
          <div className={styles.GallerySliderNav}>
            {projectData.pics.map((picUrl, index) => (
              <a 
                key={index}
                href={`#${projectName}_${index + 1}`}
                className={styles.navDot}
              ></a>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default { HeroSection, BestWorks, ProjectCollection }