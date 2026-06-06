---
title: "What I've Learned Building My Own AI Agent Stack"
date: "2026-06-01"
tags: ["AI", "agents", "tech"]
status: "growing"
excerpt: "Most people use AI as a smarter search engine. I've been building a system of autonomous agents that run parts of my life. Here's what I've learned."
---

Most people use AI as a smarter search engine. Ask a question, get an answer, close the tab.

I've been building something different — a system of autonomous agents that each own a domain of my life. One handles my personal finances. One monitors my work projects. One writes my daily brief. One watches flight prices. They talk to each other via a shared message bus on GitHub.

A few things I've learned:

**Agents are only as good as their context.** The single biggest lever is how well the agent understands who you are, what you're optimising for, and what "good" looks like. I maintain a living context file that every agent reads at the start of every session. Without it, they're just autocomplete.

**Autonomy requires trust infrastructure.** You can't give an agent real autonomy without clear boundaries on what it can do without asking. I have explicit rules: draft freely, send nothing, delete nothing, move money never. The agent knows its lane.

**The interface doesn't matter. The output does.** I don't care if the agent uses a browser, a terminal, or an API call. I care whether the thing got done to the standard I'd do it myself.

**Start narrow, go deep.** The temptation is to build a general assistant. The reality is that a specialist agent that does one thing extremely well is 10x more useful than a generalist that does ten things adequately.

This is still early. But I'm convinced that personal agent stacks will be to the next decade what personal computers were to the last one.
