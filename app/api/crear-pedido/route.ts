interface CartItem {
  id: string
  quantity: number
}

interface RequestBody {
  telefono: string
  items: CartItem[]
}

const BACKEND_URL = process.env.BACKEND_URL

export async function POST(request: Request) {
  try {
    const { telefono, items }: RequestBody = await request.json()

    if (!telefono || !items || items.length === 0) {
      return Response.json(
        { error: 'Datos inválidos' },
        { status: 400 }
      )
    }

    const response = await fetch(`${BACKEND_URL}/crear-pedido`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ telefono, items })
    })

    const data = await response.json()

    if (!response.ok) {
      return Response.json(
        { error: data.error || 'Error al crear el pedido' },
        { status: response.status }
      )
    }

    return Response.json({ success: true, pedido_id: data.pedido_id })

  } catch (error) {
    console.error('Error connecting to backend:', error)
    return Response.json(
      { error: 'Error de conexión con el servidor' },
      { status: 500 }
    )
  }
}
