---
name: Clinical Warmth
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#404848'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#707978'
  outline-variant: '#bfc8c7'
  surface-tint: '#2d6766'
  primary: '#003433'
  on-primary: '#ffffff'
  primary-container: '#084c4b'
  on-primary-container: '#82bbb9'
  inverse-primary: '#97d1cf'
  secondary: '#715857'
  on-secondary: '#ffffff'
  secondary-container: '#f9d8d6'
  on-secondary-container: '#755d5b'
  tertiary: '#003432'
  on-tertiary: '#ffffff'
  tertiary-container: '#004c4a'
  on-tertiary-container: '#7abcb8'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b3edeb'
  primary-fixed-dim: '#97d1cf'
  on-primary-fixed: '#00201f'
  on-primary-fixed-variant: '#0e4f4e'
  secondary-fixed: '#fcdbd9'
  secondary-fixed-dim: '#dfbfbd'
  on-secondary-fixed: '#281716'
  on-secondary-fixed-variant: '#584140'
  tertiary-fixed: '#abefeb'
  tertiary-fixed-dim: '#90d2ce'
  on-tertiary-fixed: '#00201f'
  on-tertiary-fixed-variant: '#00504d'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-xl:
    fontFamily: Manrope
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 0.25rem
  sm: 0.5rem
  md: 1rem
  lg: 1.5rem
  xl: 2rem
  gutter: 1.5rem
  margin: 2rem
---

## Brand & Style
The brand personality of this design system is "The Expert Caretaker." It bridges the gap between high-efficiency marketing automation and the empathetic, sterile-yet-inviting environment of a modern veterinary practice. The target audience includes clinic managers, veterinary marketers, and pet health professionals who require a high-density data environment that doesn't feel cold or intimidating.

The UI style is **Corporate / Modern** with a focus on organization and clarity. It utilizes heavy whitespace to ensure that complex CRM data remains legible, while incorporating soft tactile elements to maintain a friendly, approachable atmosphere. The emotional response should be one of "controlled calm"—users should feel that their data is secure and their communication is professional, yet deeply connected to the well-being of the animals they serve.

## Colors
The color palette is anchored by a **Deep Teal** primary, chosen for its association with medical professionalism and stability. This is contrasted by a **Soft Cat-Ear Pink** secondary color, used sparingly for high-impact calls to action, active states, and emotional highlights.

- **Primary (Deep Teal):** Used for navigation sidebars, primary buttons, and critical headers. It provides a grounded, authoritative foundation.
- **Secondary (Soft Pink):** Used for accent points, such as notification badges, "Add Patient" buttons, or heart-shaped iconography.
- **Neutral (Slate Grays):** A range of cool-toned grays are used for text and borders to maintain a clinical, organized feel.
- **Backgrounds:** A soft off-white (#F8FAFA) is used for the main canvas to reduce eye strain during long periods of data management.

## Typography
This design system utilizes **Manrope** for all typographic needs. Chosen for its modern, refined, and balanced geometric qualities, it ensures that high-density CRM tables remain readable while maintaining a contemporary aesthetic.

Headlines use heavier weights (700-800) to create a clear hierarchy against dense data sets. Body text is kept at a comfortable 16px base to ensure accessibility for clinic staff who may be viewing screens from a distance. Labels use a semi-bold weight and slight letter spacing to differentiate metadata from primary content.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy for the main content area (max-width: 1440px) to ensure data visualization remains consistent across different monitor sizes. A 12-column grid is employed with 24px (1.5rem) gutters.

A strict 4px baseline grid governs all internal component spacing, ensuring a rhythmic and organized appearance. For marketing hubs and CRM dashboards, density is preferred over excessive whitespace, allowing users to see more information without scrolling, while using clear margins to prevent a cluttered feel.

## Elevation & Depth
Depth is conveyed through **Tonal Layers** and subtle **Ambient Shadows**. Surfaces are tiered to create a natural hierarchy:

1.  **Level 0 (Background):** The main canvas, using the softest neutral tint.
2.  **Level 1 (Cards/Sections):** White surfaces with a very thin (1px) neutral-200 border.
3.  **Level 2 (Popovers/Dropdowns):** Elevated surfaces using a soft, diffused shadow tinted with a hint of the Deep Teal primary color (`rgba(8, 76, 75, 0.08)`) to maintain brand cohesion even in the shadows.

This design system avoids heavy blurs in favor of "ghost borders" to maintain the crisp, professional "clinic" aesthetic.

## Shapes
The shape language is **Rounded**, utilizing a base 0.5rem (8px) corner radius. This choice is intentional to soften the professional teal palette, evoking the organic, soft nature of the pets at the heart of the business. 

Larger containers like cards use 1rem (16px) for a modern, friendly feel, while interactive elements like buttons and input fields stay at the base 8px to maintain an organized, systematic appearance.

## Components
- **Buttons:** Primary buttons are solid Deep Teal with white text. Secondary buttons use a Soft Pink background with Deep Teal text for a warm contrast.
- **Chips:** Status indicators (e.g., "Active Campaign," "New Patient") use high-roundness (pill) shapes with low-opacity background tints of the primary and secondary colors.
- **Input Fields:** Clean, white backgrounds with 1px borders that turn Deep Teal on focus. Labels are always positioned above the field for maximum legibility.
- **Data Tables:** Row-based with subtle divider lines and "zebra-striping" on hover. Checkboxes are utilized in the first column for bulk actions.
- **Cards:** Used for patient profiles or campaign summaries. They feature a 1px border and the level 1 elevation, keeping the dashboard modular and easy to scan.
- **Patient Progress Bar:** A custom component for tracking campaign completion or pet health milestones, using a teal-to-pink gradient.