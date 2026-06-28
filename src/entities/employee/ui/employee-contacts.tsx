export type ContactType = "email" | "phone";

type EmployeeContactsProps = {
  type: ContactType;
  corpContact: string;
  persContact: string;
  isPdf?: boolean;
};

const CONTACT_PREFIXES: Record<ContactType, string> = {
  email: "mailto:",
  phone: "tel:",
};

const CONTACT_LABELS: Record<ContactType, { corp: string; pers: string; none: string }> = {
  email: {
    corp: "рабочая почта не указана",
    pers: "личная почта не указана",
    none: "почта не указана",
  },
  phone: {
    corp: "рабочий телефон не указан",
    pers: "личный телефон не указан",
    none: "телефон не указан",
  },
};

export function EmployeeContacts({
  type,
  corpContact,
  persContact,
}: EmployeeContactsProps) {
  const hasCorpContact = corpContact && corpContact.trim().length > 0;
  const hasPersContact = persContact && persContact.trim().length > 0;
  const hasAnyContact = hasCorpContact || hasPersContact;
  const labels = CONTACT_LABELS[type];

  if (!hasAnyContact) {
    return (
      <div className="flex flex-col gap-1">
        <p className="text-[12px] text-gray-500">{labels.none}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="inline-flex gap-1 items-center">
        {hasCorpContact ? (
          <>
            <a
              href={`${CONTACT_PREFIXES[type]}${corpContact}`}
              className="text-link hover:underline text-[12px]"
            >
              {corpContact}
            </a>
            <span className="text-[12px] whitespace-nowrap">(корп.)</span>
          </>
        ) : (
          <span className="text-[12px] text-gray-500">{labels.corp}</span>
        )}
      </div>

      <div className="inline-flex gap-1 items-center">
        {hasPersContact ? (
          <>
            <a
              href={`${CONTACT_PREFIXES[type]}${persContact}`}
              className="text-link hover:underline text-[12px]"
            >
              {persContact}
            </a>
            <span className="text-[12px] whitespace-nowrap">(личн.)</span>
          </>
        ) : (
          <span className="text-[12px] text-gray-500">{labels.pers}</span>
        )}
      </div>
    </div>
  );
}