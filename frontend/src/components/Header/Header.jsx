
export default function Header(props) {
  return (
    <header style={{ position: "relative", display: "flex", alignItems: "center", width: "100%", padding: "1rem", minHeight: "3rem"}}>
        <h1 style={{position: "absolute", left:"50%", top:"50%", transform:"translate(-50%, -50%)", width: "max-content", textAlign:"center", margin: 0}}>Fullstack notes</h1>
        <input
          type="text"
          placeholder="Filter by category..."
          value={props.categoryFilter}
          onChange={e => props.setCategoryFilter(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: "8px", border: "1px solid #ccc", marginLeft: "auto", marginRight: "1rem", width: "200px" }}
        />
    </header>
  )
}
