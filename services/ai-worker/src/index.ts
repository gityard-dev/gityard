export const serviceName = "ai-worker";

export function readiness() {
  return {
    service: serviceName,
    status: "ok",
    supportsDisabledProvider: true,
  };
}
