import { http } from './http'
export type Resource = {
  id: number; title: string; description?: string;
  tags: string[]; courseId?: number; assignmentId?: number;
  createdAt: string; updatedAt: string;
}
export type Page<T> = { content: T[]; totalElements: number; totalPages: number; number: number; size: number; }
export const getResources = (q='', page=0, size=10) =>
  http.get<Page<Resource>>(`/api/items?search=${encodeURIComponent(q)}&page=${page}&size=${size}`)
export const getResource = (id: number) => http.get<Resource>(`/api/items/${id}`)
export const createResource = (input: Partial<Resource>) =>
  http.post<Resource>('/api/items', input)
export const updateResource = (id: number, input: Partial<Resource>) =>
  http.put<Resource>(`/api/items/${id}`, input)
export const deleteResource = (id: number) =>
  fetch(`/api/items/${id}`, { method: 'DELETE' }).then(r => { if (!r.ok) throw new Error(); })
