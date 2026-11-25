// Design tokens that apps can extend or override from their own app.config.ts.
// Nuxt merges this file with the app's, and types the result.
// Colors only reference the palette in scss/site/colors.scss.
export default defineAppConfig({
  nitidez: {
    // <Chip type="..."> tones. An app adds its own tones under the same key.
    chip: {
      default: { bg: 'var(--c-gray-2)', fg: 'var(--c-gray-4)' },
      success: { bg: 'var(--c-success-bg)', fg: 'var(--c-green-2)' },
      warning: { bg: 'var(--c-warning-bg)', fg: 'var(--c-warning)' },
      danger: { bg: 'var(--c-danger-bg)', fg: 'var(--c-red-2)' },
      info: { bg: 'var(--c-info-bg)', fg: 'var(--c-info)' },
      outline: {
        bg: 'var(--c-gray-1)',
        fg: 'var(--c-gray-4)',
        border: '1px solid var(--c-gray-3)',
      },
      secondary: { bg: 'var(--c-secondary-2)', fg: 'var(--c-secondary-3)' },
    },
    // <AdminButton type="..."> and <SubmitButton> tones. hover* and submenu*
    // are optional: a missing one falls back to bg / fg.
    button: {
      primary: {
        bg: 'var(--c-primary)',
        fg: 'var(--c-on-primary)',
        hoverBg: 'var(--c-primary-3)',
        submenuBg: 'var(--c-primary-2)',
      },
      secondary: {
        bg: 'var(--c-secondary-2)',
        fg: 'var(--c-on-secondary)',
        hoverFg: 'var(--c-primary-2)',
        submenuBg: 'var(--c-secondary)',
      },
      text: { bg: 'var(--c-gray-2)' },
    },
  },
});
