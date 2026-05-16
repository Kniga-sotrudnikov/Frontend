export const AvatarPlaceholder = ({ name }: { name: string }) => {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200">
      <span className="text-xs font-medium text-gray-600">{initials}</span>
    </div>
  );
};
