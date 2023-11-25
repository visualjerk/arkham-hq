# Arkham HQ

Personal playground project for:

- learning more about AWS
- testing a micro service / micro frontend architecture

## Architecture

We assume multiple teams develop Arkham HQ, each team owning one bounded context. Our architecture supports this through loose coupling by pushing up dependencies as high as possible, following this basic rule:

> UI Link > HTTP Request > Shared Cookie > Shared Code

[Excalidraw Diagram](https://excalidraw.com/#json=Xh69SWw_CUcQASQQF-XiF,j7rs9pbISMRX-f2gkCNe3A)
