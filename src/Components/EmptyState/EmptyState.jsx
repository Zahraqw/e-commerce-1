import { EmptyState } from '@procore/core-react'
const EmptySrate = () => {
  return (
    <EmptyState style={{ marginTop: "50px" }}>
      <EmptyState.NoResults />
      <EmptyState.Title style={{ fontSize: "30px", fontWeight: "bold" }}>No Results</EmptyState.Title>
      <EmptyState.Description>
        Check your spelling and filter options, or search fora different keyword.
      </EmptyState.Description>
    </EmptyState>
  )
}

export default EmptySrate