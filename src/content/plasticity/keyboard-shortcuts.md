---
title: "Plasticity Keyboard Shortcuts"
description: "A practical reference to the main Plasticity keyboard shortcuts, with steps and video clips for each command."
author: "Rob Ray"
---

<!-- markdownlint-disable MD033 -->

Plasticity is fastest when you keep one hand on the keyboard and the other on the mouse. This page covers the main default shortcuts used for navigation, selection, transforms, sketching, and solid modeling.

> These shortcuts follow Plasticity 2026.1 defaults. You can view or change a shortcut by pressing **F**, finding the command, right-clicking it, and assigning a new key. See the [official command and shortcut list](https://doc.plasticity.xyz/all-commands) for every available command.

## First, what do I want to select?

Before starting an operation, ask yourself: **“First, what do I want to select?”** Decide whether you need a control point, edge, face, entire solid, or everything. Choose the matching selection mode, select the geometry, and then run the operation you want, such as Move, Rotate, Extrude, or Fillet.

This selection-first habit prevents accidental edits and makes Plasticity much easier to control:

1. Decide what kind of geometry you need.
2. Choose its selection mode with `1`, `2`, `3`, `4`, or `5`.
3. Select the geometry.
4. Run the operation.

### Example: Round an edge

Ask, “First, what do I want to select?” You want to round an **edge**, so press `2` for [Edge Selection](#edge-selection). Select the edge, then press `B` to run [Fillet](#fillet) and enter the desired radius.

### Example: Move one face

You want to move a **face**, not the entire object. Press `3` for [Face Selection](#face-selection), select the face, then press `G` to [Move](#move) it. Choose an axis constraint if the face must move in a precise direction.

### Example: Scale an entire solid

You want to resize the **entire solid**, so press `4` for [Solid Selection](#solid-selection). Select the solid, then press `S` to [Scale](#scale) it uniformly or along a chosen axis.

## Shortcut index

### Commands and selection

These shortcuts help you find commands and control which kind of geometry Plasticity can select. Use selection modes to avoid accidentally selecting a face, edge, control point, or entire solid when you intended to edit something else.

- [Command Palette `F`](#command-palette)
- [Control Point Selection `1`](#control-point-selection)
- [Edge Selection `2`](#edge-selection)
- [Face Selection `3`](#face-selection)
- [Solid Selection `4`](#solid-selection)
- [All Selection Modes `5`](#all-selection-modes)
- [Select All `A`](#select-all)
- [Deselect All `Esc`](#deselect-all)

### Transform and duplicate

Transform shortcuts change the position, orientation, size, or number of selected objects. These are core modeling controls, and several use the same keys as Blender.

- [Move (Grab) `G`](#move)
- [Rotate `R`](#rotate)
- [Scale `S`](#scale)
- [Duplicate `Shift+D`](#duplicate)
- [Mirror `Alt+X`](#mirror)
- [Dimension `=`](#dimension)
- [Measure Distance `Ctrl+=`](#measure-distance)

### Sketch and solid modeling

These shortcuts create and modify curves, surfaces, and solids. They cover the commands you will use most often when turning a 2D profile into a precise three-dimensional form.

- [Line `Shift+A`](#line)
- [Trim `T`](#trim)
- [Extrude `E`](#extrude)
- [Fillet or Chamfer `B`](#fillet)
- [Boolean `Q`](#boolean)
- [Cut `C`](#cut)
- [Offset `O`](#offset)
- [Loft `L`](#loft)
- [Pipe `P`](#pipe)
- [Sweep `Shift+P`](#sweep)
- [Join `J`](#join)
- [Unjoin `Alt+J`](#unjoin)
- [Isoparam `Ctrl+R`](#isoparam)

### Visibility and navigation

Visibility shortcuts reduce screen clutter, while navigation shortcuts help you inspect a model from a precise viewpoint. Use them to focus on the geometry relevant to your current task.

- [Hide Selected `H`](#hide-selected)
- [Hide Unselected `Shift+H`](#hide-unselected)
- [Unhide All `Alt+H`](#unhide-all)
- [Isolate `Period`](#isolate)
- [Focus Selection `Slash`](#focus-selection)
- [Front View `Numpad 1`](#front-view)
- [Right View `Numpad 3`](#right-view)
- [Top View `Numpad 7`](#top-view)
- [Toggle Perspective/Orthographic `Numpad 5`](#toggle-projection)

### General editing

These familiar editing shortcuts manage history, deletion, repeated operations, and saving. Learning them prevents unnecessary trips through menus and makes experimentation safer.

- [Undo `Ctrl+Z`](#undo)
- [Redo `Ctrl+Shift+Z`](#redo)
- [Repeat Last Command `Shift+R`](#repeat-last-command)
- [Delete or Dissolve `X`](#delete-or-dissolve)
- [Save `Ctrl+S`](#save)

## Command Palette

**Keyboard shortcut:** `F`

Use the Command Palette to find any Plasticity command without remembering where it lives in the interface. It also shows the command's current shortcut and lets you assign a different one.

Steps:

1. Press `F`.
2. Begin typing the name of a command.
3. Choose the command from the results.
4. To change its shortcut, right-click the command and assign a key.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">See All Commands in “Getting Started with Plasticity for Beginners”</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=652"
      title="See All Commands in “Getting Started with Plasticity for Beginners”"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Control Point Selection

**Keyboard shortcut:** `1`

Limits selection to control points. Use this mode when editing the shape of a curve or NURBS surface through its control structure.

Steps:

1. Press `1` to enable Control Point selection.
2. Select one or more control points.
3. Use `G`, `R`, or `S` to edit them.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Interface and selection overview</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=244"
      title="Interface and selection overview"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Edge Selection

**Keyboard shortcut:** `2`

Limits selection to edges. Edge selection is commonly used before filleting, chamfering, offsetting, joining, or inspecting a model.

Steps:

1. Press `2`.
2. Click an edge, or drag a box around several edges.
3. Run an edge-compatible command such as `B` or `O`.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Interface and selection overview</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=244"
      title="Interface and selection overview"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Face Selection

**Keyboard shortcut:** `3`

Limits selection to faces. Select faces when moving or rotating part of a solid, extruding, offsetting, deleting, or applying direct edits.

Steps:

1. Press `3`.
2. Select the face or faces you want to edit.
3. Start a command such as `G`, `R`, `E`, or `O`.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Moving faces in Plasticity</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=1158"
      title="Moving faces in Plasticity"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Solid Selection

**Keyboard shortcut:** `4`

Limits selection to complete solids or sheets. Use this when transforming, duplicating, hiding, or combining whole bodies.

Steps:

1. Press `4`.
2. Select the solid or sheet.
3. Apply the desired transform or modeling command.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Interface and selection overview</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=244"
      title="Interface and selection overview"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## All Selection Modes

**Keyboard shortcut:** `5`

Enables all selection modes at once. Plasticity 2026.1 moved this default from `Tab` to `5`.

Steps:

1. Press `5`.
2. Select control points, edges, faces, or solids as needed.
3. Press `1`, `2`, `3`, or `4` when you need to restrict selection again.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Selection modes in the Plasticity interface</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=244"
      title="Selection modes in the Plasticity interface"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Select All

**Keyboard shortcut:** `A`

Selects all currently selectable objects. The result depends on which selection modes are active.

Steps:

1. Choose a selection mode with `1`–`5`.
2. Press `A`.
3. Apply a command to the selection.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Interface and selection overview</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=244"
      title="Interface and selection overview"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Deselect All

**Keyboard shortcut:** `Esc`

Clears the current selection. `Esc` can also be used to cancel or back out of many active commands.

Steps:

1. Press `Esc` once to cancel the current command when one is active.
2. Press `Esc` again if needed to clear the selection.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Interface and essential shortcuts</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=244"
      title="Interface and essential shortcuts"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Move

Also called **Grab**.

Keyboard shortcut: Move is `G` for Grab. Blender also uses the `G` keyboard shortcut.

Steps:

1. First, select the object you want to grab with your mouse.
2. Next, press the `G` key and look in the lower-right corner to see your other options.
3. Choose an axis or plane constraint when you want to move in a specific direction.
4. Move the mouse or enter an exact distance, then click to confirm.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Learn Everything About Design, “Understanding Plasticity Modeling Theory for Beginners”: Move</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/sZLeEv30j3I?start=193"
      title="Learn Everything About Design, “Understanding Plasticity Modeling Theory for Beginners”: Move"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Rotate

Keyboard shortcut: Rotate is `R` for Rotate. Blender also uses the `R` keyboard shortcut.

Steps:

1. First, select the object or geometry you want to rotate.
2. Next, press the `R` key.
3. Look in the lower-right corner to choose a pivot, rotation axis, or other options.
4. Move the mouse or enter an exact angle, then click to confirm.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Learn Everything About Design, “Understanding Plasticity Modeling Theory for Beginners”: Rotate</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/sZLeEv30j3I?start=328"
      title="Learn Everything About Design, “Understanding Plasticity Modeling Theory for Beginners”: Rotate"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Scale

Keyboard shortcut: Scale is `S` for Scale. Blender also uses the `S` keyboard shortcut.

Steps:

1. First, select the object or geometry you want to resize.
2. Next, press the `S` key.
3. Look in the lower-right corner to choose uniform scaling or constrain the scale to an axis.
4. Move the mouse or enter an exact scale value, then click to confirm.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Learn Everything About Design, “Understanding Plasticity Modeling Theory for Beginners”: Scale</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/sZLeEv30j3I?start=374"
      title="Learn Everything About Design, “Understanding Plasticity Modeling Theory for Beginners”: Scale"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Duplicate

**Keyboard shortcut:** `Shift+D`

Creates an independent copy of the selected geometry and immediately lets you position it.

Steps:

1. Select one or more objects.
2. Press `Shift+D`.
3. Move the duplicate into position.
4. Click to confirm.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Duplicating objects in Plasticity</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=592"
      title="Duplicating objects in Plasticity"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Mirror

**Keyboard shortcut:** `Alt+X`

Creates mirrored geometry across a plane. Mirror is useful for symmetrical products and mechanical parts.

Steps:

1. Select the object or geometry to mirror.
2. Press `Alt+X`.
3. Choose or define the mirror plane.
4. Confirm the result.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Simple Plasticity part using mirror and direct modeling</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/Kagd1WNfWXY"
      title="Simple Plasticity part using mirror and direct modeling"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Dimension

**Keyboard shortcut:** `=`

Displays or modifies dimensions associated with selected geometry.

Steps:

1. Select a curve, edge, face, or dimensionable object.
2. Press `=`.
3. Enter the required value.
4. Confirm the dimension.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Creating precise curves and geometry</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=751"
      title="Creating precise curves and geometry"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Measure Distance

**Keyboard shortcut:** `Ctrl+=`

Measures the distance between selected points or geometry without changing the model.

Steps:

1. Press `Ctrl+=`.
2. Choose the first reference.
3. Choose the second reference.
4. Read the result shown by Plasticity.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Referencing geometry while creating curves</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=1390"
      title="Referencing geometry while creating curves"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Line

**Keyboard shortcut:** `Shift+A`

Starts the Line tool for drawing connected line segments.

Steps:

1. Press `Shift+A`.
2. Click to place the first point.
3. Click again to place each following point.
4. Use constraints or type values for precise geometry.
5. Finish the command when the profile is complete.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Creating curves in Plasticity</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=751"
      title="Creating curves in Plasticity"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Trim

**Keyboard shortcut:** `T`

Removes unwanted portions of intersecting curves.

Steps:

1. Select the curve segment you want to remove, or start Trim first.
2. Press `T`.
3. Click the segment bounded by intersections.
4. Confirm the result.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Creating and editing curves in Plasticity</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=751"
      title="Creating and editing curves in Plasticity"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Extrude

**Keyboard shortcut:** `E`

Extrudes curves, planar regions, or faces to create or modify sheets and solids.

Steps:

1. Select a closed planar region, curve, or face.
2. Press `E`.
3. Drag the extrusion or enter an exact distance.
4. Choose whether the result creates, joins, or cuts geometry.
5. Confirm the extrusion.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Extruding a solid in Plasticity</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=995"
      title="Extruding a solid in Plasticity"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Fillet

**Keyboard shortcut:** `B`

Rounds or bevels selected edges. The command options let you switch between a fillet and a chamfer.

Steps:

1. Press `2` and select one or more edges.
2. Press `B`.
3. Choose Fillet or Chamfer in the command options.
4. Drag or enter the radius/distance.
5. Confirm the result.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Adding fillets and chamfers</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=1128"
      title="Adding fillets and chamfers"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Boolean

**Keyboard shortcut:** `Q`

Combines solids using union, difference, intersection, or related Boolean operations.

Steps:

1. Select the solids involved in the operation.
2. Press `Q`.
3. Choose the target and tool bodies when prompted.
4. Select the Boolean mode.
5. Confirm the result.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Plasticity direct modeling with Boolean operations</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/Kagd1WNfWXY"
      title="Plasticity direct modeling with Boolean operations"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Cut

**Keyboard shortcut:** `C`

Cuts a solid or sheet with selected curves, faces, sheets, or solids.

Steps:

1. Select the cutting geometry and target.
2. Press `C`.
3. Review the generated regions or pieces.
4. Confirm the cut and remove unwanted pieces if necessary.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Creating cuts with direct modeling</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/Kagd1WNfWXY"
      title="Creating cuts with direct modeling"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Offset

**Keyboard shortcut:** `O`

Offsets planar curves, regions, face loops, or edges by a specified distance.

Steps:

1. Select the curve, region, face loop, or edge.
2. Press `O`.
3. Drag in the desired direction or type a distance.
4. Use the command options to adjust the offset behavior.
5. Confirm.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Offsetting edges of faces</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=1288"
      title="Offsetting edges of faces"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Loft

**Keyboard shortcut:** `L`

Creates a smooth surface or solid through two or more ordered profile curves or faces.

Steps:

1. Select the profiles in order.
2. Press `L`.
3. Adjust continuity, alignment, or seam options.
4. Confirm the loft.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Plasticity modeling workflow and surface creation</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=751"
      title="Plasticity modeling workflow and surface creation"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Pipe

**Keyboard shortcut:** `P`

Creates a pipe along a selected curve or edge.

Steps:

1. Select the path curve or edge.
2. Press `P`.
3. Set the radius and other pipe options.
4. Confirm the pipe.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Working with curves and modeling tools</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=751"
      title="Working with curves and modeling tools"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Sweep

**Keyboard shortcut:** `Shift+P`

Sweeps a profile region or curve along a path to create a surface or solid.

Steps:

1. Select the profile and path.
2. Press `Shift+P`.
3. Adjust orientation and continuity options.
4. Confirm the sweep.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Working with curves and modeling tools</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=751"
      title="Working with curves and modeling tools"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Join

**Keyboard shortcut:** `J`

Joins compatible curves or sheets whose endpoints or edges meet.

Steps:

1. Select the curves or sheets to combine.
2. Press `J`.
3. Review the result for gaps or unmatched edges.
4. Confirm.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Extruding and joining geometry</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=1228"
      title="Extruding and joining geometry"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Unjoin

**Keyboard shortcut:** `Alt+J`

Separates joined curves, faces, or shells into independent geometry.

Steps:

1. Select the joined geometry.
2. Press `Alt+J`.
3. Choose the faces, curves, or shells to separate.
4. Confirm.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Extruding and joining geometry</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=1228"
      title="Extruding and joining geometry"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Isoparam

**Keyboard shortcut:** `Ctrl+R`

Adds isoparametric curves to a surface, which can help divide or control surface topology.

Steps:

1. Select a surface or face.
2. Press `Ctrl+R`.
3. Position the isoparam.
4. Click to place it and confirm.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Using Isoparam and the Line Knife</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=1330"
      title="Using Isoparam and the Line Knife"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Hide Selected

**Keyboard shortcut:** `H`

Hides the selected objects so you can work without visual clutter.

Steps:

1. Select the objects to hide.
2. Press `H`.
3. Continue working on the visible geometry.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Plasticity interface overview</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=244"
      title="Plasticity interface overview"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Hide Unselected

**Keyboard shortcut:** `Shift+H`

Hides everything except the current selection.

Steps:

1. Select the objects you want to keep visible.
2. Press `Shift+H`.
3. Use `Alt+H` when you are ready to reveal everything.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Plasticity interface overview</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=244"
      title="Plasticity interface overview"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Unhide All

**Keyboard shortcut:** `Alt+H`

Reveals all hidden objects.

Steps:

1. Press `Alt+H`.
2. Check the outliner if an expected object remains unavailable; it may be locked rather than hidden.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Plasticity interface overview</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=244"
      title="Plasticity interface overview"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Isolate

**Keyboard shortcut:** `.` (Period)

Temporarily hides unselected objects and isolates the selection for focused editing.

Steps:

1. Select the object or objects you want to isolate.
2. Press `.`.
3. Press `.` again when you are ready to leave isolation.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Plasticity interface overview</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=244"
      title="Plasticity interface overview"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Focus Selection

**Keyboard shortcut:** `/` (Slash)

Frames the selected object in the viewport.

Steps:

1. Select an object, face, or other element.
2. Press `/`.
3. Continue orbiting or zooming around the focused selection.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Viewport and essential view shortcuts</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=244"
      title="Viewport and essential view shortcuts"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Front View

**Keyboard shortcut:** `Numpad 1`

Moves the camera to the Front orthographic view.

Steps:

1. Press `Numpad 1`.
2. Press `Numpad 5` if you need to toggle perspective or orthographic projection.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Viewport and essential view shortcuts</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=244"
      title="Viewport and essential view shortcuts"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Right View

**Keyboard shortcut:** `Numpad 3`

Moves the camera to the Right orthographic view.

Steps:

1. Press `Numpad 3`.
2. Use `Ctrl+Numpad 3` for the Left view.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Viewport and essential view shortcuts</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=244"
      title="Viewport and essential view shortcuts"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Top View

**Keyboard shortcut:** `Numpad 7`

Moves the camera to the Top orthographic view.

Steps:

1. Press `Numpad 7`.
2. Use `Ctrl+Numpad 7` for the Bottom view.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Viewport and essential view shortcuts</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=244"
      title="Viewport and essential view shortcuts"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Toggle Projection

**Keyboard shortcut:** `Numpad 5`

Switches the viewport between perspective and orthographic projection.

Steps:

1. Press `Numpad 5`.
2. Use orthographic projection for precise alignment and perspective for a more natural spatial view.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Viewport and essential view shortcuts</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=244"
      title="Viewport and essential view shortcuts"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Undo

**Keyboard shortcut:** `Ctrl+Z` on Windows/Linux or `Command+Z` on macOS

Reverses the most recent action.

Steps:

1. Press `Ctrl+Z` or `Command+Z`.
2. Repeat to move farther back through the edit history.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Plasticity beginner workflow</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k"
      title="Plasticity beginner workflow"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Redo

**Keyboard shortcut:** `Ctrl+Shift+Z` on Windows/Linux or `Command+Shift+Z` on macOS

Restores the most recently undone action.

Steps:

1. Press `Ctrl+Shift+Z` or `Command+Shift+Z`.
2. Repeat to move forward through the edit history.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Plasticity beginner workflow</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k"
      title="Plasticity beginner workflow"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Repeat Last Command

**Keyboard shortcut:** `Shift+R`

Runs the previous command again, which is useful for repetitive modeling operations.

Steps:

1. Complete a modeling command.
2. Make the next relevant selection.
3. Press `Shift+R` to repeat that command.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Plasticity beginner modeling workflow</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=751"
      title="Plasticity beginner modeling workflow"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Delete or Dissolve

**Keyboard shortcut:** `X`

Deletes selected objects or dissolves selected topology, depending on what is selected. Use `Shift+X` to delete a selected face.

Steps:

1. Choose the appropriate selection mode.
2. Select the object or topology.
3. Press `X`.
4. Use `Shift+X` when you specifically need to delete a face.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Direct editing in Plasticity</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=1158"
      title="Direct editing in Plasticity"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Save

**Keyboard shortcut:** `Ctrl+S` on Windows/Linux or `Command+S` on macOS

Saves the current Plasticity document.

Steps:

1. Press `Ctrl+S` or `Command+S`.
2. Choose a file name and location the first time you save.
3. Save frequently while modeling.

<div class="video-reference">
  <p class="video-reference-label">Video reference</p>
  <p class="video-reference-title">Plasticity installation and interface overview</p>
  <div class="video-embed">
    <iframe
      src="https://www.youtube-nocookie.com/embed/9cgBK8ljH1k?start=155"
      title="Plasticity installation and interface overview"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
      loading="lazy"
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  </div>
</div>

## Linking directly to a shortcut

Every shortcut above has a stable anchor. Link to one from another Markdown post using the post URL followed by its anchor:

```md
[Move in Plasticity](/plasticity/keyboard-shortcuts/#move)
[Rotate in Plasticity](/plasticity/keyboard-shortcuts/#rotate)
[Extrude in Plasticity](/plasticity/keyboard-shortcuts/#extrude)
```

You can also copy the section URL from your browser after selecting an item in the shortcut index.
