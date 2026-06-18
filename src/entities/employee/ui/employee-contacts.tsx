export type ContactType = "email" | "phone";

type EmployeeContactsProps = {
  type: ContactType;
  corpContact: string;
  persContact: string;
};

const CONTACT_PREFIXES: Record<ContactType, string> = {
  email: "mailto:",
  phone: "tel:",
};

export function EmployeeContacts({
  type,
  corpContact,
  persContact,
}: EmployeeContactsProps) {
  return (
    <div className="flex flex-col gap-1">
      <div className="inline-flex gap-1 items-center">
        <a
          href={`${CONTACT_PREFIXES[type]}${corpContact}`}
          className="text-link hover:underline text-[12px]"
        >
          {corpContact}
        </a>

        <span className="text-[12px] whitespace-nowrap">(корп.)</span>
      </div>

      <div className="inline-flex gap-1 items-center">
        <a
          href={`${CONTACT_PREFIXES[type]}${persContact}`}
          className="text-link hover:underline text-[12px]"
        >
          {persContact}
        </a>

        <span className="text-[12px] whitespace-nowrap">(личн.)</span>
      </div>
    </div>
  );
}
