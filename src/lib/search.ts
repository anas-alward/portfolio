import { z } from "zod";

/**
 * Search params shared by the home and detail routes: `tab` selects the
 * active section a detail page should link back to.
 */
export const tabSearchSchema = z.object({
  tab: z.string().optional(),
});
