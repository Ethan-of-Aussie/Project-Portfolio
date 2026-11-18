import SearchIcon from "@mui/icons-material/Search";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

type InfoCardProps = {
  title: string;
  description: string;
};

const icons = {
  Explore: SearchIcon,
  Create: PlaylistAddIcon,
  Track: QueryStatsIcon,
};

export default function InfoCard({ title, description }: InfoCardProps) {
  const Icon = icons[title as keyof typeof icons];
  return (
    <div className="flex w-full max-w-2xl items-center gap-4 p-4 text-left transition-transform duration-200 hover:scale-105">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#D5EBD8]">
        <Icon className="text-[#356B43]" fontSize="large" />
      </div>

      <div>
        <h2 className="mb-1 text-xl font-semibold text-gray-900">{title}</h2>
        <p className="text-sm leading-6 text-gray-600">{description}</p>
      </div>
    </div>
  );
}
