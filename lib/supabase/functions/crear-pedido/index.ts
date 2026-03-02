// 1. Configurar Variables de Entorno
// En tu dashboard de Supabase, ve a Edge Functions > Settings y agrega tus secretos:
// WHATSAPP_TOKEN: Tu token de acceso de la API.
// WHATSAPP_PHONE_ID: El ID del número emisor.
// ADMIN_PHONE_NUMBER: El número al que se enviará la alerta (ej. 5215555555555).
// 2. Crear la Edge Function
// En tu terminal local (con el CLI de Supabase instalado):

// supabase functions new crear-pedido

// 3. Código de la Función (Deno) (este archivo)
// 4. Desplegar la función:
// supabase functions deploy crear-pedido
// 5. Llamar desde el Frontend:

// const { data, error } = await supabase.functions.invoke('crear-pedido', {
//   body: { 
//     product_ids: [1, 5, 9], 
//     user_id: usuarioActual.id 
//   }
// })


import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Manejo de CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // 1. Obtener datos del request
    const { product_ids, user_id } = await req.json()

    // 2. Inicializar cliente de Supabase (con clave de servicio para bypass RLS si es necesario)
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // 3. Obtener detalles de los productos (Títulos y Precios)
    const { data: productos, error: errorProductos } = await supabase
      .from('productos')
      .select('id, titulo, precio')
      .in('id', product_ids)

    if (errorProductos) throw errorProductos

    // 4. Calcular total y formar mensaje
    let total = 0
    let mensajeWhatsApp = "🛒 *Nuevo Pedido Recibido*\n\n"
    
    productos.forEach((prod: any) => {
      total += prod.precio
      mensajeWhatsApp += `- ${prod.titulo}: $${prod.precio}\n`
    })

    mensajeWhatsApp += `\n*TOTAL: $${total}*`

    // 5. Insertar el Pedido en la BD
    const { data: pedido, error: errorPedido } = await supabase
      .from('pedidos')
      .insert([{ user_id, total, estado: 'pendiente' }])
      .select()
      .single()

    if (errorPedido) throw errorPedido

    // 6. Insertar los items del pedido
    const itemsInsert = productos.map((p: any) => ({
      pedido_id: pedido.id,
      producto_id: p.id,
      precio: p.precio
    }))

    await supabase.from('detalles_pedido').insert(itemsInsert)

    // 7. Enviar mensaje a WhatsApp (Ejemplo con Meta Cloud API)
    const whatsappToken = Deno.env.get('WHATSAPP_TOKEN')
    const phoneId = Deno.env.get('WHATSAPP_PHONE_ID')
    const adminPhone = Deno.env.get('ADMIN_PHONE_NUMBER')

    await fetch(`https://graph.facebook.com/v17.0/${phoneId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${whatsappToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: adminPhone,
        type: "text",
        text: { body: mensajeWhatsApp }
      })
    })

    // 8. Responder al Frontend
    return new Response(
      JSON.stringify({ success: true, pedido_id: pedido.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})