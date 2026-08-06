/**
 * @file src/components/layouts/index.ts
 *
 * Barrel export for all layout components.
 * Import from "@/layouts" instead of deep paths.
 *
 * @example
 * import { SiteLayout, Container, Section } from "@/layouts";
 */

export { Container } from "./container";
export type { ContainerSize } from "./container";

export { SiteLayout } from "./site-layout";
export { SiteHeader } from "./site-header";
export { SiteFooter } from "./site-footer";

export {
  PageWrapper,
  PageHeader,
  PageContent,
  Section,
  SectionHeader,
} from "./page-wrapper";
