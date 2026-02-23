import { JSDOM } from "jsdom";
import { expect } from "bun:test";
import * as matchers from "@testing-library/jest-dom/matchers";

// Set up a full DOM environment via jsdom so React Testing Library works
const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
  url: "http://localhost/",
  pretendToBeVisual: true,
});

const { window } = dom;

// Assign globals that React and @testing-library/react need
Object.assign(globalThis, {
  window,
  document: window.document,
  navigator: window.navigator,
  location: window.location,
  // DOM constructors
  Node: window.Node,
  Element: window.Element,
  HTMLElement: window.HTMLElement,
  SVGElement: window.SVGElement,
  Text: window.Text,
  Comment: window.Comment,
  DocumentFragment: window.DocumentFragment,
  NodeList: window.NodeList,
  // Events
  Event: window.Event,
  MouseEvent: window.MouseEvent,
  KeyboardEvent: window.KeyboardEvent,
  CustomEvent: window.CustomEvent,
  FocusEvent: window.FocusEvent,
  InputEvent: window.InputEvent,
  PointerEvent: window.PointerEvent,
  // Observers
  MutationObserver: window.MutationObserver,
  // Style
  getComputedStyle: window.getComputedStyle.bind(window),
  CSSStyleSheet: window.CSSStyleSheet,
  // Animation
  requestAnimationFrame: (cb: FrameRequestCallback) => setTimeout(cb, 16),
  cancelAnimationFrame: clearTimeout,
});

// Extend bun:test's expect with @testing-library/jest-dom matchers
expect.extend(matchers);
