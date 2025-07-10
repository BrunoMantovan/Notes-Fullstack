
export default function Header(props) {
  return (
    <header style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "0, 1rem", width: "100%", padding: "1rem"}}>
        <h1 style={{textAlign:"center", margin: "auto"}}>Fullstack notes</h1>
        <input
          type="text"
          placeholder="Filter by category..."
          value={props.categoryFilter}
          onChange={e => props.setCategoryFilter(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid #ccc" }}
        />
    </header>
  )
}
