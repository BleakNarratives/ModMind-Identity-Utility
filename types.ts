// FIX: Removed circular self-import of 'UserIdentity'.
export interface UserIdentity {
  readonly id: string;
  readonly color: string;
}

export type AiModel = 'standard' | 'creative' | 'tactical';