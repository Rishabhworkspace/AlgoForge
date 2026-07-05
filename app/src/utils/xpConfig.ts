/**
 * XP and Level Configuration
 *
 * Central source of truth for all XP values and level calculations.
 * Change these values once — they propagate everywhere.
 */

/** XP awarded for solving a problem */
export const SOLVE_XP = 25;

/** XP required per level */
export const XP_PER_LEVEL = 1000;

/**
 * Calculate a user's level from their total XP.
 * Formula: level = floor(xp / XP_PER_LEVEL) + 1
 */
export function calculateLevel(xpPoints: number): number {
  return Math.floor(xpPoints / XP_PER_LEVEL) + 1;
}
