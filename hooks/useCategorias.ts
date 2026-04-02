"use client";

import { apiGet } from "@/lib/apiHelper";
import { useEffect, useState } from "react";

export function useCategorias() {
  const [categorias, setCategorias] = useState<string[]>([]);

  useEffect(() => {
    apiGet<string[]>("/productos/categorias").then(setCategorias);
  }, []);

  return categorias;
}