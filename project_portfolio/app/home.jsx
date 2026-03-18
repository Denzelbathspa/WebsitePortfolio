"use client"; // Dumb thingy where it needs to be client side to work

import { useState, useEffect, useRef } from "react";
import Header from "./header";
import styles from "./style.module.css";

// ================ Hero Section ================ //
const imageUrl = [
  "https://images.pexels.com/photos/4487522/pexels-photo-4487522.jpeg",
  "https://images.pexels.com/photos/18724703/pexels-photo-18724703/free-photo-of-cloud-in-deep-green-forest.jpeg",
  "https://freerangestock.com/sample/132318/sunset-behind-green-tree-branches.jpg"
];

export function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [textVisible, setTextVisible] = useState(false);
  const heroText = "IDEAS PROTOTYPED. PRODUCTS SHIPPED."
  const textParts = heroText.split('')

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

  // Trigger text animation on mount
  useEffect(() => {
    setTextVisible(true);
  }, []);

  return (
    <div
      id="hero"
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
        <div className={styles.charContainer}>
          {textParts.map((char, index) => (
            <span
              key={index}
              className={`${styles.char} ${textVisible ? styles.charVisible : ''}`}
              style={{ 
                animationDelay: `${index * 0.05}s`,
                transform: textVisible ? 'translateY(0)' : 'translateY(-20px)'
              }}
            >
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ================ About Me Section ================ //
const placeHolder = "https://static.vecteezy.com/system/resources/thumbnails/048/910/778/small/default-image-missing-placeholder-free-vector.jpg";

// ================ Projects Collection ================ //
export function ProjectCollection({ ProjectData, bg_color, h1Text }) {
  const projList = Object.keys(ProjectData)
  const projectCount = projList.length;
  const [slide, setSlide] = useState(projList[0]+"|0");
  const groupRef = useRef(null);
  const gradientRef = useRef(null);
  const [isPulsing, setIsPulsing] = useState({ left: false, right: false });
  const [descVisible, setDescVisible] = useState({}); // Track which descriptions are visible

  // Mouse Tracking Gradient
  useEffect(() => {
    const element = gradientRef.current;
    if (!element) return;

    const handleMouseMove = (e) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      element.style.setProperty('--x', x + 'px');
      element.style.setProperty('--y', y + 'px');
    };

    element.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Trigger description animation when project becomes visible
  useEffect(() => {
    if (!groupRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectName = entry.target.getAttribute('data-project');
            if (projectName) {
              setDescVisible(prev => ({ ...prev, [projectName]: true }));
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    const cards = groupRef.current.children;
    Array.from(cards).forEach(card => {
      observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const handleSlide = (direction) => {
    // Don't slide if only one project
    if (projectCount <= 1) return;
    
    let newIndex;
    const parts = slide.split("|");
    let index = parseInt(parts[1]);
    
    if (direction == "right") {
      newIndex = (index + 1) % projList.length;
    } else if (direction == "left") {
      newIndex = (index - 1 + projList.length) % projList.length;
    }
    
    const nextSlide = "#"+projList[newIndex] + "|" + newIndex;
    setSlide(nextSlide);
    
    // Scroll the container to the new project
    if (groupRef.current) {
      const cardWidth = groupRef.current.children[0]?.offsetWidth || window.innerWidth;
      groupRef.current.scrollTo({
        left: newIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  }
  
  // Scroll to first project on mount
  useEffect(() => {
    if (groupRef.current) {
      const cardWidth = groupRef.current.children[0]?.offsetWidth || window.innerWidth;
      groupRef.current.scrollTo({
        left: 0,
        behavior: 'auto'
      });
    }
  }, []);
  
  // Helper function to extract YouTube video ID
  const getYouTubeEmbedUrl = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) 
      ? `https://www.youtube.com/embed/${match[2]}` 
      : null;
  };

  // Random pulse animation for INDICATORS (not buttons) - ONLY if more than 1 project
  useEffect(() => {
    // Don't run pulse animation if only one project
    if (projectCount <= 1) return;
    
    const triggerRandomPulse = () => {
      // Randomly choose left or right indicator
      const indicator = Math.random() > 0.5 ? 'left' : 'right';
      
      // Trigger the pulse on indicator
      setIsPulsing(prev => ({ ...prev, [indicator]: true }));
      
      // Turn off after animation completes (1 second)
      setTimeout(() => {
        setIsPulsing(prev => ({ ...prev, [indicator]: false }));
      }, 1000);
      
      // Schedule next random pulse (between 3-5 seconds)
      const nextDelay = Math.random() * 2000 + 3000; // 3000-5000ms
      setTimeout(triggerRandomPulse, nextDelay);
    };
    
    // Start the first random pulse
    const initialDelay = Math.random() * 2000 + 3000;
    const timer = setTimeout(triggerRandomPulse, initialDelay);
    
    return () => clearTimeout(timer);
  }, [projectCount]);
  
  return (
    <div 
      id="projects"
      ref={gradientRef} 
      className={`${styles.ProjectCollectionParent} ${styles.MouseGradientTracking}`}
      style={{ backgroundColor: bg_color }}
    >
      {/* Left and Right buttons - ONLY SHOW IF MORE THAN 1 PROJECT */}
      {projectCount > 1 && (
        <>
          <a 
            onClick={() => handleSlide("left")} 
            className={styles.leftButton}
          ></a>
          <a 
            onClick={() => handleSlide("right")} 
            className={styles.rightButton}
          ></a>
        </>
      )}
      
      {/* Indicators with pulsing effect - ONLY SHOW IF MORE THAN 1 PROJECT */}
      {projectCount > 1 && (
        <>
          <h1 
            className={`${styles.indicatorLeft} ${isPulsing.left ? styles.indicatorPulse : ''}`}
          >
            {"<"}
          </h1>
          <h1 
            className={`${styles.indicatorRight} ${isPulsing.right ? styles.indicatorPulse : ''}`}
          >
            {">"}
          </h1>
        </>
      )}
      
      <div className={styles.group} ref={groupRef}>
        {Object.entries(ProjectData).map(([projectName, projectData]) => {
          // Combine pics and vids into a single media array with type identifiers
          const mediaItems = [
            ...projectData.pics.map((url, idx) => ({ 
              type: 'image', 
              url, 
              id: `${projectName}_pic_${idx}` 
            })),
            ...projectData.vids.map((url, idx) => ({ 
              type: 'video', 
              url, 
              id: `${projectName}_vid_${idx}`,
              embedUrl: getYouTubeEmbedUrl(url)
            }))
          ];

          // Split description into characters
          const descChars = projectData.desc.split('');

          return (
            <div 
              key={projectName} 
              className={styles.projectCard}
              data-project={projectName}
              style={{ 
                display: 'flex',
                flexDirection: (h1Text == "Video Projects") ? 'row-reverse' : 'row'
              }}
            >
              {/* Project Text Description */}
              <div className={styles.projectTextCard}>
                <h1 className={styles.projectTitle}><b>{projectName}</b></h1>
                
                {/* Animated Description */}
                <div className={styles.descContainer}>
                  {descChars.map((char, idx) => (
                    <span
                      key={idx}
                      className={`${styles.descChar} ${descVisible[projectName] ? styles.descCharVisible : ''}`}
                      style={{ animationDelay: `${idx * 0.02}s` }}
                    >
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                </div>
                
                <a href={projectData.link} className={styles.projectLink}>View Project</a>
              </div>
              
              {/* Project Gallery with mixed media */}
              <div className={styles.PictureGallery}>
                {mediaItems.map((item, index) => (
                  <div 
                    key={item.id} 
                    className={styles.mediaItem}
                    id={`${projectName}_media_${index}`}
                  >
                    {item.type === 'image' ? (
                      <img 
                        src={item.url}
                        alt={`${projectName} screenshot ${index + 1}`}
                        className={styles.projectImage}
                      />
                    ) : (
                      <iframe
                        src={item.embedUrl}
                        title={`${projectName} video ${index + 1}`}
                        className={styles.projectVideo}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    )}
                  </div>
                ))}

                {/* Picture Gallery Nav (now for all media items) */}
                <div className={styles.GallerySliderNav}>
                  {mediaItems.map((item, index) => (
                    <a 
                      key={item.id}
                      href={`#${projectName}_media_${index}`}
                      className={`${styles.navDot} ${item.type === 'video' ? styles.videoDot : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        
                        // Find ONLY the PictureGallery inside this project card
                        const gallery = e.currentTarget.closest(`.${styles.projectCard}`)?.querySelector(`.${styles.PictureGallery}`);
                        
                        if (gallery) {
                          const cardWidth = gallery.clientWidth;
                          gallery.scrollTo({
                            left: index * cardWidth,
                            behavior: 'smooth'
                          });
                        }
                      }}
                    ></a>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function FooterSection()
{
  return(
    <div className={styles.footerParent}>
      <h1>Project Portfolio by Denzel Lorenz M. Menioria</h1>
    </div>
  )
}

export default { HeroSection, ProjectCollection, FooterSection }