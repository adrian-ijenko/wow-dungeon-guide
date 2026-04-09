/** Wowhead Power.js globals (https://wow.zamimg.com/widgets/power.js) */
declare global {
  interface Window {
    whTooltips?: Record<string, unknown>;
    $WowheadPower?: {
      refreshLinks?: () => void;
      initialize?: () => void;
    };
  }
}

export {};
