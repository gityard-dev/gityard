FROM node:24-alpine

ARG PACKAGE_FILTER
WORKDIR /workspace

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps ./apps
COPY services ./services
COPY packages ./packages
COPY tsconfig*.json ./

RUN corepack enable && corepack pnpm install --frozen-lockfile

ENV PACKAGE_FILTER=${PACKAGE_FILTER}
