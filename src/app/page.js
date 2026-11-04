import Hero from "@/components/home/Hero";

export default function Home() {
  return (
    <main className="w-full min-w-0 overflow-x-clip bg-[#F8F8F6]">
      {/* Premium Hero Slider */}
      <Hero />

      {/* Temporary Expertise Section */}
      <section
        id="uzmanlik"
        className="section-premium border-t border-[#DADDE0] bg-white"
      >
        <div className="container-premium">
          <div className="eyebrow mb-6">UZMANLIK ALANLARIMIZ</div>

          <h2 className="max-w-3xl text-[clamp(32px,5vw,68px)] leading-[1.15] font-semibold text-[#202326]">
            Her projede
            <span className="text-[#C8102E]"> kalite ve güven.</span>
          </h2>

          <p className="mt-8 max-w-2xl text-base leading-[1.9] text-[#62676B]">
            LED aydınlatma, dekoratif metal, elektrik panoları, rack kabinetler
            ve kablo taşıma sistemlerinde profesyonel çözümler sunuyoruz.
          </p>
        </div>
      </section>

      {/* Temporary Contact Section */}
      <section id="iletisim" className="section-premium bg-[#F8F8F6]">
        <div className="container-premium">
          <div className="eyebrow mb-6">İLETİŞİM</div>

          <h2 className="max-w-3xl text-[clamp(32px,5vw,68px)] leading-[1.15] font-semibold text-[#202326]">
            Projenizi birlikte
            <span className="text-[#C8102E]"> hayata geçirelim.</span>
          </h2>

          <p className="mt-8 max-w-xl text-base leading-[1.9] text-[#62676B]">
            İhtiyaçlarınıza özel mühendislik ve üretim çözümleri için bizimle
            iletişime geçin.
          </p>
        </div>
      </section>
    </main>
  );
}
