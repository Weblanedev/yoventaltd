export function getSessionSecret(): string {
  return process.env.SESSION_SECRET ?? 'dev-insecure';
}

export function isProductionNodeEnv(): boolean {
  return process.env.NODE_ENV === 'production';
}
