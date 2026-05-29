# AGENTS.md

GitYard is an open-source, AI-native software collaboration platform for humans and agents.

## Before changing code

* Read `README.md`.
* Read `docs/SPEC.md` for product direction when changing behavior or scope.
* Read `docs/STACK.md` when changing architecture, services, infra, or dependencies.
* Check `.plans/` if the work relates to an existing milestone or implementation plan.

## Rules

* Keep changes scoped.
* Do not make unrelated edits.
* Do not invent architecture.
* Do not add dependencies without a clear reason.
* Do not require paid AI services.
* Do not hardcode one AI provider.
* Preserve self-hosting and local development.
* Keep GitYard Git-compatible without tying it permanently to one host.
* If the request conflicts with the spec or stack, stop and ask.

## Boundaries

* Backend changes belong in services, packages, workers, database code, events, integrations, and infra.
* Frontend changes belong in apps, UI packages, routes, components, styles, and frontend state.
* Do not cross areas unless the change requires it.

## Done means

* The change works.
* Relevant checks were run.
* Documentation was updated if behavior changed.
* Known gaps are stated clearly.
