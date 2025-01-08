// Import libraries
import React, { useRef } from "react";
import { useState } from "react";
import Button from "./Button.jsx";
import {TiLocationArrow} from "react-icons/ti";
import {useGSAP} from "@gsap/react";
import gsap from "gsap";

// Main function
const Hero = () => {
  // use-state Function
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [loadedVideos, setLoadedVideos] = useState(0)

  //
  const totalVideos  = 3;
  const nextVdRef = useRef(null)
//upcoming index is used for
  const upcomingVideoIndex = ((currentIndex % totalVideos)+1)

  const handleMiniVdClick = () => {
    setHasClicked(true)
    setCurrentIndex(upcomingVideoIndex)
  }

//
  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1)
  }

  useGSAP( () => {
    if (hasClicked){gsap.set("#next-video", {visibility:'visible'});
    gsap.to('#next-video', {transformOrigin:'center center',
      scale: 1,
      width: '100%',
      height: '100%',
      duration: 1,
      ease: 'power1.inOut',
      onStart: () => nextVdRef.current.play()
    });
    gsap.from('#currentVideo', {transformOrigin:'center center',
    scale: 0,
    duration: 1.5,
      ease: 'power1.inOut',

    });

    }
  }, {dependencies: [currentIndex], revertOnUpdate: true})

 useGSAP( () =>{
   gsap.set("#video-frame",
       { clipPath:'polygon(14% 0%, 72% 0%, 90% 90%, 0% 100%)',
            borderRadius:'0 0 40% 10%'
       });
  gsap.from('#video-frame', {clipPath:'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
  borderRadius:'0 0 0 0',
  ease: 'power1.inOut',
  })
     })

  // Function To call Videos
  const getVideoSrc = (index) => `videos/hero-${index}.mp4`

  // Main Render component
  return (
      <div className="relative h-dvh w-screen overflow-x-hidden">
        <div
            id="video-frame"
            className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
        >
          <div>
            <div
                className="mask-path-clip absolute absolute-center z-50 size-64 cursor-pointer overflow-hidden rounded-lg">
              {/*Next Video Tile*/}
              <div onClick={handleMiniVdClick}
                   className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100">
                <video
                    ref={nextVdRef}
                    src={getVideoSrc(upcomingVideoIndex)}
                    loop={true}
                    muted={true}
                    id="current-video"
                    className="size-64 origin-center scale-150 object-cover object-center"
                    onLoadedData={handleVideoLoad}
                />
              </div>
            </div>
            <video
                ref={nextVdRef}
                src={getVideoSrc(currentIndex)}
                muted
                loop={true}
                id="next-video"
                className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
                onLoadedData={handleVideoLoad}
            />
            <video
                src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
                // autoPlay={true}
                muted
                className="absolute left-0 top-0 size-full object-cover object-center"
                onLoadedData={handleVideoLoad}
            />
          </div>
          <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75 ">
            G<b>a</b>ming
          </h1>

          <div className="absolute left-0 top-0 z-40 size-full">
            <div className="mt-24 px-5 sm:px-10 ">
              <h1 className="special-font hero-heading text-blue-100">redefi<b>n</b>e</h1>
              <p className="mb-5 max-w-64 font-robert-regular text-blue-100">Enter the Metagame layer <br/>Unleash the
                Play Economy </p>

              <Button id="watch-trailer" title="Watch Trailer" leftIcon={<TiLocationArrow/>}
                      containerClass="bg-yellow-300 flex-center gap-1 "/>
            </div>
          </div>
        </div>
        <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black ">
          G<b>a</b>ming
        </h1>
      </div>
  );
};

export default Hero;