<template>
  <SettingsTab title="General">
    <!-- Manage Account Section -->
    <SettingsSection>
      <SettingsSubSection>
        <SettingsCell label="Manage Account" description="Manage your account and billing">
          <template #trailing>
            <Button variant="tertiary" size="small">
              Open <div class="codicon codicon-link-external" style="font-size: 14px; color: var(--cursor-icon-secondary);"></div>
            </Button>
          </template>
        </SettingsCell>
        <SettingsCell label="Upgrade to Ultra" description="Run parallel agents, get maximum value with 20x usage limits, and early access to advanced features." :divider="true">
          <template #trailing>
            <Button variant="primary" size="small">
              <template #icon>
                <div class="codicon codicon-arrow-circle-up" style="font-size: 12px;"></div>
              </template>
              Upgrade
            </Button>
          </template>
        </SettingsCell>
      </SettingsSubSection>
    </SettingsSection>

    <!-- Preferences Section -->
    <SettingsSection title="Preferences">
      <SettingsSubSection>
        <SettingsCell label="Default Layout" description="Modify your default layout to focus Agent or the editor">
          <template #trailing>
            <!-- Layout Toggle Mockup -->
            <div class="flex gap-3 py-[3px] justify-center items-center">
                <div class="flex flex-col items-center gap-2 cursor-pointer" style="opacity: 0.4;">
                    <div class="flex flex-col items-center justify-center rounded-md transition-colors" style="outline: white solid 1.5px; height: 36px; width: 52px; background: linear-gradient(rgb(73, 96, 157) 0%, rgb(240, 181, 99) 99.52%);">
                        <div class="flex flex-col justify-center items-center overflow-hidden box-border rounded-[3.5px] w-[42px] h-[27px] bg-white/60">
                            <!-- SVG Mockup for Agent Layout -->
                            <div style="width: 18px; height: 6px; background: white; opacity: 0.55;"></div>
                            <div style="width: 15px; height: 3px; background: #7C818E; opacity: 0.34; margin-top: 4px; border-radius: 99px;"></div>
                        </div>
                    </div>
                    <span class="text-xs text-[var(--cursor-text-secondary)]">Agent</span>
                </div>
                <div class="flex flex-col items-center gap-2 cursor-pointer" style="opacity: 1;">
                    <div class="flex items-center justify-center rounded-md transition-colors" style="outline: white solid 1.5px; height: 36px; width: 52px; background: linear-gradient(rgb(73, 96, 157) 0%, rgb(240, 181, 99) 99.52%);">
                        <div class="flex items-center overflow-hidden box-border rounded-[3.5px] w-[42px] h-[27px] bg-white/60">
                            <!-- SVG Mockup for Editor Layout -->
                            <div class="flex flex-col gap-[2px] p-[2px]">
                                <div style="width: 6px; height: 1.5px; background: #7C818E; border-radius: 99px;"></div>
                                <div style="width: 6px; height: 1.5px; background: #7C818E; border-radius: 99px;"></div>
                                <div style="width: 6px; height: 1.5px; background: #7C818E; border-radius: 99px;"></div>
                            </div>
                        </div>
                    </div>
                    <span class="text-xs text-[var(--cursor-text-secondary)]">Editor</span>
                </div>
            </div>
          </template>
        </SettingsCell>
        <SettingsCell label="Editor Settings" description="Configure font, formatting, minimap and more" :divider="true">
          <template #trailing>
            <Button variant="tertiary" size="small">Open</Button>
          </template>
        </SettingsCell>
        <SettingsCell label="Keyboard Shortcuts" description="Configure keyboard shortcuts" :divider="true">
          <template #trailing>
            <Button variant="tertiary" size="small">Open</Button>
          </template>
        </SettingsCell>
        <SettingsCell label="Import Settings from VS Code" description="Import settings, extensions, and keybindings from VS Code" :divider="true">
          <template #trailing>
            <Button variant="tertiary" size="small">Import</Button>
          </template>
        </SettingsCell>
      </SettingsSubSection>

      <!-- Reset Sub-Section -->
      <SettingsSubSection>
        <SettingsCell label="Reset &quot;Don’t Ask Again&quot; Dialogs" description="See warnings and tips that you’ve hidden">
          <template #trailing>
            <Button variant="tertiary" size="small">Show</Button>
          </template>
        </SettingsCell>
      </SettingsSubSection>
    </SettingsSection>

    <!-- Notifications Section -->
    <SettingsSection title="Notifications">
      <SettingsSubSection>
        <SettingsCell label="System Notifications" description="Show system notifications when Agent completes or needs attention">
          <template #trailing>
            <div class="cursor-settings-cell-switch-container">
              <Switch
                :model-value="settings.systemNotifications"
                @update:model-value="updateSetting('systemNotifications', $event)"
                title="System Notifications"
              />
            </div>
          </template>
        </SettingsCell>
        <SettingsCell label="Menu Bar Icon" description="Show Cursor in menu bar" :divider="true">
          <template #trailing>
            <div class="cursor-settings-cell-switch-container">
              <Switch
                :model-value="settings.menuBarIcon"
                @update:model-value="updateSetting('menuBarIcon', $event)"
                title="Menu Bar Icon"
              />
            </div>
          </template>
        </SettingsCell>
        <SettingsCell label="Completion Sound" description="Play a sound when Agent finishes responding" :divider="true">
          <template #trailing>
            <div class="cursor-settings-cell-switch-container">
              <Switch
                :model-value="settings.completionSound"
                @update:model-value="updateSetting('completionSound', $event)"
                title="Completion Sound"
              />
            </div>
          </template>
        </SettingsCell>
      </SettingsSubSection>
    </SettingsSection>

    <!-- Privacy Section -->
    <SettingsSection title="Privacy">
      <SettingsSubSection>
        <SettingsCell description="Your code data will not be trained on or used to improve the product. We will not store your code.">
          <template #label>
            <div><div class="codicon codicon-lock" style="font-size: 12px; margin-right: 2px;"></div>Privacy Mode (Legacy)</div>
          </template>
          <template #trailing>
            <Dropdown
              :model-value="settings.privacyMode"
              @update:model-value="updateSetting('privacyMode', $event)"
              :options="privacyOptions"
              menu-align="right"
            >
              <template #trigger="{ selected }">
                {{ selected?.label || 'Privacy Mode (Legacy)' }}
              </template>
            </Dropdown>
          </template>
        </SettingsCell>
        <SettingsCell :divider="true">
          <template #description>
            Privacy Mode (Legacy) is enabled. Background Agent and some features not available.
            <div style="margin-top: 6px;"><span style="cursor: pointer; color: var(--vscode-textLink-foreground);">Switch to Privacy Mode</span></div>
          </template>
        </SettingsCell>
      </SettingsSubSection>
    </SettingsSection>

    <div class="cursor-settings-tab-footer-actions">
      <Button variant="tertiary" size="small">Log Out</Button>
    </div>
  </SettingsTab>
</template>

<script setup lang="ts">
import SettingsTab from '../SettingsTab.vue'
import SettingsSection from '../SettingsSection.vue'
import SettingsSubSection from '../SettingsSubSection.vue'
import SettingsCell from '../SettingsCell.vue'
import Switch from '../../Common/Switch.vue'
import Dropdown from '../../Common/Dropdown.vue'
import Button from '../../Common/Button.vue'
import { useSettingsStore } from '../../../composables/useSettingsStore'

const { settings, updateSetting } = useSettingsStore()

const privacyOptions = [
  { label: 'Share Data', value: 'share', description: 'Improve Cursor for everyone' },
  { label: 'Privacy Mode', value: 'privacy', description: 'No training. Code may be stored for Background Agent and other features.' },
]
</script>
