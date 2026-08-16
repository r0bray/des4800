---
title: "Getting Started with Plasticity"
description: "Learn the basics of Plasticity 3D modeling software and start creating your first designs."
author: "Rob Ray"
---

Welcome to 3D modeling in CAD with Plasticity!

Use the links below to jump to a section on this page and watch the embedded tutorials as you go.

## On this page

- [What is Plasticity?](#what-is-plasticity)
- [NURBS vs Mesh Modeling](#nurbs-vs-mesh-modeling)
- [Install and license](#step-1-install-plasticity-and-apply-for-an-academic-license)
- [Interface overview](#plasticity-interface-overview)
- [First modeling exercise](#first-modeling-exercise)
- [Key features](#key-features)
- [Next steps](#next-steps)

## What is Plasticity?

Plasticity is a modern 3D modeling CAD tool that combines [NURBS](https://doc.plasticity.xyz/cad-essentials/nurbs-overview) modeling with a pretty intuitive interface. Plasticity is great for product design and concept development. Many people coming from design fields and Blender backgrounds find Plasticity easier to use than other CAD tools such as Autodesk Fusion, OnShape, Solidworks, or FreeCAD.

## NURBS vs Mesh Modeling

NURBS (Non-Uniform Rational B-Splines) and mesh modeling are two different ways of describing 3D form. Mesh tools like Blender represent surfaces as a network of polygons—triangles and quads—which is excellent for organic sculpting, animation, and rendering, but edges are approximate and can get faceted when you zoom in or export for manufacturing. NURBS, which Plasticity and [Rhino](https://www.rhino3d.com/) use, define surfaces with precise mathematical curves, so dimensions stay exact, fillets and offsets stay clean, and models translate reliably to CAD, CAM, and fabrication. In short: meshes are great for gaming and sculptural work. NURBS are better when you need accuracy for product design and making physical parts. If you'd like to learn more, check out [this video about NURBS](https://www.youtube.com/watch?v=5nkqVgxfTMQ).

## Step 1: Install Plasticity and apply for an academic license

1. Download and install Plasticity at [plasticity.xyz](https://plasticity.xyz).
2. Use your _university email address_ to contact Plasticity support at [contact@plasticity.xyz](mailto:contact@plasticity.xyz) for an academic license token. 🚨 This is not an automated process so this could take a few days. _Do not wait until the last minute_.
3. Launch the app and get started with the free 30 day trial.
4. When you get your academic license from Plasticity support, enter your license token.

## Plasticity interface overview

Watch this beginner overview of the UI, shortcuts, and modeling workflow.

<div class="video-embed">
  <iframe
    src="https://www.youtube.com/embed/9cgBK8ljH1k"
    title="Getting Started with Plasticity for Beginners"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
  ></iframe>
</div>

After the video:

1. Familiarize yourself with the viewport and outliner
2. Learn the basic keyboard shortcuts (view, select, move, rotate, scale)
3. Open the command search and try a few common tools

Jump back to the [top of this page](#on-this-page) anytime.

## First modeling exercise

Build a simple solid with curves, extrude, boolean difference, and fillets. Follow along with this short exercise:

<div class="video-embed">
  <iframe
    src="https://www.youtube.com/embed/Kagd1WNfWXY"
    title="Plasticity Direct Modeling: Simple 3D CAD Part in Minutes"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
  ></iframe>
</div>

Practice checklist:

1. Start with a center rectangle and circle
2. Extrude planar geometry into a solid
3. Cut material with a difference operation
4. Add fillets or chamfers

For another walkthrough of install, UI, and early workflow, watch this crash-course intro:

<div class="video-embed">
  <iframe
    src="https://www.youtube.com/embed/aPtMacvH_10"
    title="How To Use Plasticity 3D — Beginner Crash Course Part 1"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
  ></iframe>
</div>

## Key features

- Fast and responsive interface
- Powerful NURBS modeling tools
- Intuitive keyboard shortcuts
- Clean and modern UI
- Export to various formats

## Next steps

1. Complete the [first modeling exercise](#first-modeling-exercise) without pausing the video
2. Revisit the [interface overview](#interface-overview) if any shortcuts feel unclear
3. Start a small object of your own and bring it to class

### How embeds and anchors work in these posts

Markdown posts can include:

- **Anchor links** — headings automatically get IDs, so you can link with `[Label](#heading-id)` (for example `[Key features](#key-features)`).
- **YouTube embeds** — paste a responsive iframe using the `/embed/VIDEO_ID` URL inside a `video-embed` wrapper, as shown in the sections above.

Example embed pattern to copy:

```html
<div class="video-embed">
  <iframe
    src="https://www.youtube.com/embed/VIDEO_ID"
    title="Descriptive title"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen
    loading="lazy"
    referrerpolicy="strict-origin-when-cross-origin"
  ></iframe>
</div>
```
