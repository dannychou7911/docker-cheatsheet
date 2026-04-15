<script setup lang="ts">
import TopicCard from '@/components/home/TopicCard.vue'
import { dockerTopic } from '@/data/docker'
import { k9sTopic } from '@/data/k9s'
import { gitTopic } from '@/data/git'
import { nanobananaTopic } from '@/data/nanobanana'

function countItems(topic: typeof dockerTopic) {
  return topic.sections.reduce(
    (sum, s) => sum + (s.commands?.length ?? 0) + (s.concepts?.length ?? 0),
    0,
  )
}

const topics = [
  {
    title: dockerTopic.title,
    description: dockerTopic.description,
    to: '/docker',
    sectionCount: dockerTopic.sections.length,
    commandCount: countItems(dockerTopic),
  },
  {
    title: k9sTopic.title,
    description: k9sTopic.description,
    to: '/k9s',
    sectionCount: k9sTopic.sections.length,
    commandCount: countItems(k9sTopic),
  },
  {
    title: gitTopic.title,
    description: gitTopic.description,
    to: '/git',
    sectionCount: gitTopic.sections.length,
    commandCount: countItems(gitTopic),
  },
  {
    title: nanobananaTopic.title,
    description: nanobananaTopic.description,
    to: '/nanobanana',
    sectionCount: nanobananaTopic.sections.length,
    commandCount: countItems(nanobananaTopic),
  },
]
</script>

<template>
  <div class="max-w-4xl mx-auto px-4 py-16">
    <h1 class="text-4xl font-bold text-dock-text mb-2">Cheatsheet</h1>
    <p class="text-dock-muted mb-10">開發者常用指令速查表</p>
    <div class="grid gap-4 sm:grid-cols-2">
      <TopicCard
        v-for="topic in topics"
        :key="topic.to"
        v-bind="topic"
      />
    </div>
  </div>
</template>
