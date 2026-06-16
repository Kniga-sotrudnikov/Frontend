import defaultPhoto from "@/shared/assets/images/avatar-placeholder.jpg";

interface LeaderPrimaryInfoProps {
  leaderPhoto?: string;
  leaderName: string;
  leaderPosition: string;
}

export const LeaderPrimaryInfo = ({
  leaderPhoto = defaultPhoto,
  leaderName,
  leaderPosition,
}: LeaderPrimaryInfoProps) => {
  return (
    <div className="flex gap-2 items-center">
      <img
        src={leaderPhoto}
        alt="Фото руководителя"
        className={"object-cover rounded-full size-9"}
      />
      <div className="flex flex-col gap-1">
        <p className="text-[12px]">{leaderName}</p>
        <p className="text-[12px] text-gray-700">{leaderPosition}</p>
      </div>
    </div>
  );
};
