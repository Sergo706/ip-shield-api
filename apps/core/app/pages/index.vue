<template>
  <div>
    <WorkspaceLayerNote class="mb-8" />

    <UPageHero
      title="IP Shield Core"
      description="Core is now running as its own workspace app. It owns the live dashboard, auth wiring, server routes, and database-facing runtime." 
      :links="[{
        label: 'Run core from root',
        to: 'https://pnpm.io/workspaces',
        target: '_blank',
        trailingIcon: 'i-lucide-terminal',
        size: 'xl'
      }, {
        label: 'Shared layer enabled',
        to: '#features',
        target: '_blank',
        icon: 'i-lucide-layers-3',
        size: 'xl',
        color: 'neutral',
        variant: 'subtle'
      }]"
    />

    <UPageSection
      id="features"
      title="Core App First, Shared Layer Ready"
      description="This keeps the live app in apps/core while shared Nuxt pieces move into apps/shared/layer and can later be reused by apps/static."
      :features="[{
        icon: 'i-lucide-server',
        title: 'Core owns runtime concerns',
        description: 'Auth, Nitro plugins, Drizzle, and MySQL stay in the core app so the live service remains isolated from static content rebuilds.'
      }, {
        icon: 'i-lucide-layers-3',
        title: 'Nuxt layer is already wired',
        description: 'The banner above is auto-imported from apps/shared/layer through Nuxt extends so you can feel the split without a full migration yet.'
      }, {
        icon: 'i-lucide-package',
        title: 'pnpm catalogs pin shared versions',
        description: 'nuxt and auth-h3client can now be aligned from the workspace root while each app still declares what it actually uses.'
      }, {
        icon: 'i-lucide-file-code-2',
        title: 'Static can come later',
        description: 'When you add the static app, it can extend the same layer without dragging blog, docs, or SEO rebuilds into the live API deploy.'
      }, {
        icon: 'i-lucide-boxes',
        title: 'Shared utils still fit cleanly',
        description: 'Use apps/shared/utils as a plain workspace package for contracts, helpers, and non-Nuxt code, while the layer stays UI-focused.'
      }, {
        icon: 'i-lucide-shield-check',
        title: 'Auth package remains public npm',
        description: 'auth-h3client stays a regular dependency. pnpm just keeps the shared version policy predictable across workspace apps.'
      }]"
    />

    <UPageSection>
      <UPageCTA
        title="Core is workspace-ready"
        description="Run it from the repo root, keep the shared layer local, and add the static site later without changing the core deployment boundary."
        variant="subtle"
        :links="[{
          label: 'Workspace docs',
          to: 'https://pnpm.io/workspaces',
          target: '_blank',
          trailingIcon: 'i-lucide-arrow-right',
          color: 'neutral'
        }, {
          label: 'Layer docs',
          to: 'https://nuxt.com/docs/guide/going-further/layers',
          target: '_blank',
          icon: 'i-lucide-layers-3',
          color: 'neutral',
          variant: 'outline'
        }]"
      />
    </UPageSection>
  </div>
</template>
