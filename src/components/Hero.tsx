import React from 'react';
import heroGym from '../assets/figma/hero-gym.png';
import heroCap from '../assets/figma/hero-cap.png';
import heroCenter from '../assets/figma/hero-center.png';
import heroDoor from '../assets/figma/hero-door.png';
import heroBgNoise from '../assets/figma/hero-bg-noise.png';

export const Hero: React.FC = () => {
  return (
    <section className="hero-wrapper" aria-label="Locomotive Drop Hero">
      <div 
        className="hero-container hero-static" 
        data-node-id="4:123"
        style={{ backgroundImage: `url(${heroBgNoise})`, backgroundSize: 'cover' }}
      >
        {/* Authentic Figma film grain / noise overlay */}
        <div className="hero-noise-texture" />

        {/* 1. Left Photo: Two people in gym / basketball court */}
        <div 
          className="hero-photo hero-photo-gym" 
          data-node-id="4:6" 
          data-name="image 2"
        >
          <img 
            src={heroGym} 
            alt="Moth Streetwear Basketball Gym Editorial" 
            loading="eager"
          />
        </div>

        {/* 2. Left-Bottom Photo: Girl from behind in tan cap */}
        <div 
          className="hero-photo hero-photo-cap" 
          data-node-id="4:12" 
          data-name="image 4"
        >
          <img 
            src={heroCap} 
            alt="Moth Pros de l'internet Hat Profile" 
            loading="eager"
          />
        </div>

        {/* 3. Center Photo: Guy in olive green jacket and blue beanie with Locomotive tote */}
        <div 
          className="hero-photo hero-photo-center" 
          data-node-id="4:9" 
          data-name="image 3"
        >
          <img 
            src={heroCenter} 
            alt="Moth Locomotive Tote Bag Editorial" 
            loading="eager"
          />
        </div>

        {/* 4. Right Photo: Person opening door with static Figma pixel stretch effect */}
        <div 
          className="hero-photo hero-photo-door" 
          data-node-id="4:130" 
          data-name="image 6"
        >
          <img 
            src={heroDoor} 
            alt="Moth Locomotive T-Shirt with Figma Pixel Stretch" 
            loading="eager"
          />
        </div>

        {/* Centered Editorial Serif Overlay Typography (Static) */}
        <div className="hero-text-overlay" data-node-id="5:252">
          <h1 className="hero-title-top">Locomotive ®</h1>
          <h2 className="hero-title-bottom">drop</h2>
        </div>
      </div>
    </section>
  );
};
