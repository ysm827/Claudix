<template>
  <div class="cursor-settings-sidebar">
    <div class="cursor-settings-sidebar-header">
      <div class="cursor-settings-sidebar-avatar">
        <img :src="avatarUrl" alt="Avatar" class="cursor-settings-sidebar-avatar-img" />
      </div>
      <div class="cursor-settings-sidebar-header-content">
        <p class="cursor-settings-sidebar-header-email">Claudix@cometix.dev</p>
        <p class="cursor-settings-sidebar-header-plan">Ultra Plan</p>
      </div>
    </div>
    <div class="cursor-settings-sidebar-content">
      <div>
        <input
          type="text"
          placeholder="Search settings ⌘F"
          style="width: 100%; padding: 6px; box-sizing: border-box; font-size: 12px; border: 1px solid color-mix(in srgb, var(--vscode-input-border) 50%, transparent); background: var(--vscode-input-background); color: var(--vscode-input-foreground); border-radius: 4px;"
        />
      </div>
      <div class="cursor-settings-sidebar-cells">
        <template v-for="tab in tabs" :key="tab.id">
          <div
            class="cursor-settings-sidebar-cell"
            :style="activeTab === tab.id ? 'background-color: var(--vscode-list-inactiveSelectionBackground); color: var(--vscode-list-inactiveSelectionForeground);' : 'background-color: transparent;'"
            @click="$emit('update:activeTab', tab.id)"
          >
            <span :class="['codicon', tab.icon]" style="font-size: 16px;"></span>
            <span class="cursor-settings-sidebar-cell-label" :title="tab.label">{{ tab.label }}</span>
          </div>
          <div v-if="tab.divider" class="w-full my-2">
            <hr class="cursor-settings-sidebar-divider">
          </div>
        </template>
      </div>
      <hr class="cursor-settings-sidebar-divider" />
      <div class="cursor-settings-sidebar-footer">
        <div class="cursor-settings-sidebar-cell">
          <span class="codicon codicon-book" style="font-size: 16px;"></span>
          <span class="cursor-settings-sidebar-cell-label" title="Docs">Docs</span>
          <span class="codicon codicon-link-external" style="font-size: 14px; color: var(--cursor-text-tertiary);"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import avatarUrl from '../../assets/claudix-avatar.png'

defineProps<{
  activeTab: string
  tabs: Array<{ id: string; label: string; icon: string; divider?: boolean }>
}>()

defineEmits<{
  (e: 'update:activeTab', id: string): void
}>()
</script>

<style scoped>
.cursor-settings-sidebar {
    box-sizing: border-box;
    display: flex;
    flex: 0 1 auto;
    flex-direction: column;
    gap: 12px;
    max-height: 100vh;
    min-width: 100px;
    overflow: hidden;
    padding-top: 48px;
    position: sticky;
    top: 0;
    width: clamp(100px,25%,200px)
}

.cursor-settings-sidebar-header {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 8px;
    overflow: hidden;
    width: 100%
}

.cursor-settings-sidebar-avatar {
    align-items: center;
    /* background: var(--cursor-bg-tertiary); */
    /* border-radius: 50%; */
    color: var(--cursor-text-tertiary);
    display: flex;
    flex-shrink: 0;
    height: 28px;
    justify-content: center;
    width: 28px
}

.cursor-settings-sidebar-avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* border-radius: 50%; */
}

.cursor-settings-sidebar-header-content {
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    font-size: 12px;
    font-weight: 400;
    gap: 2px;
    line-height: 16px;
    min-width: 0;
    overflow: hidden
}

.cursor-settings-sidebar-header-email {
    color: var(--cursor-text-primary)
}

.cursor-settings-sidebar-header-email,.cursor-settings-sidebar-header-plan {
    display: block;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%
}

.cursor-settings-sidebar-header-plan {
    color: var(--cursor-text-secondary)
}

.cursor-settings-sidebar-cells {
    display: flex;
    flex-direction: column;
    gap: 1px
}

.cursor-settings-sidebar-cell {
    align-items: center;
    border-radius: 4px;
    color: var(--cursor-text-secondary);
    cursor: pointer;
    display: flex;
    font-size: 12px;
    gap: 6px;
    line-height: 16px;
    padding: 4px 6px
}

.cursor-settings-sidebar-cell-label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
}

.cursor-settings-sidebar-cell:hover {
    background-color: var(--vscode-list-hoverBackground)!important
}

.cursor-settings-sidebar-cell-notification-badge {
    align-items: center;
    background-color: var(--vscode-editorWarning-foreground);
    border-radius: 8px;
    color: var(--vscode-editor-background);
    display: flex;
    font-size: 10px;
    font-weight: 500;
    height: 14px;
    justify-content: center;
    margin-left: auto;
    width: 14px
}

.cursor-settings-sidebar-divider {
    border: none;
    border-top: 1px solid var(--cursor-stroke-tertiary);
    margin: 0;
    width: 100%
}

.cursor-settings-sidebar-content {
    display: flex;
    flex-direction: column;
    gap: 8px
}
</style>
