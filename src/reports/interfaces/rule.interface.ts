export interface Rule {
  readonly id: string;
  readonly impact: string;
  readonly tags: Array<string>;
  readonly description: string;
  readonly help: string;
  readonly helpUrl: string;
}
