# Arkham HQ

Personal playground project for:

- learning more about AWS / SST
- testing a micro service / micro frontend architecture

## Architecture

We assume multiple teams develop Arkham HQ, each team owning one bounded context. Our architecture supports this through loose coupling by pushing up dependencies as high as possible, following this basic rule:

> UI Link > HTTP Request > Shared Cookie > Shared Code

## Infrastructure

The [initial infrastructure draft](https://excalidraw.com/#json=Xh69SWw_CUcQASQQF-XiF,j7rs9pbISMRX-f2gkCNe3A) used EC2 instances for hosting Next.js apps. As these need permanentaly running Nat Gateways, which are charged on an hourly base, it turned out to be a quite cost intense solution.

We moved to running Next.js in Lambda Functions with the help of [SST](https://sst.dev) and [OpenNext](https://open-next.js.org).
