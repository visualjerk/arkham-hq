FROM node:18.18.0-bullseye-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run --filter=auth-ui build
RUN pnpm deploy --filter=auth-ui --prod /prod

FROM base
COPY --from=build /prod /prod
WORKDIR /prod
EXPOSE 3000
CMD [ "pnpm", "start" ]
