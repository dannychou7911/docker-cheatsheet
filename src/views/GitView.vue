<script setup lang="ts">
import { gitTopic } from '@/data/git'
import { useSearch } from '@/composables/use-search'
import { useToc } from '@/composables/use-toc'
import { useMobileSidebar } from '@/composables/use-mobile-sidebar'
import HeroSection from '@/components/cheatsheet/HeroSection.vue'
import SearchInput from '@/components/cheatsheet/SearchInput.vue'
import SectionBlock from '@/components/cheatsheet/SectionBlock.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import MobileHeader from '@/components/layout/MobileHeader.vue'
import BackToTop from '@/components/layout/BackToTop.vue'

const { query, filteredSections } = useSearch(gitTopic.sections)
const { activeId } = useToc(gitTopic.sections)
const { isOpen, toggle, close } = useMobileSidebar()

function handleNavigate(id: string) {
  close()
  const el = document.getElementById(id)
  el?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <MobileHeader :title="gitTopic.title" @toggle-sidebar="toggle" />

  <Transition name="fade">
    <div
      v-if="isOpen"
      class="lg:hidden fixed inset-0 z-40 bg-black/50"
      @click="close"
    />
  </Transition>

  <Transition name="slide">
    <aside
      v-if="isOpen"
      class="lg:hidden fixed top-0 left-0 z-50 w-64 h-full bg-dock-bg border-r border-dock-surface2 p-4 pt-16 overflow-y-auto"
    >
      <Sidebar
        :sections="gitTopic.sections"
        :active-id="activeId"
        @navigate="handleNavigate"
      />
    </aside>
  </Transition>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="lg:flex lg:gap-8">
      <div class="hidden lg:block">
        <Sidebar
          :sections="gitTopic.sections"
          :active-id="activeId"
          @navigate="handleNavigate"
        />
      </div>

      <div class="flex-1 min-w-0">
        <HeroSection :title="gitTopic.heroTitle" :desc="gitTopic.heroDesc" />

        <div class="mb-8">
          <SearchInput v-model="query" />
        </div>

        <SectionBlock
          v-for="section in filteredSections"
          :key="section.id"
          :section="section"
        />

        <div v-if="filteredSections.length === 0" class="text-center py-16">
          <p class="text-dock-dim text-lg">沒有找到符合的指令或概念</p>
          <p class="text-dock-dim text-sm mt-2">試試其他關鍵字？</p>
        </div>
      </div>
    </div>
  </div>

  <BackToTop />
</template>
