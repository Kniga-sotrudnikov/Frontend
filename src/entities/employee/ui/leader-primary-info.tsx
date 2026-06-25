import defaultPhoto from "@/shared/assets/images/avatar-placeholder.jpg";

interface LeaderPrimaryInfoProps {
  leaderPhoto?: string;
  leaderName?: string;
  leaderPosition?: string;
}

export const LeaderPrimaryInfo = ({
  leaderPhoto,
  leaderName,
  leaderPosition,
}: LeaderPrimaryInfoProps) => {
  if (!leaderName || leaderName.trim().length === 0) {
    return <p className="text-[12px] text-gray-500">руководитель не указан</p>;
  }

  const photo = leaderPhoto || defaultPhoto;

  return (
    <div className="flex gap-2 items-center">
      <img
        src={photo}
        alt="Фото руководителя"
        className="object-cover rounded-full size-9"
      />
      <div className="flex flex-col gap-1">
        <p className="text-[12px] whitespace-nowrap">{leaderName}</p>
        {leaderPosition && (
          <p className="text-[12px] text-gray-700 whitespace-nowrap">
            {leaderPosition}
          </p>
        )}
      </div>
    </div>
  );
};