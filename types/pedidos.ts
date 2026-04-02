export interface ItemDto {
  id: string;
  quantity: number;
}

export interface CrearPedidoDto {
  telefono: string;
  items: ItemDto[];
}

export interface PedidoResponse {
  numero: string;
  pedido_id?: number;
}