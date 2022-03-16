let ConnectionColor=(status)=>{
    if (status==="connected")return "#02b875"
    if (status==="disconnected")return "#d9534f"
    if (status==="poorConnection")return "#f0ad4e"
}

export default ConnectionColor;