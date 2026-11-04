
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronDown } from "lucide-react";

const navigation = [
  { label: "Anasayfa", href: "#anasayfa" },
  { label: "Kurumsal", href: "#kurumsal" },
  { label: "Ürünler", href: "#urunler", dropdown: true },
  { label: "Katalog", href: "#katalog" },
  { label: "Galeri", href: "#galeri" },
  { label: "Referanslar", href: "#referanslar" },
  { label: "İletişim", href: "#iletisim" },
];

const productCategories = [
  { number: "01", title: "LED Aydınlatma" },
  { number: "02", title: "Dekoratif Metal" },
  { number: "03", title: "Elektrik Panoları" },
  { number: "04", title: "Rack Kabinetler" },
  { number: "05", title: "Kablo Kanalları" },
];

export default function Navbar() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileProductsOpen, setMobileProductsOpen] =
    useState(false);
  const [active, setActive] = useState("anasayfa");

  const navbarRef = useRef(null);
  const menuButtonRef = useRef(null);
  const mobilePanelRef = useRef(null);

  // SCROLL + ACTIVE SECTION
  useEffect(() => {
    let frame = null;

    const update = () => {
      frame = null;
      setScrollY(window.scrollY);

      const offset = window.innerHeight * 0.35;
      let current = "anasayfa";

      navigation.forEach((item) => {
        const section = document.getElementById(
          item.href.slice(1)
        );

        if (
          section &&
          section.getBoundingClientRect().top <= offset
        ) {
          current = section.id;
        }
      });

      setActive(current);
    };

    const handleScroll = () => {
      if (frame !== null) return;
      frame = requestAnimationFrame(update);
    };

    update();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);

      if (frame !== null) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  // MOBILE MENU SCROLL LOCK
  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    mobilePanelRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener(
        "keydown",
        handleEscape
      );
      menuButtonRef.current?.focus();
    };
  }, [mobileOpen]);

  // CLOSE DESKTOP MEGA MENU
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setMegaOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setMegaOpen(false);
      }
    };

    document.addEventListener(
      "pointerdown",
      handleOutsideClick
    );
    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleOutsideClick
      );
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  const closeMenus = () => {
    setMobileOpen(false);
    setMegaOpen(false);
    setMobileProductsOpen(false);
  };

  const scrolled = scrollY > 90;
  const compact = scrollY > 55;
  const solidNavbar = scrolled || megaOpen;

  const navbarBackground = mobileOpen
    ? "transparent"
    : solidNavbar
      ? "rgba(23,27,32,0.97)"
      : "transparent";

  // Desktop navigation always uses white text.
  const desktopLinkClass =
    "group relative flex h-full shrink-0 items-center " +
    "gap-1.5 whitespace-nowrap " +
    "font-[family-name:var(--font-body)] " +
    "text-[14px] font-semibold tracking-[0.005em] " +
    "!text-white hover:!text-white " +
    "drop-shadow-[0_1px_5px_rgba(0,0,0,0.35)] " +
    "transition-colors duration-300";

  return (
    <>
      {/* MOBILE BLURRED BACKDROP */}
      <div
        aria-hidden="true"
        className={`fixed inset-0 z-40 bg-[#080D12]/70 backdrop-blur-[16px] transition-[opacity,visibility] duration-500 lg:hidden ${
          mobileOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
      />

      {/* HEADER */}
      <header
        ref={navbarRef}
        style={{
          backgroundColor: navbarBackground,
          boxShadow:
            scrolled && !mobileOpen
              ? "0 12px 36px rgba(0,0,0,0.12)"
              : "none",
        }}
        className={`fixed inset-x-0 top-0 z-50 w-full border-b transition-[background-color,border-color,box-shadow] duration-500 ${
          solidNavbar && !mobileOpen
            ? "border-white/10"
            : "border-transparent"
        }`}
      >
        <div
          className={`container-premium relative flex items-center justify-between gap-4 transition-[height] duration-500 ${
            compact
              ? "h-[72px]"
              : "h-[92px] max-sm:h-[82px]"
          }`}
        >
          {/* LOGO */}
          <Link
            href="#anasayfa"
            onClick={closeMenus}
            aria-label="EY Teknik Metal - Anasayfa"
            className="relative z-10 flex shrink-0 flex-col"
          >
            <span className="font-[family-name:var(--font-heading)] text-[21px] leading-none font-bold tracking-[-0.055em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] sm:text-[24px]">
              EY
              <span className="text-[#E31E32]">.</span>
              <span className="ml-1.5 font-medium tracking-[-0.045em]">
                TEKNİK
              </span>
            </span>

            <span className="mt-1.5 font-[family-name:var(--font-body)] text-[8px] font-semibold tracking-[0.28em] text-white/75">
              METAL & ENGINEERING
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav
            aria-label="Ana navigasyon"
            className="hidden h-full items-center gap-5 lg:flex xl:gap-7"
          >
            {navigation.map((item) => {
              const isActive =
                active === item.href.slice(1);

              const selected =
                isActive || (item.dropdown && megaOpen);

              const underlineClass = `absolute bottom-[19px] left-0 h-[2px] w-full origin-left bg-[#E31E32] transition-transform duration-300 ease-out ${
                selected
                  ? "scale-x-100"
                  : "scale-x-0 group-hover:scale-x-100"
              }`;

              if (item.dropdown) {
                return (
                  <button
                    key={item.label}
                    type="button"
                    aria-expanded={megaOpen}
                    aria-controls="desktop-products-menu"
                    onClick={() =>
                      setMegaOpen((previous) => !previous)
                    }
                    className={desktopLinkClass}
                  >
                    {item.label}

                    <ChevronDown
                      size={13}
                      strokeWidth={1.8}
                      className={`transition-transform duration-300 ${
                        megaOpen ? "rotate-180" : ""
                      }`}
                    />

                    <span className={underlineClass} />
                  </button>
                );
              }

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMenus}
                  aria-current={
                    isActive ? "location" : undefined
                  }
                  className={desktopLinkClass}
                >
                  {item.label}
                  <span className={underlineClass} />
                </Link>
              );
            })}
          </nav>

          {/* DESKTOP PREMIUM CTA */}
          <Link
            href="#iletisim"
            onClick={closeMenus}
            className="group hidden h-[48px] shrink-0 items-center overflow-hidden border border-white/45 bg-transparent font-[family-name:var(--font-body)] transition-colors duration-300 hover:border-[#E31E32] lg:inline-flex"
          >
            <span className="flex h-full items-center px-4 text-[11px] font-bold tracking-[0.1em] text-white xl:px-5">
              TEKLİF AL
            </span>

            <span className="flex h-full w-[48px] items-center justify-center bg-[#C8102E] text-white transition-colors duration-300 group-hover:bg-[#A90D26]">
              <ArrowUpRight
                size={18}
                strokeWidth={1.7}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </Link>

          {/* PREMIUM MOBILE HAMBURGER */}
          <button
            ref={menuButtonRef}
            type="button"
            aria-label={
              mobileOpen ? "Menüyü kapat" : "Menüyü aç"
            }
            aria-expanded={mobileOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              setMobileOpen((previous) => !previous);
              setMegaOpen(false);
            }}
            className={`group relative z-10 flex h-[48px] w-[48px] shrink-0 items-center justify-center border transition-all duration-300 lg:hidden ${
              mobileOpen
                ? "border-white/45 bg-white/10"
                : "border-white/45 bg-transparent hover:border-[#E31E32]"
            }`}
          >
            <span className="relative block h-5 w-6">
              <span
                className={`absolute left-0 h-[1.5px] bg-white transition-all duration-300 ${
                  mobileOpen
                    ? "top-[10px] w-6 rotate-45"
                    : "top-[4px] w-6"
                }`}
              />

              <span
                className={`absolute right-0 top-[10px] h-[1.5px] bg-white transition-all duration-300 ${
                  mobileOpen
                    ? "w-0 opacity-0"
                    : "w-4 opacity-100"
                }`}
              />

              <span
                className={`absolute left-0 h-[1.5px] bg-white transition-all duration-300 ${
                  mobileOpen
                    ? "top-[10px] w-6 -rotate-45"
                    : "top-[16px] w-6"
                }`}
              />
            </span>
          </button>
        </div>

        {/* DESKTOP MEGA MENU */}
        <div
          id="desktop-products-menu"
          aria-hidden={!megaOpen}
          inert={!megaOpen}
          className={`absolute inset-x-0 top-full hidden overflow-hidden border-b border-white/10 bg-[#171B20] shadow-[0_24px_45px_rgba(0,0,0,0.18)] transition-all duration-300 lg:block ${
            megaOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible pointer-events-none -translate-y-2 opacity-0"
          }`}
        >
          <div className="container-premium grid grid-cols-[1fr_2fr] gap-12 py-10">
            <div>
              <span className="font-[family-name:var(--font-body)] text-[10px] font-bold tracking-[0.2em] text-[#F04452]">
                ÜRÜN GRUPLARIMIZ
              </span>

              <h3 className="mt-5 max-w-xs font-[family-name:var(--font-heading)] text-[30px] leading-[1.2] font-medium tracking-[-0.045em] text-white">
                Projenize özel
                <span className="text-[#F04452]">
                  {" "}çözümler.
                </span>
              </h3>

              <p className="mt-4 max-w-xs font-[family-name:var(--font-body)] text-[13px] leading-[1.8] text-white/60">
                Mühendislik uzmanlığımızla geliştirdiğimiz
                ürün ve sistemleri keşfedin.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-10">
              {productCategories.map((category) => (
                <Link
                  key={category.number}
                  href="#urunler"
                  onClick={closeMenus}
                  tabIndex={megaOpen ? 0 : -1}
                  className="group flex items-center gap-4 border-b border-white/10 py-5"
                >
                  <span className="text-[11px] font-semibold text-[#F04452]">
                    {category.number}
                  </span>

                  <span className="flex-1 text-[14px] font-semibold text-white/85 transition-colors duration-300 group-hover:text-white">
                    {category.title}
                  </span>

                  <ArrowUpRight
                    size={17}
                    className="text-white/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#F04452]"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION */}
      <div
        id="mobile-navigation"
        ref={mobilePanelRef}
        role="dialog"
        aria-modal={mobileOpen ? "true" : undefined}
        aria-label="Mobil navigasyon"
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
        tabIndex={mobileOpen ? -1 : undefined}
        className={`fixed inset-0 z-40 overflow-y-auto overscroll-contain pt-[100px] pb-8 transition-[opacity,visibility,transform] duration-500 lg:hidden ${
          mobileOpen
            ? "visible translate-y-0 opacity-100"
            : "invisible pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <div className="container-premium flex min-h-full flex-col">
          <nav aria-label="Mobil ana navigasyon">
            {navigation.map((item, index) => (
              <div
                key={item.label}
                className="border-b border-white/20"
              >
                {item.dropdown ? (
                  <>
                    <button
                      type="button"
                      aria-expanded={mobileProductsOpen}
                      onClick={() =>
                        setMobileProductsOpen(
                          (previous) => !previous
                        )
                      }
                      className="flex w-full items-center justify-between py-[15px] text-left"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="text-[10px] font-medium text-[#F04452]">
                          0{index + 1}
                        </span>

                        <span className="font-[family-name:var(--font-heading)] text-[clamp(25px,6vw,36px)] font-medium tracking-[-0.04em] text-white">
                          {item.label}
                        </span>
                      </span>

                      <ChevronDown
                        size={20}
                        className={`text-white transition-transform duration-300 ${
                          mobileProductsOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {mobileProductsOpen && (
                      <div className="pb-5 pl-8">
                        {productCategories.map((category) => (
                          <Link
                            key={category.number}
                            href="#urunler"
                            onClick={closeMenus}
                            className="flex items-center justify-between py-2.5 text-[14px] text-white/80 transition-colors hover:text-white"
                          >
                            {category.title}
                            <ArrowUpRight size={15} />
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    onClick={closeMenus}
                    className="group flex items-center justify-between py-[15px]"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="text-[10px] font-medium text-[#F04452]">
                        0{index + 1}
                      </span>

                      <span className="font-[family-name:var(--font-heading)] text-[clamp(25px,6vw,36px)] font-medium tracking-[-0.04em] text-white transition-colors duration-300 group-hover:text-[#F04452]">
                        {item.label}
                      </span>
                    </span>

                    <ArrowUpRight
                      size={19}
                      strokeWidth={1.5}
                      className="text-white/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* PREMIUM MOBILE CTA */}
          <div className="mt-9">
            <span className="mb-4 block font-[family-name:var(--font-body)] text-[10px] font-semibold tracking-[0.22em] text-white/70">
              BİRLİKTE ÇALIŞALIM
            </span>

            <Link
              href="#iletisim"
              onClick={closeMenus}
              className="group relative flex min-h-[76px] w-full items-center justify-between overflow-hidden border border-white/25 bg-[#F7F6F3] pl-5 shadow-[0_15px_40px_rgba(0,0,0,0.18)] transition-all duration-300 hover:border-[#E31E32] active:scale-[0.99] sm:pl-7"
            >
              <div className="relative z-10 flex min-w-0 flex-col gap-1 pr-3">
                <span className="font-[family-name:var(--font-heading)] text-[17px] font-semibold tracking-[-0.035em] text-[#202326] sm:text-[19px]">
                  Projenizi Konuşalım
                </span>

                <span className="font-[family-name:var(--font-body)] text-[10px] font-medium tracking-[0.015em] text-[#777B7D] sm:text-[11px]">
                  Size özel çözümler için iletişime geçin
                </span>
              </div>

              <span className="relative z-10 flex min-h-[76px] w-[68px] shrink-0 items-center justify-center bg-[#C8102E] text-white transition-colors duration-300 group-hover:bg-[#A90D26] sm:w-[76px]">
                <ArrowUpRight
                  size={23}
                  strokeWidth={1.5}
                  className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </span>

              <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-[#C8102E] transition-transform duration-500 group-hover:scale-x-100" />
            </Link>
          </div>

          {/* MOBILE FOOTER */}
          <div className="mt-auto pt-10">
            <div className="h-px w-full bg-white/20" />

            <p className="mt-5 font-[family-name:var(--font-body)] text-[10px] font-semibold tracking-[0.2em] text-white/55">
              EY TEKNİK METAL
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
