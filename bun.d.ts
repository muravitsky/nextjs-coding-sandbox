/// <reference types="bun-types" />

import type { TestingLibraryMatchers } from "@testing-library/jest-dom/matchers";

declare module "bun:test" {
  // Merge @testing-library/jest-dom custom matchers into bun's Matchers
  interface Matchers<R> extends TestingLibraryMatchers<R, void> {}
}
