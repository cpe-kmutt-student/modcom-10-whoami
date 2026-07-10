"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faVolumeHigh,
  faVolumeLow,
  faVolumeXmark,
  faPlay,
  faPause,
  faForwardStep,
  faBackwardStep,
} from "@fortawesome/free-solid-svg-icons";


const TRACK_LIST = [
  {
    title: "Lobby Time",
    artist: "Kevin MacLeod",
    src: "/music/Lobby_Time.webm",
  },
  {
    title: "Airport Lounge",
    artist: "Kevin MacLeod",
    src: "/music/Airport_Lounge.webm",
  },
];

export default function MusicPlayer() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const currentTrack = TRACK_LIST[currentTrackIndex];


  const fadeAudio = (
    startVol: number,
    endVol: number,
    duration: number,
    onComplete?: () => void,
  ) => {
    if (!audioRef.current) return;


    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);

    const stepTime = 50;
    const steps = duration / stepTime;
    const volumeChange = endVol - startVol;
    let currentStep = 0;

    audioRef.current.volume = startVol;

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      if (audioRef.current) {
        const newVol = startVol + volumeChange * progress;

        audioRef.current.volume = Math.max(0, Math.min(newVol, 1));
      }

      if (currentStep >= steps) {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        if (onComplete) onComplete();
      }
    }, stepTime);
  };


  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {

      fadeAudio(audioRef.current.volume, 0, 300, () => {
        audioRef.current?.pause();
        setIsPlaying(false);
      });
    } else {
      setIsPlaying(true);
    }
  };


  const triggerTrackChange = (direction: "next" | "prev") => {
    if (isPlaying && audioRef.current) {
      fadeAudio(audioRef.current.volume, 0, 300, () => {
        changeIndex(direction);
      });
    } else {
      changeIndex(direction);
    }
  };

  const changeIndex = (direction: "next" | "prev") => {
    setCurrentTrackIndex((prev) =>
      direction === "next"
        ? (prev + 1) % TRACK_LIST.length
        : (prev - 1 + TRACK_LIST.length) % TRACK_LIST.length,
    );
  };


  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
    if (audioRef.current) audioRef.current.volume = newVolume;
  };


  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.volume = 0;
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {

            fadeAudio(0, volume, 800);
          })
          .catch((error) => console.log("Audio play prevented:", error));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrackIndex, isPlaying]);

  const getVolumeIcon = () => {
    if (volume === 0) return faVolumeXmark;
    if (volume < 0.5) return faVolumeLow;
    return faVolumeHigh;
  };

  return (
    <div
      className=" z-[100] flex items-center justify-end"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >

      <audio
        ref={audioRef}
        src={currentTrack.src}
        onEnded={() => triggerTrackChange("next")}
      />


      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20, filter: "blur(5px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: 20, filter: "blur(5px)" }}
            transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
            className="flex items-center gap-4 bg-white/80 backdrop-blur-md border-2 border-blue-900 rounded-l-full h-12 pl-4 pr-6 shadow-[2px_2px_0px_0px_var(--color-blue-900)] mr-[-20px]"
          >

            <div className="flex items-center gap-3">
              <button
                onClick={() => triggerTrackChange("prev")}
                className="text-blue-900 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <FontAwesomeIcon icon={faBackwardStep} className="text-sm" />
              </button>

              <div className="flex flex-col items-center justify-center whitespace-nowrap min-w-[100px]">
                <span className="text-xs font-bold text-blue-900 font-mali leading-tight truncate w-full text-center">
                  {currentTrack.title}
                </span>
                <span className="text-[10px] text-blue-600 font-sans font-medium leading-tight truncate w-full text-center">
                  {currentTrack.artist}
                </span>
              </div>

              <button
                onClick={() => triggerTrackChange("next")}
                className="text-blue-900 hover:text-blue-600 transition-colors cursor-pointer"
              >
                <FontAwesomeIcon icon={faForwardStep} className="text-sm" />
              </button>
            </div>


            <div className="w-[2px] h-6 bg-blue-900/20 rounded-full"></div>


            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={getVolumeIcon()}
                className="text-xs text-blue-900"
              />
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolumeChange}
                className="w-16 h-1.5 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-quirky"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={togglePlay}
        className={`
          relative z-10 w-12 h-12 flex items-center justify-center rounded-full cursor-pointer
          backdrop-blur-md border-2 border-blue-900 transition-all duration-300
          ${
            isPlaying
              ? "bg-quirky shadow-[2px_2px_0px_0px_var(--color-blue-900)] text-blue-900"
              : "bg-white/30 text-blue-900/70 hover:bg-white/60 shadow-sm"
          }
        `}
      >
        <FontAwesomeIcon
          icon={faMusic}
          className={`text-lg ${isPlaying ? "animate-pulse" : ""}`}
        />

        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-900 rounded-full flex items-center justify-center border-2 border-blue-50">
          <FontAwesomeIcon
            icon={isPlaying ? faPause : faPlay}
            className="text-[8px] text-white"
          />
        </div>
      </motion.button>
    </div>
  );
}
