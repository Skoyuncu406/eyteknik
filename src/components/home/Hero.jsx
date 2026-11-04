
"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

const SLIDE_DURATION = 6000;

const slides = [
  {
    id: 1,
    image: "/images/hero/hero-01-led.png",
    eyebrow: "LED AYDINLATMA SİSTEMLERİ",
    title: "Mekânlara değer katan",
    highlight: "aydınlatma çözümleri.",
    description:
      "Mimari ve endüstriyel projeler için estetik, fonksiyonel ve yenilikçi LED aydınlatma sistemleri.",
  },
  {
    id: 2,
    image: "/images/hero/hero-02-metal.png",
    eyebrow: "DEKORATİF METAL ÇÖZÜMLERİ",
    title: "Metale şekil veren",
    highlight: "mühendislik anlayışı.",
    description:
      "Mimari tasarımlara karakter kazandıran, projeye özel dekoratif metal üretim çözümleri.",
  },
  {
    id: 3,
    image: "/images/hero/hero-03-panels.png",
    eyebrow: "ENDÜSTRİYEL SİSTEMLER",
    title: "Güvenilir altyapılar için",
    highlight: "güçlü teknik çözümler.",
    description:
      "Elektrik panoları, rack kabinetler ve endüstriyel sistemlerde kalite odaklı üretim.",
  },
];

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [progress, setProgress] = useState(0);

  const elapsedRef = useRef(0);
  const lastFrameRef = useRef(null);
  const frameRef = useRef(null);

  // REDUCED MOTION
  useEffect(() => {
    const media = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => {
      setReducedMotion(media.matches);
    };

    update();

    media.addEventListener("change", update);

    return () => {
      media.removeEventListener("change", update);
    };
  }, []);

  // RESET PROGRESS WHEN SLIDE CHANGES
  useEffect(() => {
    elapsedRef.current = 0;
    lastFrameRef.current = null;
    setProgress(0);
  }, [activeIndex]);

  // SLIDER TIMER + PROGRESS
  useEffect(() => {
    if (paused || reducedMotion) {
      lastFrameRef.current = null;
      return;
    }

    const animate = (timestamp) => {
      if (lastFrameRef.current !== null) {
        const delta = Math.min(
          timestamp - lastFrameRef.current,
          100
        );

        elapsedRef.current += delta;
      }

      lastFrameRef.current = timestamp;

      if (elapsedRef.current >= SLIDE_DURATION) {
        elapsedRef.current = 0;
        lastFrameRef.current = null;

        setProgress(0);

        setActiveIndex(
          (current) => (current + 1) % slides.length
        );

        return;
      }

      setProgress(
        (elapsedRef.current / SLIDE_DURATION) * 100
      );

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }

      lastFrameRef.current = null;
    };
  }, [activeIndex, paused, reducedMotion]);

  const goToSlide = (index) => {
    if (index === activeIndex) return;

    elapsedRef.current = 0;
    lastFrameRef.current = null;
    setProgress(0);

    setActiveIndex(
      (index + slides.length) % slides.length
    );
  };

  const activeSlide = slides[activeIndex];

  return (
<section
  id="anasayfa"
  aria-label="EY Teknik Metal tanıtım slider"
  aria-roledescription="carousel"
  className="relative isolate flex min-h-[680px] w-full min-w-0 flex-col overflow-hidden bg-[#202326] text-white max-md:min-h-[640px]"
  style={{ minHeight: "100svh" }}
>
      {/* ======================================
          BACKGROUND IMAGES
      ====================================== */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            aria-hidden="true"
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeIndex
                ? "opacity-100"
                : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              quality={90}
              className="object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* ======================================
          DARK OVERLAY
      ====================================== */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-[#101416]/85 via-[#101416]/55 to-[#101416]/20 max-md:bg-gradient-to-t max-md:from-[#101416]/90 max-md:via-[#101416]/60 max-md:to-[#101416]/25" />

      {/* ======================================
          MAIN CONTENT
      ====================================== */}
      <div className="container-premium relative z-20 flex w-full flex-1 flex-col justify-center pt-[150px] pb-[150px] max-md:pt-[130px] max-md:pb-[140px]">
        <div
          key={activeSlide.id}
          className={`max-w-[900px] ${
            reducedMotion ? "" : "hero-content-enter"
          }`}
        >
          {/* EYEBROW */}
          <div className="mb-7 flex items-center gap-4 max-sm:mb-5">
            <span className="h-px w-9 shrink-0 bg-[#E31E32]" />

            <span className="font-[family-name:var(--font-body)] text-[11px] font-bold tracking-[0.2em] text-white/85 uppercase max-sm:text-[9px] max-sm:tracking-[0.12em]">
              {activeSlide.eyebrow}
            </span>
          </div>

          {/* HEADING */}
          <h1 className="max-w-[900px] font-[family-name:var(--font-heading)] text-[clamp(42px,5.8vw,88px)] leading-[1.08] font-medium tracking-[-0.05em] max-sm:text-[clamp(36px,9vw,54px)]">
            {activeSlide.title}

            <span className="mt-1 block font-semibold text-[#F04452]">
              {activeSlide.highlight}
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="mt-8 max-w-[580px] font-[family-name:var(--font-body)] text-[clamp(14px,1.2vw,17px)] leading-[1.85] text-white/85 max-sm:mt-6 max-sm:max-w-[420px] max-sm:leading-[1.7]">
            {activeSlide.description}
          </p>

          {/* BUTTONS */}
          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-5 max-sm:mt-8">
            <Link
              href="#uzmanlik"
              className="group inline-flex min-h-[54px] items-center justify-center gap-4 bg-[#C8102E] px-7 font-[family-name:var(--font-body)] text-[12px] font-bold tracking-[0.04em] text-white transition-colors duration-300 hover:bg-[#A90D26] max-sm:min-h-[49px] max-sm:px-5 max-sm:text-[11px]"
            >
              ÇÖZÜMLERİ KEŞFEDİN

              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>

            <Link
              href="#iletisim"
              className="group inline-flex min-h-11 items-center gap-3 font-[family-name:var(--font-body)] text-[12px] font-semibold tracking-[0.04em] text-white transition-colors duration-300 hover:text-[#F04452] max-sm:text-[11px]"
            >
              PROJENİZİ KONUŞALIM
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </div>

      {/* ======================================
          BOTTOM SLIDER CONTROLS
      ====================================== */}
      <div className="container-premium absolute bottom-8 left-1/2 z-30 flex -translate-x-1/2 items-center justify-between gap-6 max-sm:bottom-5">
        {/* SLIDE INDICATORS */}
        <div className="flex items-center gap-4 max-sm:gap-3">
          {slides.map((slide, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Slayt ${index + 1}: ${slide.eyebrow}`}
                aria-current={isActive ? "true" : undefined}
                className="group flex min-h-11 items-center gap-3"
              >
                {/* NUMBER */}
                <span
                  className={`font-[family-name:var(--font-body)] text-[12px] font-bold tabular-nums transition-colors duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-white/60 group-hover:text-white"
                  }`}
                >
                  0{index + 1}
                </span>

                {/* PROGRESS TRACK */}
                <span
                  className={`relative block h-[4px] overflow-hidden rounded-full transition-[width,background-color] duration-500 ${
                    isActive
                      ? "w-[88px] bg-white/45 max-sm:w-[52px]"
                      : "w-[32px] bg-white/35 max-sm:w-[20px]"
                  }`}
                >
                  {isActive && (
                    <span
                      className="absolute inset-y-0 left-0 rounded-full bg-[#E31E32] shadow-[0_0_12px_rgba(227,30,50,0.9)]"
                      style={{
                        width: reducedMotion
                          ? "100%"
                          : `${progress}%`,
                      }}
                    />
                  )}
                </span>
              </button>
            );
          })}
        </div>

        {/* SCROLL HINT */}
        <a
          href="#uzmanlik"
          className="hidden items-center gap-3 font-[family-name:var(--font-body)] text-[10px] font-semibold tracking-[0.16em] text-white/80 transition-colors duration-300 hover:text-white md:flex"
        >
          KEŞFETMEYE DEVAM ET
          <ArrowDown size={16} />
        </a>
      </div>
    </section>
  );
}
