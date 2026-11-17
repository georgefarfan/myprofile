import { describe, expect, it } from "vitest";

describe("test runner", () => {
	it("runs under jsdom", () => {
		expect(typeof window).toBe("object");
		expect(typeof window.localStorage).toBe("object");
	});
});
