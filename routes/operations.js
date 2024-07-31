const express = require("express");
const router = express.Router();

const calculateMean = (nums) => {
	const sum = nums.reduce((acc, curr) => acc + curr, 0);
	return sum / nums.length;
};

const calculateMedian = (nums) => {
	nums.sort((a, b) => a - b);
	const mid = Math.floor(nums.length / 2);
	return nums.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};

const calculateMode = (nums) => {
	const freqMap = {};
	nums.forEach((num) => {
		freqMap[num] = (freqMap[num] || 0) + 1;
	});
	const maxFreq = Math.max(...Object.values(freqMap));
	return Object.keys(freqMap)
		.filter((num) => freqMap[num] === maxFreq)
		.map(Number);
};

const handleRequest = (req, res, operation) => {
	const { nums } = req.query;
	if (!nums) {
		return res.status(400).json({ error: "nums are required." });
	}

	const numArray = nums.split(",").map((num) => {
		const parsed = parseFloat(num);
		if (isNaN(parsed)) {
			throw new Error(`${num} is not a number.`);
		}
		return parsed;
	});

	let result;
	switch (operation) {
		case "mean":
			result = calculateMean(numArray);
			break;
		case "median":
			result = calculateMedian(numArray);
			break;
		case "mode":
			result = calculateMode(numArray);
			break;
		default:
			return res.status(400).json({ error: "Invalid operation." });
	}

	res.json({ operation, value: result });
};

router.get("/mean", (req, res) => {
	try {
		handleRequest(req, res, "mean");
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

router.get("/median", (req, res) => {
	try {
		handleRequest(req, res, "median");
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

router.get("/mode", (req, res) => {
	try {
		handleRequest(req, res, "mode");
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

router.get("/all", (req, res) => {
	try {
		const { nums } = req.query;
		if (!nums) {
			return res.status(400).json({ error: "nums are required." });
		}

		const numArray = nums.split(",").map((num) => {
			const parsed = parseFloat(num);
			if (isNaN(parsed)) {
				throw new Error(`${num} is not a number.`);
			}
			return parsed;
		});

		const mean = calculateMean(numArray);
		const median = calculateMedian(numArray);
		const mode = calculateMode(numArray);

		res.json({ operation: "all", mean, median, mode });
	} catch (err) {
		res.status(400).json({ error: err.message });
	}
});

module.exports = router;
