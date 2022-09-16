
interface GameBannerProps {
  bannerUrl: string;
  title: string;
  adsCount: number;
}

export function GameBanner(pros: GameBannerProps) {
  return (
    <a
      href=""
      className="relative rounded-lg overflow-hidden">
      <img
        src={pros.bannerUrl}
        alt="Banner game"
      />
      <div className="w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0">
        <strong className="font-bold text-white block">
          {pros.title}
        </strong>
        <span className="text-zinc-300 text-sm block">
          {pros.adsCount} anúncio(s)
        </span>
      </div>
    </a>
  );
}
