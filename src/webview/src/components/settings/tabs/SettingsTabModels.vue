<template>
  <SettingsTab title="Models">
    <SettingsSection>
      <SettingsSubSection>
        <SettingsCell label="Model Selection" description="Choose the AI models you want to use">
          <template #trailing>
            <Button variant="tertiary" size="small">Configure</Button>
          </template>
        </SettingsCell>
      </SettingsSubSection>
    </SettingsSection>
  </SettingsTab>
</template>

<script setup lang="ts">
import SettingsTab from '../SettingsTab.vue'
import SettingsSection from '../SettingsSection.vue'
import SettingsSubSection from '../SettingsSubSection.vue'
import SettingsCell from '../SettingsCell.vue'
import Button from '../../Common/Button.vue'
</script>
