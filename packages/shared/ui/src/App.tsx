import { Button } from '../lib/button'
import { Input } from '../lib/input'
import { Label } from '../lib/label'
import { PageHeading } from '../lib/page-heading'
import { TextField } from '../lib/text-field'

function App() {
  return (
    <div className="p-10 grid gap-4">
      <PageHeading>Arkham HQ Shared UI Component Library</PageHeading>
      <h2 className="text-lg">Playground</h2>
      <div className="grid gap-3">
        <TextField>
          <Label>Label</Label>
          <Input name="input" />
        </TextField>
        <Button>Button</Button>
      </div>
    </div>
  )
}

export default App
