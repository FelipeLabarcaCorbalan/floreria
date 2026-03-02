export type Producto = {
  id: string
  titulo: string
  descripcion: string | null
  categoria: string
  precio: number
  imagen_path: string | null
  activo: boolean
  created_at: string
  updated_at: string
}

export type Database = {
  public: {
    Tables: {
      productos: {
        Row: Producto
        Insert: Omit<Producto, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<Producto>
      }
    }
  }
}