# Next Steps & Ideas

## 1. Device Frame PNG for Mobile Preview
- Use a high-quality iPhone (or Android) device frame PNG with a transparent background.
- The frame should match the 395px preview width and be placed in the `public/` or `public/assets/` directory.
- The preview content (e.g., ReviewsModule stack) is absolutely positioned inside the frame, matching the device's screen area.
- This visually reinforces the mobile context for all component builds and demos.

## 2. Simulated Mobile Chrome Browser UI Overlay
- Overlay a simulated Chrome mobile browser UI (address bar, tabs, bottom nav, etc.) on top of the preview area.
- The overlay can be built with SVGs, PNGs, or styled React components for maximum flexibility.
- Simulate basic browser interactions (fake typing, tab switching, reload, etc.) for realism.
- The preview content remains fully interactive inside the "screen."
- This approach gives stakeholders and designers a near-real experience of how components look and behave in a real mobile browser.

---

**These are planning notes only. No implementation yet.** 