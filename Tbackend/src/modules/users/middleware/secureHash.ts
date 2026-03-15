import { hash } from "@node-rs/argon2";

export const secureHash = async (password: string) => {
  return await hash(password, {
    // These are the recommended "OWASP" style settings for 2026
    memoryCost: 65536, // 64MB
    timeCost: 3, // Iterations
    parallelism: 4, // Parallel threads
  });
};
