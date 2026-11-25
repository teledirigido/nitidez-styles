type ButtonToneStyle = {
  bg?: string;
  fg?: string;
  hoverBg?: string;
  hoverFg?: string;
  submenuBg?: string;
  submenuFg?: string;
};

// Turns a tone from app.config.ts (nitidez.button) into the --button-* custom
// properties that scss/components/button.scss reads. Undefined values are
// dropped by Vue, so the stylesheet's fallbacks apply.
export function useButtonTone(tone: () => string) {
  const tones = useAppConfig().nitidez.button as Record<string, ButtonToneStyle>;

  return computed(() => {
    const t = tones[tone()] ?? {};
    return {
      '--button-bg': t.bg,
      '--button-fg': t.fg,
      '--button-hover-bg': t.hoverBg,
      '--button-hover-fg': t.hoverFg,
      '--button-submenu-bg': t.submenuBg,
      '--button-submenu-fg': t.submenuFg,
    };
  });
}
