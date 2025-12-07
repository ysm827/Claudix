import { signal, computed, effect } from 'alien-signals';
import type { BaseTransport } from '../transport/BaseTransport';

export interface SettingsState {
  privacyMode: 'share' | 'privacy';
  systemNotifications: boolean;
  menuBarIcon: boolean;
  completionSound: boolean;
  [key: string]: any; // Allow dynamic settings
}

export class SettingsStore {
  private readonly _settings = signal<SettingsState>({
    // 兼容旧值：后端可能返回 'legacy'
    privacyMode: 'legacy' as any,
    // 为 Switch 提供布尔默认值，避免 modelValue 为 undefined 的 Vue 警告
    systemNotifications: false,
    menuBarIcon: true,
    completionSound: true,
  } as SettingsState);

  constructor(private readonly transport: BaseTransport) {
    this.initialize();
  }

  private async initialize() {
    // 确保 Transport 已完成基础初始化（init / get_claude_state）
    try {
      await this.transport.opened;
    } catch (error) {
      console.error('Failed to initialize transport before fetching settings:', error);
      // 即便初始化失败，也尝试继续获取设置，避免页面完全不可用
    }

    // 从扩展拉取初始设置
    try {
        const response = await this.transport.getSettings();
        if (response && response.settings) {
            this._settings({ ...this._settings(), ...response.settings });
        }
    } catch (error) {
        console.error('Failed to fetch settings:', error);
    }
  }

  get settings() {
    return this._settings;
  }

  updateSetting<K extends keyof SettingsState>(key: K, value: SettingsState[K]) {
    const current = this._settings();
    this._settings({ ...current, [key]: value });

    // Send update to extension
    this.transport.updateSetting(key as string, value)
      .catch(err => console.error('Failed to update setting:', err));

    console.log(`Setting updated: ${String(key)} = ${value}`);
  }
}
