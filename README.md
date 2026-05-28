# GitYard

Open-source, AI-native software collaboration for humans and agents.

GitYard is a developer platform for pull requests, issues, reviews, agents, CI, releases, and project context.

## Status

GitYard is in early development.

There is no stable release yet. The project is public so it can be built in the open from the beginning.

## What is GitYard?

GitYard is designed to become a better workspace for modern software collaboration.

It gives developers and maintainers a better way to understand and work with:

- pull requests
- issues
- reviews
- agents
- CI/checks
- releases
- project context

The first versions will support existing Git workflows. The long-term goal is to make GitYard a full source of truth for software projects.

## Why GitYard?

Software development is changing.

Humans are no longer the only contributors to codebases. Agents can now investigate issues, generate patches, write tests, fix CI failures, and open pull requests.

But most developer platforms still treat software work as disconnected pages:

- a pull request
- an issue
- a review
- a CI result
- a release
- a bot comment
- an agent run

GitYard is built around the idea that software work needs context.

A pull request should not only show what changed. It should help explain why it changed, what is risky, what needs review, what agents were involved, and whether the change is ready to merge.

## Principles

- Open-source by default
- Self-hostable
- Local AI support
- No required paid AI provider
- Built for humans and agents
- Familiar developer vocabulary
- Git-compatible without being tied to one host
- Designed for the full software workflow, not just code hosting

## Planned Features

- Repository connection and sync
- Pull request interface
- Issue interface
- Review workflows
- Agent workflows
- Project context and memory
- CI/check understanding
- Release context
- Local AI provider support
- Self-hosted deployment
- Native GitYard hosting

## Local AI

GitYard should not require paid AI APIs.

The project is designed to support local and bring-your-own-key AI providers, including:

- Ollama
- OpenAI-compatible APIs
- Anthropic
- local models
- no-AI

## Self-Hosting

Self-hosting is a core goal.

The project should eventually be runnable locally with Docker Compose:

```bash
git clone https://github.com/gityard-dev/gityard
cd gityard
cp .env.example .env
docker compose up
````

This is not available yet.

## Contributing

GitYard is early.

Contributions are welcome once the initial project structure is in place.

For now, the best way to follow the project is to star the repository and watch for updates.

## License

Apache-2.0
