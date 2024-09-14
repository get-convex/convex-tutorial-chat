import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    // Grab the most recent messages.
    const task = await ctx.db.query("tasks").order("desc").take(100);
    // Reverse the list so that it's in a chronological order.
    return task.reverse();
  },
});

export const send = mutation({
    args: { category: v.string(), date: v.string(), description: v.string(), name: v.string(), priority: v.string()},
    handler: async (ctx, { category, date, description, name, priority }) => {
      // Send a new message.
      await ctx.db.insert("tasks", { category, date, description, name, priority });
    },
  });
  
