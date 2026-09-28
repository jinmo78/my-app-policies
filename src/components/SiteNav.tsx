"use client";

import { useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";

type AppLink = { id: string; name: string; icon: string };

type Props = {
  base: string;
  homeLabel: string;
  appsLabel: string;
  closeLabel: string;
  apps: AppLink[];
};

function AppLinks({ base, apps, currentId }: { base: string; apps: AppLink[]; currentId?: string }) {
  return apps.map((app) => {
    const href = `${base}/apps/${app.id}`;
    const active = currentId === app.id;
    return (
      <a key={app.id} href={href} className={`nav-menu-item${active ? " active" : ""}`}>
        <span className="nav-menu-icon" aria-hidden="true">
          {app.icon}
        </span>
        <span>{app.name}</span>
      </a>
    );
  });
}

export default function SiteNav({ base, homeLabel, appsLabel, closeLabel, apps }: Props) {
  const pathname = usePathname() || base;
  const [open, setOpen] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const menuId = useId();

  const current = apps.find((app) => {
    const href = `${base}/apps/${app.id}`;
    return pathname === href || pathname.startsWith(`${href}/`);
  });
  const homeActive = pathname === base || pathname === `${base}/`;

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)");
    const apply = () => setNarrow(media.matches);
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onPointer = (event: MouseEvent) => {
      const target = event.target as Element | null;
      if (target?.closest(".site-nav, .nav-menu, .nav-backdrop")) return;
      setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [open]);

  const menu = (
    <>
      {narrow && (
        <button type="button" className="nav-backdrop" aria-label={closeLabel} onClick={() => setOpen(false)} />
      )}
      <div id={menuId} className="nav-menu">
        <AppLinks base={base} apps={apps} currentId={current?.id} />
      </div>
    </>
  );

  return (
    <nav className="site-nav">
      <a href={base} className={`nav-link nav-home${homeActive ? " active" : ""}`}>
        {homeLabel}
      </a>
      <div className="nav-apps">
        <button
          type="button"
          className={`nav-link nav-apps-btn${open || current ? " active" : ""}`}
          aria-expanded={open}
          aria-controls={menuId}
          onClick={() => setOpen((value) => !value)}
        >
          <span className="nav-apps-label">{current?.name ?? appsLabel}</span>
          <span className="nav-caret" aria-hidden="true" />
        </button>
        {open && (narrow ? createPortal(menu, document.body) : menu)}
      </div>
    </nav>
  );
}
