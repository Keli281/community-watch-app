const express = require('express');
const Issue = require('../models/Issue');
const router = express.Router();

// Create new issue
router.post('/', async (req, res) => {
  try {
    const newIssue = new Issue(req.body);
    const savedIssue = await newIssue.save();
    res.status(201).json(savedIssue);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all issues
router.get('/', async (req, res) => {
  try {
    const issues = await Issue.find();
    res.json(issues);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upvote an issue
router.post('/:id/upvote', async (req, res) => {
  try {
    console.log('🔼 Upvoting issue:', req.params.id);
    
    const issue = await Issue.findById(req.params.id);
    if (!issue) {
      console.log('❌ Issue not found');
      return res.status(404).json({ error: 'Issue not found' });
    }
    
    // Initialize upvotes if it doesn't exist
    if (!issue.upvotes) {
      issue.upvotes = 0;
    }
    
    issue.upvotes += 1;
    const updatedIssue = await issue.save();
    
    console.log('✅ Upvote successful. New count:', updatedIssue.upvotes);
    res.json(updatedIssue);
  } catch (error) {
    console.error('❌ Upvote error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add comment to an issue
router.post('/:id/comments', async (req, res) => {
  try {
    const { text } = req.body;
    const issue = await Issue.findById(req.params.id);
    
    if (!issue) {
      return res.status(404).json({ error: 'Issue not found' });
    }
    
    // Initialize comments array if it doesn't exist
    if (!issue.comments) {
      issue.comments = [];
    }
    
    issue.comments.push({ text });
    const updatedIssue = await issue.save();
    res.json(updatedIssue);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;