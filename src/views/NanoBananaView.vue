<script setup lang="ts">
import { ref } from 'vue'
import { nanobananaTopic } from '@/data/nanobanana'
import { useSearch } from '@/composables/use-search'
import { useToc } from '@/composables/use-toc'
import { useMobileSidebar } from '@/composables/use-mobile-sidebar'
import HeroSection from '@/components/cheatsheet/HeroSection.vue'
import SearchInput from '@/components/cheatsheet/SearchInput.vue'
import SectionBlock from '@/components/cheatsheet/SectionBlock.vue'
import Sidebar from '@/components/layout/Sidebar.vue'
import MobileHeader from '@/components/layout/MobileHeader.vue'
import BackToTop from '@/components/layout/BackToTop.vue'
import PromptBuilder from '@/components/nanobanana/PromptBuilder.vue'

const activeTab = ref<'cheatsheet' | 'builder'>('cheatsheet')

const { query, filteredSections } = useSearch(nanobananaTopic.sections)
const { activeId } = useToc(nanobananaTopic.sections)
const { isOpen, toggle, close } = useMobileSidebar()

function handleNavigate(id: string) {
  close()
  const el = document.getElementById(id)
  el?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <MobileHeader :title="nanobananaTopic.title" @toggle-sidebar="toggle" />

  <!-- Mobile sidebar overlay -->
  <Transition name="fade">
    <div
      v-if="isOpen"
      class="lg:hidden fixed inset-0 z-40 bg-black/50"
      @click="close"
    />
  </Transition>

  <!-- Mobile sidebar drawer -->
  <Transition name="slide">
    <aside
      v-if="isOpen"
      class="lg:hidden fixed top-0 left-0 z-50 w-64 h-full bg-dock-bg border-r border-dock-surface2 p-4 pt-16 overflow-y-auto"
    >
      <Sidebar
        :sections="nanobananaTopic.sections"
        :active-id="activeId"
        @navigate="handleNavigate"
      />
    </aside>
  </Transition>

  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    <div class="lg:flex lg:gap-8">
      <!-- Desktop sidebar (only for cheatsheet tab) -->
      <div v-if="activeTab === 'cheatsheet'" class="hidden lg:block">
        <Sidebar
          :sections="nanobananaTopic.sections"
          :active-id="activeId"
          @navigate="handleNavigate"
        />
      </div>

      <!-- Main content -->
      <div class="flex-1 min-w-0">
        <HeroSection :title="nanobananaTopic.heroTitle" :desc="nanobananaTopic.heroDesc" />

        <!-- Tab switcher -->
        <div class="flex gap-1 mb-8 bg-dock-surface rounded-lg p-1 max-w-xs">
          <button
            class="flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            :class="activeTab === 'cheatsheet'
              ? 'bg-dock-accent text-white'
              : 'text-dock-muted hover:text-dock-text'"
            @click="activeTab = 'cheatsheet'"
          >
            Cheatsheet
          </button>
          <button
            class="flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors"
            :class="activeTab === 'builder'
              ? 'bg-dock-accent text-white'
              : 'text-dock-muted hover:text-dock-text'"
            @click="activeTab = 'builder'"
          >
            指令產生器
          </button>
        </div>

        <!-- Cheatsheet tab -->
        <template v-if="activeTab === 'cheatsheet'">
          <div class="mb-8">
            <SearchInput v-model="query" />
          </div>

          <SectionBlock
            v-for="section in filteredSections"
            :key="section.id"
            :section="section"
          />

          <div v-if="filteredSections.length === 0" class="text-center py-16">
            <p class="text-dock-dim text-lg">沒有找到符合的指令</p>
            <p class="text-dock-dim text-sm mt-2">試試其他關鍵字？</p>
          </div>
        </template>

        <!-- Prompt builder tab -->
        <template v-if="activeTab === 'builder'">
          <PromptBuilder />
        </template>
      </div>
    </div>
  </div>

  <BackToTop />
</template>
