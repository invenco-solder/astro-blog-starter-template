import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const blog = defineCollection({
	loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
	}),
});

const products = defineCollection({
	loader: glob({
		base: "./src/data/products",
		pattern: "**/*.md",
	}),
	schema: z.object({
		name: z.string(),
		slug: z.string(),
		description: z.string(),
		price: z.number(),
		image: z.string(),
		images: z.array(z.string()).optional(),
		category: z.string(),

		specs: z.record(z.string()).optional(),

		lengths: z
			.array(
				z.object({
					name: z.string(),
					price: z.number(),
				})
			)
			.optional(),
	}),
});

export const collections = {
	blog,
	products,
};
