# تصميم منصة اختبار الشخصية العلمية - Design Guidelines

## Design Approach
**Hybrid Approach**: Combining Material Design's structured components with inspiration from 16Personalities and Truity for engaging personality assessment UX. Scientific credibility meets visual appeal.

## RTL & Arabic-First Considerations
- Complete RTL layout implementation
- Arabic typography with proper letter-spacing
- Right-aligned navigation and flows
- Mirrored icons and directional elements

## Color Palette

### Light Mode
- **Primary**: 245 65% 50% (Trustworthy Purple-Blue)
- **Primary Variant**: 245 70% 40%
- **Secondary**: 195 85% 45% (Calming Teal)
- **Background**: 0 0% 98%
- **Surface**: 0 0% 100%
- **Text Primary**: 220 15% 20%
- **Text Secondary**: 220 10% 45%

### Dark Mode
- **Primary**: 245 60% 60%
- **Primary Variant**: 245 65% 50%
- **Secondary**: 195 75% 55%
- **Background**: 220 15% 10%
- **Surface**: 220 15% 15%
- **Text Primary**: 0 0% 95%
- **Text Secondary**: 0 0% 70%

### Data Visualization Colors
- **Trait 1 (Openness)**: 280 70% 60% (Purple)
- **Trait 2 (Conscientiousness)**: 210 75% 55% (Blue)
- **Trait 3 (Extraversion)**: 35 90% 60% (Orange)
- **Trait 4 (Agreeableness)**: 155 65% 50% (Green)
- **Trait 5 (Neuroticism)**: 340 75% 60% (Pink-Red)

## Typography
- **Primary Font**: 'IBM Plex Sans Arabic' via Google Fonts (excellent Arabic support)
- **Headings**: 700 weight, sizes: text-4xl (h1), text-3xl (h2), text-2xl (h3)
- **Body**: 400 weight, text-base to text-lg
- **Numbers/Scores**: 'JetBrains Mono' 600 weight for scientific credibility
- **Line Height**: leading-relaxed for Arabic readability

## Layout System
**Spacing Primitives**: Consistent use of 4, 8, 12, 16, 24, 32 (p-1, p-2, p-3, p-4, p-6, p-8)
- **Container**: max-w-7xl for main content
- **Question Cards**: max-w-3xl centered
- **Result Dashboards**: max-w-6xl

## Component Library

### Hero Section (Landing Page)
- **Height**: 85vh for impact
- **Layout**: Two-column (reversed for RTL): Right side text, left side illustration
- **Content**: Bold headline about scientific personality assessment, value proposition, primary CTA
- **Background**: Subtle gradient from primary to secondary (diagonal)
- **Illustration**: Abstract brain/personality visualization (colorful, modern, scientific)

### Navigation
- **Style**: Transparent overlay on hero, solid white/dark on scroll
- **Elements**: Logo (right), nav links (center), language toggle + CTA button (left)
- **Mobile**: Hamburger menu (left side for RTL)

### Question Cards
- **Design**: Elevated cards (shadow-lg) with rounded-xl borders
- **Layout**: Single question per view with 5-7 answer options
- **Answer Options**: Radio buttons with custom styling, large tap targets (min-h-16)
- **Progress**: Linear progress bar at top (0-100%) with step counter
- **Navigation**: Previous/Next buttons (Next disabled until answer selected)

### Test Selection Cards
- **Grid**: 1 column mobile, 2-3 columns desktop (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- **Card Design**: Hover elevation, icon at top, title, description, duration estimate, "ابدأ الاختبار" button
- **Icons**: Use Heroicons for test types (academic-cap, briefcase, user-group)

### Results Dashboard
- **Layout**: Multi-section vertical flow
- **Hero Results**: Large circular score display with color-coded percentile
- **Trait Breakdown**: Radar chart (primary) + horizontal bar charts (secondary)
- **Detailed Analysis**: Accordion sections for each trait with expandable descriptions
- **AI Interpretation**: Distinct card with gradient border, icon indicator for AI-generated content
- **Share Section**: Social share buttons + download PDF option

### Charts & Visualizations
- **Library**: Chart.js via CDN
- **Radar Chart**: 5-point for Big Five, semi-transparent fills, bold outlines
- **Bar Charts**: Horizontal bars with gradient fills matching trait colors
- **Animations**: Subtle entrance animations (opacity + scale), no distracting loops

### Forms (Optional Future Features)
- **Input Fields**: Outlined style with floating labels (Material Design)
- **Dark Mode**: Consistent background fills (not transparent)
- **Validation**: Inline error messages below fields

### CTAs & Buttons
- **Primary**: Filled buttons with primary color, rounded-lg, px-8 py-4
- **Secondary**: Outlined buttons with hover background
- **On Images**: Blurred background (backdrop-blur-md), no hover states
- **Icon Buttons**: Circular, min-w-12 min-h-12 for accessibility

## Page-Specific Guidelines

### Landing Page Sections
1. **Hero** (85vh): Illustration + headline + CTA
2. **Trust Indicators** (py-16): Scientific badges, user count, research citations
3. **Test Overview** (py-24): 3-column grid explaining Big Five/MBTI/DISC
4. **How It Works** (py-20): 4-step process with icons and numbers
5. **Sample Results** (py-24): Preview of result dashboard (blurred for intrigue)
6. **Social Proof** (py-16): 3-column testimonials with avatars
7. **FAQ** (py-20): Accordion-style, 6-8 common questions
8. **Final CTA** (py-32): Centered, simplified repeat of hero CTA

### Test Interface
- **Minimal Header**: Logo + progress + exit button only
- **Focused View**: Single card centered, minimal distractions
- **Background**: Subtle pattern or very light gradient
- **Footer**: Hidden during test, only "احفظ و أخرج" button if needed

### Results Page
- **Shareable**: Include branded header for screenshots
- **Print-Friendly**: Clean layout that works on PDF export
- **Dynamic**: AI commentary loaded asynchronously with loading state

## Images

### Hero Section
**Type**: Custom illustration or high-quality abstract image
**Description**: Modern, colorful representation of personality/psychology - interconnected nodes, abstract brain, or people silhouettes with vibrant gradients. Should feel scientific yet approachable.
**Placement**: Left side of hero (50% width on desktop), full-width background on mobile
**Style**: Vibrant but not overwhelming, matches color palette

### Test Selection Cards
**Type**: Icon-based (no images needed)
**Icons**: Heroicons representing each test type

### Results Dashboard
**Type**: Generated charts only
**No hero image needed** - focus on data visualization

## Animations
- **Minimal Use**: Only for micro-interactions and data reveals
- **Question Transitions**: Subtle slide + fade (200ms)
- **Result Reveals**: Counting animations for scores (1000ms)
- **Chart Animations**: Progressive draw-in on scroll into view (800ms)
- **No**: Parallax, continuous animations, or distracting effects

## Accessibility
- **ARIA Labels**: Complete labeling for screen readers in Arabic
- **Keyboard Navigation**: Full test completable without mouse
- **Focus Indicators**: High-contrast outlines on interactive elements
- **Text Contrast**: WCAG AAA compliance for all text
- **RTL Compatibility**: Proper reading order and navigation flow

**Design Philosophy**: Scientific credibility through clean, structured layouts + emotional engagement through color, typography, and meaningful data visualization. Every element serves user understanding and trust-building.