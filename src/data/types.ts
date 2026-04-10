export interface ExampleLine {
  type: 'comment' | 'command'
  text: string
}

export interface Flag {
  flag: string
  desc: string
}

export interface Command {
  cmd: string
  syntax: string
  desc: string
  examples: ExampleLine[]
  flags?: Flag[]
  copyText?: string
}

export interface Concept {
  title: string
  desc: string
  details?: string[]
  diagram?: string
}

export type SectionColor = 'accent' | 'green' | 'purple' | 'yellow' | 'orange' | 'red' | 'dim'

export interface Section {
  id: string
  title: string
  color: SectionColor
  commands?: Command[]
  concepts?: Concept[]
}

export interface CheatsheetTopic {
  id: string
  title: string
  description: string
  heroTitle: string
  heroDesc: string
  sections: Section[]
}
