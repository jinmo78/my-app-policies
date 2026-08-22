"use client";

import { useRouter } from "next/navigation";

type PolicyApp = {
  id: string;
  name: string;
};

type Props = {
  apps: PolicyApp[];
  base: string;
  placeholder: string;
  privacyShort: string;
  termsShort: string;
};

export default function FooterPolicySelect({
  apps,
  base,
  placeholder,
  privacyShort,
  termsShort,
}: Props) {
  const router = useRouter();

  return (
    <select
      className="footer-policy-select"
      defaultValue=""
      aria-label={placeholder}
      onChange={(event) => {
        const href = event.target.value;
        if (href) router.push(href);
      }}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {apps.map((app) => (
        <optgroup key={app.id} label={app.name}>
          <option value={`${base}/apps/${app.id}/privacy`}>{privacyShort}</option>
          <option value={`${base}/apps/${app.id}/terms`}>{termsShort}</option>
        </optgroup>
      ))}
    </select>
  );
}
